# Changelog

## 0.5.2 — Header (2026-11-26)

- Menu in the logo's lettering, gold rule on hover and for the current page, divider before Request a quote; compact glass header on scroll; gold hairline underneath.

## 0.5.1 — Calmer rings (2026-11-26)

- Desktop hero rings: slower (24s per ring), start just outside the badge and fade in; no static rings behind.
- Gold rings on every photo, including sport tiles (now above the shading); a faint corner ring set breaks up plain sections and the footer. Kept subtle.

## 0.5.0 — Legal drafts and new hero (2026-11-26)

- Privacy notice, cookies and terms rewritten for an Irish registered company; new booking conditions draft (noindex until signed off).
- About and FAQs expanded; open points in [brackets], listed in `docs/SIGN-OFF.md`.
- Company details in one place (`site.company`); footer shows registration once filled.
- Home hero: supplied winger photo. Domain is .com only.

## 0.4.1 — Smooth hero rings (2026-11-26)

- Hero rings drawn on one canvas: 60fps instead of about 10, crisp lines, no shimmer; pause off screen; off for reduced motion.

## 0.4.0 — Motion and mobile dock (2026-11-26)

- Home hero: stadium photo layered under a navy-and-gold wash; T1 badge floats over it with a slow light sweep.
- Gold rings: on desktop they leave the badge fast and slow as they spread; on phones a steady ripple. Ring overlay on every photo.
- Phones and tablets: the badge straddles the hero edge; date and time in the header; a glass dock (Home, Events, Sports, Quote, More) with a three-quarter menu sheet (pattern from Swords Village).
- Panels rise into view on scroll and lift on hover; sport tiles get Explore and Quote buttons (Quote pre-selects the sport).
- Sport tiles swipe sideways on phones; full header nav from 1280px.
- Everything respects reduced motion; accessibility checks run on the finished state.

## 0.3.0 — Photography (2026-11-25)

- 11 free Unsplash photos (hero, five sports, three services, two events), credited, with sources in `content/photos.ts`.
- Card-sized 960px versions for listings; full-size 2000–2400px for heroes. All WebP, 14–281 KB.
- Sport pages get photo headers; events fall back to their sport's photo.

## 0.2.1 — Fix event and sport pages on Cloudflare (2026-11-25)

- Pre-rendered event and sport pages returned 404 on Workers: OpenNext now serves pre-built pages from static assets (no R2 or KV).
- TypeScript module resolution set to `bundler`.
- Tests can run against a deployed URL: `BASE_URL=https://… npm test`.

## 0.2.0 — Phase 1 website (2026-11-25)

- New site from the Tier One starter pack: navy-and-gold design system, supplied T1 badge unchanged.
- Pages: home, events, event detail, sports, sport detail, group travel, corporate hospitality, bespoke trips, about, how it works, FAQs, travel information, contact, request a quote, privacy, cookies, terms, 404.
- Events, sports, services and FAQs are structured content in `content/`; six clearly labelled sample events.
- Brand centralised: `brand/brand.ts`, `brand/tokens.css`, `public/brand/`.
- Quote request form (event, group type, party size, dates, departure point) alongside the contact form; server-side length limits; enquiry on/off switch.
- SEO: per-page titles, descriptions and canonical URLs, sitemap, robots, manifest, organisation structured data; sample events are noindex and excluded from the sitemap.
- Security headers (CSP, HSTS, frame, referrer, permissions).
- Playwright tests (desktop and mobile) including automated WCAG 2.2 AA checks; GitHub Actions CI.
- Header badge reduced from 3.3 MB to 4 KB.

## 0.1.1 — Own Cloudflare account (2026-11-25)

- Moved to Tier One's own Cloudflare account; enquiry email first, customer acknowledgement best-effort.

## 0.1.0 — Cloudflare (2026-11-24)

- Moved from Vercel to Cloudflare Workers; Resend and reCAPTCHA replaced by Cloudflare Email Sending and Turnstile.
