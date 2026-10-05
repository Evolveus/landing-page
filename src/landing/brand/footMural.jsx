import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   FOOTER MURAL — the pencil drawings at the foot of every brand page:
   the exam retold in one line, and loose doodles in the footer's empty
   space. Kept apart from chrome.jsx, which renders it, so the data
   here does not sit among the shared components.
   ═══════════════════════════════════════════════════════════════ */

/* Graphite: every pencil mark on these pages is run through this filter
   (url(#rg-graphite)), which streaks the stroke and breaks its edge into
   grain, as graphite catches on the tooth of paper. It is applied to
   whole marks in CSS px, so the grain is the same size on every mark.
   The footer renders it, so every page that shows pencil has it. */
export function GraphiteDefs() {
  return (
    <svg className="rg-defs" aria-hidden="true">
      <filter id="rg-graphite" x="-10%" y="-60%" width="120%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="0.22 1.1" numOctaves="3" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G" result="rough" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.45" result="grain" />
        <feComposite in="rough" in2="grain" operator="in" />
      </filter>
    </svg>
  );
}

/* The footer's mural: the exam retold in pencil, drawn left to right as
   the footer scrolls in. The sheet is set, the locked laptop runs it, a
   tick grades it, the bars show the results, and the pencil goes back
   into its tin (on the home page, closing what its gate opened). Board
   px are 1200 x 170.
   Each stroke is its own path, in drawing order: a dash restarts at
   every subpath, so one path could not draw them one after another.
   Each word is written as the line reaches it (at: share of the line);
   its letters must be in the Caveat request in index.html. */
const MURAL_STROKES = [
  // The base line runs the whole way; the things stand on it.
  'M8 130 C 24 126, 40 133, 60 129',
  // The sheet: outline, folded corner, three lines of questions.
  'M60 129 L 60 42 L 124 40 L 146 60 L 148 128',
  'M124 41 L 125 60 L 146 60',
  'M74 64 L 130 63',
  'M74 78 L 136 77',
  'M74 92 L 116 91',
  // On to the laptop: its base, its screen, the padlock on it.
  'M148 128 C 190 133, 236 125, 286 128 L 298 114 L 440 114 L 452 128',
  'M314 114 L 312 44 L 426 46 L 424 114',
  'M360 76 C 359 61, 381 61, 380 76',
  'M355 76 L 385 76 L 385 98 L 355 98 Z',
  'M370 84 L 370 90',
  // On, and the tick above the line.
  'M452 128 C 482 131, 516 126, 548 128',
  'M552 92 C 564 102, 574 112, 584 124 C 604 88, 632 56, 666 30',
  // The results: axis, then four bars.
  'M548 128 C 620 131, 690 125, 760 128 L 760 34',
  'M760 128 L 912 128',
  'M772 128 L 772 104 L 796 104 L 797 128',
  'M806 128 L 806 82 L 830 82 L 830 128',
  'M840 128 L 840 58 L 864 58 L 864 128',
  'M874 128 L 874 94 L 898 94 L 898 128',
  // Along to the tin, side on, open at its left end: the pencil slides
  // in, point out (the cone, its lead, the scallop where the paint stops),
  // and the lid slides shut over the rest.
  'M912 128 C 950 131, 984 125, 1012 128 L 1186 128 L 1186 70 L 1012 70 L 1012 128',
  'M1012 92 L 978 92 L 946 104 L 978 116 L 1012 116',
  'M946 104 L 957 100 L 957 108 Z',
  'M978 92 L 984 98 L 978 104 L 984 110 L 978 116',
  'M984 104 L 1012 104',
  'M1042 70 L 1042 60 L 1192 60 L 1192 70',
];
// Words at shares of the line.
const MURAL_WORDS = [
  { x: 104, at: 0.14, word: 'set' },
  { x: 369, at: 0.37, word: 'run' },
  { x: 612, at: 0.53, word: 'grade' },
  { x: 836, at: 0.75, word: 'see' },
  { x: 1100, at: 0.93, word: 'One place.' },
];

/* Loose doodles in the footer's empty space, as in the margins of a
   rough sheet: beside the content on wide screens, and under the short
   columns. Each is drawn on a 60 x 60 board; `at` names its place (see
   .rg-dd-* in journey.css). They are doodled last, as the page ends. */
