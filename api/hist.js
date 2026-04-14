export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { ticker } = req.query;
  if (!ticker) return res.status(400).json({ error: "ticker requerido" });
  try {
    const url = `https://data912.com/historical/bonds/${encodeURIComponent(ticker)}`;
    const data = await fetch(url).then(r => {
      if (!r.ok) throw new Error(`data912 HTTP ${r.status}`);
      return r.json();
    });
    res.json(data);
  } catch(e) {
    res.status(502).json({ error: e.message });
  }
}
