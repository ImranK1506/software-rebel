import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  /** 0–1 portion of the element that must be visible to trigger. */
  threshold?: number;
  /** Margin around the root; negative bottom delays the trigger until the element is well in view. */
  rootMargin?: string;
  /** Reveal once and stop observing (default), or re-trigger every time it enters/leaves. */
  once?: boolean;
}

/**
 * Reveals an element when it scrolls into view.
 * Returns a ref to attach and a `revealed` boolean to drive transitions.
 * Respects prefers-reduced-motion by revealing immediately and skipping observation.
 *
 *   const { ref, revealed } = useReveal<HTMLDivElement>();
 *   <div ref={ref} className={revealed ? 'opacity-100' : 'opacity-0'} />
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
    threshold = 0.16,
    rootMargin = '0px 0px -10% 0px',
    once = true,
  }: UseRevealOptions = {}) {
    const ref = useRef<T>(null);
    const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: show immediately, never animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    // No IntersectionObserver (very old browsers): fail open.
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}

export default useReveal;
