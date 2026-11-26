import type { TravelEvent } from '../types';
import { photos } from '../photos';

// KIDS FOOTBALL EDITION: SAMPLE TRIPS. Illustrative only, for design review and Dave's sign-off.
// None is an available package: no tournaments, dates, prices, tickets or availability are confirmed.
// Tournament and venue names are generic on purpose: name a real tournament only once Tier One is
// entered or partnered with it. Replace with real trips and set sample: false / verified: true per trip.

const sampleNotice = 'Sample trip for design review. This is not an available package.';
const youthNotice = 'Supervision, group leader places and consent forms are agreed with the club, school or family in writing before travel.';

export const kidsTrips: TravelEvent[] = [
  {
    slug: 'youth-tournament-costa-brava',
    name: 'Easter youth tournament, Costa Brava',
    sport: 'football',
    summary: 'Your squad against teams from across Europe, with an opening parade, finals day and sunshine between games.',
    venue: 'Tournament pitches on the Costa Brava, to be confirmed',
    location: 'Costa Brava',
    country: 'Spain',
    date: { label: 'Easter holidays, dates to be confirmed' },
    package: 'Four nights, built around the tournament schedule (under-9s to under-18s, boys and girls)',
    accommodation: 'Team hotel with full board, players sharing rooms by age group, to be confirmed',
    transport: 'Group flights from Ireland and a private coach for the whole trip, to be confirmed',
    inclusions: ['Tournament entry', 'Full-board team hotel', 'Group flights', 'Private coach transfers', 'A Tier One contact throughout the trip'],
    exclusions: ['Travel insurance', 'Team kit', 'Personal spending money'],
    availability: 'enquire',
    notices: [sampleNotice, youthNotice],
    audiences: ['Clubs and academies', 'Schools'],
    featured: true,
    photo: photos.footballNight,
    sample: true,
    verified: false
  },
  {
    slug: 'training-camp-barcelona',
    name: 'Training camp near Barcelona',
    sport: 'football',
    summary: 'Coaching sessions, friendly matches against local sides and a stadium tour, planned around the age and level of your squad.',
    venue: 'Training pitches and match venues around Barcelona, to be arranged',
    location: 'Barcelona',
    country: 'Spain',
    date: { label: 'Pre-season or school holidays, arranged around your calendar' },
    package: 'Four to six nights, tailored to the squad',
    accommodation: 'Group accommodation suited to the age of the players, to be confirmed',
    transport: 'Group flights and a private coach, to be confirmed',
    inclusions: ['Coaching sessions with qualified local coaches', 'Arranged friendly matches', 'Stadium tour', 'Accommodation and meals', 'Group flights and coach'],
    exclusions: ['Travel insurance', 'Match tickets, unless confirmed in writing', 'Personal spending money'],
    availability: 'enquire',
    notices: [sampleNotice, youthNotice],
    audiences: ['Clubs and academies'],
    featured: true,
    photo: photos.footballStadium,
    sample: true,
    verified: false
  },
  {
    slug: 'school-football-tour-amsterdam',
    name: 'School football tour to Amsterdam',
    sport: 'football',
    summary: 'Fixtures against local school or club teams, a stadium tour and time to see the city, all planned with teachers in mind.',
    venue: 'Match venues to be arranged; stadium tour to be confirmed',
    location: 'Amsterdam',
    country: 'Netherlands',
    date: { label: 'Term time or school holidays, dates to be confirmed' },
    package: 'Three or four nights for a school squad and staff',
    accommodation: 'Group accommodation suited to school groups, to be confirmed',
    transport: 'Group flights or ferry and coach from Ireland, to be confirmed',
    inclusions: ['Arranged fixtures', 'Stadium tour', 'Accommodation and meals', 'Group travel and coach', 'Paperwork to support your school trip approval'],
    exclusions: ['Travel insurance', 'Personal spending money'],
    availability: 'enquire',
    notices: [sampleNotice, youthNotice],
    audiences: ['Schools'],
    featured: true,
    photo: photos.fansScarves,
    sample: true,
    verified: false
  },
  {
    slug: 'family-match-weekend-liverpool',
    name: 'Family match weekend in Liverpool',
    sport: 'football',
    summary: 'A first big match away for a young fan: a stadium tour, a family hotel and the game itself, if tickets are available.',
    venue: 'A Premier League ground in Liverpool, to be confirmed',
    location: 'Liverpool',
    country: 'England',
    date: { label: 'Selected home fixtures, dates to be confirmed' },
    package: 'Two nights for a family, built around the fixture',
    accommodation: 'Family room in a city-centre hotel, to be confirmed',
    transport: 'Flights or ferry from Ireland with transfers, to be confirmed',
    inclusions: ['Family hotel', 'Stadium tour', 'Travel and transfers'],
    exclusions: ['Match tickets, unless confirmed in writing', 'Travel insurance', 'Meals not listed as included'],
    availability: 'enquire',
    notices: [
      sampleNotice,
      'Fixture dates and kick-off times are set by the league and broadcasters and can move. Tickets come only from official sources.'
    ],
    audiences: ['Families'],
    featured: true,
    photo: photos.heroCrowd,
    sample: true,
    verified: false
  }
];
