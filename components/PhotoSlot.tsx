import Image from 'next/image';
import type { Photo } from '@/content/types';
import { smallSrc } from '@/content/photos';

// Shows a licensed photo when one is set in content; until then, an atmospheric
// stadium-lines motif in the brand colours so layouts read correctly.
export function PhotoSlot({
  photo,
  label,
  priority,
  small,
  rings = true,
  creditTop,
  className = '',
  sizes = '(min-width: 1024px) 33vw, 100vw'
}: {
  photo?: Photo;
  label?: string;
  priority?: boolean;
  small?: boolean; // card-sized file, no credit overlay
  rings?: boolean; // gold rings overlay (default on)
  creditTop?: boolean; // show the credit top-right (when something sits at the bottom)
  className?: string;
  sizes?: string;
}) {
  if (photo) {
    return (
      <figure className={`${className.includes('absolute') ? '' : 'relative'} overflow-hidden bg-navy ${className}`}>
        <Image src={small ? smallSrc(photo.src) : photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        {rings && <div aria-hidden="true" className={`photo-rings ${small ? 'photo-rings-sm' : ''}`} />}
        {photo.credit && !small && (
          <figcaption className={`absolute ${creditTop ? 'top-2' : 'bottom-2'} right-3 z-10 text-[0.65rem] text-white/70 [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]`}>{photo.credit}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <div className={`motif relative overflow-hidden ${className}`} aria-hidden="true">
      {label && (
        <span className="absolute bottom-4 left-5 font-heading text-5xl font-semibold uppercase leading-none tracking-wide text-white/[0.12] sm:text-6xl">
          {label}
        </span>
      )}
    </div>
  );
}
