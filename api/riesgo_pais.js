export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const data = await fetch("https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo").then(r => r.json());
    res.json(data);
  } catch(e) {
    res.status(502).json({ error: e.message });
  }
}
