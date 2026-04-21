export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const data = await fetch("https://data912.com/live/arg_corp").then(r => r.json());
    res.json(data);
  } catch(e) {
    res.status(502).json({ error: e.message });
  }
}
