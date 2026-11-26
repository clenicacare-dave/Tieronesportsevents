import Link from 'next/link';
import { IntroFilm } from './IntroFilm';
import { PhotoSlot } from './PhotoSlot';
import { HeroRings } from './HeroRings';
import { HeroBadge } from './HeroBadge';
import { CtaBand, Eyebrow, EventCard, Section, SectionHeading } from './ui';
import { featuredEvents } from '@/content/events';
import { heroPhoto, howItWorks, promises } from '@/content/home';
import { kidsAudiences } from '@/content/kids/audiences';
import type { Service } from '@/content/services';

// Home page for the kids football edition (lib/edition.ts): youth football trips for clubs and academies,
// schools and families. Same hero, rings and film as the full site; football-only content.

export function KidsHome() {
  const featured = featuredEvents();
  const audiences = Object.values(kidsAudiences);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <PhotoSlot photo={heroPhoto} rings={false} creditTop priority sizes="100vw" className="absolute inset-0 -z-30" />
        <div className="hero-glow absolute inset-0 -z-20" />
        <HeroRings />
        <div className="mx-auto flex max-w-site flex-col px-5 pb-28 pt-14 sm:px-8 sm:pb-36 sm:pt-20 xl:min-h-[640px] xl:justify-end xl:pb-24 xl:pt-24">
          <div
            aria-hidden="true"
            data-ring-centre
            className="pointer-events-none absolute right-[6%] top-1/2 -z-10 hidden w-[420px] -translate-y-1/2 xl:block"
          >
            <HeroBadge />
          </div>
          <Eyebrow tone="light">Youth football trips</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-heading text-[3.4rem] font-semibold uppercase leading-[0.9] sm:text-8xl xl:max-w-[56%]">
            Play abroad. Come home a team.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
            Tournaments, training camps and match trips for clubs, academies, schools and families from Ireland and the UK.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/events" className="btn-gold">
              Find a trip
            </Link>
            <Link href="/quote" className="btn-outline">
              Request a quote
            </Link>
            <IntroFilm className="sm:ml-3" aboveDock />
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative z-10 -mb-6 -mt-[80px] flex justify-center sm:-mt-[100px] xl:hidden">
        <div className="w-[160px] sm:w-[200px]">
          <HeroBadge />
        </div>
      </div>

      {/* Who it is for */}
      <Section>
        <SectionHeading
          eyebrow="Who we travel with"
          title="Built around young players"
          intro="Whether it is a squad, a school team or one young fan, the trip is planned around their age, their level and the people looking after them."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {audiences.map((a, i) => (
            <AudienceCard key={a.slug} audience={a} index={i} />
          ))}
        </div>
      </Section>

      {/* Featured trips */}
      <Section tone="white">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Trips" title="Where your team could play next" intro="A taste of the trips we plan. Every one is shaped around your group." />
          <Link href="/events" className="whitespace-nowrap font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8">
            All trips
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="navy">
        <SectionHeading tone="light" eyebrow="How it works" title="Discover. Plan. Play." />
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {howItWorks.map((s) => (
            <li key={s.n} className="reveal border-t border-white/20 pt-6">
              <p className="font-heading text-5xl font-semibold text-gold">{s.n}</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold uppercase">{s.title}</h3>
              <p className="mt-2 text-lg text-white">{s.lead}</p>
              <p className="mt-3 leading-7 text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-it-works" className="mt-12 inline-block font-semibold text-gold underline-offset-8 hover:underline">
          More about how it works
        </Link>
      </Section>

      {/* Looked after */}
      <Section>
        <SectionHeading
          eyebrow="Why Tier One"
          title="Looked after, start to finish"
          intro="Coaches, teachers and parents need to know exactly what is happening. We make that easy."
        />
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <div key={p.title} className="bg-surface p-6 sm:p-8">
              <span className="block h-[3px] w-8 bg-gold" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-navy">{p.title}</h3>
              <p className="mt-2 leading-7 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function AudienceCard({ audience, index }: { audience: Service; index: number }) {
  return (
    <article className="reveal group relative overflow-hidden bg-navy text-white">
      <PhotoSlot photo={audience.photo} small rings={false} className="aspect-[4/5] md:aspect-[3/4]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/5 transition-opacity duration-500 group-hover:opacity-90" />
      <div aria-hidden="true" className="photo-rings photo-rings-sm" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {String(index + 1).padStart(2, '0')} / {audience.eyebrow}
        </p>
        <h3 className="mt-2 font-heading text-[1.9rem] font-semibold uppercase leading-none">
          <Link href={`/${audience.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {audience.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/80">{audience.audiences.join(' · ')}</p>
        <div className="mt-5 flex gap-2">
          <span
            aria-hidden="true"
            className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-brand bg-gold px-4 text-sm font-semibold text-navy transition group-hover:bg-white"
          >
            Explore
            <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </span>
          <Link
            href={`/quote?type=${audience.slug}`}
            className="relative z-10 inline-flex min-h-[40px] items-center rounded-brand border border-white/40 px-4 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
          >
            Quote<span className="sr-only"> for {audience.eyebrow.toLowerCase()}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
