// Site-wide settings. Change the domain here only.

export const site = {
  // The live domain. tieronesportsevents.ie is not registered (checked 25 Nov 2026);
  // if it is registered and adopted, change this one value.
  url: 'https://www.tieronesportsevents.com',
  locale: 'en_IE',
  email: 'info@tieronesportsevents.com',
  regions: 'Ireland and the UK',

  // Enquiry form switch. On: the form sends to info@ via Cloudflare Email Sending, with
  // Turnstile, a honeypot and a rate limit. Off: forms show the email address instead.
  enquiriesEnabled: true,

  // While true, events and copy marked as sample show a visible "Sample" label,
  // and event structured data (schema.org Event) is withheld.
  showSampleLabels: true
} as const;

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();
