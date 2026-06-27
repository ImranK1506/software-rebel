import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Check } from 'lucide-react';

interface Channel {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const channels: Channel[] = [
  {
    icon: <Mail className="h-4 w-4" />,
    label: 'Email',
    value: 'imran@softwarerebel.com',
    href: 'mailto:imran@softwarerebel.com',
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: 'Phone',
    value: '+31 6 37336418',
    href: 'tel:+31637336418',
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    label: 'Location',
    value: 'Amsterdam, The Netherlands',
  },
  {
    icon: <Github className="h-4 w-4" />,
    label: 'GitHub',
    value: 'github.com/ImranK1506',
    href: 'https://github.com/ImranK1506',
    external: true,
  },
  {
    icon: <Linkedin className="h-4 w-4" />,
    label: 'LinkedIn',
    value: 'in/imran-khan-se',
    href: 'https://www.linkedin.com/in/imran-khan-se/',
    external: true,
  },
];

const EMAIL = 'imran@softwarerebel.com';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Open the user's mail client if one exists, and always copy the address so the
  // button does something visible even when no mailto handler is registered.
  const handleTransmission = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the mailto below still fires.
    }
  };

  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div
            className="grid items-center gap-10 rounded-lg border border-border p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12"
            style={{
              background:
                'radial-gradient(120% 120% at 0% 0%, hsl(var(--primary) / 0.06), transparent 50%), hsl(var(--card))',
            }}
          >
            {/* Left — the invitation */}
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary">
                04 · Open Channel
              </span>
              <h2 className="mb-4 font-display text-3xl font-semibold uppercase leading-tight text-foreground md:text-4xl">
                Let&apos;s build something rebellious.
              </h2>
              <p className="mb-7 max-w-prose text-muted-foreground">
                Ready to break some conventions? Tell me what you&apos;re building and let&apos;s create
                something that stands out from the crowd. Currently accepting select projects for Q2
                2026.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                onClick={handleTransmission}
                className="glow-on-hover inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground"
                style={{ boxShadow: '0 0 22px hsl(var(--primary) / 0.35)' }}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Address Copied
                  </>
                ) : (
                  'Start a Transmission'
                )}
              </a>
              <span aria-live="polite" className="sr-only">
                {copied ? `${EMAIL} copied to clipboard` : ''}
              </span>

              {/* Open-to-freelance note (kept from your content) */}
              <p className="mt-7 max-w-prose text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Open to freelance:</span> accepting new
                projects for Q2 2026 — let&apos;s build something extraordinary together.
              </p>
            </div>

            {/* Right — channels */}
            <div className="grid gap-1.5">
              {channels.map((c) => {
                const inner = (
                  <>
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-md border border-border text-primary">
                      {c.icon}
                    </span>
                    <span>
                      <span className="block font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="block text-sm text-foreground">{c.value}</span>
                    </span>
                  </>
                );

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3.5 rounded-md border border-transparent p-3 transition-colors hover:border-border hover:bg-secondary"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-center gap-3.5 p-3">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
