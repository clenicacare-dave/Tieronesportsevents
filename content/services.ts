import type { Photo } from './types';
import { photos } from './photos';

export interface Service {
  // Full edition: group travel, corporate, bespoke. Kids football edition: the audience pages in content/kids/audiences.ts.
  slug: 'group-travel' | 'corporate-hospitality' | 'bespoke-trips' | 'clubs-and-academies' | 'schools' | 'families';
  eyebrow: string;
  title: string;
  description: string; // meta description
  intro: string;
  photo?: Photo;
  audiences: string[];
  sections: { title: string; body: string }[];
  ask: string[]; // what to tell us in an enquiry
}

export type FullServiceSlug = 'group-travel' | 'corporate-hospitality' | 'bespoke-trips';

export const services: Record<FullServiceSlug, Service> = {
  'group-travel': {
    slug: 'group-travel',
    photo: photos.fansScarves,
    eyebrow: 'Group travel',
    title: 'Your trip. Your team. Your way.',
    description: 'Sports trips for clubs, schools, supporters’ groups and friends from Ireland and the UK.',
    intro:
      'Travelling as a group changes everything: rooms, transport, timings and budgets. We plan the trip around who is going and what the group wants from it.',
    audiences: ['Clubs and academies', 'Schools and universities', 'Supporters’ groups', 'Golf societies', 'Friends and families'],
    sections: [
      {
        title: 'Club and team tours',
        body: 'Fixtures at the right level, purposeful training and time to discover a new place together. Built around the age, level and goals of your squad.'
      },
      {
        title: 'Supporters and friends',
        body: 'Travel together, stay together and get to the ground together. We plan around kick-off and the time either side of it.'
      },
      {
        title: 'One point of contact',
        body: 'The organiser deals with one person from first enquiry to the trip home, with everything confirmed in writing.'
      }
    ],
    ask: ['Who is travelling and how many', 'The event, sport or destination', 'Dates or a rough window', 'Where you are travelling from', 'Anything the group needs (ages, access, budget)']
  },
  'corporate-hospitality': {
    slug: 'corporate-hospitality',
    photo: photos.hospitality,
    eyebrow: 'Corporate hospitality',
    title: 'Hosting at the highest level',
    description: 'Sports travel and hospitality for corporate groups, clients and teams from Ireland and the UK.',
    intro:
      'A major sporting occasion is a memorable way to thank clients or reward a team. We plan the travel, the stay and the day, so your guests are looked after from start to finish.',
    audiences: ['Client entertainment', 'Team rewards', 'Partner and supplier events', 'Small executive groups'],
    sections: [
      {
        title: 'Planned around your guests',
        body: 'Travel, accommodation and timings arranged for the group, with clear information sent to each guest before they go.'
      },
      {
        title: 'Hospitality options',
        body: 'Where hospitality packages are available for an event, we will set out the options and what each includes. Availability varies by event and is confirmed in writing.'
      },
      {
        title: 'Clear paperwork',
        body: 'A written quote with what is and is not included, so approvals inside your organisation are straightforward.'
      }
    ],
    ask: ['Company and number of guests', 'The event or sport', 'Dates and budget range', 'Hospitality level you have in mind', 'Any guest requirements']
  },
  'bespoke-trips': {
    slug: 'bespoke-trips',
    photo: photos.travelWing,
    eyebrow: 'Bespoke trips',
    title: 'If you can picture it, ask',
    description: 'Tailor-made sports trips: a milestone birthday, a once-in-a-lifetime fixture or a sporting bucket list.',
    intro:
      'Some trips do not fit a list: a milestone birthday at a final, a weekend built around two fixtures, or a sport we have not listed yet. Tell us the idea and we will see what is possible.',
    audiences: ['Milestone celebrations', 'Bucket-list events', 'Multi-event trips', 'Sports not listed on the site'],
    sections: [
      {
        title: 'Start with the idea',
        body: 'Tell us the occasion and what would make it special. We will come back with what is realistic, and what it would involve.'
      },
      {
        title: 'Honest about what is possible',
        body: 'Some events sell out or depend on availability we cannot guarantee. We will say so up front, rather than after you have committed.'
      },
      {
        title: 'Built for you',
        body: 'Dates, pace, accommodation and extras chosen around the people travelling.'
      }
    ],
    ask: ['The occasion or the idea', 'Who is travelling', 'Dates or a rough window', 'What would make it special']
  }
};
