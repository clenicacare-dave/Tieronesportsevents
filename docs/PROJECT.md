# Tier One Sports Events: project documentation

One file for roadmap, architecture and decisions, security and risk, costs and data, open decisions and handover.
Brief: `docs/brand-pack/prompts/CLAUDE.md`. Brand pack: `docs/brand-pack/`.

## 1. Scope: Phase 1 (built)

### Sitemap

| Path | Purpose |
| --- | --- |
| `/` | Hero, sports, featured events, group travel, how it works, trust, enquiry call to action |
| `/events`, `/events/[slug]` | Event list and detail (venue, dates, package, accommodation, transport, inclusions, exclusions, availability, notices, enquiry) |
| `/sports`, `/sports/[slug]` | Football, rugby, motorsport, golf, racing, each with its events |
| `/group-travel`, `/corporate-hospitality`, `/bespoke-trips` | Service pages from `content/services.ts` |
| `/about`, `/how-it-works`, `/faqs`, `/travel-information` | Information |
| `/contact`, `/quote` | Contact form and quote request (`/quote?event=slug` pre-selects the event) |
| `/privacy`, `/cookies`, `/terms`, `/booking-conditions` | Draft legal pages, marked for legal review (booking conditions noindex until signed off) |
| `/coming-soon` | Holding page the public sees while the site is gated (`middleware.ts`, `SITE_GATE`) |

Testimonials and case studies are left out: none are genuine yet.

### Main journeys

1. **Browse to enquiry:** home → event (or sport → event) → "Enquire about this trip" → quote form pre-filled → sent to info@.
2. **Group organiser:** home → group travel → request a quote with group type and size.
3. **Corporate:** corporate hospitality → request a quote.
4. **Idea not listed:** bespoke trips or "Not listed? Ask us" → quote with "Something else".

### Acceptance criteria (Phase 1)

| Criterion | Status |
| --- | --- |
| All pages above render on mobile and desktop | Automated (Playwright, Pixel 7 and 1366px) |
| One `h1`, title and canonical URL on every page | Automated |
| No automatically detectable WCAG 2.2 A/AA violations | Automated (axe); manual keyboard and screen-reader pass still to do |
| Event → quote journey pre-fills the event | Automated |
| Sample content visibly labelled, noindex, out of sitemap, no event structured data | Automated |
| Security headers on every response | Automated |
| Enquiry reaches info@ | Verified live on 25 Nov 2026 (previous form); re-test after deploy |
| No invented prices, availability, testimonials or accreditation | Content review: prices absent, availability "Enquire", promises are process commitments only |
| Logo, colours and fonts replaceable without redesign | `brand/`, `public/brand/`, `app/layout.tsx` |

### Assumptions

- The domain is **www.tieronesportsevents.com** (deployed, gated behind a holding page until launch), and the company uses .com only (confirmed 26 Nov 2026).
- Tier One is a company registered in Ireland. Its registered name, CRO number, registered office, VAT number and travel licence live in one place, `site.company` in `lib/site.ts`; while blank, pages show [placeholders] and the footer shows the brand name only. Irish company law requires the name, number and office on the website.
- **Enquiries stay on.** The brief says to keep submission disabled until secure handling is approved; the existing form (Turnstile, honeypot, rate limit, consent, length limits, sent only to info@ and stored nowhere else) was already live and approved by the business. `site.enquiriesEnabled` turns it off in one line.
- The supplied HTML prototype was used as a reference only; the site stays on the existing Next.js/React codebase (the brief prefers reusing a suitable stack over migrating).
- Sample events use real event names and venues for realism, but are labelled and state that they are not available packages.

## 2. Architecture and decisions

