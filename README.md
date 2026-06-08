# Tier One Sports Events

Next.js App Router site with a contact workflow that posts via Resend and forwards enquiries into Gmail.

## Tech stack

- [Next.js 14 App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Resend](https://resend.com/) for transactional email delivery

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. The landing page lives at `/` and the contact form is available at `/contact`.

## Environment variables

Create `.env.local` (Next.js will auto-load it) and set:

- `RESEND_API_KEY` – API key from your Resend dashboard.
- `CONTACT_FORM_TO` - Target address for new enquiries.
- `CONTACT_FORM_FROM` - Friendly from identity Resend is authorised to send with.

These same variables should be added in Vercel project settings prior to deployment.

## Deployment

```bash
npm run build
npm start
```

Push to GitHub and deploy on Vercel (recommended). Vercel will detect Next.js, run the build, and expose the App Router API route at `/api/contact`.

## How to test the email flow

1. Run `npm install` to ensure the Resend SDK and all web dependencies are present.
2. Set the environment variables above locally (Resend API key plus both contact emails).
3. Start the dev server with `npm run dev`, open `http://localhost:3000/contact`, and submit the form (consent checkbox must be ticked).
4. Confirm two emails arrive: the internal notification at `CONTACT_FORM_TO` and the customer confirmation at the address you entered.
5. In production on Vercel, repeat the submission and verify the same flow through the destination inbox.
