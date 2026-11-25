import type { Metadata } from 'next';
import { CtaBand, PageHero, Section } from '@/components/ui';
import { howItWorks } from '@/content/home';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'From your first enquiry to the trip home: how Tier One plans sports travel.',
  alternates: { canonical: '/how-it-works' }
};

const detail = [
  {
    title: 'You tell us the occasion',
    body: 'Send an enquiry with the sport or event, who is travelling, roughly when, and where from. A rough idea is enough to start. There is no account to create and nothing to pay.'
  },
  {
    title: 'We come back with options',
    body: 'We reply, usually within one working day, and talk through what is possible. Then we send a written quote setting out travel, accommodation, what is included and what is not.'
  },
  {
    title: 'You decide',
    body: 'Nothing is booked until you confirm in writing. If anything depends on availability we cannot guarantee, such as tickets or fixture dates, we say so before you commit.'
  },
  {
    title: 'We look after the details',
    body: 'Before you go, you receive the practical information for the trip and who to contact. If a fixture moves, we explain the options.'
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title="Simple from the first message" intro="No accounts, no online payments and no surprises. Here is what happens when you get in touch." />
      <Section>
        <ol className="grid gap-px bg-line md:grid-cols-2">
          {detail.map((d, i) => (
            <li key={d.title} className="bg-surface p-6 sm:p-10">
              <p className="font-heading text-6xl font-semibold text-gold-dark">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold uppercase text-navy">{d.title}</h2>
              <p className="mt-3 max-w-lg leading-8 text-ink/85">{d.body}</p>
            </li>
          ))}
        </ol>
        <p className="sr-only">In short: {howItWorks.map((s) => s.title).join(', ')}.</p>
      </Section>
      <CtaBand />
    </>
  );
}
