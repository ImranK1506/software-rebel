import { useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'sr-crawl-seen';
const DURATION = 25000; // must match the sr-crawl animation length
const FADE = 600;       // must match the .leaving transition

/**
 * Opening title crawl. Shows once per browser session, is skippable (button or
 * Escape), and is disabled entirely for prefers-reduced-motion. Self-contained:
 * mount <OpeningCrawl /> at the top of the page tree; remove the line to drop it.
 */
const OpeningCrawl = () => {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);

  const dismiss = () => {
    setLeaving(true);
    window.setTimeout(() => setShow(false), FADE);
  };

  // Decide whether to show, and arm the auto-dismiss.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      /* storage blocked — treat as not seen */
    }
    if (reduced || seen) return;

    setShow(true);
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(dismiss, DURATION);
    return () => window.clearTimeout(t);
  }, []);

  // Lock scroll, focus the skip control, and wire Escape while visible.
  useEffect(() => {
    if (!show) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`sr-crawl-root${leaving ? ' leaving' : ''}`}
      role="dialog"
      aria-label="Intro sequence"
    >
      <style>{css}</style>

      <button ref={skipRef} className="sr-crawl-skip" onClick={dismiss}>
        Skip ▸
      </button>

      <div className="sr-crawl-inner">
        <div className="sr-crawl-lead">Transmission · Amsterdam, NL</div>
        <h1 className="sr-crawl-title">Software Rebel</h1>
        <p className="sr-crawl-p">
          It is a period of relentless shipping. A front-end engineer works from the edge of the map,
          turning ambitious ideas into platforms that are fast, accessible, and built to scale.
        </p>
        <p className="sr-crawl-p">
          Eight years deep, he has armed startups and enterprises alike with interfaces made to endure
          — and refuses to settle for the templated and the dull.
        </p>
        <p className="sr-crawl-p">Now he opens a narrow window for new alliances…</p>
      </div>
    </div>
  );
};

const css = `
.sr-crawl-root{
  position:fixed;inset:0;z-index:100;background:hsl(var(--background));
  display:flex;flex-direction:column;align-items:center;justify-content:flex-end;
  overflow:hidden;perspective:420px;transition:opacity ${FADE}ms ease;
}
.sr-crawl-root.leaving{opacity:0;}
.sr-crawl-inner{
  position:absolute;bottom:0;width:min(720px,86vw);
  transform-origin:50% 100%;transform:rotateX(28deg);
  color:hsl(var(--gold));text-align:center;
  animation:sr-crawl ${DURATION}ms linear forwards;
}
.sr-crawl-lead{
  font-family:'JetBrains Mono',monospace;letter-spacing:.3em;font-size:.8rem;
  text-transform:uppercase;margin-bottom:1.5rem;opacity:.85;
}
.sr-crawl-title{
  font-family:'Oswald',sans-serif;text-transform:uppercase;font-weight:700;
  font-size:clamp(2rem,7vw,3.4rem);margin:0 0 1.4rem;letter-spacing:.04em;
}
.sr-crawl-p{
  font-size:clamp(1.05rem,2.6vw,1.5rem);font-weight:500;margin:0 0 1.1rem;line-height:1.5;
}
.sr-crawl-skip{
  position:absolute;bottom:22px;right:22px;z-index:2;
  font-family:'JetBrains Mono',monospace;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;
  color:hsl(var(--muted-foreground));border:1px solid hsl(var(--border));
  padding:8px 14px;border-radius:var(--radius);background:hsl(var(--background)/.4);cursor:pointer;transition:.2s;
}
.sr-crawl-skip:hover{color:hsl(var(--foreground));border-color:hsl(var(--primary));}
@keyframes sr-crawl{
  0%{top:100%;opacity:0;}
  8%{opacity:1;}
  92%{opacity:1;}
  100%{top:-160%;opacity:0;}
}
`;

export default OpeningCrawl;
