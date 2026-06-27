import React from 'react';
import { useReveal } from '@/hooks/useReveal';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  years: string;
}

interface Category {
  title: string;
  description: string;
  skills: Skill[];
}

const categories: Category[] = [
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

const LEVEL: Record<Skill['level'], { width: string; color: string }> = {
  Expert: { width: '94%', color: 'hsl(var(--gold))' },
  Advanced: { width: '78%', color: 'hsl(var(--primary))' },
  Intermediate: { width: '58%', color: 'hsl(var(--muted-foreground))' },
};

const SystemPanel: React.FC<{ category: Category }> = ({ category }) => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div ref={ref} className="rounded-lg border border-border bg-card p-6 md:p-7">
      <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-foreground">
        {category.title}
      </h3>
      <p className="mb-5 text-sm text-muted-foreground">{category.description}</p>

      <div>
        {category.skills.map((skill) => {
          const cfg = LEVEL[skill.level];
          return (
            <div key={skill.name} className="border-t border-border py-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-foreground">{skill.name}</span>
                <span className="whitespace-nowrap font-mono text-[0.72rem] text-muted-foreground">
                  {skill.years} yr ·{' '}
                  <span style={{ color: cfg.color }}>{skill.level}</span>
                </span>
              </div>
              <div className="mt-2 h-[3px] w-full overflow-hidden rounded bg-border">
                <div
                  className="h-full rounded transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                  style={{ width: revealed ? cfg.width : 0, backgroundColor: cfg.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 max-w-[60ch]">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary">
              03 · Loadout
            </span>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase leading-none text-foreground md:text-5xl">
              Technical Arsenal
            </h2>
            <p className="text-muted-foreground">
              8+ years of battle-tested expertise across the modern web stack. Always learning, always
              evolving.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {categories.map((category) => (
              <SystemPanel key={category.title} category={category} />
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-6 md:p-7">
            <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide text-primary">
              Always Learning
            </h3>
            <p className="mb-4 max-w-4xl text-muted-foreground">
              The web moves fast, and so do I. Currently exploring AI agents, advanced Vue patterns, the latest in web performance optimization,
              and more advanced Python methods.
            </p>
            <p className="max-w-4xl text-muted-foreground">
              The rebellion never stops evolving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
