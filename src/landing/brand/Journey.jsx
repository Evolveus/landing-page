import { Fragment, useEffect, useRef, useState } from 'react';
import './register.css';
import './journey.css';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { Rv, Nav, Footer } from './chrome';
import { motionOK, useReveal, useSmoothScroll } from './pageMotion';
import { Exhibit, ThemedImg, OmrNumber } from './figures';
import {
  TRUST, MARKING_SHOTS, REPORTS, MASTERY_SAMPLE, BRAND,
  JOURNEY_NAV, JOURNEY_HERO, JOURNEY_INTRO, JOURNEY_STEPS, JOURNEY_PROOF, JOURNEY_BRIEF, JOURNEY_CTA,
} from '../content';

/* ═══════════════════════════════════════════════════════════════
   JOURNEY — prototype of the home page as a scroll story.

   One answer sheet lies on a desk drawn in perspective. As the reader
   scrolls past the four steps, the sheet goes through one exam: the
   questions arrive from the bank, a student fills it in while the
   invigilation log runs, it is marked and approved, and the results
   rise off the desk as a histogram.

   Scroll position becomes one number, t, from 0 to 4 (one unit per
   step). Everything on the desk is CSS driven by t and the per-step
   fractions --p1 to --p4, so the scroll handler only writes a few
   custom properties.
   ═══════════════════════════════════════════════════════════════ */

/* Camera per step boundary: tilt of the paper, its turn, and zoom.
   Index k is the pose when step k has fully played. The sheet faces the
   reader flat (which also keeps its text sharp) while there is something on it to read. It lies
   back only for the results, so the histogram can rise out of it, and
   then turns further to show topic mastery across sections. x pans the
   board sideways, in board px, to keep the subject centred. */
const CAMERA = [
  { rx: 0, rz: 0, s: 1, x: 0 },
  { rx: 0, rz: 0, s: 1, x: 0 },
  { rx: 0, rz: 0, s: 1, x: 0 },
  { rx: 0, rz: 0, s: 1, x: 0 },
  { rx: 50, rz: -20, s: 1.04, x: 40 },
  { rx: 46, rz: -28, s: 1.14, x: 0 },
];

const ease = (x) => x * x * (3 - 2 * x);

function cameraAt(t) {
  const k = Math.min(CAMERA.length - 2, Math.floor(t));
  const f = ease(Math.min(1, Math.max(0, t - k)));
  const a = CAMERA[k];
  const b = CAMERA[k + 1];
  return {
    rx: a.rx + (b.rx - a.rx) * f,
    rz: a.rz + (b.rz - a.rz) * f,
    s: a.s + (b.s - a.s) * f,
    x: a.x + (b.x - a.x) * f,
  };
}

/* Turns the scroll position into t, from 0 to the number of steps + 1.

   The first unit is the gate (--p0): a centred line and a pencil tin
   whose lid slides off as the reader scrolls; once it is open, the
   pencil goes to the desk, the stage fades in and the sheet unrolls. Steps 1 to n follow as --p1 to --pn. The active index is -1
   while the gate is up.

   The step text and the stage are both pinned (CSS sticky) for as long
   as the story's track is scrolling past, so the reader never scrolls
   from one step to the next: scrolling only advances t, and the text
   swaps in place when the step changes. Each step plays over the first
   80% of its share of the track and holds its finished state for the
   rest. With reduced motion, t snaps to whole steps. */
const PLAY = 0.8;
// The scroll length of each unit (the gate, then each step), in shares of
// the track's --per, where it differs from one. Step 2, where the pencil
// answers six questions, gets twice the room, and plays at half the speed.
const UNIT_LENGTH = { 2: 2 };
const unitLength = (k) => UNIT_LENGTH[k] ?? 1;
// Where each unit starts on the track, in --per shares.
const unitStarts = (units) => Array.from({ length: units + 1 }, (_, k) => {
  let at = 0;
  for (let i = 0; i < k; i++) at += unitLength(i);
  return at;
});
// The share of the gate after which step 1's text takes over.
const GATE_DONE = 0.82;
// How the stage follows the scroll: the most units (steps) it moves in a
// second, and how quickly it eases toward the scroll position.
const MAX_RATE = 1.4;
// The share of the gate at which the gate's pencil hands over to the
// desk's (the stage has faded in by then).
const PEN_SWAP = 0.8;
// How fast the pencil turns over to its eraser and back (turns a second),
// and how far the eraser's end is from the point, in board px (the
// drawing is 200 long, shown at 0.8; the eraser cap ends at 199).
const FLIP_RATE = 3.2;
// The eraser zone inside step 2 (in story units), where there are marks
// to rub out: the first answer is shaded from 0.04 into the step (see
// ROW_WINDOWS). In from ERASE_IN, out below ERASE_OUT; the gap between
// them is a dead zone, so hovering at the edge cannot set it spinning.
const ERASE_IN = 2.055;
const ERASE_OUT = 2.035;
const PEN_LENGTH = 199 * 0.8;
const EASE = 5;