const FOOT_DOODLES = [
  { at: 'l1', strokes: ['M30 30 C 34 26, 40 30, 37 35 C 33 41, 23 38, 22 30 C 21 20, 34 15, 42 22 C 50 30, 46 44, 34 46 C 22 48, 12 40, 12 28'] },
  { at: 'l2', strokes: ['M30 10 L 35 23 L 49 23 L 38 31 L 42 45 L 30 37 L 18 45 L 22 31 L 11 23 L 25 23 Z'] },
  { at: 'l3', strokes: ['M8 24 C 14 18, 20 30, 26 24 C 32 18, 38 30, 44 24 C 48 20, 52 24, 54 26', 'M8 36 C 14 30, 20 42, 26 36 C 32 30, 38 42, 44 36'] },
  { at: 'r1', strokes: ['M18 26 L 38 26 L 38 46 L 18 46 Z', 'M18 26 L 26 18 L 46 18 L 38 26 M46 18 L 46 38 L 38 46'] },
  { at: 'r2', strokes: ['M30 14 L 30 46 M14 30 L 46 30 M19 19 L 41 41 M41 19 L 19 41'] },
  { at: 'r3', strokes: ['M30 10 L 35 23 L 49 23 L 38 31 L 42 45 L 30 37 L 18 45 L 22 31 L 11 23 L 25 23 Z'] },
  { at: 'b1', strokes: ['M22 18 C 22 7, 39 7, 38 18 C 37 25, 30 24, 30 32', 'M30 39 L 30.6 40.4', 'M14 36 C 24 30, 34 24, 48 16'] },
  { at: 'b2', strokes: ['M30 30 C 34 26, 40 30, 37 35 C 33 41, 23 38, 22 30 C 21 20, 34 15, 42 22 C 50 30, 46 44, 34 46 C 22 48, 12 40, 12 28'] },
  { at: 'b3', strokes: ['M8 32 L 52 12 L 38 50 L 30 36 Z', 'M30 36 L 52 12', 'M4 46 C 10 49, 14 42, 20 44'] },
  // A clock, √x, a heart and a lightning bolt on the left; a lightbulb,
  // π, infinity and a triangle on the right; under the columns an A+, a
  // curly arrow and a smiley.
  { at: 'l4', strokes: ['M30 10 C 42 10, 50 18, 50 30 C 50 42, 42 50, 30 50 C 18 50, 10 42, 10 30 C 10 18, 18 10, 31 11', 'M30 18 L 30 30 L 39 35'] },
  { at: 'l5', strokes: ['M8 34 L 14 32 L 22 48 L 30 12 L 54 12', 'M36 22 L 48 38 M48 22 L 36 38'] },
  { at: 'l6', strokes: ['M30 48 C 14 36, 8 26, 14 18 C 20 10, 28 14, 30 22 C 32 14, 40 10, 46 18 C 52 26, 46 36, 30 48'] },
  { at: 'l7', strokes: ['M34 6 L 18 32 L 30 32 L 24 54 L 44 24 L 32 24 L 38 6'] },
  { at: 'r4', strokes: ['M22 36 C 14 30, 14 14, 30 12 C 46 14, 46 30, 38 36 L 37 42 L 23 42 Z', 'M24 46 L 36 46 M26 50 L 34 50', 'M30 3 L 30 7 M11 11 L 14 14 M49 11 L 46 14'] },
  { at: 'r5', strokes: ['M10 18 C 20 14, 40 16, 52 14', 'M22 17 C 22 30, 20 40, 16 48', 'M38 16 C 37 30, 38 42, 46 46'] },
  { at: 'r6', strokes: ['M30 30 C 20 16, 6 18, 6 30 C 6 42, 20 44, 30 30 C 40 16, 54 18, 54 30 C 54 42, 40 44, 30 30'] },
  { at: 'r7', strokes: ['M30 10 L 52 48 L 8 48 Z'] },
  { at: 'b4', strokes: ['M8 50 L 22 12 L 36 50 M14 36 L 30 36', 'M46 22 L 46 38 M38 30 L 54 30'] },
  { at: 'b5', strokes: ['M8 40 C 18 20, 34 50, 44 26 C 46 20, 46 16, 44 12', 'M38 16 L 44 10 L 50 17'] },
  { at: 'b6', strokes: ['M30 10 C 42 10, 50 18, 50 30 C 50 42, 42 50, 30 50 C 18 50, 10 42, 10 30 C 10 18, 18 10, 31 11', 'M23 24 L 23.5 25.5 M37 24 L 37.5 25.5', 'M20 34 C 24 41, 36 41, 40 34'] },
];

