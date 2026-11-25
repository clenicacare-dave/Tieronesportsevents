export type EnquiryKind = 'contact' | 'quote';

export interface ContactFormData {
  kind?: EnquiryKind;
  name: string;
  email: string;
  phone?: string;
  subject?: string; // contact form only; quote subject is built from the interest
  message: string;
  consent: boolean;
  // Quote request only (all optional; collect only what is needed to reply)
  interest?: string;
  groupType?: string;
  partySize?: string;
  dates?: string;
  departFrom?: string;
  website?: string; // honeypot field (bots often fill generic "website" fields)
  turnstileToken?: string; // Cloudflare Turnstile token
}

export const groupTypes = [
  'Just me or a couple',
  'Friends',
  'Family',
  'Club or team',
  'School or university',
  'Supporters’ group',
  'Corporate group'
];

// Server-side length limits (characters).
export const fieldLimits: Record<string, number> = {
  name: 100,
  email: 200,
  phone: 40,
  subject: 150,
  message: 4000,
  interest: 150,
  groupType: 60,
  partySize: 10,
  dates: 150,
  departFrom: 100
};
