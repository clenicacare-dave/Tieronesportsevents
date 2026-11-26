import { brand } from '@/brand/brand';

// The T1 badge in the home hero (both editions).
export function HeroBadge() {
  return (
    <div className="hero-badge relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.logo.badgeLarge} alt="" width={480} height={480} className="relative w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
