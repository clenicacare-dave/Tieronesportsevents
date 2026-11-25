import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Every page is pre-rendered at build time and never revalidated, so pre-built pages
// are served from the Worker's static assets: no R2 or KV needed, no extra cost.
// Without an incremental cache, pre-rendered dynamic routes (/events/[slug]) return 404.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true
});
