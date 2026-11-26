// Which version of the site to build.
//   'kids-football' (default): youth football trips only, for clubs and academies, schools and families.
//                              This is what Tier One can sell now.
//   'full':                    every sport, corporate hospitality and bespoke trips (kept for later).
// Switch at build time: NEXT_PUBLIC_SITE_EDITION=full npx opennextjs-cloudflare build
// Pages outside the active edition return 404 and stay out of the sitemap, navigation and forms.

export type Edition = 'kids-football' | 'full';

export const edition: Edition = process.env.NEXT_PUBLIC_SITE_EDITION === 'full' ? 'full' : 'kids-football';
export const isKids = edition === 'kids-football';
export const isFull = edition === 'full';

// One-line description of the business for metadata and the holding page.
export const editionDescription = isKids
  ? 'Football trips for young players: tournaments, training camps and tours for clubs, academies and schools, and match weekends for families, from Ireland and the UK.'
  : 'Sports travel for supporters, families, clubs and corporate groups from Ireland and the UK: football, rugby, Grand Prix, golf and racing.';

// What the event list is called in each edition (the URL stays /events).
export const eventsLabel = isKids ? 'Trips' : 'Events';
