import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { brand } from '@/brand/brand';

export const metadata: Metadata = { title: 'Terms of use', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="25 November 2026">
      <p>These terms cover use of this website. They are not booking terms.</p>
      <h2>Information on this website</h2>
      <p>
        Events and trips described on this website are for information. Nothing on the website is an offer to sell, and no booking is
        made through it. Events marked “Sample” are examples and are not available. Dates, prices, availability and what is included are
        confirmed only in a written quote.
      </p>
      <h2>Booking terms</h2>
      <p>
        [Booking terms, including payments, cancellations, changes and any package travel protection, will be provided with each quote
        once agreed and legally reviewed.]
      </p>
      <h2>Enquiries</h2>
      <p>
        Sending an enquiry does not create a booking or any obligation on either side. See our <Link href="/privacy">privacy notice</Link>{' '}
        for how we handle your details.
      </p>
      <h2>Intellectual property</h2>
      <p>The {brand.name} name, logo and website content belong to {brand.name} [legal entity] or are used with permission.</p>
      <h2>Liability</h2>
      <p>[Limitation of liability wording to be provided by legal review.]</p>
      <h2>Governing law</h2>
      <p>[Governing law and jurisdiction to be confirmed.]</p>
    </LegalPage>
  );
}
