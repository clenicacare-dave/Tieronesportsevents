import Link from 'next/link';
import { Logo } from './Logo';
import { footerNav } from '@/lib/nav';
import { brand } from '@/brand/brand';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-site gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs leading-7 text-white/70">{brand.strapline}</p>
          <p className="mt-6">
            <a href={`mailto:${site.email}`} className="text-gold underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </div>
        {Object.entries(footerNav).map(([heading, links]) => (
          <nav key={heading} aria-label={heading}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">{heading}</h2>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-5 py-6 text-sm text-white/60 sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {brand.name}
          </p>
          <p>Enquiries only. Bookings are confirmed in writing, never on this website.</p>
        </div>
      </div>
    </footer>
  );
}
