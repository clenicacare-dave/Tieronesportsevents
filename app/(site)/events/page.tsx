import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, EventCard, PageHero, Section } from '@/components/ui';
import { events } from '@/content/events';
import { sports } from '@/content/sports';
import { site } from '@/lib/site';
import { eventsLabel, isKids } from '@/lib/edition';

export const metadata: Metadata = {
  title: eventsLabel,
  description: isKids
    ? 'Youth football tournaments, training camps, school tours and family match trips from Ireland and the UK.'
    : 'Football, rugby, Grand Prix, golf and racing trips from Ireland and the UK.',
  alternates: { canonical: '/events' }
};

export default function EventsPage() {
  const hasSamples = site.showSampleLabels && events.some((e) => e.sample);
  return (
    <>
      <PageHero
        eyebrow={eventsLabel}
        title={isKids ? 'Tournaments, camps, tours and match trips' : 'Matchdays, race weekends and festivals'}
        intro={isKids ? 'Football trips for young players, planned around the squad, the school or the family.' : 'The travel and the stay, planned around the occasion.'}
      />
      <Section>
        {!isKids && (
        <nav aria-label="Filter by sport" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4 text-sm font-semibold">
          <span className="text-navy">All events</span>
          {sports.map((s) => (
            <Link key={s.slug} href={`/sports/${s.slug}`} className="text-muted hover:text-navy">
              {s.name}
            </Link>
          ))}
        </nav>
        )}
        {hasSamples && (
          <p className="mt-6 text-sm text-muted">
            {eventsLabel} marked <strong>Sample</strong> show how trips will appear. They are not available packages.
          </p>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </Section>
      <CtaBand
        title="Not listed? Ask us."
        body={
          isKids
            ? 'If the tournament, camp or destination you want is not here, tell us about it. Many trips start as an idea.'
            : 'If the event you want is not here, tell us about it. Many trips start as an idea.'
        }
      />
    </>
  );
}
