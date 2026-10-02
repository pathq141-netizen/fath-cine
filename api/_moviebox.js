const H5 = 'https://h5-api.aoneroom.com/wefeed-h5api-bff';
const HOST = 'officialmoviebox.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

async function get(path) {
  const url = path.startsWith('http') ? path : H5 + path;
  const response = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'application/json',
      'Referer': `https://${HOST}/`,
      'Origin': `https://${HOST}`
    },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`Upstream API returned HTTP ${response.status}`);
  const json = await response.json();
  if (json.code !== 0) throw new Error(json.message || 'Upstream API error');
  return json;
}

function normalize(s) {
  return {
    subjectId: s.subjectId,
    title: s.title || 'Untitled',
    type: s.subjectType,
    cover: (s.cover && s.cover.url) || s.image?.url || '',
    imdb: s.imdbRatingValue,
    genre: s.genre,
    releaseDate: s.releaseDate,
    country: s.countryName,
    hasResource: Boolean(s.hasResource),
    description: s.description || '',
    duration: s.duration,
    subtitles: s.subtitles,
    trailer: s.trailer?.videoAddress?.url || ''
  };
}

async function home() {
  const j = await get('/home?host=' + HOST);
  const data = j.data || {};
  const sections = (data.operatingList || []).map(sec => {
    const items = [];
    for (const b of (sec.banner?.items || [])) items.push(normalize({ ...(b.subject || {}), subjectId: b.subject?.subjectId || b.subjectId, title: b.subject?.title || b.title, cover: b.subject?.cover || b.image }));
    for (const s of (sec.subjects || [])) items.push(normalize(s));
    return { type: sec.type, title: sec.title || 'Discover', position: sec.position, items };
  }).filter(sec => sec.items.length);
  return { sections, platforms: data.platformList || [] };
}

async function trending(page = 0) {
  const j = await get(`/subject/trending?page=${Math.max(0, Number(page) || 0)}&perPage=24`);
  return ((j.data && j.data.subjectList) || []).map(normalize);
}

async function detail(id) {
  if (!/^\d{5,30}$/.test(String(id || ''))) throw new Error('Invalid subjectId');
  const j = await get('/detail?subjectId=' + encodeURIComponent(id));
  return normalize((j.data && j.data.subject) || {});
}

module.exports = { home, trending, detail };
