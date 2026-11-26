'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { HeaderClock } from './HeaderClock';
import { mainNav } from '@/lib/nav';

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Glassy header once the page has scrolled. Its height never changes, so the page never jumps.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="site-header sticky top-0 z-40 bg-navy text-white transition-[background-color,box-shadow] duration-300 data-[scrolled]:bg-navy/85 data-[scrolled]:shadow-[0_10px_30px_-12px_rgb(0_0_0/0.6)] data-[scrolled]:backdrop-blur-md"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Logo />

        <div className="flex items-center gap-3 xl:gap-8">
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Phones and tablets: date and time fill the space the old Menu button used. */}
          <div className="xl:hidden">
            <HeaderClock />
          </div>
          <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 xl:block" />
          <Link href="/quote" className="btn-gold hidden min-h-[44px] px-5 font-heading text-[0.85rem] uppercase tracking-[0.12em] xl:inline-flex">
            Request a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
