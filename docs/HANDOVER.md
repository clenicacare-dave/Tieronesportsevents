# Developer handover

Everything a new developer needs to run, change, release and support the Tier One Sports Events website.
Read this first, then `README.md` (quick reference) and `docs/PROJECT.md` (scope, decisions, risks, roadmap).

State at handover: **v0.6.0, 26 November 2026.** The site is built and deployed but **not public**: visitors see a
holding page, and the full site opens only through a private link (section 6). Legal pages and company details
are drafts awaiting the business's sign-off (`docs/SIGN-OFF.md`). Events are samples, clearly labelled.

---

## 1. What the site is

> **Two editions, one codebase.** `lib/edition.ts` picks which site is built. The default, **kids football**,
> is what Tier One can sell now: youth football trips for clubs and academies, schools and families. The
> **full** edition (every sport, corporate hospitality, bespoke trips) is kept intact for later. See section 5.

A content-led brochure site for an Irish sports-travel company: events, sports, group, corporate and bespoke
travel, information and legal pages, and one enquiry/quote form that emails `info@`. No bookings, payments,
accounts or database. Every page is pre-rendered at build time; the only code that runs per request is the
pre-launch gate (`middleware.ts`) and the form handler (`app/api/contact/route.ts`).

| | |
| --- | --- |
| Live domain | https://www.tieronesportsevents.com (bare domain redirects to www; .com only, there is no .ie) |
| Repository | GitHub `clenicacare-dave/Tieronesportsevents`, default branch `main` |
| Hosting | Cloudflare Workers via OpenNext, Worker name `tieronesportsevents` |
| Stack | Next.js 15 (App Router), React 19, TypeScript, Tailwind 3, Playwright + axe |
| Mail | Zoho Mail Free hosts `info@`; the form sends through Cloudflare Email Sending |
| Owner | Tier One Sports Events (company registered in Ireland); business contact Dave |

## 2. Accounts and access

All accounts belong to the business. Ask the owner to add you; do not use anyone else's login.

| Service | What it holds | Access needed for |
| --- | --- | --- |
| Cloudflare, account `017c00b8853e00499d11447187100220` (dave@tieronesportsevents.com) | Worker, DNS zone, Turnstile widget, Email Sending, secrets | Deploying, secrets, DNS |
| GitHub `clenicacare-dave/Tieronesportsevents` | Code, pull requests, CI | Everything |
| Blacknight | Domain registration (nameservers point to Cloudflare) | Renewal only |
| Zoho Mail | The `info@` mailbox where enquiries land | Checking the form end to end |

Ask for a Cloudflare member invite (Administrator, or at least Workers and DNS edit) rather than sharing a login.
Then log wrangler in with `npx wrangler login` from inside the repo folder.

> **Gotcha:** run wrangler only from the repo folder. Running it from your home directory creates `~/.wrangler`,
> which can hide the right login and give "Not logged in" errors. Delete that stray folder if it appears.

## 3. Local setup

Requirements: Node 22 (CI uses 22), npm, Google Chrome (local tests use the installed Chrome).

```bash
npm install
npm run dev          # http://localhost:3000 (no gate locally)
npm run check        # lint, typecheck, build, then Playwright on desktop, phone and tablet, incl. accessibility
```

- `npm test` runs against `next start` on port 3100 and needs a build first (`npm run build`).
- Locally there is no gate, no Turnstile secret and no email binding, so submitting the form returns
  "Email service not configured". Test the form on a preview deployment (section 7).
- After moving or renaming route folders, delete `.next` before `tsc`; stale generated types cause false errors.

## 4. Repository map

