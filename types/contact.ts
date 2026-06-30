export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
  website?: string; // honeypot field (bots often fill generic "website" fields)
  recaptchaToken?: string; // optional reCAPTCHA v3 token
}
