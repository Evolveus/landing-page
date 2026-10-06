import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

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

    // A masked headline starts fully clipped (clip-path), and Chrome counts
    // the target's own clip-path as zero visible area, so it would never
    // report as intersecting. Watch its unclipped parent instead.
    const watched = new Map();
    nodes.forEach((n) => {
      const target = n.classList.contains('rg-rv--mask') && n.parentElement ? n.parentElement : n;
      if (!watched.has(target)) watched.set(target, []);
      watched.get(target).push(n);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          watched.get(e.target)?.forEach((n) => n.classList.add('is-in'));
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    );

    watched.forEach((_, target) => io.observe(target));

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

/* True when the visitor has not asked for reduced motion. */
export function motionOK() {
  return typeof window !== 'undefined'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* The nav's scroll state: whether the page has scrolled past the nav's
   resting height, and a ref for the hairline progress bar — how far down
   the page you are.

   Writes the bar straight from the scroll handler rather than batching
   through requestAnimationFrame: this is one transform write with no
   layout read, and rAF is throttled to a standstill in some
   embedded/background views. */
export function useNavScroll() {
  // Read the real position up front, so a page opened part-way down
  // doesn't paint the top-of-page nav first and then swap.
  const [stuck, setStuck] = useState(() => window.scrollY > 24);
  const bar = useRef(null);
  useEffect(() => {
    const el = bar.current;
    const update = () => {
      setStuck(window.scrollY > 24);
      if (!el) return;
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
  return [stuck, bar];
}


/* Light or dark.

   With nothing stored, the page follows the system setting. The toggle
   writes an explicit choice to <html data-theme> and localStorage; the
   inline script in index.html applies a stored choice before first paint,
   so the page never flashes the wrong theme. */
const THEME_KEY = 'evolveus-theme';

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || systemTheme(),
  );

  // Track the system setting while the visitor has not chosen one.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;
    const sync = () => {
      if (!document.documentElement.dataset.theme) setTheme(systemTheme());
    };
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked: the choice lasts this visit */ }
    setTheme(next);
  };

  return [theme, toggle];
}

/* Eased, weighted scrolling for pages that tell a story on scroll.

   Lenis still moves the real window, so sticky elements, scroll events
   and the hooks above work unchanged. It turns smoothing off by itself
   when the visitor asks for reduced motion. In-page links glide to their
   target, stopping below the fixed nav. */
export function useSmoothScroll() {
  useEffect(() => {
    if (!motionOK()) return undefined;

    let lenis;
    try {
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.075,
        anchors: { offset: -64 },
      });
    } catch {
      // Native scrolling remains fully functional when smooth scrolling is unsupported.
      return undefined;
    }

    return () => lenis.destroy();
  }, []);
}
