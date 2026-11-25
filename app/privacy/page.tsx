import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { brand } from '@/brand/brand';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy notice', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="25 November 2026">
      <h2>Who we are</h2>
      <p>
        This website is operated by {brand.name} [legal entity name, registered number and address]. We are the controller of the personal
        data described here. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>What we collect</h2>
      <p>Only what you send us through the contact or quote form:</p>
      <ul>
        <li>Your name and email address</li>
        <li>Your phone number, if you choose to give it</li>
        <li>Details of your enquiry: the event or sport, group type and size, dates, where you travel from and your message</li>
      </ul>
      <p>
        We do not use analytics, advertising or tracking cookies. To protect the forms from spam, Cloudflare Turnstile checks your browser
        and your IP address is used to limit repeated submissions.
      </p>
      <h2>Why we use it</h2>
      <p>
        To reply to your enquiry and, if you ask, to prepare a quote. [Lawful basis to be confirmed by legal review: for example, steps
        taken at your request before entering a contract, and our legitimate interest in replying to enquiries.] We do not sell your data
        or use it for marketing without your separate consent.
      </p>
      <h2>Who processes it for us</h2>
      <ul>
        <li>Cloudflare: website hosting, form security (Turnstile) and sending the enquiry email</li>
        <li>Zoho: the email inbox where enquiries are received</li>
      </ul>
      <p>[Confirm data processing terms and international transfer safeguards for each provider.]</p>
      <h2>How long we keep it</h2>
      <p>[Retention period to be decided, for example: enquiries that do not lead to a booking are deleted after 12 months.]</p>
      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data, or object to how we use it, by emailing{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>. You can also complain to the Data Protection Commission in Ireland or, in the UK,
        the Information Commissioner’s Office.
      </p>
      <p>
        See also our <Link href="/cookies">cookie notice</Link>.
      </p>
    </LegalPage>
  );
}
