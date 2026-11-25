import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/events',
  '/events/six-nations-weekend-edinburgh',
  '/sports',
  '/sports/football',
  '/group-travel',
  '/corporate-hospitality',
  '/bespoke-trips',
  '/about',
  '/how-it-works',
  '/faqs',
  '/travel-information',
  '/contact',
  '/quote',
  '/privacy',
  '/cookies',
  '/terms'
];

for (const path of pages) {
  test(`${path} renders with one h1, a canonical URL and no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/www\.tieronesportsevents\.com/);
    await expect(page).toHaveTitle(/Tier One Sports Events/);
    // Turnstile only works on approved hostnames, so its errors are expected on localhost.
    expect(errors.filter((e) => !/turnstile|challenges\.cloudflare|cloudflare/i.test(e))).toEqual([]);
  });
}

test('visitor goes from home to an event and lands on a pre-filled quote form', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByText('Menu', { exact: true }).click();
    await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Events' }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Events' }).click();
  }
  await expect(page).toHaveURL(/\/events$/);
  await page.getByRole('link', { name: 'Cheltenham Festival' }).click();
  await expect(page.locator('h1')).toHaveText(/Cheltenham Festival/i);
  await page.getByRole('link', { name: 'Enquire about this trip' }).click();
  await expect(page).toHaveURL(/\/quote\?event=cheltenham-festival/);
  await expect(page.locator('select[name="interest"]')).toHaveValue('Cheltenham Festival');
  await expect(page.getByRole('button', { name: 'Send quote request' })).toBeVisible();
});

test('sample events are labelled and kept out of search', async ({ page, request }) => {
  await page.goto('/events/british-grand-prix-weekend');
  await expect(page.getByText('Sample', { exact: true }).first()).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('script[type="application/ld+json"]', { hasText: '"Event"' })).toHaveCount(0);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).not.toContain('/events/british-grand-prix-weekend');
});

test('unknown pages return 404', async ({ page }) => {
  const res = await page.goto('/no-such-page');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText(/Off the pitch/i);
});

test('security headers are sent', async ({ request }) => {
  const res = await request.get('/');
  const h = res.headers();
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['strict-transport-security']).toContain('max-age=');
  expect(h['x-powered-by']).toBeUndefined();
});

test('enquiry API rejects non-JSON submissions', async ({ request }) => {
  const res = await request.post('/api/contact', { data: 'name=x', headers: { 'content-type': 'text/plain' } });
  expect(res.status()).toBe(415);
});
