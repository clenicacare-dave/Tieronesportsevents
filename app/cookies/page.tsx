import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Cookies', alternates: { canonical: '/cookies' } };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" updated="25 November 2026">
      <h2>Our approach</h2>
      <p>This website does not use analytics, advertising or social media cookies, so we do not show a cookie banner.</p>
      <h2>Strictly necessary technology</h2>
      <ul>
        <li>
          <strong>Cloudflare</strong> provides hosting and security for the site and may use strictly necessary cookies or similar
          technology to protect it from abuse.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> runs on the contact and quote forms to check that a person, not a bot, is sending the form.
        </li>
      </ul>
      <p>[Legal review to confirm that no consent banner is needed for the above.]</p>
      <h2>If this changes</h2>
      <p>If we add analytics or any non-essential cookies in future, we will ask for your consent first and update this page.</p>
    </LegalPage>
  );
}
