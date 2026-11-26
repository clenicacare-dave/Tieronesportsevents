import type { Photo } from './types';
import { photos } from './photos';
import { isKids } from '@/lib/edition';

// Home page photography. Add licensed images (hero 2400×1000, clear left-hand area for text).
export const heroPhoto: Photo | undefined = photos.heroWinger;
export const groupsPhoto: Photo | undefined = photos.fansScarves;

const fullHowItWorks = [
  { n: '01', title: 'Discover', lead: 'Find your event.', body: 'The sport, the event or the idea, who is travelling and roughly when.' },
  { n: '02', title: 'Plan', lead: 'Tell us what you need.', body: 'We come back with travel, accommodation and what is included, set out clearly in writing.' },
  { n: '03', title: 'Experience', lead: 'Enjoy the occasion.', body: 'Nothing is booked until you confirm. Then we look after the details.' }
];

// How Tier One works. These are commitments about process, not awards or accreditations.
// Add accreditations or memberships only once held and verifiable.
const fullPromises = [
  { title: 'Everything in writing', body: 'Every quote sets out what is included and what is not, before you commit.' },
  { title: 'Built around the fixture', body: 'Travel and stays planned around the event, including what happens if it moves.' },
  { title: 'Groups of any size', body: 'From two friends to a full club, the trip is shaped around who is going.' },
  { title: 'A real reply', body: 'A person reads every enquiry and replies, usually within one working day.' }
];

// Kids football edition.
const kidsHowItWorks = [
  { n: '01', title: 'Discover', lead: 'Tell us about the squad.', body: 'Who is going, their ages, and the tournament, camp, tour or match you have in mind.' },
  { n: '02', title: 'Plan', lead: 'Get it in writing.', body: 'Travel, the stay, the football and what is included, set out clearly for coaches, teachers and parents.' },
  { n: '03', title: 'Play', lead: 'Enjoy the trip.', body: 'Nothing is booked until you confirm. Then we look after the details, start to finish.' }
];

const kidsPromises = [
  { title: 'Everything in writing', body: 'Every quote sets out what is included and what is not, ready to share with parents, boards and committees.' },
  { title: 'Supervision agreed up front', body: 'Adult places, supervision and rooms agreed with the club, school or family before anything is booked.' },
  { title: 'Built around the football', body: 'Travel and stays planned around tournament schedules, training and kick-off times.' },
  { title: 'A real reply', body: 'A person reads every enquiry and replies, usually within one working day.' }
];

export const howItWorks = isKids ? kidsHowItWorks : fullHowItWorks;
export const promises = isKids ? kidsPromises : fullPromises;
