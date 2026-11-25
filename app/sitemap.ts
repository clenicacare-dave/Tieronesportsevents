import type { MetadataRoute } from 'next';
import { events } from '@/content/events';
import { sports } from '@/content/sports';
import { absoluteUrl } from '@/lib/site';

const pages = [
  '/',
  '/events',
  '/sports',
  '/group-travel',
  '/corporate-hospitality',
  '/bespoke-trips',
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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p) })),
    ...sports.map((s) => ({ url: absoluteUrl(`/sports/${s.slug}`) })),
    // Sample events are noindex, so they stay out of the sitemap.
    ...events.filter((e) => !e.sample).map((e) => ({ url: absoluteUrl(`/events/${e.slug}`) }))
  ];
}