function useJourney(stepCount) {
  const stage = useRef(null);
  const track = useRef(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = stage.current;
    const tr = track.current;
    if (!el || !tr) return;
    // Scroll state goes on the story section, so the gate (outside the
    // stage) and the stage both inherit it.
    const host = el.closest('.jy-story') ?? el;
    const smooth = motionOK();
    const narrow = window.matchMedia('(max-width: 880px)');

    let top = 0;
    let span = 1;
    let pinTop = 0;
    const measure = () => {
      const r = tr.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      // Where the text pins: the top of the viewport on desktop, just
      // below the pinned stage on phones.
      pinTop = narrow.matches
        ? (parseFloat(getComputedStyle(el.parentElement).top) || 0) + box.height
        : 0;
      top = r.top + window.scrollY;
      // The distance over which the text stays pinned.
      span = Math.max(1, r.height - (window.innerHeight - pinTop));
      // The paper is drawn on a 760 x 600 board and scaled to fit the
      // stage. Phones fit the sheet itself, leaving the margins to clip.
      const fit = narrow.matches
        ? Math.min(box.width / 400, box.height / 470)
        : Math.min(box.width / 660, box.height / 560, 1.45);
      el.style.setProperty('--fit', fit.toFixed(3));
    };

    const desk = el.querySelector('.jy-desk');
    const anchor = host.querySelector('.jy-gpen-anchor');

    // Board-px points the pencil visits in step 2, read from the sheet.
    let marks = null;
    const measureMarks = () => {
      if (!desk) return;
      const k = 760 / (desk.offsetWidth || 760);
      const rows = desk.querySelectorAll('.jy-row');
      marks = Array.from(rows, (row) => {
        const pick = row.querySelector('.jy-bub.is-pick');
        if (pick) {
          const o = offsetIn(pick, desk);
          // The shade's 24-unit box spans the bubble plus SHADE_PAD a side.
          const box = (pick.offsetWidth + SHADE_PAD * 2) * k;
          const cx = (o.x + pick.offsetWidth / 2) * k;
          const cy = (o.y + pick.offsetHeight / 2) * k;
          const shade = SHADES[Number(row.dataset.i) % SHADES.length];
          return {
            x: cx,
            y: cy,
            path: shade.pts.map(([x, y]) => [cx + ((x - 12) / 24) * box, cy + ((y - 12) / 24) * box]),
          };
        }
        const code = row.querySelectorAll('.jy-code code');
        if (code.length) {
          // scrollWidth is the full line, even while typing clips it.
          return {
            code: Array.from(code, (c) => {
              const o = offsetIn(c, desk);
              return [o.x * k, (o.y + c.offsetHeight / 2) * k, (o.x + c.scrollWidth) * k];
            }),
          };
        }
        const line = row.querySelector('.jy-lines i');
        if (line) {
          const o = offsetIn(line, desk);
          const y = (o.y + line.offsetHeight / 2) * k;
          return { line: [o.x * k, y, (o.x + line.offsetWidth) * k] };
        }
        return null;
      });
    };

    const units = stepCount + 1;
    const starts = unitStarts(units);
    // Pencil end in use: 0 the point, 1 the eraser. See tick().
    let flip = 0;
    let rewinding = false;
    let erasing = false;

    // Where the scroll position says the story should be.
    const target = () => {
      const u = Math.min(1, Math.max(0, (window.scrollY + pinTop - top) / span)) * starts[units];
      let idx = 0;
      while (idx < units - 1 && u >= starts[idx + 1]) idx++;
      const f = (u - starts[idx]) / unitLength(idx);
      return smooth ? idx + Math.min(1, f / PLAY) : idx + 1;
    };

    let last = -2;
    const render = (t) => {
      for (let k = 0; k <= stepCount; k++) {
        host.style.setProperty(`--p${k}`, Math.min(1, Math.max(0, t - k)).toFixed(3));
      }
      // Which unit is playing: unit k covers t in (k, k + 1]. The gate
      // (unit 0) hands over to step 1 once its tin is open and the
      // stage has faded in (see .jy-gate and .jy-stage in the CSS).
      const unit = Math.max(0, Math.ceil(t) - 1);
      const next = unit === 0 && t < GATE_DONE ? -1 : Math.max(0, unit - 1);
      // The story proper (steps 1 to n) runs on t - 1.
      const s = Math.max(0, t - 1);
      const cam = cameraAt(s);
      host.style.setProperty('--rx', `${cam.rx.toFixed(2)}deg`);
      host.style.setProperty('--rz', `${cam.rz.toFixed(2)}deg`);
      host.style.setProperty('--sc', cam.s.toFixed(3));
      host.style.setProperty('--cx', `${cam.x.toFixed(1)}px`);
      // 3D only once the results start; see .jy-stage[data-depth].
      el.toggleAttribute('data-depth', s > 3.001);

      // The pencil on the desk.
      const pk = (k) => clamp01(t - k);
      const contact = pencilAt({ p2: pk(2), p3: pk(3) }, marks);
      // Turned over (flip 1), the eraser end touches the paper where the
      // point would have. Position is set by the point, so step it back
      // along the pencil's axis by the pencil's length.
      const fe = flip * flip * (3 - 2 * flip);
      const angle = contact.a + 180 * fe;
      const rad = (angle * Math.PI) / 180;
      const reach = PEN_LENGTH * fe;
      const pen = {
        ...contact,
        x: contact.x - Math.cos(rad) * reach,
        y: contact.y - Math.sin(rad) * reach,
        a: angle,
      };
      const p0 = pk(0);
      host.style.setProperty('--pen-x', `${pen.x.toFixed(1)}px`);
      host.style.setProperty('--pen-y', `${pen.y.toFixed(1)}px`);
      host.style.setProperty('--pen-a', `${pen.a.toFixed(1)}deg`);
      host.style.setProperty('--pen-l', pen.lift.toFixed(3));
      host.style.setProperty('--pen-o', p0 >= PEN_SWAP ? pen.o.toFixed(3) : '0');

      // The gate's pencil glides to the desk's resting spot as the gate
      // lifts, then hands over to the desk's pencil. Both are pinned by
      // then, so their positions are read live for the short handover.
      const m = clamp01((p0 - 0.7) / (PEN_SWAP - 0.7));
      if (anchor && desk && m > 0 && m < 1) {
        const a = anchor.getBoundingClientRect();
        const d = desk.getBoundingClientRect();
        const fit = parseFloat(el.style.getPropertyValue('--fit')) || 1;
        host.style.setProperty('--gpen-x', `${((d.left + PEN_REST.x * fit - a.left) * m).toFixed(1)}px`);
        host.style.setProperty('--gpen-y', `${((d.top + PEN_REST.y * fit - a.top) * m).toFixed(1)}px`);
        host.style.setProperty('--gpen-s', (1 + (fit - 1) * m).toFixed(3));
      } else if (m <= 0) {
        // Back in its slot. Reset explicitly: a fast scroll back up can
        // skip the handover frames and leave a part-way offset behind.
        host.style.setProperty('--gpen-x', '0px');
        host.style.setProperty('--gpen-y', '0px');
        host.style.setProperty('--gpen-s', '1');
      }
      host.style.setProperty('--gpen-m', m.toFixed(3));
      host.style.setProperty('--gpen-o', p0 >= PEN_SWAP ? '0' : '1');
      if (next !== last) {
        last = next;
        setActive(next);
      }
    };

    /* The stage follows the scroll position at a limited speed, the way
       a scrubbed timeline with lag works: it eases toward the target and
       never moves faster than MAX_RATE units a second. A quick flick
       still plays every step, over a readable time, instead of all at
       once; scrolling back rewinds the same way. With reduced motion it
       jumps straight to the target. */
    let shown = target();
    let goal = shown;
    let frame = 0;
    let prev = 0;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const gap = goal - shown;
      // Which way the story is moving: back up the page, the pencil
      // turns over and rubs the marks out with its eraser. A small dead
      // zone keeps a hair's wobble from reading as a change of direction.
      if (gap < -0.01) rewinding = true;
      else if (gap > 0.01) rewinding = false;
      const eased = gap * (1 - Math.exp(-dt * EASE));
      // A longer unit plays slower by the same factor.
      const cap = MAX_RATE * dt / unitLength(Math.min(units - 1, Math.floor(shown)));
      shown += Math.max(-cap, Math.min(cap, eased));
      if (Math.abs(goal - shown) < 0.0005) shown = goal;
      // The turn itself plays in time, a quick twirl, not with the scroll.
      // Hysteresis at the edge of step 2: the eraser comes in only once
      // clearly inside the step and goes only once clearly at its edge,
      // so hovering on the boundary cannot set the pencil spinning.
      if (!rewinding || shown <= ERASE_OUT || shown >= 3) erasing = false;
      else if (shown >= ERASE_IN) erasing = true;
      const want = erasing ? 1 : 0;
      flip += Math.max(-FLIP_RATE * dt, Math.min(FLIP_RATE * dt, want - flip));
      render(shown);
      frame = shown === goal && flip === want ? 0 : requestAnimationFrame(tick);
    };
    const update = () => {
      goal = target();
      if (!smooth) {
        shown = goal;
        render(shown);
        return;
      }
      if (!frame) {
        prev = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    // On load and resize, jump to the scroll position rather than
    // playing the story from the top.
    const onResize = () => { measure(); measureMarks(); shown = goal = target(); render(shown); };
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, [stepCount]);

  return { stage, track, active };
}

/* True once the visitor has sat on the landing view for a few seconds
   without scrolling; false for good as soon as they scroll. */
const HINT_DELAY = 4000;

function useIdleHint() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done && window.scrollY < 40) setOn(true);
    }, HINT_DELAY);
    const onScroll = () => {
      if (window.scrollY < 40) return;
      done = true;
      clearTimeout(timer);
      setOn(false);
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return on;
}

