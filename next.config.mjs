// Security headers on every response. Turnstile is the only third-party origin.
// 'unsafe-inline' for scripts is needed by Next.js's inline bootstrap without nonces;
// a nonce-based CSP would force every page to render dynamically.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests'
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Serve images as-is: no paid Cloudflare Images binding needed. Add photos pre-sized as WebP.
  images: { unoptimized: true },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Bare domain -> www.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tieronesportsevents.com' }],
        destination: 'https://www.tieronesportsevents.com/:path*',
        permanent: true
      },
      // Old Vantage-style football page, in case it was linked anywhere.
      { source: '/football', destination: '/sports/football', permanent: true }
    ];
  }
};

export default nextConfig;

// Only for `next dev`: production builds must not open a remote Cloudflare session.
if (process.env.NODE_ENV === 'development') {
  const { initOpenNextCloudflareForDev } = await import('@opennextjs/cloudflare');
  initOpenNextCloudflareForDev();
}
