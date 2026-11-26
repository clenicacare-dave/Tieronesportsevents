import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { brand } from '@/brand/brand';
import { site } from '@/lib/site';
import { editionDescription, isKids } from '@/lib/edition';

// Fonts are downloaded at build time and served from this site: no runtime calls to Google.
const heading = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-heading', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: isKids ? `${brand.name} | Youth football trips from ${site.regions}` : `${brand.name} | Sports travel from ${site.regions}`, template: `%s | ${brand.name}` },
  description: editionDescription,
  applicationName: brand.name,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: brand.icons.favicon, sizes: 'any' },
      { url: brand.icons.icon32, type: 'image/png', sizes: '32x32' }
    ],
    apple: brand.icons.apple
  },
  openGraph: {
    type: 'website',
    siteName: brand.name,
    locale: site.locale,
    images: [{ url: brand.icons.icon512, width: 512, height: 512, alt: brand.logo.alt }]
  },
  twitter: { card: 'summary' }
};

// viewportFit 'cover' lets the dock use the iPhone safe area (env(safe-area-inset-bottom)).
export const viewport: Viewport = { themeColor: brand.themeColor, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
