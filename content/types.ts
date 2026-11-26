// Content model. Pages render from these types; nothing about an event is hard-coded in a page.

export interface Photo {
  src: string; // path under public/, e.g. /photos/murrayfield.webp (licensed images only)
  alt: string;
  credit?: string; // photographer / licence, shown on the image
  source?: string; // where it came from, for the licence record
  position?: string; // CSS object-position for the crop, e.g. '70% 50%' (default centre)
}

export type SportSlug = 'football' | 'rugby' | 'motorsport' | 'golf' | 'racing';

export interface Sport {
  slug: SportSlug;
  name: string;
  // Short title and line for category tiles (from the starter-pack prototype).
  tile: { title: string; line: string };
  headline: string;
  summary: string;
  intro: string;
  highlights: string[];
  photo?: Photo;
}

export type Availability =
  | 'enquire' // default: nothing confirmed
  | 'available'
  | 'limited'
  | 'sold-out'
  | 'not-on-sale';

export interface TravelEvent {
  slug: string;
  name: string;
  sport: SportSlug;
  summary: string;
  venue: string;
  location: string; // city, region
  country: string;
  date: {
    label: string; // what visitors read, e.g. "Spring 2027, dates to be confirmed"
    start?: string; // ISO date, only once confirmed (enables schema.org Event)
    end?: string;
  };
  // Only set once confirmed in writing by Tier One. Never estimate.
  indicativePrice?: { from: number; currency: 'EUR' | 'GBP'; basis: string };
  package: string;
  accommodation: string;
  transport: string;
  inclusions: string[];
  exclusions: string[];
  availability: Availability;
  notices: string[];
  audiences: string[];
  featured?: boolean;
  // true = illustrative content for design review. Shown with a "Sample" label.
  sample: boolean;
  // true = every fact above has been checked by Tier One. Required for structured data.
  verified: boolean;
  photo?: Photo;
}

export interface Faq {
  question: string;
  answer: string;
}
