import { test, expect } from '@playwright/test';

// First visit: the intro film opens full screen; Skip closes it and it stays closed; the button replays it.
const remote = process.env.BASE_URL;
const token = process.env.PREVIEW_TOKEN;
const cookies =
  remote && token
    ? [{ name: 't1_preview', value: token, domain: new URL(remote).hostname, path: '/', expires: -1, httpOnly: true, secure: true, sameSite: 'Lax' as const }]
    : [];

test.describe('intro film', () => {
  test.use({ storageState: { cookies, origins: [] } });

  test('plays on first visit, skips, stays closed, replays', async ({ page }) => {
    await page.goto('/');
    const film = page.getByRole('dialog', { name: 'Tier One intro film' });
    await expect(film).toBeVisible();
    await expect(film.locator('video')).toHaveAttribute('src', /\/video\/intro-(1080|720)\.mp4/);
    await film.getByRole('button', { name: 'Skip' }).click();
    await expect(film).toHaveCount(0);

    await page.reload();
    await expect(page.getByRole('dialog', { name: 'Tier One intro film' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Watch the film' }).first().click();
    await expect(film).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(film).toHaveCount(0);
  });

  test('does not autoplay for reduced motion', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', storageState: { cookies, origins: [] } });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Watch the film' }).first()).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Tier One intro film' })).toHaveCount(0);
    await ctx.close();
  });
});
