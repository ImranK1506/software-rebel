import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { projects, sections, type Project } from '@/data/site';

const DossierCard: React.FC<{ project: Project }> = ({ project }) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card p-7 md:p-8',
        'transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/40',
        'hover:shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.5)]',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
    >
      {/* hologram tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, hsl(var(--primary) / 0.05), transparent 45%)' }}
      />
      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: 'repeating-linear-gradient(0deg, transparent 0 3px, hsl(var(--primary) / 0.035) 3px 4px)' }}
      />
      {/* corner tick */}
      <span className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-primary/40" />

      <div className="relative z-10">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-primary">{project.code}</div>
            <h3 className="mt-1.5 font-display text-2xl font-semibold uppercase leading-tight text-foreground">
              {project.title}
            </h3>
          </div>
          {project.flag && (
            <span className="whitespace-nowrap rounded-full border border-gold/40 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold">
              {project.flag}
            </span>
          )}
        </div>

        <p className="mb-4 max-w-[70ch] leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mb-5 flex gap-3 text-sm">
          <span className="whitespace-nowrap pt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-rebel">
            {project.impactLabel ?? 'Impact'}
          </span>
          <span className="text-foreground">{project.impact}</span>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="flex gap-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-primary transition-colors hover:text-gold"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="work" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          {/* Left-aligned section head (mockup-faithful) */}
          <div className="mb-14 max-w-[60ch]">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary">
              {sections.work.eyebrow}
            </span>
            <h2 className="mb-4 font-display text-4xl font-semibold uppercase leading-none text-foreground md:text-5xl">
              {sections.work.title}
            </h2>
            <p className="text-muted-foreground">{sections.work.intro}</p>
          </div>

          <div className="grid gap-5 md:gap-6">
            {projects.map((project) => (
              <DossierCard key={project.code} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
