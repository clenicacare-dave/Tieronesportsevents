import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { brand } from '@/brand/brand';
import { company, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: `The terms for using the ${brand.name} website.`,
  alternates: { canonical: '/terms' }
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="26 November 2026">
      <p>
        These terms cover your use of this website. Trips are covered separately by our{' '}
        <Link href="/booking-conditions">booking conditions</Link>, which you agree to only when you book.
      </p>

      <h2>About us</h2>
      <p>
        This website is run by {company('legalName')}, trading as {brand.name}, a company registered in Ireland with CRO number{' '}
        {company('croNumber')} and its registered office at {company('registeredOffice')}. VAT number: {company('vatNumber')}. Email:{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Information on this website</h2>
      <p>
        Events and trips described here are for information. Nothing on the website is an offer to sell, and no booking is made through
        it. Events marked “Sample” are examples and are not available. Fixtures, dates, prices, availability and what is included are
        confirmed only in a written quote, and fixture dates are set by leagues, organisers and broadcasters, not by us.
      </p>
      <p>
        We work to keep the information accurate and up to date, but it may change without notice. Prices shown as “from” are a guide for
        the stated group size and dates.
      </p>

      <h2>Enquiries</h2>
      <p>
        Sending an enquiry or asking for a quote does not create a booking or any obligation on either side. See our{' '}
        <Link href="/privacy">privacy notice</Link> for how we handle your details.
      </p>

      <h2>Using the website</h2>
      <p>
        Please do not misuse the website: do not try to break its security, send spam or automated submissions through the forms, or copy
        its content for commercial use without our permission.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {brand.name} name, the T1 logo and the website’s text and design belong to {company('legalName')} or are used with permission.
        Photographs belong to their owners and are used under licence; credits are shown on each image.
      </p>

      <h2>Links to other websites</h2>
      <p>
        Where we link to other websites, such as government travel advice, we do so for your information. We are not responsible for their
        content.
      </p>

      <h2>Our liability</h2>
      <p>
        We provide the website free of charge and for information. To the extent the law allows, we are not liable for loss caused by
        relying on general information on it, or by the website being unavailable. Nothing in these terms limits any liability that cannot
        be limited by law, including your rights as a consumer under the Consumer Rights Act 2022. [Legal review to confirm wording.]
      </p>

      <h2>Law and disputes</h2>
      <p>
        These terms are governed by the laws of Ireland and the Irish courts have jurisdiction. If you are a consumer living elsewhere, for
        example in Northern Ireland or Great Britain, you keep the protection of the mandatory laws where you live and may bring a claim
        there. [Legal review to confirm.]
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The version on this page, with the date at the top, is the one that applies.</p>
    </LegalPage>
  );
}
