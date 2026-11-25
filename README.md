# Tier One Sports Events

Website for Tier One Sports Events: sports travel for supporters, families, clubs and corporate groups from Ireland and the UK.
Live at https://www.tieronesportsevents.com.

**Phase 1** (this release): a content-led site with events, sports, group, corporate and bespoke travel, information pages, draft legal pages and an enquiry/quote form. No bookings, payments or accounts.

Full project documentation (architecture, decisions, security, costs, data, roadmap, open decisions, handover): [docs/PROJECT.md](docs/PROJECT.md). Changes: [CHANGELOG.md](CHANGELOG.md).

## Stack

Next.js 15 (App Router, React 19, TypeScript, Tailwind) on Cloudflare Workers via OpenNext. Every page is pre-rendered; only `/api/contact` runs code. Enquiries use Cloudflare Turnstile and Cloudflare Email Sending to `info@` (Zoho).

## Where things live

| What | Where |
| --- | --- |
| Logo files, icons | `public/brand/` (originals in `docs/brand-pack/`) |
| Brand name, logo paths, tagline | `brand/brand.ts` |
| Colours, fonts, radius | `brand/tokens.css` (Tailwind reads these) |
| Domain, contact email, enquiry switch, sample labels | `lib/site.ts` |
| Events | `content/events.ts` |
| Sports, services, FAQs, home copy | `content/*.ts` |
| Photos | add WebP files to `public/photos/` and set `photo` on the event, sport or service |

### Rebrand without a redesign

1. Replace the files in `public/brand/` (keep the names, or update the paths in `brand/brand.ts`).
2. Change colour values in `brand/tokens.css` and `themeColor` in `brand/brand.ts`.
3. Change fonts in `app/layout.tsx` (two `next/font` lines).

### Add or edit an event

Edit `content/events.ts`. Each event has venue, dates, package, accommodation, transport, inclusions, exclusions, availability and notices.
Set `sample: false` and `verified: true` only once every fact is confirmed. A confirmed `date.start` also turns on search-engine event data.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint, typecheck, build, Playwright tests (desktop + mobile, incl. accessibility)
```

Locally the tests use your installed Google Chrome; CI installs Chromium.

## Deploy

The repo folder is bound to Tier One's own Cloudflare account (wrangler profile `tierone`).

```bash
npx opennextjs-cloudflare build
npx opennextjs-cloudflare upload   # preview version, not live
npx wrangler deploy                # live
```

Worker secrets: `TURNSTILE_SECRET`, `CONTACT_FORM_TO`. Public Turnstile site key: `.env.production`.
