const { detail } = require('./_moviebox');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try { res.status(200).json(await detail(req.query.id)); }
  catch (e) { res.status(400).json({ error: 'Could not load title', detail: e.message }); }
};
