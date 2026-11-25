import type { Metadata } from 'next';
import { EnquiryPanel } from '@/components/EnquiryPanel';
import type { InterestOption } from '@/components/EnquiryForm';
import { PageHero } from '@/components/ui';
import { events } from '@/content/events';
import { services } from '@/content/services';
import { sports } from '@/content/sports';
import { howItWorks } from '@/content/home';

export const metadata: Metadata = {
  title: 'Request a quote',
  description: 'Tell us the sport, the dates and who is travelling, and we will come back with options.',
  alternates: { canonical: '/quote' }
};

const interests: InterestOption[] = [
  ...events.map((e) => ({ value: e.slug, label: e.name, group: 'Events' })),
  ...sports.map((s) => ({ value: s.slug, label: `${s.name} (any event)`, group: 'Sports' })),
  ...Object.values(services).map((s) => ({ value: s.slug, label: s.eyebrow, group: 'Trip types' }))
];

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow="Request a quote" title="Tell us where you want to be" intro="A few details are enough to start. There is no payment and no commitment." />
      <section className="bg-surface">
        <div className="mx-auto grid max-w-site gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:py-20">
          <ol className="space-y-8 lg:pt-4">
            {howItWorks.map((s) => (
              <li key={s.n} className="border-t border-line pt-5">
                <p className="font-heading text-3xl font-semibold text-gold-dark">{s.n}</p>
                <h2 className="mt-1 font-heading text-2xl font-semibold uppercase text-navy">
                  {s.title}. <span className="text-ink/80">{s.lead}</span>
                </h2>
                <p className="mt-2 leading-7 text-ink/85">{s.body}</p>
              </li>
            ))}
          </ol>
          <EnquiryPanel kind="quote" interests={interests} />
        </div>
      </section>
    </>
  );
}
