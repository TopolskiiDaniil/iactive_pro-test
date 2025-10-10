export default async function handler(req, res) {
  const targetUrl = 'http://a0830433.xsph.ru' + req.url.replace(/^\/api/, '');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: req.method !== 'GET' ? req.body : undefined,
    });

    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}
