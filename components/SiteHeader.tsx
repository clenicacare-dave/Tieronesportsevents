'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { mainNav } from '@/lib/nav';

export function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  // Close the mobile menu after navigating.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="border-b-2 border-transparent py-2 text-white/85 transition hover:text-white aria-[current=page]:border-gold aria-[current=page]:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/quote" className="btn-gold hidden sm:inline-flex">
            Request a quote
          </Link>

          {/* Works without JavaScript */}
          <details ref={menu} className="group relative lg:hidden">
            <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-brand border border-white/25 px-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="relative block h-3.5 w-5 border-y-2 border-current after:absolute after:left-0 after:top-1 after:h-0.5 after:w-5 after:bg-current" />
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <nav aria-label="Mobile" className="fixed inset-x-0 top-[68px] max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-white/10 bg-navy px-5 pb-8 pt-2 shadow-2xl">
              <ul className="divide-y divide-white/10">
                {[...mainNav, { href: '/about', label: 'About' }, { href: '/faqs', label: 'FAQs' }, { href: '/contact', label: 'Contact' }].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className="flex min-h-[52px] items-center font-heading text-2xl uppercase tracking-wide text-white aria-[current=page]:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/quote" className="btn-gold mt-6 w-full justify-center">
                Request a quote
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