- **Next.js 15 on Cloudflare Workers (OpenNext).** Kept rather than moving to Astro: already deployed and working, the team knows React, and every page is pre-rendered anyway, so the cost and speed are the same as a static site.
- **Content as typed TypeScript in `content/`.** No CMS or database until someone non-technical needs to edit weekly. Typed data catches missing fields at build time.
- **Brand in three places only:** `brand/brand.ts` (names, logo paths), `brand/tokens.css` (colours, radius, fonts as CSS variables Tailwind reads), `public/brand/` (files).
- **Logo lockup is the badge plus live text.** The supplied SVG lockups embed a 300 KB PNG; the header uses a 4 KB WebP badge and text in the brand font. The badge artwork is unchanged.
- **Fonts self-hosted** via `next/font` (Barlow Condensed, Inter; OFL). Downloaded at build time; visitors never contact Google.
- **Images unoptimised by Next** (Cloudflare Images would cost money). Add photos pre-sized as WebP: hero 2400×1000, cards 1200×900.
- **Phone and tablet navigation (below 1280px):** a floating navy-glass dock at the bottom (Home, Events, Sports, Quote, More) and a three-quarter menu sheet behind More, ported from Swords Village (its decision #45). At most four destinations plus More, per the Project OS mobile-shell rule. The Project OS PWA half (install, offline) was not adopted: this is a brochure site, not a task app.
- **No analytics or cookies**, so no consent banner. Cloudflare Web Analytics (cookieless, free) can be added later if wanted.
- **Photography:** 11 free photos from Unsplash (Unsplash License: commercial use, no attribution required; photographers credited on the image). Each photo's source and photographer is listed in `content/photos.ts`. Chosen to avoid crests, sponsors and recognisable players; perimeter advertising is faintly visible in the hero. Events without their own photo use their sport's. Any slot without a photo falls back to the navy-and-gold motif. Replace with commissioned or licensed event photography when budget allows.

## 3. Security and risk

| Control | Where |
| --- | --- |
| Bot protection | Cloudflare Turnstile, verified server-side |
| Spam | Honeypot field, per-IP rate limit (best effort, per Worker instance) |
| Input validation | Required fields, email format, length limits, line breaks stripped from header-bound fields, HTML escaped in emails |
| Data minimisation | Only contact details and trip basics; nothing stored on the site; emails go to info@ only |
| Headers | CSP (self + Turnstile only), HSTS, `X-Frame-Options: DENY`, nosniff, referrer and permissions policies, no `X-Powered-By` |
| Secrets | Worker secrets (`TURNSTILE_SECRET`, `CONTACT_FORM_TO`, `PREVIEW_TOKEN`); none in the repo |
| Pre-launch privacy | Holding page for the public, noindex everywhere, full site only via a private link cookie (fails closed) |
| CI | Lint, typecheck, build, tests on every pull request |

**Known risks**

| Risk | Mitigation / owner |
| --- | --- |
| CSP allows inline scripts (Next.js bootstrap) | Acceptable for a static content site with no user content; nonce-based CSP would force dynamic rendering |
| Rate limit is per Worker instance | Turnstile is the main control; add a Cloudflare rate-limiting rule if abuse appears |
| `npm audit`: 15 advisories in build-time tools (ESLint 8, Tailwind 3 chain) | Not shipped to the Worker. Fix with an ESLint 9 / Tailwind 4 upgrade as its own change |
| Customer acknowledgement email not sent on the free Workers plan | Enquiry still arrives; decision below |
| Legal pages are drafts | Independent legal review before commercial operation |
| No incident response plan | Business to name a contact; Cloudflare dashboard access for two people |

## 4. Costs and data inventory

Verify current terms before relying on these.

| Service | Use | Expected cost |
| --- | --- | --- |
| Cloudflare Workers (Tier One account) | Hosting | Free plan (request quota per day applies) |
| Cloudflare Email Sending | Enquiry email to info@ | Free plan: verified destinations only |
| Cloudflare Turnstile | Bot check | Free |
| Cloudflare DNS | DNS | Free |
| Blacknight | Domain registration | Annual renewal |
| Zoho Mail Free | info@ mailbox | Free |
| GitHub | Code, CI | Free tier (Actions minutes limited on private repos) |

| Personal data | Collected via | Stored | Retention |
| --- | --- | --- | --- |
| Name, email, phone (optional), enquiry details | Contact and quote forms | Zoho mailbox (info@) only | To be decided (privacy notice placeholder) |
| IP address | Turnstile, rate limit | Not stored by the site; Cloudflare processes it | Cloudflare's terms |

## 5. Roadmap (not built)

- **Phase 2, enquiries and operations:** guided enquiry wizard, quote preparation, references, acknowledgements, lead tracking, communication history, catalogue admin, reminders, conversion reports. Likely needs D1 and authentication; justify before adding.
- **Phase 3, customer services:** group-leader portal, participant registration, documents, itineraries, notifications, fixture-change handling, feedback. AI optional, never to confirm availability, price or contracts.
- **Phase 4, financial services:** hosted payments, deposits, instalments, refunds. Requires explicit approval and commercial, legal and security review (package travel, insolvency protection, consumer rights, GDPR). Never store card details.

## 6. Open business decisions

1. **Company details:** registered name, CRO number, registered office, VAT number, travel licence and bonding (fill `site.company`). Drafts of the privacy notice, cookies, terms, booking conditions, About and FAQs were written 26 Nov 2026 for sign-off; see `docs/SIGN-OFF.md`.
2. **Enquiries:** confirm the live form is approved "secure handling", or switch it off until Phase 0 governance is done.
3. **Customer acknowledgement email:** accept none, or upgrade the Cloudflare account to Workers Paid.
4. **Photography:** free Unsplash photos are in place; decide whether to commission or license event-specific photography later.
5. **Real events:** which events, dates, inclusions and prices to publish; who confirms them.
6. **Legal:** entity name, registration, lawful basis, retention period, booking terms, package travel obligations and bonding; independent legal review.
7. **About page:** company details, people and story.
8. **FAQ answers:** confirm drafts; add payment and cancellation answers once policies exist.
9. **Typography and palette:** confirm or replace the provisional choices; request vector logo artwork.
10. **Governance (Phase 0):** ownership, change approval, maintenance, support and exit arrangements.

## 7. Handover

The full developer handover (accounts, setup, architecture, configuration, gate runbook, release flow, rollback,
DNS, gotchas and open items) is in [`docs/HANDOVER.md`](HANDOVER.md).
