import type { Availability, TravelEvent } from './types';
import { photos } from './photos';
import { getSport } from './sports';

// SAMPLE CONTENT. Every event below is illustrative, for design review only.
// None is an available package: no dates, prices, tickets or availability are confirmed.
// Before launch, replace with real events and set sample: false / verified: true per event.

const sampleNotice = 'Sample event for design review. This is not an available package.';

const standardExclusions = [
  'Match or event tickets, unless confirmed in writing',
  'Travel insurance',
  'Meals and drinks not listed as included'
];

export const events: TravelEvent[] = [
  {
    slug: 'six-nations-weekend-edinburgh',
    name: 'Six Nations weekend in Edinburgh',
    sport: 'rugby',
    summary: 'A rugby weekend in Edinburgh, with time to enjoy the city before and after the match.',
    venue: 'Scottish Gas Murrayfield Stadium',
    location: 'Edinburgh',
    country: 'Scotland',
    date: { label: 'Spring, dates to be confirmed' },
    package: 'Weekend, two or three nights',
    accommodation: 'City-centre hotel, to be confirmed',
    transport: 'Flights from Ireland with airport transfers, to be confirmed',
    inclusions: ['Accommodation', 'Return flights', 'Airport transfers', 'Pre-trip travel information'],
    exclusions: standardExclusions,
    availability: 'enquire',
    notices: [sampleNotice],
    audiences: ['Supporters', 'Friends', 'Corporate groups'],
    featured: true,
    sample: true,
    verified: false
  },
  {
    slug: 'british-grand-prix-weekend',
    name: 'British Grand Prix weekend',
    sport: 'motorsport',
    summary: 'A race weekend at Silverstone, with accommodation and circuit transport arranged.',
    venue: 'Silverstone Circuit',
    location: 'Northamptonshire',
    country: 'England',
    date: { label: 'Summer, dates to be confirmed' },
    package: 'Race weekend, three nights',
    accommodation: 'Hotel within travelling distance of the circuit, to be confirmed',
    transport: 'Flights or ferry from Ireland, with circuit transfers, to be confirmed',
    inclusions: ['Accommodation', 'Return travel from Ireland', 'Daily circuit transfers'],
    exclusions: standardExclusions,
    availability: 'enquire',
    notices: [sampleNotice],
    audiences: ['Friends', 'Families', 'Corporate groups'],
    featured: true,
    sample: true,
    verified: false
  },
  {
    slug: 'cheltenham-festival',
    name: 'Cheltenham Festival',
    sport: 'racing',
    summary: 'Festival racing in the Cotswolds, with the group travelling and staying together.',
    venue: 'Cheltenham Racecourse',
    location: 'Gloucestershire',
    country: 'England',
    date: { label: 'March, dates to be confirmed' },
    package: 'Two to four nights',
    accommodation: 'Hotel or guest house, to be confirmed',
    transport: 'Flights from Ireland with racecourse transfers, to be confirmed',
    inclusions: ['Accommodation', 'Return flights', 'Racecourse transfers'],
    exclusions: standardExclusions,
    availability: 'enquire',
    notices: [sampleNotice],
    audiences: ['Friends', 'Corporate groups'],
    featured: true,
    sample: true,
    verified: false
  },
  {
    slug: 'manchester-football-weekend',
    name: 'Manchester football weekend',
    sport: 'football',
    summary: 'A Premier League weekend in Manchester, planned around the fixture.',
    venue: 'Old Trafford or the Etihad Stadium, depending on the fixture',
    location: 'Manchester',
    country: 'England',
    date: { label: 'Season dates to be confirmed' },
    package: 'Weekend, two nights',
    accommodation: 'City-centre hotel, to be confirmed',
    transport: 'Flights from Ireland with transfers, to be confirmed',
    inclusions: ['Accommodation', 'Return flights', 'Airport transfers'],
    exclusions: standardExclusions,
    availability: 'enquire',
    notices: [sampleNotice, 'Premier League fixtures can move for television coverage.'],
    audiences: ['Supporters', 'Families', 'Friends'],
    featured: true,
    sample: true,
    verified: false
  },
  {
    slug: 'club-football-tour-barcelona',
    name: 'Club football tour to Barcelona',
    sport: 'football',
    summary: 'A tour for your own squad: fixtures at the right level, training and time to explore the city.',
    venue: 'Training and match venues to be arranged',
    location: 'Barcelona',
    country: 'Spain',
    date: { label: 'Dates arranged around your season' },
    package: 'Four to six nights, tailored to the squad',
    accommodation: 'Group accommodation suited to the age of the squad, to be confirmed',
    transport: 'Group flights and a private coach, to be confirmed',
    inclusions: ['Accommodation', 'Group flights', 'Coach transport', 'Arranged fixtures and training sessions'],
    exclusions: ['Travel insurance', 'Meals not listed as included', 'Personal spending'],
    availability: 'enquire',
    notices: [sampleNotice],
    audiences: ['Clubs', 'Schools', 'Academies', 'Universities'],
    photo: photos.footballNight,
    sample: true,
    verified: false
  },
  {
    slug: 'algarve-golf-break',
    name: 'Algarve golf break',
    sport: 'golf',
    summary: 'A golf break for a society or a group of friends, with tee times and transfers arranged.',
    venue: 'Selected courses, to be confirmed',
    location: 'Algarve',
    country: 'Portugal',
    date: { label: 'Spring or autumn, dates to suit the group' },
    package: 'Three to five nights',
    accommodation: 'Golf resort or hotel, to be confirmed',
    transport: 'Flights from Ireland with course transfers, to be confirmed',
    inclusions: ['Accommodation', 'Return flights', 'Course transfers', 'Tee times'],
    exclusions: ['Travel insurance', 'Club hire', 'Meals not listed as included'],
    availability: 'enquire',
    notices: [sampleNotice],
    audiences: ['Golf societies', 'Friends', 'Corporate groups'],
    photo: photos.golfSunset,
    sample: true,
    verified: false
  }
];

export const availabilityLabel: Record<Availability, string> = {
  enquire: 'Enquire for availability',
  available: 'Available',
  limited: 'Limited availability',
  'sold-out': 'Sold out',
  'not-on-sale': 'Not yet on sale'
};

// An event without its own photo uses its sport's photo.
export const eventPhoto = (e: TravelEvent) => e.photo ?? getSport(e.sport)?.photo;

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
export const featuredEvents = () => events.filter((e) => e.featured);
export const eventsForSport = (sport: string) => events.filter((e) => e.sport === sport);
