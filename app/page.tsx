import Link from 'next/link';
import { PhotoSlot } from '@/components/PhotoSlot';
import { CtaBand, Eyebrow, EventCard, Section, SectionHeading, SportCard } from '@/components/ui';
import { featuredEvents } from '@/content/events';
import { sports } from '@/content/sports';
import { groupsPhoto, heroPhoto, howItWorks, promises } from '@/content/home';
import { brand } from '@/brand/brand';

export default function HomePage() {
  const featured = featuredEvents();
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {/* Layers: stadium photo, navy wash (solid behind the text, lighter on the right) with a gold glow, fine rings from the badge. */}
        <PhotoSlot photo={heroPhoto} rings={false} creditTop priority sizes="100vw" className="absolute inset-0 -z-30" />
        <div className="hero-glow absolute inset-0 -z-20" />
        {/* Phones and tablets: rings rise from the bottom centre, behind the badge that straddles the edge below. */}
        <div aria-hidden="true" className="hero-rings-anim pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-[1400px] -translate-x-1/2 translate-y-1/2 xl:hidden" />
        <div className="mx-auto flex max-w-site flex-col px-5 pb-28 pt-14 sm:px-8 sm:pb-36 sm:pt-20 xl:min-h-[640px] xl:justify-end xl:pb-24 xl:pt-24">
          {/* Wide screens: badge beside the headline, rings centred on it, behind everything. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[6%] top-1/2 -z-10 hidden w-[420px] -translate-y-1/2 xl:block"
          >
            <div className="hero-rings-anim absolute left-1/2 top-1/2 -z-10 aspect-square w-[700%] -translate-x-1/2 -translate-y-1/2" />
            <HeroBadge />
          </div>
          <Eyebrow tone="light">Experience sport differently</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-heading text-[3.4rem] font-semibold xl:max-w-[56%] uppercase leading-[0.9] sm:text-8xl">{brand.tagline}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">{brand.strapline}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/events" className="btn-gold">
              Find your event
            </Link>
            <Link href="/quote" className="btn-outline">
              Request a quote
            </Link>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative z-10 -mb-6 -mt-[80px] flex justify-center sm:-mt-[100px] xl:hidden">
        <div className="w-[160px] sm:w-[200px]">
          <HeroBadge />
        </div>
      </div>

      {/* Sports */}
      <Section>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Sports" title="Find your next sporting experience" />
          <Link href="/sports" className="whitespace-nowrap font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8">
            All sports
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {sports.map((s, i) => (
            <SportCard key={s.slug} sport={s} index={i} />
          ))}
        </div>
      </Section>

      {/* Featured events */}
      <Section tone="white">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured events"
            title="Where you could be next"
            intro="A taste of the trips we plan. Every one can be shaped around your group."
          />
          <Link href="/events" className="whitespace-nowrap font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8">
            All events
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </Section>

      {/* Group travel */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-site items-stretch lg:grid-cols-2">
          <PhotoSlot photo={groupsPhoto} label="Groups" className="group min-h-[320px] lg:min-h-[560px]" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:py-24">
            <SectionHeading
              eyebrow="Group travel"
              title="Your trip. Your team. Your way."
              intro="Clubs, schools, supporters’ groups, societies and friends. Tell us who is going and what matters to the group, and we will plan around it."
            />
            <ul className="mt-8 grid gap-3 text-ink sm:grid-cols-2">
              {['Clubs and academies', 'Supporters’ groups', 'Schools and universities', 'Friends and families'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-[2px] w-5 bg-gold" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/group-travel" className="btn-navy">
                Group travel
              </Link>
              <Link href="/corporate-hospitality" className="inline-flex min-h-[48px] items-center px-2 font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8">
                Corporate hospitality
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section tone="navy">
        <SectionHeading tone="light" eyebrow="How it works" title="Discover. Plan. Experience." />
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

      {/* Trust */}
      <Section>
        <SectionHeading eyebrow="Why Tier One" title="Clear from the first reply" />
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

function HeroBadge() {
  return (
    <div className="hero-badge relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.logo.badgeLarge} alt="" width={480} height={480} className="relative w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
