import React, { useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  ph: number;
  color: string; // RGB triplet string for canvas fillStyle
}

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frameId = 0;

    const seedStars = () => {
      // Scale star count to viewport area, capped for performance.
      const count = Math.min(220, Math.floor((width * height) / (9000 * dpr * dpr)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * 0.02 + 0.004,
        ph: Math.random() * Math.PI * 2,
        // ~8% of stars get the hologram-blue accent (mirrors --primary 197 100% 68%), rest white.
        color: Math.random() > 0.92 ? '92, 209, 255' : '255, 255, 255',
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      width = w * dpr;
      height = h * dpr;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      seedStars();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const a = prefersReduced ? s.a : s.a * (0.6 + 0.4 * Math.sin(s.ph + t * s.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.color}, ${a.toFixed(3)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!prefersReduced) frameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

    if (prefersReduced) {
      draw(0); // single static frame
    } else {
      frameId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Canvas starfield */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Depth gradient over the stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />

      <div className="container mx-auto px-6 py-20 relative z-20">
        <div className="max-w-3xl">
          {/* Status row — items wrap as whole pills, never mid-pill */}
          <div className="fade-in-up flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground border border-border rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
              Open · Freelance Q2 2026
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
              Amsterdam · NL
            </span>
          </div>

          <div className="fade-in-up">
            <h1 className="font-display uppercase font-bold tracking-tight leading-[0.86] text-6xl sm:text-7xl md:text-9xl mb-6 sm:mb-8">
              <span className="block text-foreground">Imran</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: '1.5px hsl(var(--gold))' }}
              >
                Khan
              </span>
            </h1>
            <p className="font-mono text-sm md:text-base uppercase tracking-[0.18em] text-primary mb-4">
              Front-End Engineer
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 sm:mb-12 font-light max-w-2xl">
              <span className="text-foreground font-medium">Breaking conventions, building the future.</span>{' '}
              React, TypeScript &amp; StencilJS — built to scale.
            </p>
          </div>

          {/* Lightsaber CTAs */}
          <div
            className="fade-in-up flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={scrollToProjects}
              className="group glow-on-hover bg-primary text-primary-foreground font-mono uppercase text-sm font-semibold tracking-wider px-7 py-4 rounded-md inline-flex items-center gap-3"
              style={{ boxShadow: '0 0 22px hsl(var(--primary) / 0.35)' }}
            >
              View Missions
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#contact"
              className="font-mono uppercase text-sm font-semibold tracking-wider px-7 py-4 rounded-md border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Open Comms
            </a>
          </div>

          {/* Socials */}
          <div className="fade-in-up flex gap-3" style={{ animationDelay: '0.6s' }}>
            <a
              href="https://github.com/ImranK1506"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid place-items-center w-11 h-11 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/imran-khan-se/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid place-items-center w-11 h-11 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:imran@softwarerebel.com"
              aria-label="Email"
              className="grid place-items-center w-11 h-11 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
