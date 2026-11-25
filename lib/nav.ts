export const mainNav = [
  { href: '/events', label: 'Events' },
  { href: '/sports', label: 'Sports' },
  { href: '/group-travel', label: 'Group travel' },
  { href: '/corporate-hospitality', label: 'Corporate' },
  { href: '/bespoke-trips', label: 'Bespoke trips' },
  { href: '/how-it-works', label: 'How it works' }
];

export const footerNav = {
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
    { href: '/terms', label: 'Terms of use' }
  ]
};

// Phones and tablets (below 1280px): the bottom dock (at most four destinations plus More,
// the Project OS mobile-shell rule) and the three-quarter "More" sheet.
export const dockNav = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/events', label: 'Events', icon: 'events' },
  { href: '/sports', label: 'Sports', icon: 'sports' },
  { href: '/quote', label: 'Quote', icon: 'quote' }
] as const;

export const sheetNav = [
  { href: '/group-travel', label: 'Group travel', hint: 'Clubs, schools, supporters' },
  { href: '/corporate-hospitality', label: 'Corporate', hint: 'Clients and teams' },
  { href: '/bespoke-trips', label: 'Bespoke trips', hint: 'If you can picture it' },
  { href: '/how-it-works', label: 'How it works', hint: 'Discover, plan, experience' },
  { href: '/about', label: 'About', hint: 'Who we are' },
  { href: '/faqs', label: 'FAQs', hint: 'Questions, answered' },
  { href: '/travel-information', label: 'Travel information', hint: 'Before you go' },
  { href: '/contact', label: 'Contact', hint: 'Talk to Tier One' }
];

export const isOn = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));
