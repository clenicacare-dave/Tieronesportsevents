'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dockNav, isOn, sheetNav } from '@/lib/nav';
import { site } from '@/lib/site';

// Phones and tablets (below 1280px): a floating navy-glass dock at the bottom of the screen, where a
// thumb reaches (Home, Events, Sports, Quote, More). "More" lifts a menu sheet to three quarters of the
// screen. It closes on a tap outside, Escape, a swipe down on its handle, and on going to another page.
// Pattern from Swords Village (decision #45); at most four destinations plus More (Project OS mobile shell).
// The glass look is the .glass classes in app/globals.css.

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const icons: Record<(typeof dockNav)[number]['icon'], React.ReactNode> = {
  home: <><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-6h4v6" /></>,
  events: <><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  sports: <><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16" /></>,
  quote: <><path d="M5 5h14v10H9l-4 4z" /><path d="M9 9h6M9 12h4" /></>
};

export function MobileDock() {
  const path = usePathname() ?? '';
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path; // navigating anywhere closes it
  const root = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  const moreBtn = useRef<HTMLButtonElement>(null);
  const startY = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenAt(null);
        moreBtn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    // The sheet is a modal dialog: switch the page behind it off for keyboard and screen readers.
    const behind = Array.from(document.body.children).filter(
      (el) => el !== root.current && !el.contains(root.current) && !(el instanceof HTMLScriptElement) && !(el as HTMLElement).inert
    ) as HTMLElement[];
    behind.forEach((el) => (el.inert = true));
    first.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      behind.forEach((el) => (el.inert = false));
    };
  }, [open]);

  const close = () => {
    setOpenAt(null);
    moreBtn.current?.focus({ preventScroll: true });
  };
  const inDock = dockNav.some((i) => isOn(path, i.href));
  const moreOn = open || !inDock;
  const drag = (y: number | null) => {
    if (sheet.current) sheet.current.style.transform = y === null ? '' : `translateY(${Math.max(0, y)}px)`;
  };

  const item = 'flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-[20px] px-0.5 pb-1.5 pt-2 text-[0.7rem] font-semibold leading-[1.1]';

  return (
    <div ref={root} className="xl:hidden">
      <nav
        aria-label="Quick links"
        className="glass fixed bottom-[calc(10px+env(safe-area-inset-bottom))] left-1/2 z-[70] flex w-[min(calc(100%-24px),26rem)] -translate-x-1/2 gap-0.5 rounded-[26px] p-1.5"
      >
        {dockNav.map((i) => {
          const on = !open && isOn(path, i.href);
          const quote = i.icon === 'quote';
          return (
            <Link
              key={i.href}
              href={i.href}
              aria-current={on ? 'page' : undefined}
              className={`${item} ${quote ? 'bg-gold text-navy shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]' : on ? 'glass-pill text-white' : 'text-[var(--glass-ink2)]'}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...stroke}>
                {icons[i.icon]}
              </svg>
              <span className="whitespace-nowrap">{i.label}</span>
            </Link>
          );
        })}
        <button
          ref={moreBtn}
          type="button"
          onClick={() => setOpenAt(open ? null : path)}
          aria-expanded={open}
          aria-controls="site-menu"
          className={`${item} ${moreOn ? 'glass-pill text-white' : 'text-[var(--glass-ink2)]'}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
            <circle cx="6" cy="12" r="1.4" />
            <circle cx="12" cy="12" r="1.4" />
            <circle cx="18" cy="12" r="1.4" />
          </svg>
          <span>More</span>
        </button>
      </nav>

      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-[rgb(10_18_28/0.5)] transition-opacity duration-300 motion-reduce:transition-none ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        ref={sheet}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={`glass glass-sheet fixed inset-x-2.5 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex h-[calc(75dvh-5.5rem)] max-w-xl flex-col rounded-[28px] text-white transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? 'translate-y-0' : 'translate-y-[130%]'}`}
      >
        <div
          className="cursor-grab touch-none pb-1 pt-2.5"
          aria-hidden="true"
          onPointerDown={(e) => {
            startY.current = e.clientY;
            e.currentTarget.setPointerCapture(e.pointerId);
            if (sheet.current) sheet.current.style.transition = 'none';
          }}
          onPointerMove={(e) => {
            if (startY.current !== null) drag(e.clientY - startY.current);
          }}
          onPointerUp={(e) => {
            if (startY.current === null) return;
            const d = e.clientY - startY.current;
            startY.current = null;
            if (sheet.current) sheet.current.style.transition = '';
            drag(null);
            if (d > 90) close();
          }}
        >
          <span className="mx-auto block h-[5px] w-10 rounded-full bg-[var(--glass-ink2)] opacity-50" />
        </div>
        <ul className="m-0 min-h-0 flex-1 list-none overflow-y-auto overscroll-contain px-3.5">
          {sheetNav.map((l, n) => {
            const on = isOn(path, l.href);
            return (
              <li key={l.href}>
                <Link
                  ref={n === 0 ? first : undefined}
                  href={l.href}
                  aria-current={on ? 'page' : undefined}
                  onClick={close}
                  className={`flex min-h-[3.25rem] items-center justify-between gap-3 border-b border-[var(--glass-hi)] px-2 font-heading text-[1.4rem] uppercase tracking-wide ${on ? 'text-gold' : 'text-white'}`}
                >
                  {l.label}
                  <small className="text-right font-body text-[0.8rem] normal-case tracking-normal text-[var(--glass-ink2)]">{l.hint}</small>
                </Link>
              </li>
            );
          })}
        </ul>
        <a href={`mailto:${site.email}`} className="mx-5 mt-3 text-center text-[0.95rem] text-[var(--glass-ink2)] underline-offset-4 hover:underline">
          {site.email}
        </a>
        <Link href="/quote" onClick={close} className="btn-gold mx-5 mb-4 mt-3 justify-center">
          Request a quote
        </Link>
      </div>
    </div>
  );
}
