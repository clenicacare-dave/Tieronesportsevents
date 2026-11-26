import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, DraftNotice, PageHero, Section } from '@/components/ui';
import { faqs } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Answers to common questions about Tier One sports trips and enquiries.',
  alternates: { canonical: '/faqs' }
};

export default function FaqsPage() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Questions, answered" />
      <Section>
        <DraftNotice>
          <strong>Draft answers.</strong> Tier One to confirm each answer, and add policy answers (payments, deposits, cancellations,
          insurance) once agreed and legally reviewed.
        </DraftNotice>
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.question} className="group py-2">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.question}
                <span aria-hidden="true" className="text-2xl font-normal text-gold-dark transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 pr-10 leading-8 text-ink/85">{f.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-muted">
          Something else? <Link href="/contact" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">Ask us directly</Link>.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
