import type { Metadata } from 'next';
import Link from 'next/link';
import { EnquiryPanel } from '@/components/EnquiryPanel';
import { PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Tier One Sports Events.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to Tier One" intro="A question, an idea or a group to look after: send us a message and a person will reply, usually within one working day." />
      <section className="ring-corner overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-site gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:py-20">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-semibold uppercase text-navy">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-2 inline-block text-lg font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold uppercase text-navy">Planning a trip?</h2>
              <p className="mt-2 leading-7 text-ink/85">The quote request asks the questions we need to come back with options.</p>
              <Link href="/quote" className="btn-gold mt-4">
                Request a quote
              </Link>
            </div>
          </div>
          <EnquiryPanel kind="contact" />
        </div>
      </section>
    </>
  );
}
