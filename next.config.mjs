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

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
