const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-2 font-mono text-base font-semibold text-foreground">
                &lt;<span className="text-gold">softwarerebel</span> /&gt;
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Breaking conventions, building the future
              </p>
            </div>

            <div className="md:text-right">
              <p className="mb-1 text-sm text-muted-foreground">
                © {new Date().getFullYear()} Software Rebel · Amsterdam, NL
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Crafted with React, TypeScript &amp; a{' '}
                <span className="text-gold">rebellious spirit</span>
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-xs text-muted-foreground">
              // Built to showcase what&apos;s possible when you dare to be different.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
