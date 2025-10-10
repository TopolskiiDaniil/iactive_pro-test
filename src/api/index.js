export default async function handler(request) {
  const targetUrl = 'http://a0830433.xsph.ru';

  const headers = new Headers(request.headers);
  headers.set('host', new URL(targetUrl).host);

  const proxyRequest = new Request(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
    duplex: 'half',
  });

  const response = await fetch(proxyRequest);

  const modifiedHeaders = new Headers(response.headers);
  modifiedHeaders.set('Access-Control-Allow-Origin', '*');
  modifiedHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  modifiedHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: modifiedHeaders,
  });
}