/* ── The pencil ─────────────────────────────────────────────────
   A flat, drawn HB pencil seen from above, 200 x 16 board px, with the
   point at the left edge's midpoint. It is positioned by its point:
   CSS turns it about the point (transform-origin 0 50%). Flat bands of
   colour stand in for the facets; no gradients. */
function Pencil({ className }) {
  return (
    <svg className={className} width="200" height="16" viewBox="0 0 200 16" aria-hidden="true">
      <polygon points="0,8 9,5.6 9,10.4" fill="#2f3431" />
      <polygon points="9,5.6 34,0 34,16 9,10.4" fill="#e6cfa4" />
      <polygon points="9,8 34,8 34,16 9,10.4" fill="#cfb185" />
      <rect x="34" y="0" width="136" height="5.3" fill="#2bb377" />
      <rect x="34" y="5.3" width="136" height="5.4" fill="#1a8d5c" />
      <rect x="34" y="10.7" width="136" height="5.3" fill="#0f6b45" />
      <text x="56" y="9.6" fontFamily="DM Mono, monospace" fontSize="4.6" letterSpacing="0.9" fill="#d8efe3">EVOLVEUS · HB</text>
      <rect x="170" y="0" width="13" height="16" fill="#b9bfbc" />
      <rect x="173" y="0" width="1.4" height="16" fill="#8f9692" />
      <rect x="178" y="0" width="1.4" height="16" fill="#8f9692" />
      <rect x="183" y="0.6" width="16" height="14.8" rx="3" fill="#e59a8c" />
    </svg>
  );
}

/* The rest of the tin: a white eraser in a green paper sleeve, and a
   metal sharpener. Flat drawings, like the pencil. */
function Eraser() {
  return (
    <svg className="jy-eraser" width="44" height="14" viewBox="0 0 44 14" aria-hidden="true">
      <rect x="0" y="0" width="44" height="14" rx="3" fill="#f3f1ea" />
      <rect x="14" y="0" width="30" height="14" fill="#1a8d5c" />
      <rect x="14" y="0" width="30" height="4.5" fill="#2bb377" />
      <text x="17" y="10" fontFamily="DM Mono, monospace" fontSize="4.4" letterSpacing="0.6" fill="#d8efe3">ERASER</text>
    </svg>
  );
}

function Sharpener() {
  return (
    <svg className="jy-sharp" width="24" height="16" viewBox="0 0 24 16" aria-hidden="true">
      <rect x="0" y="0" width="24" height="16" rx="2.5" fill="#b9bfbc" />
      <rect x="0" y="0" width="24" height="5" rx="2.5" fill="#d3d8d5" />
      <circle cx="8" cy="9" r="4" fill="#5d6460" />
      <circle cx="8" cy="9" r="1.6" fill="#2f3431" />
      <rect x="14" y="4.5" width="8" height="2" fill="#8f9692" />
    </svg>
  );
}

