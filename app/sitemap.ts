import type { MetadataRoute } from 'next';
import { events } from '@/content/events';
import { sports } from '@/content/sports';
import { absoluteUrl } from '@/lib/site';
import { isKids } from '@/lib/edition';

const shared = [
  '/',
  '/events',
  '/about',
  '/how-it-works',
  '/faqs',
  '/travel-information',
  '/contact',
  '/quote',
  '/privacy',
  '/cookies',
  '/terms'
];

// Pages that exist only in one edition (lib/edition.ts).
const editionPages = isKids
  ? ['/clubs-and-academies', '/schools', '/families']
  : ['/sports', '/group-travel', '/corporate-hospitality', '/bespoke-trips', ...sports.map((s) => `/sports/${s.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[...shared, ...editionPages].map((p) => ({ url: absoluteUrl(p) })),
    // Sample events are noindex, so they stay out of the sitemap.
    ...events.filter((e) => !e.sample).map((e) => ({ url: absoluteUrl(`/events/${e.slug}`) }))
  ];
}
