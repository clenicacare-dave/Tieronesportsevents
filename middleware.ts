import { NextResponse, type NextRequest } from 'next/server';

// Pre-launch gate. While SITE_GATE is "on" (wrangler.jsonc vars), the public sees only the
// holding page. The private link /preview/<PREVIEW_TOKEN> sets a cookie that opens the full site
// on that browser. PREVIEW_TOKEN is a Worker secret; with it missing the gate stays shut.
// To launch: set SITE_GATE to "off" and deploy. Locally (no SITE_GATE) there is no gate.

const COOKIE = 't1_preview';
const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow' };

const same = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

export function middleware(req: NextRequest) {
  if (process.env.SITE_GATE !== 'on') return NextResponse.next();

  const token = process.env.PREVIEW_TOKEN ?? '';
  const { pathname } = req.nextUrl;

  // The private link: set the cookie and go to the home page.
  if (pathname.startsWith('/preview/')) {
    const given = pathname.slice('/preview/'.length);
    if (token.length >= 16 && same(given, token)) {
      const res = NextResponse.redirect(new URL('/', req.url), { headers: NOINDEX });
      res.cookies.set(COOKIE, token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 90 });
      return res;
    }
  }

  const allowed = token.length >= 16 && same(req.cookies.get(COOKIE)?.value ?? '', token);
  if (allowed) return NextResponse.next({ headers: NOINDEX });

  if (pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain' } });
  }
  if (pathname.startsWith('/api/') || pathname === '/sitemap.xml') {
    return new NextResponse('Not found', { status: 404, headers: NOINDEX });
  }
  return NextResponse.rewrite(new URL('/coming-soon', req.url), { headers: NOINDEX });
}

// Skip build assets and public files (photos, brand, icons): they are served before the Worker anyway.
export const config = {
  matcher: ['/((?!_next/|brand/|photos/|favicon.ico|.*\\.(?:png|webp|jpg|svg|ico|txt|webmanifest|mp4)$).*)', '/robots.txt']
};