/* How a bubble is shaded: one continuous back-and-forth stroke over a
   wobbly graphite wash, in a 24 x 24 box drawn a little larger than the
   bubble so the shading strays over its outline. The same points draw
   the mark (journey.css .jy-shade-line) and steer the pencil's point,
   so the line always grows from under the point. Three hands, used in
   turn down the sheet. */
const SHADES = [
  {
    wash: 'M5 10C4 5 9 3 13 3.5S21 7 20.5 12 16 20.5 11 20 3.5 15.5 5 10Z',
    pts: [[3.5, 14], [10, 3.5], [4.5, 18], [14, 3.6], [6.5, 20.5], [18, 4.4], [9.5, 21], [20.8, 7.2], [13.5, 20.6], [21.4, 12], [17.5, 19.6], [21.6, 15.4]],
  },
  {
    wash: 'M4 12C4 6 8 3.5 12.5 4S20.5 8.5 20 13 15 20.5 10.5 20 4 16.5 4 12Z',
    pts: [[4.2, 15.5], [9, 4.2], [5, 19.2], [12.4, 3.8], [8, 21.2], [16.2, 4.4], [11.4, 21], [19.4, 6.2], [15.2, 20.4], [21, 9.6]],
  },
  {
    wash: 'M5.5 11C5 6.5 8.5 4 12.5 4S20 6.5 20 11.5 17 19.5 12 19.8 5.8 16 5.5 11Z',
    pts: [[5, 7.5], [18.5, 5.2], [4.2, 11.2], [20.6, 9], [4.4, 15], [20.2, 13.4], [6.4, 18.8], [18.6, 17.6], [8.6, 21]],
  },
];
const SHADE_PAD = 3.5;
const shadePath = (pts) => `M${pts.map(([x, y]) => `${x} ${y}`).join('L')}`;

/* A point a fraction u of the way along a polyline, by length. */
function alongPath(pts, u) {
  const segs = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const len = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segs.push(len);
    total += len;
  }
  let d = clamp01(u) * total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const f = segs[i] ? Math.min(1, d / segs[i]) : 0;
      return { x: lerp(pts[i][0], pts[i + 1][0], f), y: lerp(pts[i][1], pts[i + 1][1], f) };
    }
    d -= segs[i];
  }
  return { x: pts[0][0], y: pts[0][1] };
}

/* Where the pencil rests, in board px, and its angles. It lies just under
   the foot of the sheet, close enough that a stage cropped to the sheet
   (tablets, phones) still shows all of it. */
const PEN_REST = { x: 430, y: 462 };
const PEN_ANGLE_REST = -18;
const PEN_ANGLE_WRITE = -34;

/* When each row is answered in step 2, as shares of the step. The rows
   get these as --ws/--we (journey.css, .jy-row --e), and the pencil
   reads the same table, so it arrives just before each answer appears
   and leaves as it completes. The code row gets the longest window. */
const ROW_WINDOWS = [
  [0.04, 0.14],
  [0.2, 0.28],
  [0.34, 0.44],
  [0.5, 0.62],
  [0.67, 0.83],
  [0.88, 0.95],
];
const PEN_ROWS = [0, 1, 2, 3, 4, 5];
const fillWindow = (i) => ROW_WINDOWS[i];
const TRAVEL = 0.055;

const lerp = (a, b, f) => a + (b - a) * f;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* The pencil's state for a given story position. `marks` holds, per row,
   the point to shade, or for the descriptive row a line ([x0, y, x1]),
   or for the code row its typed lines, measured from the DOM in
   board px. Returns the point position,
   angle, lift (0 resting on the paper, 1 held up) and opacity. */
function pencilAt(p, marks) {
  const rest = { x: PEN_REST.x, y: PEN_REST.y, a: PEN_ANGLE_REST, lift: 0, o: 1 };
  if (!marks) return rest;
  const { p2, p3 } = p;

  // Gone once the paper is submitted: marking happens without it.
  if (p3 > 0) return { ...rest, o: 0 };
  // Before step 2: lying at rest beside the sheet.
  if (p2 <= 0) return rest;

  // Step 2: walk the rows.
  let from = rest;
  for (let n = 0; n < PEN_ROWS.length; n++) {
    const row = PEN_ROWS[n];
    const m = marks[row];
    const [ws, we] = fillWindow(row);
    const startLine = m.line ?? m.code?.[0];
    const start = startLine
      ? { x: startLine[0], y: startLine[1] }
      : m.path ? { x: m.path[0][0], y: m.path[0][1] } : m;
    // Never before the step starts: the first trip would otherwise
    // begin part-way, and the pencil would jump at the step's edge.
    const travelFrom = Math.max(0, ws - TRAVEL);
    if (p2 < travelFrom) return { ...from, a: n === 0 ? PEN_ANGLE_REST : PEN_ANGLE_WRITE, lift: n === 0 ? 0 : 0.2, o: 1 };
    if (p2 < ws) {
      // Travelling: lifted in the middle of the move.
      const f = clamp01((p2 - travelFrom) / TRAVEL);
      const e = f * f * (3 - 2 * f);
      return {
        x: lerp(from.x, start.x, e),
        y: lerp(from.y, start.y, e),
        a: lerp(n === 0 ? PEN_ANGLE_REST : PEN_ANGLE_WRITE, PEN_ANGLE_WRITE, e),
        lift: Math.sin(Math.PI * f) * 0.9 + 0.1,
        o: 1,
      };
    }
    if (p2 < we) {
      const u = (p2 - ws) / (we - ws);
      if (m.code) {
        // Writing code: along each line as its characters appear (the
        // CSS types line k over its half of the window), bobbing like
        // handwriting.
        const k = u < 0.5 ? 0 : 1;
        const c = clamp01(u * 2 - k);
        const [x0, y, x1] = m.code[k];
        return {
          x: lerp(x0, x1, c),
          y: y + Math.sin(u * Math.PI * 18) * 2.2,
          a: PEN_ANGLE_WRITE,
          lift: 0.05 + Math.abs(Math.sin(u * Math.PI * 9)) * 0.12,
          o: 1,
        };
      }
      if (m.line) {
        // Writing along the descriptive answer's line.
        return {
          x: lerp(m.line[0], m.line[2], u),
          y: m.line[1] + Math.sin(u * Math.PI * 10) * 1.6,
          a: PEN_ANGLE_WRITE,
          lift: 0,
          o: 1,
        };
      }
      // Shading a bubble: the point runs along the same back-and-forth
      // stroke the mark is drawn with, as it is drawn.
      const pt = m.path ? alongPath(m.path, u) : m;
      return { x: pt.x, y: pt.y, a: PEN_ANGLE_WRITE, lift: 0, o: 1 };
    }
    const endLine = m.line ?? m.code?.[m.code.length - 1];
    from = endLine
      ? { x: endLine[2], y: endLine[1] }
      : m.path ? { x: m.path[m.path.length - 1][0], y: m.path[m.path.length - 1][1] } : m;
  }
  // After the last answer the paper is submitted: the pencil lifts off
  // and fades as "Submitted" appears.
  const last = fillWindow(PEN_ROWS[PEN_ROWS.length - 1])[1];
  const f = clamp01((p2 - last) / 0.04);
  return {
    x: from.x + f * 24,
    y: from.y - f * 18,
    a: PEN_ANGLE_WRITE,
    lift: f,
    o: 1 - f,
  };
}

