export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  try {
    const r = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(12000),
    });
    if (!r.ok) { res.status(502).json({ error: `upstream ${r.status}` }); return; }
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(502).json({ error: e.message });
  }
}
