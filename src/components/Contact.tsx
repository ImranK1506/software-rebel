import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Check, AlertTriangle } from 'lucide-react';

/**
 * Web3Forms access key. This is intentionally PUBLIC and safe to ship in client
 * code: it can only trigger an email to the verified owner address — it cannot
 * read submissions or be abused to access anything. Get one at web3forms.com.
 * Prefer setting VITE_WEB3FORMS_KEY in a .env file; the fallback is here so the
 * component still compiles before you wire that up.
 */
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY ?? 'YOUR_ACCESS_KEY_HERE';

const EMAIL = 'imran@softwarerebel.com';

interface Channel {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const channels: Channel[] = [
  { icon: <Mail className="h-4 w-4" />, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: <Phone className="h-4 w-4" />, label: 'Phone', value: '+31 6 37336418', href: 'tel:+31637336418' },
  { icon: <MapPin className="h-4 w-4" />, label: 'Location', value: 'Amsterdam, The Netherlands' },
  { icon: <Github className="h-4 w-4" />, label: 'GitHub', value: 'github.com/ImranK1506', href: 'https://github.com/ImranK1506', external: true },
  { icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn', value: 'in/imran-khan-se', href: 'https://www.linkedin.com/in/imran-khan-se/', external: true },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const labelCls = 'mb-1.5 block font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground';
const fieldCls =
  'w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // spam trap — real users never fill this
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot filled the hidden field — silently pretend success, send nothing.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New transmission from ${name} — softwarerebel.com`,
          from_name: 'Software Rebel Portfolio',
          name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div
            className="grid items-start gap-10 rounded-lg border border-border p-8 md:grid-cols-[0.85fr_1.15fr] md:p-12"
            style={{
              background:
                'radial-gradient(120% 120% at 0% 0%, hsl(var(--primary) / 0.06), transparent 50%), hsl(var(--card))',
            }}
          >
            {/* Left — invitation + channels */}
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary">
                04 · Open Channel
              </span>
              <h2 className="mb-4 font-display text-3xl font-semibold uppercase leading-tight text-foreground md:text-4xl">
                Let&apos;s build something rebellious.
              </h2>
              <p className="mb-7 max-w-prose text-muted-foreground">
                Ready to break some conventions? Send a transmission and let&apos;s create something
                that stands out. Currently accepting select projects for Q2 2026.
              </p>

              <div className="grid gap-1">
                {channels.map((c) => {
                  const inner = (
                    <>
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-md border border-border text-primary">
                        {c.icon}
                      </span>
                      <span>
                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
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
                      className="flex items-center gap-3 rounded-md border border-transparent p-2 transition-colors hover:border-border hover:bg-secondary"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={c.label} className="flex items-center gap-3 p-2">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — the transmission form */}
            <form onSubmit={handleSubmit}>
              {/* Honeypot: visually hidden, off-screen, not announced. */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={labelCls}>Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={fieldCls}
                    disabled={sending}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className={labelCls}>Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={fieldCls}
                    disabled={sending}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="cf-message" className={labelCls}>Message</label>
                <textarea
                  id="cf-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you building?"
                  className={`${fieldCls} resize-y`}
                  disabled={sending}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="glow-on-hover mt-5 inline-flex w-full items-center justify-center gap-3 rounded-md bg-primary px-7 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                style={{ boxShadow: '0 0 22px hsl(var(--primary) / 0.35)' }}
              >
                {sending ? (
                  'Transmitting…'
                ) : (
                  <>
                    Start a Transmission
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Status — announced to screen readers */}
              <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-primary">
                    <Check className="h-4 w-4" />
                    Transmission received — I&apos;ll get back to you shortly.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 text-sm text-rebel">
                    <AlertTriangle className="h-4 w-4" />
                    Something went wrong. Email me directly at{' '}
                    <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-foreground">
                      {EMAIL}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