/* Offset of an element within an ancestor, in that ancestor's own CSS px.
   Offsets ignore transforms, so this holds wherever the sheet has been
   moved to. */
function offsetIn(el, ancestor) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y };
}

/* ── The desk ─────────────────────────────────────────────────── */

/* One exam paper. `pick` is the shaded bubble for objective rows;
   `kind` switches a row to written or code lines; `opts` labels the
   bubbles when a question has other than four. Marks are what the
   paper scores once marked (13 of 15). */
const ROWS = [
  { n: '01', tag: 'MCQ', meta: 'L2 · CO1', pick: 2, mark: '1/1', ok: true },
  { n: '02', tag: 'T/F', meta: 'L1 · CO1', pick: 0, opts: ['T', 'F'], mark: '1/1', ok: true },
  { n: '03', tag: 'MCQ', meta: 'L3 · CO2', pick: 1, mark: '0/1', ok: false },
  { n: '04', tag: 'DESCRIPTIVE', meta: 'L4 · CO3', kind: 'text', mark: '4/5', ok: true },
  { n: '05', tag: 'CODE', meta: 'L5 · CO4', kind: 'code', mark: '5/5', ok: true },
  { n: '06', tag: 'MATCH', meta: 'L2 · CO2', pick: 3, mark: '2/2', ok: true },
];

/* Pencil marks made in §03, hand-drawn rather than geometric: a tick
   with a short arm and a long one, and a ring that overshoots its start. */
const TICK = 'M1.5 6.8 C 2.9 7.8, 3.9 9.1, 4.7 10.6 C 6.4 6.6, 8.9 3.3, 12.8 1.2';
const RING = 'M22.6 4.4 C 15.4 1.2, 3.6 4.2, 2.4 13.8 C 1.4 22.6, 9.6 28.4, 17.2 27.4 C 25.4 26.4, 29.2 19.6, 27.8 12 C 26.8 6.6, 21 2.4, 11.4 3.8';
// Written by hand under the remark. Keep the font request in index.html
// in step: it loads only these letters.
const FACULTY_NOTE = 'Agreed. 4/5';

/* Bottom of the stack first; the last card is on top and is taken first. */
/* The coding answer, typed out a character at a time in §02. */
const CODE = ['def lcs(a, b):', '  dp = [[0]*(len(b)+1)'];

const BANK = ['Deadlocks', 'Memory management', 'CPU scheduling'];

const LOG = [
  ['10:00', 'Started with password'],
  ['10:21', 'Tab switch · Q3'],
  ['10:21', 'Back in full screen'],
  ['10:47', 'Submitted'],
];

/* Sample histogram: students per score band, 0 to 100% in eighths.
   Heights in px at full rise. This paper's 13 / 15 (87%) falls in band 6. */
const BARS = [14, 30, 62, 104, 150, 118, 60, 22];
const OWN_BAND = 6;

const FOLLOW_UP = [
  ['Student 041', 'Left 3 blank'],
  ['Student 087', 'Finished in 9 min'],
  ['Student 112', 'Well below average'],
];

