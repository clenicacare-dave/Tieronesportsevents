import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileDock } from '@/components/MobileDock';
import { JsonLd } from '@/components/ui';
import { brand } from '@/brand/brand';
import { site, absoluteUrl } from '@/lib/site';

// The full site: header, footer and phone dock. The holding page lives outside this group.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <MobileDock />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: brand.name,
          url: site.url,
          logo: absoluteUrl(brand.icons.icon512),
          email: site.email,
          areaServed: ['IE', 'GB']
        }}
      />
    </>
  );
}
