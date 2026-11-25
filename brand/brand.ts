// Single source of truth for the Tier One brand.
// To rebrand: replace the files in public/brand/, edit this file and brand/tokens.css.
// No component hard-codes a logo path, colour or font.

export const brand = {
  name: 'Tier One Sports Events',
  shortName: 'Tier One',
  // Lockup text beside the badge. The badge itself is the supplied master artwork (do not redraw it).
  lockup: { line1: 'Tier One', line2: 'Sports Events' },
  tagline: "Don't just watch it. Be there.",
  strapline: 'Sporting experiences. Exceptional destinations. Travel built around you.',
  logo: {
    // Circular T1 badge, derived from docs/brand-pack/branding/assets/badge.png
    badgeSmall: '/brand/badge-96.webp',
    badgeMedium: '/brand/badge-192.webp',
    badgeLarge: '/brand/badge-480.webp',
    alt: 'Tier One Sports Events'
  },
  icons: {
    favicon: '/brand/favicon.ico',
    icon32: '/brand/icon-32.png',
    icon192: '/brand/icon-192.png',
    icon512: '/brand/icon-512.png',
    apple: '/brand/icon-180.png'
  },
  // Used for browser UI (theme-color) and the web manifest. Keep in step with brand/tokens.css.
  themeColor: '#1D2E3F',
  backgroundColor: '#F7F5F0'
} as const;
