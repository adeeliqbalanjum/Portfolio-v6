export type Project = {
  slug: string;
  name: string;
  category: string;
  image: string;
  url?: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  tech: string[];
};

const imageBase = 'https://adeeliqbalanjum.github.io/adeelatwork/work-images';

export const projects: Project[] = [
  {
    slug: 'desert-safari-dubai',
    name: 'Desert Safari Dubai',
    category: 'Custom Booking Plugin',
    image: `${imageBase}/book-my-holidays.webp`,
    summary: 'A custom WordPress booking flow for desert safari tours with dynamic AED pricing and admin booking management.',
    challenge: 'The business needed a booking system with private and sharing tour pricing, add-ons, child pricing, customer details, and professional email flows.',
    solution: 'Built a custom plugin-style booking experience with pricing rules, admin status workflow, add-ons, and booking emails.',
    result: 'A stronger booking experience that supports real business operations instead of a basic contact form.',
    tech: ['WordPress', 'PHP', 'Custom Plugin', 'Booking Logic', 'Email Workflow'],
  },
  {
    slug: 'fastdocnow',
    name: 'FastDocNow',
    category: 'Healthcare WordPress Website',
    image: `${imageBase}/fastdocnow.webp`,
    summary: 'Healthcare website for online doctor consultations, medication refills, lab testing, imaging, and appointment booking.',
    challenge: 'The website needed to look trustworthy, explain services clearly, and support mobile users looking for fast healthcare help.',
    solution: 'Designed a clean WordPress and Elementor experience with strong service sections, responsive layouts, and clear conversion paths.',
    result: 'A modern healthcare presentation with better service clarity and mobile usability.',
    tech: ['WordPress', 'Elementor Pro', 'Healthcare UI', 'Responsive Design'],
  },
  {
    slug: 'griffin-it',
    name: 'Griffin IT',
    category: 'Technology Website',
    image: `${imageBase}/griffin-it.webp`,
    summary: 'A professional technology website built with a clean B2B structure and premium service presentation.',
    challenge: 'The brand needed a cleaner, more modern website structure to communicate services with credibility.',
    solution: 'Created a premium WordPress layout with service blocks, strong spacing, responsive sections, and clear call-to-actions.',
    result: 'A more polished and credible online presence for a technology-focused business.',
    tech: ['WordPress', 'Elementor', 'B2B Website', 'Responsive UI'],
  },
  {
    slug: 'kay-kay',
    name: 'Kay Kay & Kay Associates',
    category: 'Corporate Website',
    image: `${imageBase}/kay-kay.webp`,
    summary: 'Corporate website with professional layout, company information, location details, and conversion-focused contact sections.',
    challenge: 'The website needed a clearer structure and a more professional presentation for service visitors.',
    solution: 'Built a clean WordPress site structure with strong sections, responsive spacing, and contact-focused layout.',
    result: 'A more professional corporate site that is easier for visitors to understand and contact.',
    tech: ['WordPress', 'Corporate Website', 'Responsive Design', 'Contact UX'],
  },
  {
    slug: 'griffin-resources',
    name: 'Griffin Resources',
    category: 'Business Website',
    image: `${imageBase}/griffin-resources.webp`,
    summary: 'Business website focused on credibility, service clarity, and professional brand presentation.',
    challenge: 'The business required a more polished online presence to present services clearly and look trustworthy.',
    solution: 'Created a modern WordPress layout with clean typography, structured sections, and mobile responsive design.',
    result: 'A cleaner and more premium website experience for business visitors.',
    tech: ['WordPress', 'Elementor', 'Business Website', 'UI Design'],
  },
  {
    slug: 'book-my-holidays',
    name: 'Book My Holidays',
    category: 'Travel Website',
    image: `${imageBase}/book-my-holidays.webp`,
    summary: 'Travel website layout with visual destination presentation, inquiry flow, and service-focused structure.',
    challenge: 'The site needed to present travel packages in a way that felt clear, modern, and easy to explore.',
    solution: 'Created responsive WordPress sections for package discovery, trust building, and inquiry conversion.',
    result: 'A cleaner travel website experience with stronger visual appeal and usability.',
    tech: ['WordPress', 'Travel Website', 'Responsive UI', 'Landing Page'],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
