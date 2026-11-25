import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Breadcrumbs, CtaBand, EventCard, Eyebrow, Section } from '@/components/ui';
import { eventsForSport } from '@/content/events';
import { getSport, sports } from '@/content/sports';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => sports.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sport = getSport((await params).slug);
  if (!sport) return {};
  return { title: `${sport.name} travel`, description: sport.summary, alternates: { canonical: `/sports/${sport.slug}` } };
}

export default async function SportPage({ params }: Props) {
  const sport = getSport((await params).slug);
  if (!sport) notFound();
  const list = eventsForSport(sport.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <PhotoSlot photo={sport.photo} rings={false} priority sizes="100vw" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/25" />
        <div aria-hidden="true" className="photo-rings -z-10" />
        <div className="relative mx-auto max-w-site px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
          <Breadcrumbs items={[{ href: '/sports', label: 'Sports' }, { label: sport.name }]} />
          <Eyebrow tone="light">{sport.name}</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold uppercase leading-[0.95] sm:text-7xl">{sport.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{sport.intro}</p>
          <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {sport.highlights.map((h) => (
              <li key={h} className="border-t border-gold/60 pt-3 text-white/85">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Section>
        <h2 className="font-heading text-3xl font-semibold uppercase text-navy">{sport.name} events</h2>
        {list.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-muted">No {sport.name.toLowerCase()} events listed yet. Tell us what you are looking for.</p>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