// Give each stroke its share of a drawing, by its length, so the pencil
// moves at one speed: --s and --e, where it starts and ends.
function shareStrokes(paths) {
  const lens = paths.map((p) => p.getTotalLength());
  const total = lens.reduce((a, b) => a + b, 0);
  let at = 0;
  paths.forEach((p, i) => {
    p.style.setProperty('--s', (at / total).toFixed(4));
    at += lens[i];
    p.style.setProperty('--e', (at / total).toFixed(4));
  });
}

/* The footer's drawings, both scrubbed by the scroll (--d, 0 to 1): the
   mural draws as the footer comes up, the loose doodles as the page
   reaches its end. */
export function FootMural() {
  const ref = useRef(null);
  const doodles = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const dd = doodles.current;
    if (!el || !dd) return;
    shareStrokes(Array.from(el.querySelectorAll('.rg-mural-line')));
    shareStrokes(Array.from(dd.querySelectorAll('.rg-mural-line')));
    let frame = 0;
    // Once visible, the footer writes itself in one pass: mural first,
    // then the loose doodles. This remains separate from scroll scrubbing
    // so it also works after the page has already loaded.
    let intro = 0;
    let introFrame = 0;
    let introStarted = false;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
      // The mural: 0 as its top enters the screen, 1 once two-thirds up.
      // If the page ends before it gets that far, the page's end is 1.
      const top = el.getBoundingClientRect().top;
      const span = vh * 0.62;
      const reach = Math.min(1, (vh - (top + window.scrollY - maxScroll)) / span);
      let d = Math.min(1, Math.max(0, (vh - top) / span) / Math.max(0.05, reach));
      // The doodles: over the last 240px before the footer's foot
      // reaches the bottom of the screen, where the page ends.
      const foot = dd.getBoundingClientRect().bottom;
      let dDoodle = Math.min(1, Math.max(0, (vh + 240 - foot) / 240));
      if (introFrame || intro) {
        // While it draws itself in, the timeline alone sets the pace;
        // once done, it stays drawn.
        d = Math.min(1, intro / 0.65);
        dDoodle = Math.min(1, Math.max(0, (intro - 0.65) / 0.35));
      }
      el.style.setProperty('--d', d.toFixed(3));
      dd.style.setProperty('--d', dDoodle.toFixed(3));
    };
    const isVisible = () => {
      const box = el.getBoundingClientRect();
      return box.top < window.innerHeight && box.bottom > 0;
    };
    const startIntro = () => {
      if (introStarted) return;
      introStarted = true;
      const t0 = performance.now();
      const play = (now) => {
        intro = Math.min(1, (now - t0) / 3200);
        update();
        introFrame = intro < 1 ? requestAnimationFrame(play) : 0;
      };
      introFrame = requestAnimationFrame(play);
    };
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        startIntro();
        observer.disconnect();
      }, { threshold: 0.12 });
    observer?.observe(el);
    if (!observer && isVisible()) startIntro();
    const onScroll = () => {
      if (isVisible()) startIntro();
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(introFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <>
      <div className="rg-mural" ref={ref} aria-hidden="true">
        <svg viewBox="0 0 1200 170">
          {MURAL_STROKES.map((d) => (
            <path key={d} className="rg-mural-line" d={d} pathLength="1" />
          ))}
          {MURAL_WORDS.map(({ x, at, word }) => (
            <text key={word} className="rg-mural-word" x={x} y="160" style={{ '--at': at }}>{word}</text>
          ))}
        </svg>
      </div>
      <div className="rg-foot-doodles" ref={doodles} aria-hidden="true">
        {FOOT_DOODLES.map(({ at, strokes }) => (
          <svg key={at} className={`rg-dd rg-dd-${at}`} viewBox="0 0 60 60">
            {strokes.map((d) => (
              <path key={d} className="rg-mural-line rg-dd-line" d={d} pathLength="1" />
            ))}
          </svg>
        ))}
      </div>
    </>
  );
}
