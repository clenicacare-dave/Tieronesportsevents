import type { Faq } from './types';

// Draft answers: they describe how this website works today. Tier One must confirm
// each answer (and add policy answers such as payments and cancellations) before launch.
export const faqs: Faq[] = [
  {
    question: 'Can I book a trip on this website?',
    answer:
      'Not yet. The website is for finding out what is possible and sending an enquiry. We reply with options and confirm everything in writing before anything is agreed.'
  },
  {
    question: 'Are the events on the website available to book?',
    answer:
      'Events marked “Sample” are examples while the website is being prepared. They are not available packages. Tell us what you are interested in and we will come back to you.'
  },
  {
    question: 'Do you supply match or event tickets?',
    answer:
      'Tickets are not included unless we confirm them in writing for your trip. Your quote will say exactly what is and is not included.'
  },
  {
    question: 'Can you plan a trip for a club or a large group?',
    answer:
      'Yes. Tell us about the group, the dates you have in mind and what you want from the trip, and we will shape the options around you.'
  },
  {
    question: 'Who do I travel with if something changes?',
    answer:
      'Your quote will set out who provides each part of your trip and who to contact. Fixture dates can change, especially for televised matches, so we explain how changes are handled before you commit.'
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
