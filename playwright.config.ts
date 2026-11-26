import { defineConfig, devices } from '@playwright/test';

const port = 3100;
// Set BASE_URL to test a deployed Worker (preview or live) instead of a local build:
//   BASE_URL=https://<version>-tieronesportsevents.tier-one-sports-events.workers.dev npm test
const remote = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: remote ?? `http://localhost:${port}`,
    // Locally use the installed Google Chrome (no browser download); CI installs Chromium.
    channel: process.env.CI ? undefined : 'chrome'
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1366, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: process.env.CI ? undefined : 'chrome' } },
    { name: 'tablet', use: { ...devices['iPad (gen 7) landscape'], defaultBrowserType: 'chromium', channel: process.env.CI ? undefined : 'chrome' } }
  ],
  // Tests the production build (run `npm run build` first).
  webServer: remote ? undefined : { command: `npx next start -p ${port}`, port, reuseExistingServer: !process.env.CI }
});