```
app/
  layout.tsx               Root: <html>, fonts (self-hosted via next/font), site metadata. No chrome.
  (site)/                  The full site. Its layout.tsx adds header, footer, phone dock, JSON-LD.
    page.tsx               Home
    events/, sports/       Lists and [slug] detail pages (generateStaticParams)
    group-travel/ corporate-hospitality/ bespoke-trips/    Service pages (components/ServicePage.tsx)
    about/ how-it-works/ faqs/ travel-information/ contact/ quote/
    privacy/ cookies/ terms/ booking-conditions/           Draft legal pages (components/LegalPage.tsx)
  (holding)/coming-soon/   Holding page shown to the public while gated. No chrome.
  not-found.tsx            404 (brings its own chrome, as it sits outside (site))
  api/contact/route.ts     Form handler: Turnstile, honeypot, rate limit, validation, email
  robots.ts sitemap.ts manifest.ts
middleware.ts              Pre-launch gate (section 6)
brand/brand.ts             Brand name, lockup text, logo and icon paths, theme colour
brand/tokens.css           Colours, radius, fonts as CSS variables (Tailwind reads them)
content/                   All copy and data, typed: events, sports, services, faqs, home, photos, types
lib/site.ts                Domain, email, regions, company details, enquiry switch, sample labels
lib/nav.ts                 Header, footer and dock navigation
components/                UI (see section 5)
public/brand/              Logo badge and icons (originals in docs/brand-pack/)
public/photos/             Photos as WebP (2000px and -sm 960px versions)
public/video/              Intro film (1080p and 720p MP4, poster)
tests/                     edition-aware: site.spec.ts (pages, journeys, SEO, headers), a11y.spec.ts (axe), gate.spec.ts, intro.spec.ts
docs/                      This file, PROJECT.md, SIGN-OFF.md, DNS-MIGRATION.md, brand-pack/
wrangler.jsonc             Worker config: account, routes, Email binding, vars
open-next.config.ts        Static-assets incremental cache (see gotchas)
next.config.mjs            Security headers / CSP, www redirect, legacy redirects
```

## 5. How the pieces work

### Editions

`lib/edition.ts` reads `NEXT_PUBLIC_SITE_EDITION` at build time: unset (default) builds **kids football**;
`full` builds the multi-sport site. Build the full edition with
`NEXT_PUBLIC_SITE_EDITION=full npx opennextjs-cloudflare build` (and set the same variable when running the
tests, so they test the edition you built).

| | Kids football (default) | Full |
| --- | --- | --- |
| Home | `components/KidsHome.tsx` | `FullHome` in `app/(site)/page.tsx` |
| Trips / events | `content/kids/trips.ts` (list called "Trips", URL `/events`) | `fullEvents` in `content/events.ts` |
| Audience / service pages | `/clubs-and-academies`, `/schools`, `/families` (`content/kids/audiences.ts`) | `/group-travel`, `/corporate-hospitality`, `/bespoke-trips` |
| Sports pages | none (404) | `/sports`, `/sports/[slug]` |
| FAQs | `content/kids/faqs.ts` | `fullFaqs` in `content/faqs.ts` |
| Navigation, footer, dock | kids lists in `lib/nav.ts` | full lists in `lib/nav.ts` |
| Quote form options | kids trips and audiences; kids group types | all events, sports and trip types |

Pages outside the active edition return 404 and are left out of the sitemap, navigation and forms. Shared
pages (About, How it works, Quote, legal, holding page, metadata) switch their copy with `isKids`. Legal
pages are the same in both editions.

### Content

Everything a visitor reads lives in `content/*.ts` or the page file, typed in `content/types.ts`, so a
missing field fails the build.

- **Events** (`content/events.ts`): venue, dates, package, accommodation, transport, inclusions, exclusions,
  availability, notices. `sample: true` shows a "Sample" label, sets `noindex`, keeps the event out of the
  sitemap and withholds schema.org Event data. Set `sample: false` and `verified: true` only when every fact
  is confirmed by the business. Never invent prices, availability or testimonials.
- **Photos** (`content/photos.ts`): each entry records file, alt text, source/licence and optional
  `position` (CSS object-position for cropping). Pages refer to photos by key. Add files to `public/photos/`
  as WebP: a full-size (about 2000px) and a `-sm` (about 960px) version.
