// Public browser-facing functions (vip-subscribe, create-checkout-session) need CORS since
// they're called directly from the site. Restrict to the real site origin once known via the
// ALLOWED_ORIGIN secret (comma-separated list); defaults to '*' so nothing breaks before that's set.
const allowedOrigins = (Deno.env.get('ALLOWED_ORIGIN') ?? '*').split(',').map((o) => o.trim());

export function corsHeadersFor(req: Request) {
  const origin = req.headers.get('origin') ?? '';
  const allowOrigin = allowedOrigins.includes('*')
    ? '*'
    : allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

export function handleOptions(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeadersFor(req) });
  }
  return null;
}