function Desk() {
  return (
    <div className="jy-desk" aria-hidden="true">
      {/* §01: the bank the questions come from */}
      <div className="jy-bank">
        {BANK.map((b, i) => (
          <div className="jy-card" key={b} style={{ '--k': i }}>
            <span className="rg-mono">Bank · OS</span>
            <b>{b}</b>
            <span className="jy-card-lines"><i /><i /><i /></span>
          </div>
        ))}
      </div>

      {/* §02: the invigilation log slides out from under the sheet */}
      <div className="jy-log">
        <div className="jy-log-bar">
          <span className="rg-mono">Invigilation log</span>
          <i />
        </div>
        {LOG.map(([time, what], k) => (
          <div className={`jy-log-row ${k === 1 ? 'is-flag' : ''}`} key={k} style={{ '--k': k }}>
            <span className="rg-mono">{time}</span>
            <span>{what}</span>
          </div>
        ))}
      </div>

      {/* §04: results rise off the desk */}
      <div className="jy-chart">
        {BARS.map((h, i) => (
          <div className={`jy-bar ${i === OWN_BAND ? 'is-own' : ''}`} key={i} style={{ '--i': i, '--h': h }}>
            <i className="jy-bar-back" />
            <i className="jy-bar-left" />
            <i className="jy-bar-front" />
            <i className="jy-bar-side" />
            <i className="jy-bar-top" />
            {i === OWN_BAND && (
              <span className="jy-own-tag">
                <span className="rg-mono">This paper</span>
                <b>13 / 15</b>
              </span>
            )}
          </div>
        ))}
        <span className="jy-chart-label rg-mono">Class scores</span>
      </div>

      <div className="jy-follow">
        <span className="rg-mono">Students to follow up</span>
        {FOLLOW_UP.map(([who, why], k) => (
          <div className="jy-follow-row" key={who} style={{ '--k': k }}>
            <span className="rg-bub rg-bub--fill" />
            <b>{who}</b>
            <span>{why}</span>
          </div>
        ))}
      </div>

      {/* §05: topic mastery across sections, one column per section */}
      <div className="jy-mastery">
        <span className="jy-mastery-title rg-mono">{MASTERY_SAMPLE.course}</span>
        {MASTERY_SAMPLE.batches.map((b, c) => (
          <span className="jy-mastery-col rg-mono" key={b} style={{ '--c': c }}>
            {b.replace('Section ', 'Sec ')}
          </span>
        ))}
        {MASTERY_SAMPLE.topics.map((tp, r) => (
          <Fragment key={tp.name}>
            <span className="jy-mastery-row" style={{ '--r': r }}>{tp.name.replace(/\u00AD/g, '')}</span>
            {tp.v.map((v, c) => (
              <div
                className={`jy-bar jy-mbar ${v < 50 ? 'is-weak' : ''}`}
                key={c}
                style={{ '--r': r, '--c': c, '--i': r * 3 + c, '--h': Math.round(v * 1.05) }}
              >
                <i className="jy-bar-back" />
                <i className="jy-bar-left" />
                <i className="jy-bar-front" />
                <i className="jy-bar-side" />
                <i className="jy-bar-top"><span>{v}</span></i>
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      {/* The answer sheet itself */}
      <div className="jy-sheet">
        <div className="jy-sheet-head">
          <span className="rg-mono">Operating Systems · Quiz 2</span>
          <span className="jy-state rg-mono">
            <span className="jy-state-a">Draft</span>
            <span className="jy-state-b"><i />Live</span>
            <span className="jy-state-c">Evaluated</span>
          </span>
        </div>

        <div className="jy-rows">
          {ROWS.map((r, i) => (
            <div
              className="jy-row"
              key={r.n}
              data-i={i}
              style={{ '--i': i, '--ws': ROW_WINDOWS[i][0], '--we': ROW_WINDOWS[i][1] }}
            >
              <span className="jy-row-n">{r.n}</span>
              <span className="jy-row-tag">
                <b>{r.tag}</b>
                <small>{r.meta}</small>
              </span>
              <span className="jy-row-ans">
                {r.kind === 'text' && (
                  <span className="jy-lines"><i /><i /><i style={{ width: '62%' }} /></span>
                )}
                {r.kind === 'code' && (
                  <span className="jy-code">
                    {CODE.map((line, k) => (
                      <code key={k} style={{ '--k': k, '--len': line.length }}>{line}</code>
                    ))}
                  </span>
                )}
                {!r.kind && (r.opts ?? [0, 1, 2, 3]).map((o, b) => (
                  <span key={b} className={`jy-bub ${b === r.pick ? 'is-pick' : ''}`}>
                    {b === r.pick && (
                      <svg className="jy-shade" viewBox="0 0 24 24" aria-hidden="true">
                        <path className="jy-shade-wash" d={SHADES[i % SHADES.length].wash} />
                        <path className="jy-shade-line" d={shadePath(SHADES[i % SHADES.length].pts)} pathLength="1" />
                      </svg>
                    )}
                    {typeof o === 'string' && <small>{o}</small>}
                    {/* A wrong pick is ringed in pencil when it is marked. */}
                    {b === r.pick && !r.ok && (
                      <svg className="jy-ring" viewBox="0 0 30 30" aria-hidden="true">
                        <path className="jy-scribble" d={RING} pathLength="1" />
                      </svg>
                    )}
                  </span>
                ))}
              </span>
              <span className={`jy-mark ${r.ok ? '' : 'is-off'}`}>
                {r.ok && (
                  <svg className="jy-tick" viewBox="0 0 14 12" aria-hidden="true">
                    <path className="jy-scribble" d={TICK} pathLength="1" />
                  </svg>
                )}
                <span className="jy-mark-n">{r.mark}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="jy-sheet-foot">
          <span className="rg-mono jy-saved">Submitted · 10:47</span>
          <span className="jy-score">13 / 15</span>
        </div>

        <div className="jy-note">
          <span className="rg-mono">Remark · Q4</span>
          <p>Explains paging and the TLB clearly. Misses what happens on a page fault.</p>
          {/* The faculty member's own word on it, in the margin. */}
          <span className="jy-hand" aria-hidden="true">{FACULTY_NOTE}</span>
        </div>

        <div className="jy-stamp">
          <b>Published</b>
        </div>
      </div>

      {/* The pencil, last so it lies on top of the sheet. */}
      <Pencil className="jy-pencil" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

const NAV_EXTRA = [
  { href: '/product', label: 'Product' },
  { href: '/compare', label: 'Compare' },
];
const FOOTER_EXTRA = [{ href: '/compare', label: 'Compare' }];
const COHORT_SHOT = REPORTS.find((r) => r.id === 'class').shot;

/* Each proof screen is shown whole, and the detail that makes its point
   is marked in pencil as its row scrolls up. Marks are drawn in
   the capture's own px (1200 wide, ih high); ih also gives the figure
   its size before the image loads. */
const PROOF_MARKS = [
  // The remark: a reason given for the mark. Underline the reason.
  { ih: 986, mark: 'M236 818 C 300 815.6, 420 817.4, 500 816 C 530 815.4, 556 815.8, 578 813' },
  // The student's pick, marked correct automatically. Ring the pick.
  { ih: 1003, mark: 'M150 435 C 118 423, 52 424, 36 445 C 24 465, 58 487, 104 487 C 148 487, 166 467, 152 445 C 144 433, 120 427, 92 428' },
  // The class: the mean, with the bands below it tinted. Ring the mean.
  { ih: 807, mark: 'M508 336 C 492 320, 418 318, 398 332 C 382 346, 408 360, 456 360 C 508 360, 526 348, 512 332 C 502 322, 470 318, 440 320' },
];

/* The proof rows play with the scroll. Each row pins in the middle of
   the screen (CSS sticky) for a short hold: it stands up as it rises into
   place, its pencil mark is drawn while it is held, and then it scrolls
   on as the next comes up. Scrolling back undoes it. Writes --v (0 to 1)
   on each row, and --stick, the pinned row's top, which centres it. */
const PROOF_RISE = 0.6; // share of --v spent rising into place
const NAV_H = 58; // the fixed nav's height
function useRowProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const rows = Array.from(ref.current?.querySelectorAll('.jy-proof-item') ?? []);
    if (!rows.length) return;
    const smooth = motionOK();
    let frame = 0;
    let sticks = [];
    // Centre each pinned row in the space below the nav, not the whole
    // window, or it sits low, as if pushed down by the nav.
    const measure = () => {
      const vh = window.innerHeight;
      sticks = rows.map((r) => {
        const h = r.querySelector('.jy-proof-pin').offsetHeight;
        const stick = NAV_H + Math.max(16, (vh - NAV_H - h) / 2);
        r.style.setProperty('--stick', `${stick.toFixed(0)}px`);
        return stick;
      });
    };
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      rows.forEach((r, i) => {
        if (!smooth) { r.style.setProperty('--v', '1'); return; }
        const top = r.getBoundingClientRect().top;
        const stick = sticks[i];
        // The hold is the spacer after the pinned row.
        const hold = r.querySelector('.jy-proof-hold').offsetHeight;
        const v = top > stick
          ? PROOF_RISE * Math.min(1, Math.max(0, (vh - top) / (vh - stick)))
          : PROOF_RISE + (1 - PROOF_RISE) * Math.min(1, (stick - top) / (hold * 0.6));
        r.style.setProperty('--v', v.toFixed(3));
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    // Images arriving change the rows' heights.
    const ro = new ResizeObserver(onResize);
    rows.forEach((r) => ro.observe(r.querySelector('.jy-proof-pin')));
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return ref;
}

// Where each unit starts on the track: the gate, the steps, and the end.
const STARTS = unitStarts(JOURNEY_STEPS.length + 1);

export default function Journey() {
  const root = useReveal();
  useSmoothScroll();
  const { stage, track, active } = useJourney(JOURNEY_STEPS.length);
  const hint = useIdleHint();
  const proof = useRowProgress();

  return (
    <div className="rg jy" ref={root}>
      <Nav links={JOURNEY_NAV} extra={NAV_EXTRA} />

      {/* ── HERO ────────────────────────────────────────── */}
      <header className="jy-hero" id="top">
        <div className="rg-wrap">
          <Rv className="rg-eyebrow">
            <span className="rg-bub rg-bub--fill" />
            <span className="rg-mono">{JOURNEY_HERO.eyebrow}</span>
          </Rv>
          <div className="jy-hero-row">
            <h1 className="jy-h1">
              {JOURNEY_HERO.lines.map((line, i) => (
                <Rv as="span" className="jy-h1-line" key={line} delay={80 + i * 70}>
                  {line}
                </Rv>
              ))}
              <Rv as="span" className="jy-h1-line" delay={80 + JOURNEY_HERO.lines.length * 70}>
                <em className="jy-em">
                  {JOURNEY_HERO.emphasis}
                  {/* A quick pencil underline, out and back, the way a
                      teacher marks the point that matters. */}
                  <svg className="jy-uline" viewBox="0 0 200 14" aria-hidden="true">
                    <path className="jy-scribble jy-uline-out" d="M2.5 8.6 C 20 7.4, 38 6.6, 61 6.9 C 92 7.3, 124 5.6, 156 5.1 C 175 4.8, 189 4.2, 197.5 3" pathLength="1" />
                    <path className="jy-scribble jy-uline-back" d="M194 5.2 C 168 7.2, 136 8.1, 104 8.9 C 84 9.4, 64 10.3, 41 11.4" pathLength="1" />
                  </svg>
                </em>
              </Rv>
            </h1>
            <Rv className="rg-hero-ctas" delay={420}>
              <a className="rg-btn" href="#contact">
                Book a walkthrough
                <Icon name="arrowRight" size={15} />
              </a>
            </Rv>
          </div>

          <div className="jy-trust">
            <Rv className="jy-trust-org">
              <img className="rg-trust-logo" src={TRUST.logo} alt={TRUST.org} />
              <p className="rg-trust-note">{JOURNEY_HERO.trustNote}</p>
            </Rv>
            {TRUST.figures.map((f, i) => (
              <Rv className="rg-trust-fig" key={f.l} delay={i * 80}>
                <OmrNumber text={f.n} />
                <div className="rg-trust-l">{JOURNEY_HERO.figureLabels[i]}</div>
              </Rv>
            ))}
          </div>
        </div>
      </header>

      <div className={`jy-hint ${hint ? 'is-on' : ''}`} aria-hidden="true">
        <span className="rg-mono">Scroll</span>
        <Icon name="chevronDown" size={16} />
      </div>

      {/* ── THE STORY ───────────────────────────────────── */}
      <section className="jy-story" data-active={active}>
        <div className="jy-gate" aria-hidden={active !== -1}>
          <span className="rg-mono jy-gate-k">{JOURNEY_INTRO.kicker}</span>
          <h2 className="rg-h2 jy-gate-h">{JOURNEY_INTRO.title}</h2>
          <a
            className="jy-tin"
            href="#before"
            aria-label="Scroll to the first step"
            tabIndex={active === -1 ? 0 : -1}
          >
            <span className="jy-tin-tray" aria-hidden="true">
              <i className="jy-slot jy-slot--pencil" />
              <i className="jy-slot jy-slot--eraser" />
              <i className="jy-slot jy-slot--sharp" />
              <Eraser />
              <Sharpener />
            </span>
            {/* The pencil's point; it is not in the tray, so it does not
                fade with the tin when it leaves for the desk. */}
            <span className="jy-gpen-anchor" aria-hidden="true">
              <Pencil className="jy-gpen" />
            </span>
            <span className="jy-tin-lid" aria-hidden="true">
              {JOURNEY_INTRO.cue}
              <Icon name="arrowDown" size={15} />
            </span>
          </a>
        </div>
        <div className="rg-wrap jy-story-in">
          <div className="jy-stage-col">
            <div className="jy-stage" ref={stage}>
              <div className="jy-scene">
                <Desk />
              </div>
              <ol className="jy-rail" aria-hidden="true">
                {JOURNEY_STEPS.map((s, i) => (
                  <li key={s.id} className={i <= active ? 'is-on' : ''}>
                    <span className="rg-bub" />
                    <span className="rg-mono">{s.n}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* The track sets how long the story scrolls. The anchors mark
              where each step starts, for the nav links. */}
          <div className="jy-steps" ref={track} style={{ '--n': STARTS[JOURNEY_STEPS.length + 1] }}>
            {JOURNEY_STEPS.map((s, i) => (
              <span className="jy-anchor" id={s.id} key={s.id} style={{ '--k': STARTS[i + 1] }} />
            ))}
            <div className="jy-copy">
              {JOURNEY_STEPS.map((s, i) => (
                <article
                  className={`jy-step ${i === active ? 'is-active' : ''}`}
                  key={s.id}
                  aria-hidden={i !== active}
                >
                  <span className="jy-step-k">
                    <span className="rg-mono">{s.n}</span>
                    <span className="rg-mono">{s.kicker}</span>
                  </span>
                  <h2 className="rg-h2 jy-step-h">{s.title}</h2>
                  <p className="jy-step-body">{s.body}</p>
                  <ul className="jy-facts">
                    {s.facts.map((f) => (
                      <li key={f}><span className="rg-bub rg-bub--fill" />{f}</li>
                    ))}
                  </ul>
                  <a className="jy-more" href={s.more} tabIndex={i === active ? 0 : -1}>
                    More on this
                    <Icon name="arrowRight" size={13} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF ───────────────────────────────────────── */}
      <section className="rg-sec jy-proof">
        <div className="rg-wrap">
          <Rv as="h2" className="rg-h2">{JOURNEY_PROOF.title}</Rv>
          <div className="jy-proof-list" ref={proof}>
            {[...MARKING_SHOTS, COHORT_SHOT].map((sh, i) => {
              const { ih, mark } = PROOF_MARKS[i];
              const item = JOURNEY_PROOF.items[i];
              return (
                <article className="jy-proof-item" key={sh.src} style={{ '--ih': ih }}>
                  <div className="jy-proof-pin">
                    <figure className="jy-proof-fig">
                      <Exhibit fig={sh.fig} label={sh.label}>
                        <div className="jy-marked">
                          <ThemedImg src={sh.src} alt={sh.alt} />
                          <svg className="jy-marked-mark" viewBox={`0 0 1200 ${ih}`} aria-hidden="true">
                            <path className="jy-scribble" d={mark} pathLength="1" />
                          </svg>
                        </div>
                      </Exhibit>
                    </figure>
                    <div className="jy-proof-text">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                  <div className="jy-proof-hold" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHO AND WHERE ───────────────────────────────── */}
      <section className="rg-sec jy-brief">
        <div className="rg-wrap jy-brief-grid">
          {[['roles', JOURNEY_BRIEF.roles], ['deployment', JOURNEY_BRIEF.deploy]].map(([id, block]) => (
            <div id={id} key={id}>
              <Rv as="h2" className="rg-h2 jy-brief-h">{block.title}</Rv>
              <ul className="jy-brief-list">
                {block.items.map((it, i) => (
                  <Rv as="li" key={it.label} delay={i * 70}>
                    <b>{it.label}</b>
                    <span>{it.text}</span>
                  </Rv>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section className="rg-sec rg-sec--dark" id="contact">
        <div className="rg-wrap">
          <div className="rg-cta-grid">
            <div>
              <Rv className="rg-eyebrow">
                <span className="rg-bub rg-bub--fill" />
                <span className="rg-mono">{JOURNEY_CTA.eyebrow}</span>
              </Rv>
              <Rv as="h2" className="rg-h2 rg-cta-h rg-rv--mask" delay={60}>{JOURNEY_CTA.headline}</Rv>
              <Rv as="p" className="rg-lede" delay={120} style={{ marginTop: 22 }}>{JOURNEY_CTA.sub}</Rv>
              <Rv className="rg-cta-contact" delay={180}>
                <a href={`mailto:${BRAND.email}`}>
                  <Icon name="mail" size={14} />
                  {BRAND.email}
                </a>
              </Rv>
            </div>
            <Rv delay={160}>
              <ContactForm submitLabel="Request a walkthrough" />
            </Rv>
          </div>
        </div>
      </section>

      <Footer extra={FOOTER_EXTRA} />
    </div>
  );
}
