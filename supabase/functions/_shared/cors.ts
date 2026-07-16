// Public browser-facing functions are called directly from the website, local dev, and
// preview deployments. CORS is not an auth boundary here, so avoid brittle exact-origin
// matching that breaks Vercel previews. ALLOWED_ORIGIN still supports explicit allow-lists
// for custom domains, while localhost and *.vercel.app are allowed automatically.
const allowedOrigins = (Deno.env.get('ALLOWED_ORIGIN') ?? '')
  .split(',')
  .map((o: string) => o.trim())
  .filter(Boolean);

function isPreviewOrLocalOrigin(origin: string) {
  return /^https?:\/\/localhost(?::\d+)?$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
}

export function corsHeadersFor(req: Request) {
  const origin = req.headers.get('origin') ?? '';
  const allowOrigin = !origin
    ? '*'
    : allowedOrigins.includes('*') || allowedOrigins.includes(origin) || isPreviewOrLocalOrigin(origin)
      ? origin
      : allowedOrigins[0] ?? '*';

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
