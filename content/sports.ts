import type { Sport, SportSlug } from './types';

export const sports: Sport[] = [
  {
    slug: 'football',
    name: 'Football',
    headline: 'Football weekends and club tours',
    summary: 'Matchday weekends in the UK and Europe, and tours built around your own squad.',
    intro:
      'From a supporters’ weekend to a full club tour with fixtures and training, we plan the travel around the match, so you can focus on the occasion.',
    highlights: [
      'Supporter weekends built around a fixture',
      'Club, school and academy tours with fixtures and training',
      'City stays planned around kick-off times'
    ]
  },
  {
    slug: 'rugby',
    name: 'Rugby',
    headline: 'International and club rugby',
    summary: 'International weekends and club rugby travel for supporters and groups.',
    intro:
      'Rugby weekends are as much about the city as the stadium. We plan the travel, the stay and the time around the match.',
    highlights: [
      'International weekends',
      'Club and supporters’ group travel',
      'Hotels within reach of the stadium'
    ]
  },
  {
    slug: 'motorsport',
    name: 'Motorsport',
    headline: 'Grand Prix travel',
    summary: 'Race weekends at iconic circuits, planned around the full event.',
    intro:
      'A Grand Prix weekend runs over several days. We plan the travel and accommodation so you can make the most of each one.',
    highlights: ['Multi-day race weekends', 'Accommodation and circuit transport', 'Groups and corporate guests']
  },
  {
    slug: 'golf',
    name: 'Golf',
    headline: 'Golf breaks and tournament travel',
    summary: 'Tournament travel and golf breaks for friends, societies and corporate groups.',
    intro:
      'Whether you are watching the best in the world or playing yourselves, we plan tee times, transfers and accommodation around the group.',
    highlights: ['Golf society and group breaks', 'Tournament spectator travel', 'Corporate golf days']
  },
  {
    slug: 'racing',
    name: 'Racing',
    headline: 'Festival racing',
    summary: 'The big racing festivals in Ireland and the UK, with travel and stays arranged.',
    intro:
      'Festival racing is a social occasion. We plan the travel and stays so the group arrives together and gets home easily.',
    highlights: ['Festival weekends', 'Group and corporate travel', 'Accommodation close to the course']
  }
];

export const getSport = (slug: string) => sports.find((s) => s.slug === slug);
export const sportName = (slug: SportSlug) => getSport(slug)?.name ?? slug;
