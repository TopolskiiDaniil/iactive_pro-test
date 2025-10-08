module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, headers, body } = req;

  try {
    const proxyRes = await fetch('http://a0830433.xsph.ru', {
      method,
      headers: {
        ...headers,
        host: 'a0830433.xsph.ru',
        'content-length': Buffer.byteLength(body || '').toString(),
      },
      body: method !== 'GET' && method !== 'HEAD' ? body : null,
    });

    const data = await proxyRes.text();

    res.status(proxyRes.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request' });
  }
};
