import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

type SaberColor = 'holo' | 'gold' | 'rebel';

interface SaberDividerProps {
  /** Blade color: hologram blue (default), title-crawl gold, or rebel red. */
  color?: SaberColor;
  className?: string;
}

const BLADE: Record<SaberColor, string> = {
  holo: 'hsl(var(--primary))',
  gold: 'hsl(var(--gold))',
  rebel: 'hsl(var(--rebel))',
};

const GLOW: Record<SaberColor, string> = {
  holo: 'hsl(var(--primary) / 0.5)',
  gold: 'hsl(var(--gold) / 0.5)',
  rebel: 'hsl(var(--rebel) / 0.5)',
};

/**
 * A lightsaber section divider. The blade "ignites" — extends from the hilt
 * with a glow — when scrolled into view. Drop between sections in Index.tsx.
 */
const SaberDivider = ({ color = 'holo', className }: SaberDividerProps) => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.6 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('relative mx-auto h-0.5 w-[calc(100%-3rem)] max-w-6xl', className)}
    >
      {/* hilt */}
      <span className="absolute -top-1.5 left-0 h-3 w-8 rounded-sm border border-border bg-gradient-to-r from-secondary to-card" />

      {/* blade — animates width from 0 to full on reveal */}
      <span
        className="absolute left-8 top-0 h-0.5 rounded-full transition-[width] duration-1000 ease-out motion-reduce:transition-none"
        style={{
          width: revealed ? 'calc(100% - 2rem)' : 0,
          backgroundColor: BLADE[color],
          boxShadow: `0 0 12px ${BLADE[color]}, 0 0 26px ${GLOW[color]}`,
        }}
      />
    </div>
  );
};

export default SaberDivider;
