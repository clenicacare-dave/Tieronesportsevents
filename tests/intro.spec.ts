import { test, expect } from '@playwright/test';

// First visit: the intro film opens full screen; Skip closes it and it stays closed; the button replays it.
const remote = process.env.BASE_URL;
const token = process.env.PREVIEW_TOKEN;
const cookies =
  remote && token
    ? [
        {
          name: 't1_preview',
          value: token,
          domain: new URL(remote).hostname,
          path: '/',
          expires: -1,
          httpOnly: true,
          secure: true,
          sameSite: 'Lax' as const
        }
      ]
    : [];

test.describe('intro film', () => {
  test.use({ storageState: { cookies, origins: [] } });

  test('first visit: small player, expands, shrinks, closes and stays closed; button replays full screen', async ({ page }) => {
    await page.goto('/');
    const film = page.getByLabel('Tier One intro film');
    await expect(film).toBeVisible();
    await expect(film).toHaveAttribute('data-mode', 'mini');
    await expect(film.locator('video')).toHaveAttribute('src', /\/video\/intro-(1080|720)\.mp4/);
    // The page stays usable underneath.
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await film.getByRole('button', { name: 'Expand film' }).click();
    await expect(page.getByRole('dialog', { name: 'Tier One intro film' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(film).toHaveAttribute('data-mode', 'mini');

    await film.getByRole('button', { name: 'Close film' }).click();
    await expect(film).toHaveCount(0);
    await page.reload();
    await page.waitForTimeout(1800);
    await expect(page.getByLabel('Tier One intro film')).toHaveCount(0);

    await page.getByRole('button', { name: 'Watch the film' }).first().click();
    await expect(page.getByRole('dialog', { name: 'Tier One intro film' })).toBeVisible();
  });

  test('does not autoplay for reduced motion', async ({ browser }) => {
    const ctx = await browser.newContext({
      reducedMotion: 'reduce',
      storageState: { cookies, origins: [] }
    });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Watch the film' }).first()).toBeVisible();
    await page.waitForTimeout(1800);
    await expect(page.getByLabel('Tier One intro film')).toHaveCount(0);
    await ctx.close();
  });
});
