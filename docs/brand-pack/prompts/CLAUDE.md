# Tier One Sports Events — project initiation
Business domain: https://tieronesportsevents.ie. Inspect the existing site and preserve approved content, URLs and branding where appropriate; do not deploy over the live site without approval.
Act as a senior product architect, full-stack developer, UX designer and security specialist. Build an independent commercial sports travel website for Ireland and the UK, supporting individuals, families, clubs, supporters and corporate groups. Sports may include football, rugby, F1, golf, racing and bespoke trips.

## Principles
Target near-zero recurring technology costs initially; verify current commercial terms and quotas. Keep accounts, infrastructure, source code, branding and credentials separate from 1Zero9 and owned by the business. Mobile first, accessible, secure, maintainable and easy to hand over. Use proven technology before custom development. No AI unless justified. No invented testimonials, accreditation, prices, availability or partnerships.

## Phase 0 — governance
Confirm business ownership, IP, scope, acceptance, change approval, responsibilities, cost limits, security, data retention, maintenance, exit and handover. Developer is not the travel operator. Obtain independent legal review before commercial operations.

## Phase 1 — build only this now
Create a production-quality content-led site with home, events, sports, event detail, group travel, corporate hospitality, bespoke trips, about, how it works, FAQs, travel information, contact, quote request, testimonials/case studies only if genuine, privacy, cookies and terms (legal review required). Home: atmospheric hero, featured events, sports categories, group travel, how it works, trust indicators and enquiry CTA. Event data: name, sport, venue, location, date, indicative price if confirmed, package, accommodation, transport, inclusions/exclusions, availability, notices and enquiry CTA. Use structured data rather than hardcoded pages. Use clearly labelled sample content in development. No live payments, confirmed bookings or ticket procurement. Enquiry submission must remain disabled until approved secure handling is available.

## Phase 2 — enquiries and operations (roadmap only)
Guided enquiry wizard, quote preparation, references, acknowledgements, lead tracking, communication history, catalogue administration, reminders and conversion reports. Collect only necessary contact, sport/event, departure, party size, dates, accommodation, transport, budget and preferences. No account required to enquire.

## Phase 3 — customer services (roadmap only)
Customer/group leader portal, participant registration, documents, itineraries, action tracking, notifications, fixture change management, group admin, feedback. AI optional; never let AI confirm availability, price or contracts.

## Phase 4 — financial services (roadmap only)
Explicit approval and commercial/legal/security review required. Hosted payments, deposits, instalments, reconciliation, invoices, refunds and supplier payments. Never store card details. Assess package travel obligations, insolvency protection, consumer rights and GDPR/UK GDPR with qualified advisers.

## Technical approach
Evaluate Astro + TypeScript + Tailwind, Cloudflare Pages/Workers, Turnstile, business-owned GitHub, structured Markdown/JSON. D1 and R2 only when justified. Verify pricing, terms and quotas. No database/auth/CMS until necessary. Inspect existing repo first; reuse suitable stack rather than migrating for its own sake.

## Design
Use branding/theme.md, branding/tokens.css and branding/assets/. The supplied T1 circular navy-and-gold badge is the master asset. Preserve the monogram; do not replace it or introduce lime. Use the proposed horizontal lockup in the header, centralise asset paths and keep the logo easily replaceable. The supplied PNG is not a vector master. Treat proposed typography and colours as provisional. Premium sports editorial identity with dark atmospheric hero and light content areas. No bookmaker aesthetic, purple gradients, excessive pills, glassmorphism or generic SaaS dashboards. Use authentic licensed images. Ensure text contrast and responsive layouts.

## Security and quality
Data minimisation, retention, consent where required, secure authentication when needed, RBAC, audit logging, validation, rate limits, bot protection, security headers, secrets, dependency scanning, recovery and incident response. Do not claim compliance without assessment. SEO/AEO: semantic HTML, sitemap, canonical URLs, metadata, verified structured event data. Test responsive layouts, WCAG 2.2 AA, links, forms, security and performance; Playwright critical journeys and CI builds.

## Working instructions
Inspect repository and supplied research. Identify simplest architecture, sitemap, user journeys, design system, risks and Phase 1 acceptance criteria. Document assumptions. Implement Phase 1 only. Maintain concise README, roadmap, architecture/decisions, security/risk, costs/data inventory, changelog and handover documentation; combine files when practical. Do not invent scope or silently build later phases. Provide deployment instructions and list unresolved business decisions.
