import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { isKids } from '../lib/edition';

// Automated WCAG 2.2 A/AA checks. Not a substitute for a manual audit (keyboard, screen reader).
const pages = [
  '/',
  '/events',
  ...(isKids ? ['/events/youth-tournament-costa-brava', '/clubs-and-academies', '/families'] : ['/events/cheltenham-festival', '/sports/rugby', '/group-travel']),
  '/faqs',
  '/quote',
  '/contact',
  '/privacy'
];

for (const path of pages) {
  test(`${path} has no automatically detectable WCAG A/AA violations`, async ({ page }) => {
    // Check the finished state: scroll-in animations would otherwise be measured half-faded.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .exclude('.cf-turnstile') // third-party widget
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`)).toEqual([]);
  });
}
