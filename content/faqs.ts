import type { Faq } from './types';
import { isKids } from '@/lib/edition';
import { kidsFaqs } from './kids/faqs';

// Draft answers for Tier One to sign off. Items in [square brackets] need a business decision.
// Answers about payments, cancellations and protection must match the booking conditions page.
export const fullFaqs: Faq[] = [
  {
    question: 'Who are Tier One Sports Events?',
    answer:
      'An Irish company that plans travel to sporting occasions for supporters, families, clubs, schools and corporate groups from Ireland and the UK.'
  },
  {
    question: 'Can I book a trip on this website?',
    answer:
      'No. The website is for finding out what is possible and sending an enquiry. We reply with options and a written quote, and your booking is confirmed in writing once you accept it and pay the deposit.'
  },
  {
    question: 'Are the events on the website available to book?',
    answer:
      'Events marked “Sample” are examples while the website is being prepared. They are not available packages. Tell us what you are interested in and we will come back to you.'
  },
  {
    question: 'Do you supply match or event tickets?',
    answer:
      'When your quote includes tickets or official hospitality, they come from the event organiser, the club or an authorised hospitality programme, never from touts. Your quote says exactly what is and is not included.'
  },
  {
    question: 'What happens if the fixture date changes?',
    answer:
      'Fixture dates and kick-off times are set by leagues, organisers and broadcasters and can move, especially for televised matches. If that happens we will tell you as soon as we know and offer the options available. [Confirm the policy in the booking conditions.]'
  },
  {
    question: 'Is my money protected?',
    answer:
      'Package trips are protected under the Package Holidays and Linked Travel Arrangements Act 2019. [Add licence and bonding details once confirmed.]'
  },
  {
    question: 'How do I pay?',
    answer: 'A deposit secures your booking and the balance is due before departure. [Confirm deposit, balance date and payment methods.]'
  },
  {
    question: 'What if I need to cancel?',
    answer:
      'You can cancel at any time in writing. Cancellation fees depend on how close to departure you cancel, and event tickets are usually non-refundable. See our booking conditions. [Confirm the fee schedule.]'
  },
  {
    question: 'Can you plan a trip for a club, school or large group?',
    answer:
      'Yes. Tell us about the group, the dates you have in mind and what you want from the trip, and we will shape the options around you. For school and youth trips, the school or club looks after supervision and parental consent.'
  },
  {
    question: 'Do I need travel insurance?',
    answer: 'We strongly recommend it, with cover for cancellation, medical costs and the event itself. [Confirm whether it is required.]'
  },
  {
    question: 'Can you help with access or dietary needs?',
    answer: 'Yes. Tell us when you enquire and we will check with venues, hotels and carriers before you book.'
  },
  {
    question: 'How quickly will you reply?',
    answer: 'We aim to reply to every enquiry within one working day.'
  },
  {
    question: 'What happens to the details I send?',
    answer:
      'We use them only to reply to your enquiry and plan your trip. See our privacy notice for how long we keep them and your rights.'
  }
];

// The FAQs for the edition being built (lib/edition.ts).
export const faqs: Faq[] = isKids ? kidsFaqs : fullFaqs;