- **Company details** (`site.company` in `lib/site.ts`): registered name, CRO number, registered office, VAT,
  travel licence. While `null`, pages show `[placeholders]` via `company()`; once name, number and office are
  set, the footer shows them (an Irish company-law requirement).
- **Switches** in `lib/site.ts`: `enquiriesEnabled` (forms on/off; off shows the email address instead),
  `showSampleLabels`.

### Brand and visual system

- Rebrand without redesign: files in `public/brand/`, colours in `brand/tokens.css`, fonts in `app/layout.tsx`.
- Shared CSS classes in `app/globals.css`: buttons (`btn-gold`, `btn-outline`, `btn-navy`), `input`,
  `nav-link` (header links), `glass*` (phone dock and menu sheet), `reveal` (panels rise in on scroll).
- **Gold ring motif** (the badge's rings, used to break up flat areas). Keep it subtle; the owner asked for
  restraint.
  - `photo-rings` / `photo-rings-sm`: ring overlay on photos (`PhotoSlot` adds it; sport tiles add the small one above their shading).
  - `motif-soft`: rings on navy bands. `ring-corner` (+ `ring-gold` on navy): faint rings in one corner of a
    plain section, alternating corners section by section. `Section` in `components/ui.tsx` applies it.
  - `components/HeroRings.tsx`: animated rings on one `<canvas>` (home hero and holding page). Centred on the
    element marked `data-ring-centre`. Do not go back to CSS animation for this: animating ring size or a
    gradient repainted the whole hero every frame and ran at about 10fps. Draws nothing for reduced motion.
- **Navigation:** full header nav from 1280px wide (`SiteHeader`); below that, a glass dock at the bottom
  (`MobileDock`: Home, Events, Sports, Quote, More) and the date and time in the header (`HeaderClock`).

### Intro film

`components/IntroFilm.tsx` shows "The Journey to the Game" (39s). On a visitor's first visit to the home page
or the holding page, the film opens one second after the page loads, centred and large (up to 1080px wide) over
a dimmed page, muted until the visitor turns sound on. When it ends it shrinks into a small player in the bottom
corner (above the phone dock on site pages), resting on the closing badge frame, and is stored as seen
(`t1-intro-seen` in localStorage); play or expand there brings it back to the centre. Shrink, Escape or a click
outside sends it to the corner early; Full screen and Close are in its control bar. "Watch the film" (home
hero, holding page) opens it centred at any time. It never autoplays for reduced-motion visitors. While it
plays, `HeroRings` draws at half rate (a `t1:film` window event) so slower devices can keep up.

Files in `public/video/`: `intro-1080.mp4` (H.264, about 4.2 Mbps, 21 MB) on screens 1100px and wider, and `intro-720.mp4`
(about 2.2 Mbps, 11 MB) for smaller screens and data saver; `intro-poster.jpg` is the first frame. The original
master is not in the repo (`uploads/` is git-ignored). Keep every file under the Workers static-asset limit of
25 MiB. To replace the film, encode H.264 + AAC MP4s at those sizes (ffmpeg, HandBrake or any encoder), keep
the file names, and re-run the tests. Tests start with the film marked as seen; `tests/intro.spec.ts` covers
the first visit.

### Enquiry form

`components/EnquiryForm.tsx` posts JSON to `/api/contact`, which checks, in order: the gate cookie (via the
middleware, when gated), the honeypot, a 20-second per-IP rate limit (in memory, per Worker instance, best
effort), Turnstile server-side, required fields and length limits. It then emails `CONTACT_FORM_TO` from
`CONTACT_FORM_FROM` through the `EMAIL` binding. Nothing is stored by the site. `/quote?event=<event or sport slug>` and
`/quote?type=<service slug>` pre-select the form. If `TURNSTILE_SECRET` is unset the Turnstile check is skipped,
so keep it set in production.

On the Cloudflare **free** plan Email Sending only reaches verified addresses: the enquiry reaches `info@`, but
the customer's acknowledgement email fails quietly (logged). Upgrading to Workers Paid fixes it; that is a
business decision (PROJECT.md section 6).

### Configuration and secrets

| Name | Kind | Where set | Purpose |
| --- | --- | --- | --- |
| `SITE_GATE` | var | `wrangler.jsonc` | `"on"` shows the holding page to the public; `"off"` opens the site |
| `CONTACT_FORM_FROM` | var | `wrangler.jsonc` | Sender, on the `mail.` subdomain |
| `PREVIEW_TOKEN` | secret | `npx wrangler secret put PREVIEW_TOKEN` | Private link token (32 chars) |
| `TURNSTILE_SECRET` | secret | `npx wrangler secret put TURNSTILE_SECRET` | Turnstile server key |
| `CONTACT_FORM_TO` | secret | `npx wrangler secret put CONTACT_FORM_TO` | Inbox that receives enquiries |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | `.env.production` (committed) | Turnstile site key, inlined at build |
| `EMAIL` | binding | `wrangler.jsonc` `send_email` | Cloudflare Email Sending |

Secrets are never in the repo. `npx wrangler secret list` shows names only. A local copy of the preview
token, if you need one for tests, goes in the git-ignored `.preview-token` file.

### Security headers

`next.config.mjs` sets CSP (self plus `challenges.cloudflare.com` for Turnstile), HSTS, `X-Frame-Options: DENY`,
nosniff, referrer and permissions policies. If you add any third-party script, image or font host, add it to
the CSP or it will be blocked.

## 6. The pre-launch gate

While `SITE_GATE` is `"on"`:

- Every address shows the holding page (`/coming-soon`), with `X-Robots-Tag: noindex`.
- `robots.txt` disallows everything; `/sitemap.xml` and `/api/*` return 404.
- Opening `https://www.tieronesportsevents.com/preview/<PREVIEW_TOKEN>` sets an HttpOnly cookie (`t1_preview`,
  90 days) and redirects to the home page; that browser then sees the full site, still `noindex`.
- If `PREVIEW_TOKEN` is missing or shorter than 16 characters, nobody gets in (fails closed).
- Static files (photos, brand, `/_next/`) are served before the Worker and are not gated. They are not secret.

Runbook:

- **Launch:** set `"SITE_GATE": "off"` in `wrangler.jsonc`, release as normal (section 7), then confirm the
  home page, `robots.txt` and `sitemap.xml` live. Only on the owner's say-so, after `docs/SIGN-OFF.md` is done.
- **New private link** (old one leaked): `openssl rand -base64 24 | tr '+/' '-_' | tr -d '=\n' > .preview-token`,
  then `npx wrangler secret put PREVIEW_TOKEN < .preview-token`. Takes effect at once; old cookies stop working.
- **Gate again after launch:** set it back to `"on"` and deploy.

## 7. Testing and releasing

### Tests

```bash
npm run check                                   # local: lint, typecheck, build, tests
BASE_URL=<url> PREVIEW_TOKEN=$(cat .preview-token) npm test             # against a deployment (gated)
EXPECT_GATE=1 BASE_URL=<url> PREVIEW_TOKEN=$(cat .preview-token) npm test   # also run the gate checks
```

With `PREVIEW_TOKEN` set, the Playwright config gives the browser the gate cookie. Once the gate is off, drop
`PREVIEW_TOKEN` and `EXPECT_GATE`. Remote runs occasionally fail on network hiccups (ECONNREFUSED, a slow axe
run); re-run with `npx playwright test --last-failed` before treating a failure as real.

### Release flow (how every version so far was shipped)

1. Branch from `main` (`feat/…`, `fix/…`, `docs/…`), commit as you go.
2. Run `npm run check`.
3. Upload a preview and test it, including the form:
   ```bash
   npx opennextjs-cloudflare build
   npx opennextjs-cloudflare upload        # prints a version URL like https://<id>-tieronesportsevents.<sub>.workers.dev
   ```
   Preview versions use the live secrets and vars, so they are gated too; open `/preview/<token>` on the preview host.
4. Bump `version` in `package.json` and add a `CHANGELOG.md` entry (semver: content and styling fixes are patch,
   features minor).
5. Push, open a pull request, wait for CI (`.github/workflows/ci.yml`: lint, typecheck, build, tests), merge.
6. From an up-to-date `main`: `npx opennextjs-cloudflare build && npx wrangler deploy`.
7. Run the tests against https://www.tieronesportsevents.com.

Always deploy from `main` after merging, so live matches the repository.

### Rollback

`npx wrangler deployments list` shows recent versions; `npx wrangler rollback <version-id>` restores one
instantly (also in the dashboard: Workers & Pages → tieronesportsevents → Deployments). Then fix forward on a
branch and revert the merge on `main` so the repository matches live.

## 8. DNS and email

DNS is on Cloudflare; the domain is registered at Blacknight.

- **Do not change** the Zoho records at the apex (MX `mx.zoho.eu`, `mx2`, `mx3`; SPF `include:zohomail.eu`;
  `zmail._domainkey` DKIM; Zoho verification TXT) or `info@` stops receiving mail.
- Cloudflare Email Sending uses the `mail.tieronesportsevents.com` subdomain, so it never touches Zoho's records.
- `www` and the bare domain are Worker custom domains (`routes` in `wrangler.jsonc`); Cloudflare manages their
  records and certificates.
- `docs/DNS-MIGRATION.md` is the record set captured when DNS moved from Blacknight on 24 Nov 2026. It includes
  old Vercel and Resend entries that are history, not current requirements; check the live zone in the dashboard.
- The site previously ran on Vercel. That project, the old 1Zero9 Worker, its Turnstile widget and the
  reCAPTCHA key were all deleted on 26 Nov 2026.

## 9. Gotchas learned the hard way

- **OpenNext and dynamic routes:** pre-rendered `[slug]` pages 404 in production without an incremental cache.
  `open-next.config.ts` uses the free static-assets cache. `next start` does not catch this; always test a
  deployed preview.
- **No paid Cloudflare extras:** images are served unoptimised (`images.unoptimized`), so add photos pre-sized as
  WebP. No R2, KV, D1 or Images bindings are used. Keep it that way unless the owner agrees to a cost.
- **Wrangler from the wrong folder** (section 2).
- **Stale `.next` types** after moving routes (section 3).
- **Turnstile and `networkidle`:** pages with the form never go network-idle; in Playwright wait for `load`.
- **Lazy images** in full-page screenshots appear blank unless you scroll first.
- **Animation performance:** prefer canvas or transform/opacity animations; never animate size or large
  gradients (see HeroRings).
- **Free plan email limit** (section 5).

## 10. Open items at handover

- Business sign-off on legal pages, About and FAQs: every `[bracket]` is listed in `docs/SIGN-OFF.md`. Fill
  `site.company` once confirmed. Independent legal review is needed before trading (booking conditions in
  particular: Package Holidays Act 2019, CAR licence and bonding).
- Real events to replace the samples (who confirms facts and prices).
- Decisions in `docs/PROJECT.md` section 6: acknowledgement email (Workers Paid or not), photography, governance.
- Launch: switch the gate off (section 6).
- Manual accessibility pass with keyboard and a screen reader (automated axe checks pass).
- Desktop home hero: the T1 badge sits over the winger and ball in the hero photo; move the badge or recrop if
  the owner wants.
- Maintenance: `npm audit` lists advisories in build-time tools only (ESLint 8, Tailwind 3); upgrade to ESLint 9
  and Tailwind 4 as a separate change.
