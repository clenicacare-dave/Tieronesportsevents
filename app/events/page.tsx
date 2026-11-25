import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, EventCard, PageHero, Section } from '@/components/ui';
import { events } from '@/content/events';
import { sports } from '@/content/sports';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Football, rugby, Grand Prix, golf and racing trips from Ireland and the UK.',
  alternates: { canonical: '/events' }
};

export default function EventsPage() {
  const hasSamples = site.showSampleLabels && events.some((e) => e.sample);
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Find your next sporting experience"
        intro="Matchdays, race weekends and festivals, with the travel and the stay planned around the occasion."
      />
      <Section>
        <nav aria-label="Filter by sport" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4 text-sm font-semibold">
          <span className="text-navy">All events</span>
          {sports.map((s) => (
            <Link key={s.slug} href={`/sports/${s.slug}`} className="text-muted hover:text-navy">
              {s.name}
            </Link>
          ))}
        </nav>
        {hasSamples && (
          <p className="mt-6 text-sm text-muted">
            Events marked <strong>Sample</strong> show how trips will appear. They are not available packages.
          </p>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </Section>
      <CtaBand title="Not listed? Ask us." body="If the event you want is not here, tell us about it. Many trips start as an idea." />
    </>
  );
}
