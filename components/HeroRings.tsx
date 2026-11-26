'use client';

import { useEffect, useRef } from 'react';

// Gold rings moving out from the T1 badge on the home hero, drawn on one canvas.
// Desktop (1280px+): rings leave the badge fast and slow down as they spread, fading out (12s cycle).
// Phones and tablets: a steady ripple from the bottom centre, behind the badge that straddles the edge.
// A canvas keeps the lines crisp and costs almost nothing per frame; the earlier CSS versions
// (animating ring width, or a custom property inside a huge gradient) repainted large areas every
// frame and shimmered. Pauses off screen; draws nothing for visitors who prefer reduced motion
// (the fixed fine-line texture in CSS stays).

const GOLD = '217, 183, 108';
const DESKTOP = '(min-width: 1280px)';

export function HeroRings() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !section || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wide = window.matchMedia(DESKTOP);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let r0 = 0; // badge radius (desktop)
    let frame = 0;
    let visible = true;

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const box = section.getBoundingClientRect();
      w = box.width;
      h = box.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const anchor = section.querySelector<HTMLElement>('[data-ring-centre]');
      if (wide.matches && anchor) {
        const a = anchor.getBoundingClientRect();
        cx = a.left - box.left + a.width / 2;
        cy = a.top - box.top + a.height / 2;
        r0 = a.width / 2;
      } else {
        cx = w / 2;
        cy = h;
        r0 = 0;
      }
    };

    const ring = (r: number, alpha: number, width: number) => {
      if (alpha <= 0.004 || r <= 0) return;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    // Desktop: 14 rings, each on a 12s life. Fast near the badge, slow far out.
    const drawWide = (s: number) => {
      const count = 14;
      const life = 12;
      const reach = r0 * 5.2;
      for (let i = 0; i < count; i++) {
        const t = ((s + (i * life) / count) % life) / life;
        const eased = 1 - Math.pow(1 - t, 2.6);
        const r = r0 + (reach - r0) * eased;
        const fade = t < 0.03 ? t / 0.03 : t < 0.6 ? 1 - ((t - 0.03) / 0.57) * 0.55 : 0.45 * (1 - (t - 0.6) / 0.4);
        ring(r, 0.5 * fade, 1.5);
      }
    };

    // Phones and tablets: evenly spaced rings drifting outwards at a steady pace, fading with distance.
    const drawNarrow = (s: number) => {
      const gap = 56;
      const max = 504;
      const offset = ((s / 3.2) * gap) % gap;
      for (let r = offset; r < max; r += gap) {
        const d = r / 700;
        const mask = d < 0.08 ? 1 : d < 0.35 ? 1 - ((d - 0.08) / 0.27) * 0.45 : 0.55 * (1 - (d - 0.35) / 0.37);
        ring(r, 0.42 * Math.max(0, mask), 1.6);
      }
    };

    const tick = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const s = now / 1000;
      if (wide.matches) drawWide(s);
      else drawNarrow(s);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    measure();
    start();

    const resize = new ResizeObserver(() => measure());
    resize.observe(section);
    const seen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    seen.observe(section);
    wide.addEventListener('change', measure);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      wide.removeEventListener('change', measure);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />;
}
