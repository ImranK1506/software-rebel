import React, { useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  ph: number;
  color: string;
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
        // ~8% of stars get the cyan accent, the rest are white.
        color: Math.random() > 0.92 ? '6, 182, 212' : '255, 255, 255',
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Canvas starfield (replaces ~330 animated DOM nodes) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Depth gradient over the stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />

      <div className="container mx-auto px-6 py-20 relative z-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in-up">
            <h1 className="text-8xl md:text-9xl font-black mb-8 tracking-tighter leading-none relative">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Imran Khan
              </span>
              <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-cyan-500 to-purple-500" />
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Front-End Engineer
            </p>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light">
              Breaking conventions, building the future
            </p>
          </div>

          <div
            className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={scrollToProjects}
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl transition-all inline-flex items-center gap-3"
              style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
            >
              <span className="relative z-10">View Work</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            </button>
          </div>

          <div className="fade-in-up flex justify-center gap-6" style={{ animationDelay: '0.6s' }}>
            <a
              href="https://github.com/ImranK1506"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2 rounded-lg"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/imran-khan-se/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2 rounded-lg"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:imran@softwarerebel.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2 rounded-lg"
            >
              <Mail size={24} />
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
