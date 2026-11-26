"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// The intro film, "The Journey to the Game" (39s).
// First visit: plays full screen over the page (home page and holding page). Browsers block autoplay
// with sound, so it tries with sound and falls back to muted with a "Sound on" button.
// Skip, Escape or the end of the film closes it and remembers that it was seen (localStorage);
// the "Watch the film" button replays it at any time. Never autoplays for reduced motion.
// Rendered into <body> through a portal, so no stacking context on the page can trap it under the header.
// An inline script covers the page in navy before first paint, so the page does not flash first.

export const INTRO_SEEN_KEY = "t1-intro-seen";
const FILM = {
  large: "/video/intro-1080.mp4",
  small: "/video/intro-720.mp4",
  poster: "/video/intro-poster.jpg",
};

const pendingScript = `try{if(!localStorage.getItem('${INTRO_SEEN_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-pending')}catch(e){}`;

export function IntroFilm({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  const src = () =>
    typeof window !== "undefined" &&
    (window.innerWidth < 1100 ||
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData)
      ? FILM.small
      : FILM.large;

  const close = useCallback(() => {
    try {
      localStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
    setClosing(true);
    window.setTimeout(() => {
      video.current?.pause();
      setOpen(false);
      setClosing(false);
      setProgress(0);
      opener.current?.focus({ preventScroll: true });
    }, 600);
  }, []);

  // First visit: open straight away.
  useEffect(() => {
    const pending =
      document.documentElement.classList.contains("intro-pending");
    document.documentElement.classList.remove("intro-pending");
    if (pending) setOpen(true);
  }, []);

  // While open: start the film, lock scrolling, Escape closes.
  useEffect(() => {
    if (!open) return;
    const v = video.current;
    if (v) {
      v.src = src();
      v.currentTime = 0;
      v.muted = false;
      setMuted(false);
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
    skip.current?.focus({ preventScroll: true });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pendingScript }} />
      <button
        ref={opener}
        type="button"
        onClick={() => setOpen(true)}
        className={`intro-replay ${className}`}
      >
        <span aria-hidden="true" className="intro-replay-icon">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M5 3.5v9l7.5-4.5z" />
          </svg>
        </span>
        Watch the film
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Tier One intro film"
            className={`intro-film fixed inset-0 z-[100] flex items-center justify-center bg-navy ${closing ? "intro-film-out" : ""}`}
          >
            <video
              ref={video}
              poster={FILM.poster}
              playsInline
              preload="auto"
              onEnded={close}
              onTimeUpdate={(e) =>
                setProgress(
                  e.currentTarget.currentTime / (e.currentTarget.duration || 1),
                )
              }
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-x-0 top-0 flex justify-end p-4 sm:p-6">
              <button
                ref={skip}
                type="button"
                onClick={close}
                className="intro-control"
              >
                Skip
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={!muted}
                className="intro-control"
              >
                {muted ? "Sound on" : "Sound off"}
              </button>
              <span
                aria-hidden="true"
                className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/15"
              >
                <span
                  className="block h-full origin-left bg-gold"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </span>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
