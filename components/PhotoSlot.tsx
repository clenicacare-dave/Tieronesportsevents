import Image from 'next/image';
import type { Photo } from '@/content/types';

// Shows a licensed photo when one is set in content; until then, an atmospheric
// stadium-lines motif in the brand colours so layouts read correctly.
export function PhotoSlot({
  photo,
  label,
  priority,
  className = '',
  sizes = '(min-width: 1024px) 33vw, 100vw'
}: {
  photo?: Photo;
  label?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (photo) {
    return (
      <figure className={`relative overflow-hidden bg-navy ${className}`}>
        <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        {photo.credit && (
          <figcaption className="absolute bottom-2 right-3 text-[0.65rem] text-white/70">{photo.credit}</figcaption>
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
