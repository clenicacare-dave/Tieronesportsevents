import type { Photo } from './types';

// Home page photography. Add licensed images (hero 2400×1000, clear left-hand area for text).
export const heroPhoto: Photo | undefined = undefined;
export const groupsPhoto: Photo | undefined = undefined;

export const howItWorks = [
  { n: '01', title: 'Tell us the occasion', body: 'The sport, the event or the idea, who is travelling and roughly when.' },
  { n: '02', title: 'Get options in writing', body: 'We come back with travel, accommodation and what is included, set out clearly.' },
  { n: '03', title: 'Confirm and travel', body: 'Nothing is booked until you confirm. Then we look after the details.' }
];

// How Tier One works. These are commitments about process, not awards or accreditations.
// Add accreditations or memberships only once held and verifiable.
export const promises = [
  { title: 'Everything in writing', body: 'Every quote sets out what is included and what is not, before you commit.' },
  { title: 'Built around the fixture', body: 'Travel and stays planned around the event, including what happens if it moves.' },
  { title: 'Groups of any size', body: 'From two friends to a full club, the trip is shaped around who is going.' },
  { title: 'A real reply', body: 'A person reads every enquiry and replies, usually within one working day.' }
];
