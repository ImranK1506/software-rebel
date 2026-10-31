import { footer, profile } from '@/data/site';
import RichText from '@/components/RichText';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-2 font-mono text-base font-semibold text-foreground">
                &lt;<span className="text-gold">{profile.handle}</span> /&gt;
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {profile.tagline}
              </p>
            </div>

            <div className="md:text-right">
              <p className="mb-1 text-sm text-muted-foreground">
                {`© ${new Date().getFullYear()} ${profile.brand} · ${profile.city}, ${profile.countryCode}`}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                <RichText parts={footer.credit} emClassName="text-gold" />
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-xs text-muted-foreground">{footer.note}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
