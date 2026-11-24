/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve images as-is: no paid Cloudflare Images binding needed.
  images: { unoptimized: true }
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
