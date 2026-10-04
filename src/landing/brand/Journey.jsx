import { Fragment, useEffect, useRef, useState } from 'react';
import './register.css';
import './journey.css';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { Rv, Nav, Footer } from './chrome';
import { motionOK, useReveal, useSmoothScroll } from './pageMotion';
import { Shot, OmrNumber } from './figures';
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

   The first unit is the gate (--p0): a centred line and a button that
   fills as the reader scrolls; once it is full, the stage fades in and
   the sheet unrolls. Steps 1 to n follow as --p1 to --pn. The active index is -1
   while the gate is up.

   The step text and the stage are both pinned (CSS sticky) for as long
   as the story's track is scrolling past, so the reader never scrolls
   from one step to the next: scrolling only advances t, and the text
   swaps in place when the step changes. Each step plays over the first
   80% of its share of the track and holds its finished state for the
   rest. With reduced motion, t snaps to whole steps. */
const PLAY = 0.8;
// The share of the gate after which step 1's text takes over.
const GATE_DONE = 0.82;
// How the stage follows the scroll: the most units (steps) it moves in a
// second, and how quickly it eases toward the scroll position.
const MAX_RATE = 1.4;
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

    const units = stepCount + 1;

    // Where the scroll position says the story should be.
    const target = () => {
      const u = Math.min(1, Math.max(0, (window.scrollY + pinTop - top) / span)) * units;
      const idx = Math.min(units - 1, Math.floor(u));
      return smooth ? idx + Math.min(1, (u - idx) / PLAY) : idx + 1;
    };

    let last = -2;
    const render = (t) => {
      for (let k = 0; k <= stepCount; k++) {
        host.style.setProperty(`--p${k}`, Math.min(1, Math.max(0, t - k)).toFixed(3));
      }
      // Which unit is playing: unit k covers t in (k, k + 1]. The gate
      // (unit 0) hands over to step 1 once its button is full and the
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
      const eased = gap * (1 - Math.exp(-dt * EASE));
      const cap = MAX_RATE * dt;
      shown += Math.max(-cap, Math.min(cap, eased));
      if (Math.abs(goal - shown) < 0.0005) shown = goal;
      render(shown);
      frame = shown === goal ? 0 : requestAnimationFrame(tick);
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
    const onResize = () => { measure(); shown = goal = target(); render(shown); };
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
            <div className="jy-row" key={r.n} style={{ '--i': i }}>
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
                    {typeof o === 'string' && <small>{o}</small>}
                  </span>
                ))}
              </span>
              <span className={`jy-mark ${r.ok ? '' : 'is-off'}`}>
                <Icon name={r.ok ? 'check' : 'alert'} size={12} />
                {r.mark}
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
        </div>

        <div className="jy-stamp">
          <b>Published</b>
        </div>
      </div>
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

export default function Journey() {
  const root = useReveal();
  useSmoothScroll();
  const { stage, track, active } = useJourney(JOURNEY_STEPS.length);
  const hint = useIdleHint();

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
                <em>{JOURNEY_HERO.emphasis}</em>
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
          <a className="jy-gate-btn" href="#before" tabIndex={active === -1 ? 0 : -1}>
            <span className="jy-gate-fill" aria-hidden="true" />
            <span className="jy-gate-label">
              {JOURNEY_INTRO.cue}
              <Icon name="arrowDown" size={15} />
            </span>
            {/* The same label in the page colour, shown only below the
                water line, so it reads on the fill. */}
            <span className="jy-gate-label jy-gate-label--on" aria-hidden="true">
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
          <div className="jy-steps" ref={track} style={{ '--n': JOURNEY_STEPS.length + 1 }}>
            {JOURNEY_STEPS.map((s, i) => (
              <span className="jy-anchor" id={s.id} key={s.id} style={{ '--k': i + 1 }} />
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
          <div className="jy-proof-row">
            {[...MARKING_SHOTS, COHORT_SHOT].map((sh, i) => (
              <div className="jy-tilt" key={sh.src} style={{ '--i': i }}>
                <Shot {...sh} caption={undefined} delay={i * 90} />
              </div>
            ))}
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
