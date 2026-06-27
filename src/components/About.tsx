import React from 'react';

interface Trait {
  title: string;
  description: string;
}

const traits: Trait[] = [
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
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          {/* Left-aligned section head (mockup-faithful) */}
          <div className="mb-14 max-w-[60ch]">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary">
              01 · Dossier
            </span>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase leading-none text-foreground md:text-5xl">
              About the Rebel
            </h2>
            <p className="text-muted-foreground">
              Many years in the trenches of front-end development — from startup MVPs to enterprise
              platforms serving millions of users.
            </p>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-[1.2fr_0.8fr]">
            {/* Journey + creed */}
            <div className="fade-in-left space-y-5 leading-relaxed text-muted-foreground">
              <p>
                Started as a self-taught developer with an insatiable curiosity for how the web works.
                That curiosity turned into a 7-year journey building everything from scrappy MVPs to
                production platforms serving millions of users.
              </p>
              <p>
                Along the way, I've architected{' '}
                <span className="font-medium text-foreground">e-commerce systems</span> handling 10M+
                transactions, built <span className="font-medium text-foreground">design systems</span>{' '}
                used across 15+ products, and created{' '}
                <span className="font-medium text-foreground">real-time dashboards</span> processing
                100K+ events per second. The common thread? An obsession with solving real problems with
                elegant, performant solutions — not just chasing the latest tech trends.
              </p>
              <p>
                Today I specialize in{' '}
                <span className="font-medium text-foreground">
                  React, Vue, TypeScript, StencilJS, and Python
                </span>
                , building applications that are fast, accessible, and built to scale. Currently
                accepting select freelance projects for Q2 2026.
              </p>

              {/* Creed */}
              <div className="border-l-2 border-gold py-3 pl-5">
                <p className="mb-1.5 font-display text-lg uppercase tracking-wide text-gold">
                  “Code is poetry in motion.”
                </p>
                <p className="text-sm text-muted-foreground">
                  Every line should tell a story, solve a problem, and respect the next developer who
                  reads it.
                </p>
              </div>
            </div>

            {/* Numbered trait dossier cards */}
            <div className="fade-in-right grid gap-3.5">
              {traits.map((trait, i) => (
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
