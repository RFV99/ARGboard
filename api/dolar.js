export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const raw = await fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares").then(r => r.json());
    const latest = {};
    for (let i = raw.length - 1; i >= 0; i--) {
      const d = raw[i];
      const casa = (d.casa || "").toLowerCase();
      if (!latest[casa]) latest[casa] = { compra: d.compra, venta: d.venta, fecha: d.fecha };
    }
    res.json({
      blue:      latest["blue"]            || null,
      oficial:   latest["oficial"]         || null,
      mep:       latest["bolsa"]           || null,
      cable:     latest["contadoconliqui"] || null,
      mayorista: latest["mayorista"]       || null,
      cripto:    latest["cripto"]          || null,
      tarjeta:   latest["tarjeta"]         || null,
    });
  } catch(e) {
    res.status(502).json({ error: e.message });
  }
}
