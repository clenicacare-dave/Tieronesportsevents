# Changelog

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
