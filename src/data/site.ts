/**
 * Single source of truth for everything a visitor reads.
 * Components import from here and never hold copy of their own, so a wording
 * change is a change to this file only. Structure stays plain TypeScript
 * (no JSX), which means it can move to an Astro content collection unchanged.
 *
 * Not covered here: the JSON-LD block in index.html (static HTML can't import
 * this file), so keep the name, email and profile links there in sync by hand.
 */

/** Text with emphasised runs: strings render as-is, `{ em }` runs get the caller's emphasis style. */
export type Rich = Array<string | { em: string }>;

export interface SectionHead {
  /** Small mono label above the title, e.g. "01 · Dossier". */
  eyebrow: string;
  title: string;
  intro: string;
}

export interface Link {
  /** Text shown to the visitor. */
  display: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export interface Profile {
  firstName: string;
  lastName: string;
  /** Wordmark: shown as <softwarerebel /> in the header and footer. */
  handle: string;
  /** Display name of the brand, used in the footer copyright. */
  brand: string;
  title: string;
  city: string;
  country: string;
  countryCode: string;
  availability: string;
  /** Hero and footer tagline, without the trailing full stop. */
  tagline: string;
  summary: string;
  email: string;
  /** Optional: delete this property to remove the phone number from the site. */
  phone?: Link;
  github: Link;
  linkedin: Link;
}

export const profile: Profile = {
  firstName: 'Imran',
  lastName: 'Khan',
  handle: 'softwarerebel',
  brand: 'Software Rebel',
  title: 'Front-End Engineer',
  city: 'Amsterdam',
  country: 'The Netherlands',
  countryCode: 'NL',
  availability: 'Open to select projects',
  tagline: 'Breaking conventions, building the future',
  summary: 'React, TypeScript & StencilJS — built to scale.',
  email: 'imran@softwarerebel.com',
  phone: { display: '+31 6 37336418', href: 'tel:+31637336418' },
  github: { display: 'github.com/ImranK1506', href: 'https://github.com/ImranK1506' },
  linkedin: {
    display: 'in/imran-khan-se',
    href: 'https://www.linkedin.com/in/imran-khan-se/',
  },
};

/* ------------------------------------------------------------------ */
/* Navigation and calls to action                                      */
/* ------------------------------------------------------------------ */

export const nav = {
  /** `id` must match a section's id attribute. */
  links: [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
  ],
  cta: { id: 'contact', label: 'Contact' },
};

export const heroCtas = {
  primary: { label: 'View Work', href: '#work' },
  secondary: { label: 'Get in touch', href: '#contact' },
};

/* ------------------------------------------------------------------ */
/* Section headings                                                    */
/* ------------------------------------------------------------------ */

export const sections: Record<'about' | 'work' | 'skills' | 'contact', SectionHead> = {
  about: {
    eyebrow: '01 · Dossier',
    title: 'About the Rebel',
    intro:
      'Many years in the trenches of front-end development — from startup MVPs to enterprise platforms serving millions of users.',
  },
  work: {
    eyebrow: '02 · Mission Log',
    title: 'Featured Missions',
    intro:
      'A selection of work where rebellion meets craftsmanship — each one pushed boundaries and delivered measurable impact.',
  },
  skills: {
    eyebrow: '03 · Loadout',
    title: 'Technical Arsenal',
    intro:
      '8+ years of battle-tested expertise across the modern web stack. Always learning, always evolving.',
  },
  contact: {
    eyebrow: '04 · Open Channel',
    title: "Let's build something rebellious.",
    intro:
      "Ready to break some conventions? Send a transmission and let's create something that stands out. Currently open to select projects.",
  },
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export interface Trait {
  title: string;
  description: string;
}

export const about = {
  paragraphs: [
    [
      'Started as a self-taught developer with an insatiable curiosity for how the web works. That curiosity turned into an 8-year journey building everything from scrappy MVPs to production platforms serving millions of users.',
    ],
    [
      "Along the way, I've architected ",
      { em: 'e-commerce systems' },
      ' handling 10M+ transactions, built ',
      { em: 'design systems' },
      ' used across 15+ products, and created ',
      { em: 'real-time dashboards' },
      ' processing 100K+ events per second. The common thread? An obsession with solving real problems with elegant, performant solutions — not just chasing the latest tech trends.',
    ],
    [
      'Today I specialize in ',
      { em: 'React, Vue, TypeScript, StencilJS, and Python' },
      ', building applications that are fast, accessible, and built to scale. Currently open to select freelance and contract work.',
    ],
  ] as Rich[],
  creed: {
    quote: '“Code is poetry in motion.”',
    body: 'Every line should tell a story, solve a problem, and respect the next developer who reads it.',
  },
  traits: [
    {
      title: 'Clean Code Advocate',
      description: 'Writing maintainable, scalable code that stands the test of time.',
    },
    {
      title: 'Performance Obsessed',
      description: 'Optimizing every millisecond for lightning-fast user experiences.',
    },
    {
      title: 'User-Centric Design',
      description: 'Building interfaces that users actually want to use.',
    },
    {
      title: 'Innovation Driver',
      description: 'Pushing boundaries with cutting-edge technologies and methodologies.',
    },
  ] as Trait[],
};

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export interface Project {
  code: string;
  title: string;
  description: string;
  tech: string[];
  impact: string;
  impactLabel?: string;
  flag?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    code: 'MSN-01',
    title: 'E-Commerce Platform',
    description:
      'Built a high-performance React/TypeScript platform handling 10M+ monthly transactions. Implemented a micro-frontends architecture with 99.9% uptime.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    impact: 'Increased conversion rate by 35% and reduced page load times by 60%.',
    flag: 'Featured',
  },
  {
    code: 'MSN-02',
    title: 'Real-Time Analytics Dashboard',
    description:
      'Created a real-time data-visualization platform processing 100K+ events per second. Custom WebSocket implementation with D3.js visualizations.',
    tech: ['React', 'D3.js', 'WebSocket', 'Python', 'ClickHouse'],
    impact: 'Reduced decision-making time by 80% for data teams.',
    flag: 'Featured',
  },
  {
    code: 'MSN-03',
    title: 'Design System & Component Library',
    description:
      'Architected and maintained a comprehensive design system used across 15+ products. Built with accessibility-first principles and comprehensive testing.',
    tech: ['React', 'Storybook', 'TypeScript', 'Jest', 'Figma'],
    impact: 'Reduced development time by 50% across all product teams.',
  },
  {
    code: 'MSN-04',
    title: 'Filmpire — Movie Discovery App',
    description:
      'A full-stack movie-discovery app — React front end, Node.js back end, integrated with third-party APIs for movie data. Built as a public, end-to-end showcase.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TMDb API'],
    impact: 'A real, shippable build you can open and use right now.',
    impactLabel: 'Note',
    flag: 'Live Demo',
    liveUrl: 'https://filmpire-tmdb-react.netlify.app',
    repoUrl: 'https://github.com/ImranK1506/react-filmpire',
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  years: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Mastery',
    description: 'Building beautiful, performant user interfaces',
    skills: [
      { name: 'React / Next.js', level: 'Expert', years: '5+' },
      { name: 'TypeScript', level: 'Expert', years: '4+' },
      { name: 'JavaScript (ES6+)', level: 'Expert', years: '7+' },
      { name: 'HTML5 / CSS3', level: 'Expert', years: '7+' },
      { name: 'Tailwind CSS', level: 'Advanced', years: '3+' },
      { name: 'SASS / Styled Components', level: 'Advanced', years: '4+' },
    ],
  },
  {
    title: 'Development Tools',
    description: 'Modern development workflow and tooling',
    skills: [
      { name: 'Git / GitHub', level: 'Expert', years: '7+' },
      { name: 'Webpack / Vite', level: 'Advanced', years: '4+' },
      { name: 'Jest / Testing Library', level: 'Advanced', years: '5+' },
      { name: 'Storybook', level: 'Advanced', years: '2+' },
      { name: 'Docker', level: 'Intermediate', years: '2+' },
      { name: 'CI/CD Pipelines', level: 'Advanced', years: '3+' },
    ],
  },
  {
    title: 'Architecture & Performance',
    description: 'Scalable, maintainable application design',
    skills: [
      { name: 'Micro-frontends', level: 'Advanced', years: '2+' },
      { name: 'State Management', level: 'Expert', years: '5+' },
      { name: 'Performance Optimization', level: 'Expert', years: '5+' },
      { name: 'Web Accessibility', level: 'Advanced', years: '4+' },
      { name: 'Progressive Web Apps', level: 'Advanced', years: '4+' },
      { name: 'Design Systems', level: 'Advanced', years: '3+' },
    ],
  },
  {
    title: 'Backend & Integration',
    description: 'Full-stack capabilities and API integration',
    skills: [
      { name: 'Node.js / Express', level: 'Advanced', years: '4+' },
      { name: 'REST / GraphQL APIs', level: 'Advanced', years: '5+' },
      { name: 'PostgreSQL / MongoDB', level: 'Intermediate', years: '3+' },
      { name: 'Redis / Caching', level: 'Intermediate', years: '2+' },
      { name: 'AWS / Cloud Services', level: 'Intermediate', years: '3+' },
      { name: 'WebSocket / Real-time', level: 'Advanced', years: '2+' },
    ],
  },
];

export const alwaysLearning = {
  title: 'Always Learning',
  paragraphs: [
    'The web moves fast, and so do I. Currently exploring AI agents, advanced Vue patterns, the latest in web performance optimization, and more advanced Python methods.',
    'The rebellion never stops evolving.',
  ],
};

/* ------------------------------------------------------------------ */
/* Contact form and footer                                             */
/* ------------------------------------------------------------------ */

export const contactForm = {
  submit: 'Start a Transmission',
  sending: 'Transmitting…',
  success: "Transmission received — I'll get back to you shortly.",
};

export const footer = {
  /** Rendered with the emphasised run in the accent colour. */
  credit: ['Crafted with React, TypeScript & a ', { em: 'rebellious spirit' }] as Rich,
  note: "// Built to showcase what's possible when you dare to be different.",
};
