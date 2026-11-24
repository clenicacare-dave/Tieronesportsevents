# Tier One Sports Events

Next.js App Router site on Cloudflare Workers. The contact form is protected by Cloudflare Turnstile and emails enquiries through Cloudflare Email Service.

## Tech stack

- [Next.js 14 App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Cloudflare Workers (via OpenNext), Email Service and Turnstile

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. The landing page lives at `/` and the contact form is available at `/contact`.

## Environment variables

Create `.env.local` (Next.js will auto-load it) and set:

- `CONTACT_FORM_TO` - Target address for new enquiries.
- `CONTACT_FORM_FROM` - Sender on the onboarded Email Service domain (set in `wrangler.jsonc`).

`CONTACT_FORM_TO` and `TURNSTILE_SECRET` are secrets on the Worker `tieronesportsevents`. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is public and lives in `.env.production`.

## Deployment

```bash
npm run build
npm start
```

Hosted on Cloudflare Workers via OpenNext. `npm run deploy` builds and deploys; `npm run preview` runs the Worker locally.

## How to test the email flow

1. Run `npm install`.
2. Use `npm run preview` (the email binding only exists on Cloudflare).
3. Start the dev server with `npm run dev`, open `http://localhost:3000/contact`, and submit the form (consent checkbox must be ticked).
4. Confirm two emails arrive: the internal notification at `CONTACT_FORM_TO` and the customer confirmation at the address you entered.
5. In production on Vercel, repeat the submission and verify the same flow through the destination inbox.
