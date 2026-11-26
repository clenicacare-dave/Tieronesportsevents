import type { Photo } from './types';

// Every photo used on the site, with its source and licence.
// All from Unsplash under the Unsplash License (free for commercial use, no attribution required;
// we credit photographers anyway). Checked 25 Nov 2026: none are Unsplash+.
// Chosen to avoid club crests, sponsors and recognisable players, so nothing implies a partnership.
// Each file exists at /photos/<name>.webp (2000px, hero 2400px) and /photos/<name>-sm.webp (960px, for cards).
// To replace one: drop new files with the same names into public/photos/, or add an entry here.

const unsplash = (name: string, alt: string, photographer: string, id: string): Photo => ({
  src: `/photos/${name}.webp`,
  alt,
  credit: `Photo: ${photographer} / Unsplash`,
  source: `https://unsplash.com/photos/${id}`
});

export const photos = {
  heroCrowd: unsplash('hero-crowd', 'Supporters watching a floodlit football match from the stands', 'Fikri Rasyid', 'xl7675LXTO0'),
  footballStadium: unsplash('football-stadium', 'A packed football stadium under floodlights', 'Howard Bouchevereau', 'yKHZ65nuEtE'),
  footballNight: unsplash('football-night', 'A football match in a stadium at night', 'Alex Simpson', 'DOicNPBVSHs'),
  rugbyPosts: unsplash('rugby-posts', 'Rugby posts on the pitch of a large stadium', 'Thomas Serer', 'QUr0R1VZPNw'),
  motorsportTrack: unsplash('motorsport-track', 'A racing car at speed on a circuit', 'Spencer Davis', '_QlczAt-Ffc'),
  golfLinks: unsplash('golf-links', 'Rolling links golf course with deep bunkers', 'Taryn Kaahanui', 'e3sxd6xw3VM'),
  golfSunset: unsplash('golf-bunker-sunset', 'A golf green and bunker at sunset', 'Edwin Compton', 'Z8XlmAj65iM'),
  racingHorses: unsplash('racing-horses', 'Racehorses and jockeys in full stride on turf', 'Julia Joppien', 'IojCPQ2rWe8'),
  fansScarves: unsplash('fans-scarves', 'Supporters holding scarves aloft in a stadium', 'Emerson Vieira', '_t4qb96wc14'),
  hospitality: unsplash('hospitality-coupes', 'Champagne coupes catching warm golden light', 'Billy Huynh', 'saS98jKhVjA'),
  travelWing: unsplash('travel-wing-sunset', 'An aircraft wing above the clouds at sunset', 'Eleni Afiontzi', 'bcGNFkRU7nA')
} satisfies Record<string, Photo>;

// Card-sized version of a photo (960px).
export const smallSrc = (src: string) => src.replace(/\.webp$/, '-sm.webp');
