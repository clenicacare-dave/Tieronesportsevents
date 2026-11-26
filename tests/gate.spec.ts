import { test, expect } from '@playwright/test';

// The pre-launch gate only exists on the deployed Worker. Run with BASE_URL and PREVIEW_TOKEN set.
const remote = process.env.BASE_URL;
const token = process.env.PREVIEW_TOKEN;

test.describe('pre-launch gate', () => {
  test.skip(!remote || !token || process.env.EXPECT_GATE !== '1', 'gate checks run against a gated deployment only');
  test.use({ storageState: { cookies: [], origins: [] } });

  test('public sees the holding page on every page', async ({ page }) => {
    for (const path of ['/', '/events', '/privacy']) {
      const res = await page.goto(path);
      expect(res?.headers()['x-robots-tag']).toContain('noindex');
      await expect(page.getByText('Coming soon')).toBeVisible();
      await expect(page.locator('header nav')).toHaveCount(0);
    }
  });

  test('wrong link does not open the site', async ({ page }) => {
    await page.goto('/preview/not-the-token-at-all-123');
    await expect(page.getByText('Coming soon')).toBeVisible();
  });

  test('robots and API are closed', async ({ request }) => {
    expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
    expect((await request.get('/sitemap.xml')).status()).toBe(404);
  });

  test('private link opens the full site', async ({ page }) => {
    await page.goto(`/preview/${token}`);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('header nav').first()).toBeAttached();
    await page.goto('/events');
    await expect(page.getByText('Coming soon')).toHaveCount(0);
  });
});
