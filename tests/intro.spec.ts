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

  test('first visit: opens centred and large, shrinks to the corner, closes and stays closed; button replays', async ({ page }) => {
    await page.goto('/');
    const film = page.getByLabel('Tier One intro film');
    await expect(film).toHaveAttribute('data-mode', 'stage');
    await expect(page.getByRole('dialog', { name: 'Tier One intro film' })).toBeVisible();
    await expect(film.locator('video')).toHaveAttribute('src', /\/video\/intro-(1080|720)\.mp4/);
    // Centred and roughly three times the corner player.
    const vp = page.viewportSize()!;
    const box = (await film.locator('.intro-frame').boundingBox())!;
    expect(Math.abs(box.x + box.width / 2 - vp.width / 2)).toBeLessThan(4);
    expect(box.width).toBeGreaterThan(Math.min(900, vp.width * 0.85));

    // Escape sends it to the corner, where the page is usable again.
    await page.keyboard.press('Escape');
    await expect(film).toHaveAttribute('data-mode', 'mini');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Expand returns it to the centre; then the end of the film shrinks it back to the corner.
    await film.getByRole('button', { name: 'Expand film' }).click();
    await expect(film).toHaveAttribute('data-mode', 'stage');
    await film.locator('video').evaluate((v: HTMLVideoElement) => v.dispatchEvent(new Event('ended')));
    await expect(film).toHaveAttribute('data-mode', 'mini');

    await film.getByRole('button', { name: 'Close film' }).click();
    await expect(film).toHaveCount(0);
    await page.reload();
    await page.waitForTimeout(1600);
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
