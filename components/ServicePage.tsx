import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoSlot } from './PhotoSlot';
import { CtaBand, PageHero, Section } from './ui';
import { services, type Service } from '@/content/services';

export const serviceMetadata = (slug: Service['slug']): Metadata => {
  const s = services[slug];
  return { title: s.eyebrow, description: s.description, alternates: { canonical: `/${s.slug}` } };
};

export function ServicePage({ slug }: { slug: Service['slug'] }) {
  const s = services[slug];
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={`/quote?type=${s.slug}`} className="btn-gold">
            Request a quote
          </Link>
          <Link href="/events" className="btn-outline">
            Browse events
          </Link>
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-site lg:grid-cols-[1fr_1.1fr]">
          <PhotoSlot photo={s.photo} label={s.eyebrow.split(' ')[0]} className="group min-h-[280px] lg:min-h-full" sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="px-5 py-16 sm:px-12 lg:py-20">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-[0.12em] text-gold-dark">
              {s.audiences.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="mt-10 space-y-10">
              {s.sections.map((sec) => (
                <div key={sec.title} className="reveal border-t border-line pt-6">
                  <h2 className="font-heading text-3xl font-semibold uppercase text-navy">{sec.title}</h2>
                  <p className="mt-3 max-w-xl leading-8 text-ink/85">{sec.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className="font-heading text-4xl font-semibold uppercase leading-none text-navy sm:text-5xl">What to tell us</h2>
          <div>
            <ul className="space-y-4">
              {s.ask.map((a) => (
                <li key={a} className="flex gap-4 text-lg">
                  <span aria-hidden="true" className="mt-4 h-[2px] w-5 shrink-0 bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-muted">Do not worry if you do not have every answer yet. A rough idea is enough to start.</p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
