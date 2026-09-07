import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   PAGE MOTION — the scroll behaviour every EvolveUs brand page
   shares: reveal-on-scroll, the sticky-nav trigger, and the nav's
   progress bar. Kept apart from chrome.jsx so that file exports
   components only and stays fast-refreshable.
   ═══════════════════════════════════════════════════════════════ */

/* Scroll reveal, as progressive enhancement.

   Content is visible by default. The hidden start state only applies
   once JS has added `rg-anim`, and a timer force-reveals everything if
   the observer never reports — so a marketing page can never end up
   blank because IntersectionObserver was throttled, blocked, or slow. */
export function useReveal() {
  const root = useRef(null);

  // Opt into the hidden start state before first paint, so nothing flashes.
  useLayoutEffect(() => {
    root.current?.classList.add('rg-anim');
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const nodes = Array.from(el.querySelectorAll('[data-rv]'));
    if (!nodes.length) return;

    const revealAll = () => nodes.forEach((n) => n.classList.add('is-in'));

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    );

    nodes.forEach((n) => io.observe(n));

    // Safety net: if nothing has reported by now, the observer is not
    // working here. Show everything rather than leave the page empty.
    const failsafe = setTimeout(() => {
      if (!el.querySelector('[data-rv].is-in')) revealAll();
    }, 2000);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return root;
}

/* True once the page has scrolled past the nav's resting height. */
export function useStuck(offset = 24) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return stuck;
}

/* True when the visitor has not asked for reduced motion. */
export function motionOK() {
  return typeof window !== 'undefined'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* Drives the hairline progress bar in the nav — how far down the page you are.

   Writes straight from the scroll handler rather than batching through
   requestAnimationFrame: this is one transform write with no layout read,
   and rAF is throttled to a standstill in some embedded/background views. */
export function useScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return bar;
}

