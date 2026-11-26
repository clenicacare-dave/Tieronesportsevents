import type { Service } from '../services';
import { photos } from '../photos';

// KIDS FOOTBALL EDITION: who the trips are for. Each becomes a page (/clubs-and-academies, /schools, /families).
// Draft copy for Dave to sign off; commitments describe process, not accreditations.

export const kidsAudiences = {
  'clubs-and-academies': {
    slug: 'clubs-and-academies',
    photo: photos.footballNight,
    eyebrow: 'Clubs and academies',
    title: 'A tour your squad will talk about for years',
    description: 'Youth football tours, tournaments and training camps abroad for clubs and academies from Ireland and the UK.',
    intro:
      'Tournaments abroad, training camps and friendlies at the right level. We plan the whole trip around the age, level and goals of your squad, so coaches can focus on the football.',
    audiences: ['Under-9s to under-18s', 'Boys, girls and mixed squads', 'Grassroots clubs', 'Academies'],
    sections: [
      {
        title: 'Tournaments',
        body: 'International youth tournaments with teams from across Europe. We handle entry, travel, the team hotel and getting the squad to every game on time.'
      },
      {
        title: 'Training camps',
        body: 'Coaching sessions, friendly matches against local sides and a stadium tour, set at the level of your players.'
      },
      {
        title: 'Coaches and parents kept informed',
        body: 'One point of contact for the club from first enquiry to the trip home, with clear information you can share with parents.'
      }
    ],
    ask: ['Age group and number of players', 'Coaches and adults travelling', 'Tournament, camp or destination in mind', 'Dates or a rough window', 'Budget per player, if you have one']
  },
  schools: {
    slug: 'schools',
    photo: photos.fansScarves,
    eyebrow: 'Schools',
    title: 'School football tours, planned with teachers in mind',
    description: 'School football tours and tournaments abroad for primary and secondary schools from Ireland and the UK.',
    intro:
      'Fixtures against local schools and clubs, stadium visits and time to see a new city. We plan around the school calendar and give you what you need for trip approval.',
    audiences: ['Primary schools', 'Secondary schools', 'PE departments', 'Transition year groups'],
    sections: [
      {
        title: 'Built for trip approval',
        body: 'A clear written itinerary and costs, and the information your board, principal and parents need before they say yes.'
      },
      {
        title: 'Supervision agreed up front',
        body: 'Staff places, supervision and room arrangements agreed with you in writing before anything is booked.'
      },
      {
        title: 'Football and more',
        body: 'Matches at the right level, a stadium tour and time to explore, balanced for the age of the students.'
      }
    ],
    ask: ['School and year groups', 'Number of students and staff', 'Dates or a term', 'Destination or type of trip', 'Budget per student, if you have one']
  },
  families: {
    slug: 'families',
    photo: photos.heroCrowd,
    eyebrow: 'Families',
    title: 'Their first big match away',
    description: 'Family football trips from Ireland and the UK: stadium tours, match weekends and family-friendly hotels.',
    intro:
      'A stadium tour, a family hotel and the game itself when tickets are available. We plan the weekend around the fixture and the ages of the children.',
    audiences: ['Parents and children', 'Grandparents', 'Families travelling together'],
    sections: [
      {
        title: 'Match weekends',
        body: 'Travel, a family room and the stadium, planned around kick-off, with tickets only from official sources.'
      },
      {
        title: 'Stadium tours',
        body: 'Behind the scenes at a famous ground: the dressing rooms, the tunnel and the pitchside, on a non-match day if that suits better.'
      },
      {
        title: 'Easy for parents',
        body: 'Everything confirmed in writing before you book, with one person to ask about anything.'
      }
    ],
    ask: ['Who is travelling and the children’s ages', 'The team or ground they dream of', 'Dates or a rough window', 'Where you are travelling from', 'Anything the family needs (access, diet, budget)']
  }
} satisfies Record<string, Service>;

export type KidsAudienceSlug = keyof typeof kidsAudiences;
