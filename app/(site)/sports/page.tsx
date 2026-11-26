import type { Metadata } from 'next';
import { CtaBand, PageHero, Section, SportCard } from '@/components/ui';
import { notFound } from 'next/navigation';
import { sports } from '@/content/sports';
import { isKids } from '@/lib/edition';

export const metadata: Metadata = {
  title: 'Sports',
  description: 'Football, rugby, motorsport, golf and racing travel from Ireland and the UK.',
  alternates: { canonical: '/sports' }
};

// Full edition only (404 in the kids football edition).
export default function SportsPage() {
  if (isKids) notFound();
  return (
    <>
      <PageHero eyebrow="Sports" title="Every sport, one approach" intro="Whatever the occasion, we plan the travel around the event and the people going." />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((s, i) => (
            <SportCard key={s.slug} sport={s} index={i} />
          ))}
        </div>
      </Section>
      <CtaBand title="Another sport in mind?" body="Tennis, GAA, cricket, athletics or something else entirely: tell us and we will see what is possible." />
    </>
  );
}
