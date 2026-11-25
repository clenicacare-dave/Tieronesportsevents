import { defineConfig, devices } from '@playwright/test';

const port = 3100;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    // Locally use the installed Google Chrome (no browser download); CI installs Chromium.
    channel: process.env.CI ? undefined : 'chrome'
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1366, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: process.env.CI ? undefined : 'chrome' } }
  ],
  // Tests the production build (run `npm run build` first).
  webServer: { command: `npx next start -p ${port}`, port, reuseExistingServer: !process.env.CI }
});
