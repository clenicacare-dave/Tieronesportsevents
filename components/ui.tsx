import Link from 'next/link';
import { PhotoSlot } from './PhotoSlot';
import { site } from '@/lib/site';
import { sportName } from '@/content/sports';
import { availabilityLabel, eventPhoto } from '@/content/events';
import type { Sport, TravelEvent } from '@/content/types';

export function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`font-heading text-sm font-semibold uppercase tracking-[0.24em] ${tone === 'light' ? 'text-gold' : 'text-gold-dark'}`}>
      {children}
    </p>
  );
}

export function SampleLabel({ show = true }: { show?: boolean }) {
  if (!show || !site.showSampleLabels) return null;
  return (
    <span className="inline-block border border-current px-1.5 py-0.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
      Sample
    </span>
  );
}

// Dark page header used by every inner page.
export function PageHero({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="motif-soft relative overflow-hidden bg-navy text-white">
      <div className="relative mx-auto max-w-site px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold uppercase leading-[0.95] sm:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function Section({
  children,
  tone = 'surface',
  className = '',
  id
}: {
  children: React.ReactNode;
  tone?: 'surface' | 'white' | 'navy';
  className?: string;
  id?: string;
}) {
  const bg = tone === 'white' ? 'bg-white' : tone === 'navy' ? 'bg-navy text-white' : 'bg-surface';
  return (
    <section id={id} className={bg}>
      <div className={`mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'dark'
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 font-heading text-4xl font-semibold uppercase leading-none sm:text-5xl ${tone === 'light' ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-8 ${tone === 'light' ? 'text-white/80' : 'text-muted'}`}>{intro}</p>}
    </div>
  );
}

export function EventCard({ event }: { event: TravelEvent }) {
  return (
    <article className="group relative flex flex-col bg-white shadow-[0_1px_0_rgb(var(--color-line))]">
      <PhotoSlot photo={eventPhoto(event)} small label={sportName(event.sport)} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col border-t-[3px] border-gold p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
          <span>{sportName(event.sport)}</span>
          <span className="text-muted">
            <SampleLabel show={event.sample} />
          </span>
        </div>
        <h3 className="mt-3 font-heading text-2xl font-semibold uppercase leading-tight text-navy">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline">
            {event.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">
          {event.location}, {event.country} · {event.date.label}
        </p>
        <p className="mt-4 flex-1 leading-7 text-ink/85">{event.summary}</p>
        <p className="mt-5 text-sm font-semibold text-navy">
          {event.indicativePrice ? `From ${formatPrice(event.indicativePrice)}` : availabilityLabel[event.availability]}
          <span aria-hidden="true" className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
        </p>
      </div>
    </article>
  );
}

export function SportCard({ sport, index }: { sport: Sport; index?: number }) {
  return (
    <Link href={`/sports/${sport.slug}`} className="group relative block overflow-hidden bg-navy text-white">
      <PhotoSlot photo={sport.photo} small className="aspect-[3/4] transition duration-500 group-hover:scale-[1.03] sm:aspect-[4/5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/5" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {index !== undefined && `${String(index + 1).padStart(2, '0')} / `}
          {sport.name}
        </p>
        <h3 className="mt-2 font-heading text-3xl font-semibold uppercase leading-none">{sport.tile.title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{sport.tile.line}</p>
        <span className="mt-4 inline-block h-[2px] w-10 bg-gold transition-all group-hover:w-16" />
      </div>
    </Link>
  );
}

export function CtaBand({
  title = 'Tell us where you want to be.',
  body = 'Share the sport, the dates and who is travelling. We will come back with options, usually within one working day.'
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="motif-soft relative overflow-hidden bg-navy text-white">
      <div className="relative mx-auto flex max-w-site flex-col items-start gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-heading text-4xl font-semibold uppercase leading-none sm:text-6xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-white/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className="btn-gold">
            Request a quote
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="prose-t1 max-w-3xl">{children}</div>;
}

export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="mb-10 max-w-3xl border-l-4 border-gold bg-white p-5 text-[0.95rem] leading-7 text-ink">
      {children}
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const formatPrice = (p: NonNullable<TravelEvent['indicativePrice']>) =>
  `${new Intl.NumberFormat('en-IE', { style: 'currency', currency: p.currency, maximumFractionDigits: 0 }).format(p.from)} ${p.basis}`;
