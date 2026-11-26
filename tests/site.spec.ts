import { expect, test } from '@playwright/test';
import { isKids } from '../lib/edition';

// The suite tests the edition being built (lib/edition.ts): kids football by default,
// or the full site with NEXT_PUBLIC_SITE_EDITION=full set for both the build and the tests.
const kidsOnly = ['/clubs-and-academies', '/schools', '/families', '/events/youth-tournament-costa-brava'];
const fullOnly = ['/sports', '/sports/football', '/group-travel', '/corporate-hospitality', '/bespoke-trips', '/events/six-nations-weekend-edinburgh'];
const sampleEvent = isKids ? 'family-match-weekend-liverpool' : 'british-grand-prix-weekend';

const pages = [
  '/',
  '/events',
  ...(isKids ? kidsOnly : fullOnly),
  '/about',
  '/how-it-works',
  '/faqs',
  '/travel-information',
  '/contact',
  '/quote',
  '/privacy',
  '/cookies',
  '/terms',
  '/booking-conditions'
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
  const list = isKids ? 'Trips' : 'Events';
  const [slug, name] = isKids ? ['youth-tournament-costa-brava', 'Easter youth tournament, Costa Brava'] : ['cheltenham-festival', 'Cheltenham Festival'];
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('navigation', { name: 'Quick links' }).getByRole('link', { name: list }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: list }).click();
  }
  await expect(page).toHaveURL(/\/events$/);
  await page.getByRole('link', { name }).first().click();
  await expect(page.locator('h1')).toHaveText(new RegExp(name, 'i'));
  await page.getByRole('link', { name: 'Enquire about this trip' }).click();
  await expect(page).toHaveURL(new RegExp(`/quote\\?event=${slug}`));
  await expect(page.locator('select[name="interest"]')).toHaveValue(name);
  await expect(page.getByRole('button', { name: 'Send quote request' })).toBeVisible();
});

test('sport tile Quote button opens the quote form with that sport selected', async ({ page }) => {
  test.skip(isKids, 'Full edition only');
  await page.goto('/sports');
  await page.getByRole('link', { name: 'Quote for golf' }).click();
  await expect(page).toHaveURL(/\/quote\?event=golf/);
  await expect(page.locator('select[name="interest"]')).toHaveValue('Golf (any event)');
});

test('kids football: audience Quote button opens the quote form with that group selected', async ({ page }) => {
  test.skip(!isKids, 'Kids football edition only');
  await page.goto('/');
  await page.getByRole('link', { name: 'Quote for schools' }).click();
  await expect(page).toHaveURL(/\/quote\?type=schools/);
  await expect(page.locator('select[name="interest"]')).toHaveValue('Schools: any football trip');
});

test('pages from the other edition return 404 and stay out of the sitemap', async ({ page, request }) => {
  const other = isKids ? fullOnly : kidsOnly;
  for (const path of other) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(404);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const path of other.filter((p) => !p.startsWith('/events/'))) expect(sitemap).not.toContain(`.com${path}<`);
});

test('kids football edition mentions no other sports or corporate trips in navigation', async ({ page }) => {
  test.skip(!isKids, 'Kids football edition only');
  await page.goto('/');
  const text = (await page.locator('header, footer').allInnerTexts()).join(' ');
  expect(text).not.toMatch(/rugby|golf|racing|motorsport|grand prix|corporate|hospitality/i);
});

test('sample events are labelled and kept out of search', async ({ page, request }) => {
  await page.goto(`/events/${sampleEvent}`);
  await expect(page.getByText('Sample', { exact: true }).first()).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('script[type="application/ld+json"]', { hasText: '"Event"' })).toHaveCount(0);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).not.toContain(`/events/${sampleEvent}`);
});

test('no page scrolls sideways and the hero badge stays on screen', async ({ page }) => {
  const paths = isKids ? ['/', '/events', '/events/training-camp-barcelona', '/clubs-and-academies', '/quote'] : ['/', '/events', '/events/cheltenham-festival', '/sports/rugby', '/quote'];
  for (const path of paths) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
  }
  await page.goto('/');
  const badge = await page.locator('.hero-badge img').filter({ visible: true }).boundingBox();
  const width = page.viewportSize()!.width;
  expect(badge!.x).toBeGreaterThanOrEqual(0);
  expect(badge!.x + badge!.width).toBeLessThanOrEqual(width);
});

test('phone and tablet: More opens the menu sheet, which closes on Escape and on navigating', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'The dock is for phones and tablets');
  await page.goto('/');
  const sheet = page.getByRole('dialog', { name: 'Site menu' });
  await expect(sheet).toBeHidden();
  await page.getByRole('button', { name: 'More' }).click();
  await expect(sheet).toBeVisible();
  await expect(sheet.getByRole('link', { name: isKids ? /Schools/ : /Group travel/ })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await page.getByRole('button', { name: 'More' }).click();
  await sheet.getByRole('link', { name: /FAQs/ }).click();
  await expect(page).toHaveURL(/\/faqs$/);
  await expect(sheet).toBeHidden();
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
