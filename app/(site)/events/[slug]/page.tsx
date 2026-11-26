import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Breadcrumbs, CtaBand, EventCard, Eyebrow, JsonLd, SampleLabel, formatPrice } from '@/components/ui';
import { availabilityLabel, eventPhoto, events, eventsForSport, getEvent } from '@/content/events';
import { sportName } from '@/content/sports';
import { eventsLabel, isKids } from '@/lib/edition';
import { brand } from '@/brand/brand';
import { absoluteUrl, site } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => events.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getEvent((await params).slug);
  if (!event) return {};
  return {
    title: event.name,
    description: event.summary,
    alternates: { canonical: `/events/${event.slug}` },
    // Sample events stay out of search results.
    robots: event.sample ? { index: false, follow: true } : undefined
  };
}

export default async function EventPage({ params }: Props) {
  const event = getEvent((await params).slug);
  if (!event) notFound();

  const related = eventsForSport(event.sport).filter((e) => e.slug !== event.slug).slice(0, 3);
  const facts: [string, string][] = [
    ['Venue', event.venue],
    ['Location', `${event.location}, ${event.country}`],
    ['Dates', event.date.label],
    ['Package', event.package],
    ['Accommodation', event.accommodation],
    ['Transport', event.transport],
    ['Price', event.indicativePrice ? `From ${formatPrice(event.indicativePrice)}` : 'On request'],
    ['Availability', availabilityLabel[event.availability]]
  ];

  // Structured data only for real, checked events with a confirmed date.
  const structured = !event.sample && event.verified && event.date.start;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <PhotoSlot photo={eventPhoto(event)} label={sportName(event.sport)} rings={false} priority sizes="100vw" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
        <div aria-hidden="true" className="photo-rings -z-10" />
        <div className="mx-auto max-w-site px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
          <Breadcrumbs items={[{ href: '/events', label: eventsLabel }, { label: event.name }]} />
          <div className="flex items-center gap-3 text-gold">
            <Eyebrow tone="light">{isKids ? 'Youth football' : sportName(event.sport)}</Eyebrow>
            <SampleLabel show={event.sample} />
          </div>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold uppercase leading-[0.95] sm:text-7xl">{event.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{event.summary}</p>
          <p className="mt-4 text-white/70">
            {event.venue} · {event.date.label}
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-site gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_380px] lg:py-20">
          <div>
            {event.notices.length > 0 && (
              <div role="note" className="mb-10 border-l-4 border-gold bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark">Please note</h2>
                <ul className="mt-2 space-y-1 leading-7">
                  {event.notices.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="font-heading text-3xl font-semibold uppercase text-navy">Included</h2>
                <ul className="mt-5 space-y-3">
                  {event.inclusions.map((i) => (
                    <li key={i} className="flex gap-3 leading-7">
                      <span aria-hidden="true" className="mt-3 h-[2px] w-4 shrink-0 bg-gold" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-heading text-3xl font-semibold uppercase text-navy">Not included</h2>
                <ul className="mt-5 space-y-3 text-muted">
                  {event.exclusions.map((i) => (
                    <li key={i} className="flex gap-3 leading-7">
                      <span aria-hidden="true" className="mt-3 h-[2px] w-4 shrink-0 bg-line" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-heading text-3xl font-semibold uppercase text-navy">Who it suits</h2>
              <p className="mt-4 leading-7">{event.audiences.join(' · ')}</p>
              <p className="mt-6 leading-7 text-muted">
                Everything here can be adjusted for your group. Your quote confirms exactly what is included before you commit.
              </p>
            </div>
          </div>

          <aside className="h-fit bg-white p-6 shadow-[0_0_0_1px_rgb(var(--color-line))] sm:p-8 lg:sticky lg:top-24">
            <h2 className="font-heading text-2xl font-semibold uppercase text-navy">Trip details</h2>
            <dl className="mt-5 divide-y divide-line text-[0.95rem]">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[125px_1fr] gap-3 py-3">
                  <dt className="font-semibold text-navy">{k}</dt>
                  <dd className="text-ink/85">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/quote?event=${event.slug}`} className="btn-gold mt-6 w-full justify-center">
              Enquire about this trip
            </Link>
            <p className="mt-3 text-center text-sm text-muted">No payment and no commitment.</p>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-site px-5 py-16 sm:px-8">
            <h2 className="font-heading text-3xl font-semibold uppercase text-navy">{isKids ? 'More trips' : `More ${sportName(event.sport).toLowerCase()}`}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />

      {structured && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.name,
            description: event.summary,
            startDate: event.date.start,
            endDate: event.date.end,
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: { '@type': 'Place', name: event.venue, address: `${event.location}, ${event.country}` },
            organizer: { '@type': 'Organization', name: brand.name, url: site.url },
            url: absoluteUrl(`/events/${event.slug}`),
            ...(eventPhoto(event) ? { image: absoluteUrl(eventPhoto(event)!.src) } : {})
          }}
        />
      )}
    </>
  );
}
