import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, profile } from '@/data/site';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || menuOpen
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-base font-semibold text-foreground transition-opacity hover:opacity-80"
          >
            &lt;<span className="text-gold">{profile.handle}</span> /&gt;
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-md px-3.5 py-2 font-mono text-sm tracking-wide text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`#${nav.cta.id}`}
              className="ml-2 rounded-md border border-gold px-4 py-2 font-mono text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              {nav.cta.label}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground transition-colors hover:border-primary md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mt-4 grid gap-1 border-t border-border pt-4 md:hidden">
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3.5 py-3 text-left font-mono text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`#${nav.cta.id}`}
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-md border border-gold px-4 py-3 text-left font-mono text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              {nav.cta.label}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
