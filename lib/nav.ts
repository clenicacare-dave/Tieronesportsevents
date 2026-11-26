import { isKids } from './edition';

// Navigation for each edition (lib/edition.ts). Full edition first, kids football edition below.

const fullMainNav = [
  { href: '/events', label: 'Events' },
  { href: '/sports', label: 'Sports' },
  { href: '/group-travel', label: 'Group travel' },
  { href: '/corporate-hospitality', label: 'Corporate' },
  { href: '/bespoke-trips', label: 'Bespoke trips' },
  { href: '/how-it-works', label: 'How it works' }
];

const fullFooterNav = {
  Travel: [
    { href: '/events', label: 'Events' },
    { href: '/sports', label: 'Sports' },
    { href: '/group-travel', label: 'Group travel' },
    { href: '/corporate-hospitality', label: 'Corporate hospitality' },
    { href: '/bespoke-trips', label: 'Bespoke trips' }
  ],
  'Tier One': [
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/travel-information', label: 'Travel information' },
    { href: '/contact', label: 'Contact' }
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy notice' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/terms', label: 'Terms of use' },
    { href: '/booking-conditions', label: 'Booking conditions' }
  ]
};

// Phones and tablets (below 1280px): the bottom dock (at most four destinations plus More,
// the Project OS mobile-shell rule) and the three-quarter "More" sheet.
const fullDockNav = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/events', label: 'Events', icon: 'events' },
  { href: '/sports', label: 'Sports', icon: 'sports' },
  { href: '/quote', label: 'Quote', icon: 'quote' }
] as const;

const fullSheetNav = [
  { href: '/group-travel', label: 'Group travel', hint: 'Clubs, schools, supporters' },
  { href: '/corporate-hospitality', label: 'Corporate', hint: 'Clients and teams' },
  { href: '/bespoke-trips', label: 'Bespoke trips', hint: 'If you can picture it' },
  { href: '/how-it-works', label: 'How it works', hint: 'Discover, plan, experience' },
  { href: '/about', label: 'About', hint: 'Who we are' },
  { href: '/faqs', label: 'FAQs', hint: 'Questions, answered' },
  { href: '/travel-information', label: 'Travel information', hint: 'Before you go' },
  { href: '/contact', label: 'Contact', hint: 'Talk to Tier One' }
];

const legal = [
  { href: '/privacy', label: 'Privacy notice' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/terms', label: 'Terms of use' },
  { href: '/booking-conditions', label: 'Booking conditions' }
];

const kidsMainNav = [
  { href: '/events', label: 'Trips' },
  { href: '/clubs-and-academies', label: 'Clubs and academies' },
  { href: '/schools', label: 'Schools' },
  { href: '/families', label: 'Families' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faqs', label: 'FAQs' }
];

const kidsFooterNav = {
  'Football trips': [
    { href: '/events', label: 'Trips' },
    { href: '/clubs-and-academies', label: 'Clubs and academies' },
    { href: '/schools', label: 'Schools' },
    { href: '/families', label: 'Families' }
  ],
  'Tier One': [
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/travel-information', label: 'Travel information' },
    { href: '/contact', label: 'Contact' }
  ],
  Legal: legal
};

const kidsDockNav = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/events', label: 'Trips', icon: 'events' },
  { href: '/clubs-and-academies', label: 'Clubs', icon: 'sports' },
  { href: '/quote', label: 'Quote', icon: 'quote' }
] as const;

const kidsSheetNav = [
  { href: '/schools', label: 'Schools', hint: 'Tours and tournaments' },
  { href: '/families', label: 'Families', hint: 'Their first big match away' },
  { href: '/how-it-works', label: 'How it works', hint: 'Discover, plan, play' },
  { href: '/about', label: 'About', hint: 'Who we are' },
  { href: '/faqs', label: 'FAQs', hint: 'Questions, answered' },
  { href: '/travel-information', label: 'Travel information', hint: 'Before you go' },
  { href: '/contact', label: 'Contact', hint: 'Talk to Tier One' }
];

export const mainNav = isKids ? kidsMainNav : fullMainNav;
export const footerNav: Record<string, { href: string; label: string }[]> = isKids ? kidsFooterNav : fullFooterNav;
export const dockNav = isKids ? kidsDockNav : fullDockNav;
export const sheetNav = isKids ? kidsSheetNav : fullSheetNav;

export const isOn = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));
