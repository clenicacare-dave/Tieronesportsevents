'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// The intro film, "The Journey to the Game" (39s).
// First visit (home page and holding page): a moment after the page has loaded, the film opens centred and
// large ("stage", muted until the visitor turns sound on). When it ends, it shrinks into a small player in the
// corner, resting on the closing badge frame, and is remembered as seen (localStorage); press play there to
// watch again, or close it. Shrink, Escape or a click outside sends it to the corner early; Expand goes full
// screen. "Watch the film" opens it centred at any time. Never autoplays for reduced motion.
// Rendered into <body> through a portal, so no stacking context on the page can trap it under the header.

export const INTRO_SEEN_KEY = 't1-intro-seen';
export const FILM_EVENT = 't1:film';
const FILM = {
  large: '/video/intro-1080.mp4',
  small: '/video/intro-720.mp4',
  poster: '/video/intro-poster.jpg'
};
const AUTO_DELAY_MS = 1000;

type Mode = 'closed' | 'stage' | 'mini' | 'full';

const saveData = () => !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
// 1080p for the big views on large screens; 720p for phones, data saver and the small player.
const pickSource = () => (window.innerWidth >= 1100 && !saveData() ? FILM.large : FILM.small);

// Tells the page the film is playing, so other animation (HeroRings) can ease off while it does.
const announce = (playing: boolean) => window.dispatchEvent(new CustomEvent(FILM_EVENT, { detail: { playing } }));

const markSeen = () => {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {}
};

export function IntroFilm({ className = '', aboveDock = false }: { className?: string; aboveDock?: boolean }) {
  const [mode, setMode] = useState<Mode>('closed');
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const firstControl = useRef<HTMLButtonElement>(null);
  const withSound = useRef(false);

  const close = useCallback(() => {
    markSeen();
    setLeaving(true);
    window.setTimeout(() => {
      video.current?.pause();
      setMode('closed');
      setLeaving(false);
      setProgress(0);
      announce(false);
    }, 350);
  }, []);

  const play = (fromStart = false) => {
    const v = video.current;
    if (!v) return;
    if (fromStart || v.ended) v.currentTime = 0;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  };

  const setSound = (on: boolean) => {
    const v = video.current;
    if (!v) return;
    v.muted = !on;
    setMuted(!on);
    if (v.paused) play();
  };

  // First visit: open centred once the page has had a moment on screen.
  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(INTRO_SEEN_KEY);
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => {
      withSound.current = false;
      setMode('stage');
    }, AUTO_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Start the film whenever the player opens from closed.
  const isOpen = mode !== 'closed';
  useEffect(() => {
    if (!isOpen) return;
    const v = video.current;
    if (!v) return;
    v.src = pickSource();
    v.muted = !withSound.current;
    setMuted(v.muted);
    announce(true);
    play(true);
  }, [isOpen]);

  // Centred and full screen are modal: lock scrolling (without the page shifting), focus the controls,
  // Escape steps down (full -> centred -> corner).
  const modal = mode === 'stage' || mode === 'full';
  useEffect(() => {
    if (!modal) return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    // Move focus into the player only when the visitor opened it (not on the automatic first play).
    if (withSound.current) firstControl.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode((m) => (m === 'full' ? 'stage' : 'mini'));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      window.removeEventListener('keydown', onKey);
    };
  }, [modal]);

  // The first play has ended: shrink to the corner and rest on the closing frame.
  const onEnded = () => {
    markSeen();
    setPlaying(false);
    if (mode !== 'mini') setMode('mini');
  };

  // From the corner (or the page button), open centred and play with sound.
  const openStage = () => {
    if (mode === 'closed') {
      withSound.current = true;
      setMode('stage');
      return;
    }
    setMode('stage');
    setSound(true);
    if (video.current?.ended) play(true);
  };

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
  const mini = mode === 'mini';

  return (
    <>
      <button type="button" onClick={openStage} className={`intro-replay ${className}`}>
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
            role={modal ? 'dialog' : 'region'}
            aria-modal={modal ? true : undefined}
            aria-label="Tier One intro film"
            data-mode={mode}
            className={`intro-player ${aboveDock ? 'intro-above-dock' : ''} ${leaving ? 'intro-leaving' : ''}`}
            onClick={(e) => mode === 'stage' && e.target === e.currentTarget && setMode('mini')}
          >
            <div className="intro-frame">
              <video
                ref={video}
                poster={FILM.poster}
                playsInline
                preload="metadata"
                onEnded={onEnded}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onClick={() => mini && openStage()}
                onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
                className={`h-full w-full ${mode === 'full' ? 'object-contain' : 'object-cover'} ${mini ? 'cursor-pointer' : ''}`}
              />
              <div className="intro-bar">
                {mini && !playing && (
                  <button type="button" onClick={openStage} aria-label="Play the film" className="intro-icon-btn text-gold">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M5 3.5v9l7.5-4.5z" />
                    </svg>
                  </button>
                )}
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
                {mode === 'stage' && (
                  <>
                    <button type="button" onClick={() => setMode('mini')} aria-label="Shrink film" className="intro-icon-btn">
                      <svg {...icon}>
                        <path d="M14 10l6-6M14 10V5M14 10h5M10 14l-6 6M10 14v5M10 14H5" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => setMode('full')} aria-label="Full screen" className="intro-icon-btn">
                      <svg {...icon}>
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                      </svg>
                    </button>
                  </>
                )}
                {mode === 'full' && (
                  <button type="button" onClick={() => setMode('stage')} aria-label="Exit full screen" className="intro-icon-btn">
                    <svg {...icon}>
                      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                    </svg>
                  </button>
                )}
                {mini && (
                  <button type="button" onClick={openStage} aria-label="Expand film" className="intro-icon-btn">
                    <svg {...icon}>
                      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                    </svg>
                  </button>
                )}
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
