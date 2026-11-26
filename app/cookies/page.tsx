import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { brand } from '@/brand/brand';

export const metadata: Metadata = {
  title: 'Cookies',
  description: `${brand.name} does not use analytics, advertising or tracking cookies.`,
  alternates: { canonical: '/cookies' }
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" updated="26 November 2026">
      <h2>Our approach</h2>
      <p>
        This website does not use analytics, advertising or social media cookies, and it does not track you across other websites. That is
        why there is no cookie banner.
      </p>

      <h2>What the website does use</h2>
      <p>
        Irish law (the ePrivacy Regulations 2011, S.I. No. 336 of 2011) allows cookies and similar technology without consent only where
        they are strictly necessary to provide a service you ask for. We use only that kind:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> hosts the website and protects it from attacks. It may set strictly necessary security cookies, such
          as one that tells genuine visitors apart from bots.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> runs on the contact and quote forms to check that a person, not a bot, is sending the form.
          It does not track you for advertising.
        </li>
      </ul>
      <p>[Legal review to confirm that no consent banner is needed for the above.]</p>

      <h2>Controlling cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. If you block Cloudflare’s security checks the contact and quote forms may
        not work; you can email us instead.
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add analytics or any cookie that is not strictly necessary, we will ask for your consent first, make it as easy to refuse
        as to accept, and update this page. See our <Link href="/privacy">privacy notice</Link> for how we handle personal data.
      </p>
    </LegalPage>
  );
}
