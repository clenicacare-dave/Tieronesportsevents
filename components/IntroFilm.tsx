'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// The intro film, "The Journey to the Game" (39s).
// First visit (home page and holding page): a small muted player slides into the corner a moment after the
// page has loaded, so the page itself is seen first. Expand opens it full screen (with sound); Shrink or
// Escape returns it to the corner; Close or the end of the film dismisses it and remembers that it was seen
// (localStorage). The "Watch the film" button opens it full screen at any time.
// Never autoplays for reduced motion. Rendered into <body> through a portal, so no stacking context on the
// page can trap it under the header.

export const INTRO_SEEN_KEY = 't1-intro-seen';
export const FILM_EVENT = 't1:film';
const FILM = {
  large: '/video/intro-1080.mp4',
  small: '/video/intro-720.mp4',
  poster: '/video/intro-poster.jpg'
};
const AUTO_DELAY_MS = 1200;

type Mode = 'closed' | 'mini' | 'full';

// The small player always uses the 720p file; full screen on a large screen (without data saver) uses 1080p.
const pickSource = (full: boolean) =>
  full && window.innerWidth >= 1100 && !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    ? FILM.large
    : FILM.small;

// Tells the page the film is playing, so other animation (HeroRings) can rest while it does.
const announce = (playing: boolean) => window.dispatchEvent(new CustomEvent(FILM_EVENT, { detail: { playing } }));

export function IntroFilm({ className = '', aboveDock = false }: { className?: string; aboveDock?: boolean }) {
  const [mode, setMode] = useState<Mode>('closed');
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const firstControl = useRef<HTMLButtonElement>(null);
  const startWith = useRef<{ sound: boolean }>({ sound: false });

  const markSeen = () => {
    try {
      localStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {}
  };

  const close = useCallback(() => {
    markSeen();
    setLeaving(true);
    window.setTimeout(() => {
      video.current?.pause();
      setMode('closed');
      setLeaving(false);
      announce(false);
      setProgress(0);
    }, 350);
  }, []);

  const setSound = (on: boolean) => {
    const v = video.current;
    if (!v) return;
    v.muted = !on;
    setMuted(!on);
    if (v.paused) v.play().catch(() => {});
  };

  // First visit: slide the small player in once the page has had a moment on screen.
  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(INTRO_SEEN_KEY);
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => {
      startWith.current = { sound: false };
      setMode('mini');
    }, AUTO_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Start the film whenever the player opens from closed.
  const isOpen = mode !== 'closed';
  useEffect(() => {
    if (!isOpen) return;
    const v = video.current;
    if (!v) return;
    v.src = pickSource(startWith.current.sound);
    v.currentTime = 0;
    announce(true);
    v.muted = !startWith.current.sound;
    setMuted(v.muted);
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, [isOpen]);

  // Full screen: lock scrolling (without the page shifting), focus the controls, Escape shrinks.
  useEffect(() => {
    if (mode !== 'full') return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    firstControl.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMode('mini');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      window.removeEventListener('keydown', onKey);
    };
  }, [mode]);

  const openFull = () => {
    if (mode === 'closed') {
      startWith.current = { sound: true };
      setMode('full');
    } else {
      setMode('full');
      setSound(true);
      // Swap to the sharper file at the same moment of the film.
      const v = video.current;
      const want = pickSource(true);
      if (v && !v.currentSrc.endsWith(want)) {
        const at = v.currentTime;
        v.src = want;
        v.addEventListener(
          'loadedmetadata',
          () => {
            v.currentTime = at;
            v.play().catch(() => {});
          },
          { once: true }
        );
      }
    }
  };

  const full = mode === 'full';
  const icon = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };

  return (
    <>
      <button ref={opener} type="button" onClick={openFull} className={`intro-replay ${className}`}>
        <span aria-hidden="true" className="intro-replay-icon">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M5 3.5v9l7.5-4.5z" />
          </svg>
        </span>
        Watch the film
      </button>

      {isOpen &&
        createPortal(
          <div
            role={full ? 'dialog' : 'region'}
            aria-modal={full ? true : undefined}
            aria-label="Tier One intro film"
            data-mode={mode}
            className={`intro-player ${aboveDock ? 'intro-above-dock' : ''} ${leaving ? 'intro-leaving' : ''}`}
          >
            <div className="intro-frame">
              <video
                ref={video}
                poster={FILM.poster}
                playsInline
                preload="metadata"
                onEnded={close}
                onClick={() => !full && openFull()}
                onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
                className={`h-full w-full ${full ? 'object-contain' : 'cursor-pointer object-cover'}`}
              />
              <div className="intro-bar">
                <button
                  ref={firstControl}
                  type="button"
                  onClick={() => setSound(muted)}
                  aria-pressed={!muted}
                  aria-label={muted ? 'Sound on' : 'Sound off'}
                  className="intro-icon-btn"
                >
                  {muted ? (
                    <svg {...icon}>
                      <path d="M4 9v6h4l5 4V5L8 9H4z" />
                      <path d="M17 9l4 6M21 9l-4 6" />
                    </svg>
                  ) : (
                    <svg {...icon}>
                      <path d="M4 9v6h4l5 4V5L8 9H4z" />
                      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
                    </svg>
                  )}
                </button>
                <span aria-hidden="true" className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/20">
                  <span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
                </span>
                <button
                  type="button"
                  onClick={() => (full ? setMode('mini') : openFull())}
                  aria-label={full ? 'Shrink film' : 'Expand film'}
                  className="intro-icon-btn"
                >
                  {full ? (
                    <svg {...icon}>
                      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                    </svg>
                  ) : (
                    <svg {...icon}>
                      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                    </svg>
                  )}
                </button>
                <button type="button" onClick={close} aria-label="Close film" className="intro-icon-btn">
                  <svg {...icon}>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
