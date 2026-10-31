import React from 'react';
import { useReveal } from '@/hooks/useReveal';
import { alwaysLearning, sections, skillCategories, type Skill, type SkillCategory } from '@/data/site';

const LEVEL: Record<Skill['level'], { width: string; color: string }> = {
  Expert: { width: '94%', color: 'hsl(var(--gold))' },
  Advanced: { width: '78%', color: 'hsl(var(--primary))' },
  Intermediate: { width: '58%', color: 'hsl(var(--muted-foreground))' },
};

const SystemPanel: React.FC<{ category: SkillCategory }> = ({ category }) => {
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
              {sections.skills.eyebrow}
            </span>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase leading-none text-foreground md:text-5xl">
              {sections.skills.title}
            </h2>
            <p className="text-muted-foreground">{sections.skills.intro}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {skillCategories.map((category) => (
              <SystemPanel key={category.title} category={category} />
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-6 md:p-7">
            <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide text-primary">
              {alwaysLearning.title}
            </h3>
            {alwaysLearning.paragraphs.map((text, i) => (
              <p
                key={text}
                className={`max-w-4xl text-muted-foreground${
                  i < alwaysLearning.paragraphs.length - 1 ? ' mb-4' : ''
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
