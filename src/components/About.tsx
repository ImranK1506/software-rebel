import React from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { about, sections } from '@/data/site';
import RichText from '@/components/RichText';

const EMPHASIS = 'font-medium text-foreground';

const About: React.FC = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          {/* Left-aligned section head (mockup-faithful) */}
          <div className="mb-14 max-w-[60ch]">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary">
              {sections.about.eyebrow}
            </span>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase leading-none text-foreground md:text-5xl">
              {sections.about.title}
            </h2>
            <p className="text-muted-foreground">{sections.about.intro}</p>
          </div>

          <div ref={ref} className="grid items-start gap-12 md:grid-cols-[1.2fr_0.8fr]">
            {/* Journey + creed */}
            <div
              className={cn(
                'space-y-5 leading-relaxed text-muted-foreground',
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                revealed ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
              )}
            >
              {about.paragraphs.map((parts, i) => (
                <p key={i}>
                  <RichText parts={parts} emClassName={EMPHASIS} />
                </p>
              ))}

              {/* Creed */}
              <div className="border-l-2 border-gold py-3 pl-5">
                <p className="mb-1.5 font-display text-lg uppercase tracking-wide text-gold">
                  {about.creed.quote}
                </p>
                <p className="text-sm text-muted-foreground">{about.creed.body}</p>
              </div>
            </div>

            {/* Numbered trait dossier cards */}
            <div
              className={cn(
                'grid gap-3.5 transition-all duration-700 ease-out delay-150 motion-reduce:transition-none',
                revealed ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
              )}
            >
              {about.traits.map((trait, i) => (
                <div
                  key={trait.title}
                  className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <div className="mb-1 font-mono text-[0.7rem] tracking-[0.1em] text-primary">
                    [ {String(i + 1).padStart(2, '0')} ]
                  </div>
                  <p className="font-display text-base uppercase tracking-wide text-foreground">
                    {trait.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
