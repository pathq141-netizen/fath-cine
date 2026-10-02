const { trending } = require('./_moviebox');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try { res.status(200).json({ items: await trending(req.query.page) }); }
  catch (e) { res.status(502).json({ error: 'Trending list temporarily unavailable', detail: e.message }); }
};
