'use client';

import { useEffect, useState } from 'react';

// Date and time in the header's right-hand side on phones and tablets, styled like the logo lockup:
// time large and white, date small, gold and spaced. Uses the visitor's own clock (Ireland and the UK
// share one). Rendered only in the browser, in a fixed-size box, so the page never jumps.
export function HeaderClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  const time = now?.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', hour12: false });
  const date = now?.toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <time
      dateTime={now?.toISOString()}
      suppressHydrationWarning
      className="flex h-[2.6rem] min-w-[6.5rem] flex-col items-end justify-center font-heading uppercase leading-none"
    >
      <span className="text-[1.45rem] font-semibold tracking-[0.06em] text-white tabular-nums">{time ?? ' '}</span>
      <span className="mt-1 text-[0.72rem] font-medium tracking-[0.24em] text-gold">{date ?? ' '}</span>
    </time>
  );
}
