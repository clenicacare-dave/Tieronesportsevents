// Site-wide settings. Change the domain here only.

export const site = {
  // The live domain (the company uses .com only).
  url: 'https://www.tieronesportsevents.com',
  locale: 'en_IE',
  email: 'info@tieronesportsevents.com',
  regions: 'Ireland and the UK',

  // The company behind the site: an Irish registered company. Fill these in once Dave confirms them;
  // they flow into the footer, About, privacy notice and terms. Irish company law requires the
  // registered name, number and office on the website. While null, pages show [to confirm].
  company: {
    legalName: null as string | null, // e.g. 'Tier One Sports Events Limited'
    croNumber: null as string | null, // Companies Registration Office number
    registeredOffice: null as string | null, // full postal address
    vatNumber: null as string | null, // only if registered for VAT
    travelLicence: null as string | null // Commission for Aviation Regulation licence or bond, if held
  },

  // Enquiry form switch. On: the form sends to info@ via Cloudflare Email Sending, with
  // Turnstile, a honeypot and a rate limit. Off: forms show the email address instead.
  enquiriesEnabled: true,

  // While true, events and copy marked as sample show a visible "Sample" label,
  // and event structured data (schema.org Event) is withheld.
  showSampleLabels: true
} as const;

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();

// A company detail, or a visible placeholder until it is confirmed.
const companyLabels: Record<keyof typeof site.company, string> = {
  legalName: 'registered company name',
  croNumber: 'CRO number',
  registeredOffice: 'registered office address',
  vatNumber: 'VAT number, if registered',
  travelLicence: 'travel licence or bonding details'
};
export const company = (k: keyof typeof site.company) => site.company[k] ?? `[${companyLabels[k]}]`;
export const companyConfirmed = Boolean(site.company.legalName && site.company.croNumber && site.company.registeredOffice);
