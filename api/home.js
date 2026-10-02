const { home } = require('./_moviebox');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try { res.status(200).json(await home()); }
  catch (e) { res.status(502).json({ error: 'Catalog temporarily unavailable', detail: e.message }); }
};
