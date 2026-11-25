import Link from 'next/link';
import { brand } from '@/brand/brand';

// Horizontal lockup: the supplied T1 badge (unaltered) beside live text.
// Live text instead of the supplied raster SVG lockup: sharper, ~4 KB instead of ~300 KB,
// and it follows the brand fonts. Swap the badge in brand/brand.ts.
export function Logo({ tone = 'light', size = 'md' }: { tone?: 'light' | 'dark'; size?: 'md' | 'lg' }) {
  const badge = size === 'lg' ? 64 : 44;
  return (
    <Link href="/" className="group inline-flex items-center gap-3 rounded-brand focus-visible:outline-offset-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={size === 'lg' ? brand.logo.badgeMedium : brand.logo.badgeSmall} alt="" width={badge} height={badge} className="shrink-0" />
      <span className="flex flex-col font-heading uppercase leading-none">
        <span className={`text-[1.45rem] font-semibold tracking-[0.06em] ${tone === 'light' ? 'text-white' : 'text-navy'}`}>{brand.lockup.line1}</span>
        <span className={`mt-1 text-[0.72rem] font-medium tracking-[0.32em] ${tone === 'light' ? 'text-gold' : 'text-gold-dark'}`}>{brand.lockup.line2}</span>
      </span>
    </Link>
  );
}
