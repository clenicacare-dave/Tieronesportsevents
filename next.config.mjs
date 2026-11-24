/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve images as-is: no paid Cloudflare Images binding needed.
  images: { unoptimized: true },
  // Keep Vercel's old behaviour: bare domain -> www.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tieronesportsevents.com' }],
        destination: 'https://www.tieronesportsevents.com/:path*',
        permanent: true
      }
    ];
  }
};

export default nextConfig;

// Only for `next dev`: production builds must not open a remote Cloudflare session.
if (process.env.NODE_ENV === 'development') {
  const { initOpenNextCloudflareForDev } = await import('@opennextjs/cloudflare');
  initOpenNextCloudflareForDev();
}
