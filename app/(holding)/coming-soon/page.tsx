import type { Metadata } from 'next';
import { brand } from '@/brand/brand';
import { site } from '@/lib/site';
import { HeroRings } from '@/components/HeroRings';
import { IntroFilm } from '@/components/IntroFilm';

// Holding page shown to the public while the site is gated (see middleware.ts).
export const metadata: Metadata = {
  title: { absolute: `${brand.name} | Coming soon` },
  description: `Sports travel and hospitality from ${site.regions}. Coming soon.`,
  robots: { index: false, follow: false }
};

export default function ComingSoon() {
  return (
    <main id="main" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy px-6 py-16 text-center text-white">
      <HeroRings centred />
      <div className="flex max-w-xl flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-ring-centre src={brand.logo.badgeLarge} alt="" width={176} height={176} className="h-36 w-36 sm:h-44 sm:w-44" />
        <h1 className="mt-10 font-heading uppercase leading-none">
          <span className="block text-[2.6rem] font-semibold tracking-[0.06em] sm:text-6xl">{brand.lockup.line1}</span>
          <span className="mt-3 block text-sm font-medium tracking-[0.42em] text-gold sm:text-base">{brand.lockup.line2}</span>
        </h1>
        <p className="mt-10 font-heading text-lg uppercase tracking-[0.3em] text-white/90">Coming soon</p>
        <span aria-hidden="true" className="mt-5 h-px w-16 bg-gold/60" />
        <p className="mt-5 text-white/75">Sports travel and hospitality for supporters, clubs and corporate groups from {site.regions}.</p>
        <IntroFilm className="mt-8" />
        <a href={`mailto:${site.email}`} className="mt-6 text-gold underline-offset-4 hover:underline">
          {site.email}
        </a>
      </div>
    </main>
  );
}
