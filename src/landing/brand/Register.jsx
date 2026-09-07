import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './register.css';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { Rv, SectionHead, Nav, Footer } from './chrome';
import { motionOK, useReveal } from './pageMotion';
import {
  BRAND, BRAND_HERO, TRUST, VALUE,
  SECURITY_PILLARS, WATCHED, EVALUATION, AI_ASSURANCE, AI_HELP,
  REPORTS, ROLES, BRAND_DEPLOY, BRAND_CTA,
} from '../content';

/* ═══════════════════════════════════════════════════════════════
   REGISTER — the EvolveUs brand page.

   One idea carries the whole design: the answer sheet. Bubbles are
   the brand's atom, hairline rules do the structural work, and the
   margin rail numbers each section the way an exam booklet does.
   Every fact on this page comes from ../content.js.
   ═══════════════════════════════════════════════════════════════ */

/* A restrained parallax drift, capped so nothing detaches from its column.

   The element's document position is measured once (and on resize) so the
   scroll handler stays a pure arithmetic + transform write, with no
   per-scroll layout reads. */
function useDrift(strength = 0.05, cap = 40) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK()) return;

    let top = 0;
    let height = 0;
    const measure = () => {
      const prev = el.style.transform;
      el.style.transform = '';
      const r = el.getBoundingClientRect();
      top = r.top + window.scrollY;
      height = r.height;
      el.style.transform = prev;
    };
    const update = () => {
      const mid = top + height / 2 - window.scrollY - window.innerHeight / 2;
      const shift = Math.max(-cap, Math.min(cap, -mid * strength));
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const onResize = () => { measure(); update(); };

    measure();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
    };
  }, [strength, cap]);
  return ref;
}

/* Counts a figure up when it first scrolls into view.

   The final value is rendered on mount, so the number is right with no JS
   and with reduced motion. The zero start is written straight to the node
   before paint, and each frame updates textContent rather than state. */
function Counter({ text }) {
  const ref = useRef(null);
  const match = /^([\d,]+)(.*)$/.exec(text);
  const target = match ? Number(match[1].replace(/,/g, '')) : null;
  const suffix = match ? match[2] : '';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || target === null || !motionOK()) return;
    el.textContent = `0${suffix}`;
  }, [target, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || !motionOK()) return;

    const settle = () => { el.textContent = target.toLocaleString('en-US') + suffix; };
    if (!('IntersectionObserver' in window)) {
      settle();
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const started = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - started) / 1400);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });

    io.observe(el);
    // Never leave a zero on screen if the observer stays silent.
    const failsafe = setTimeout(settle, 2500);
    return () => {
      clearTimeout(failsafe);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [target, suffix]);

  return <span ref={ref}>{text}</span>;
}

/* A field of answer-sheet bubbles. Decorative brand texture, not data:
   the fill pattern is deterministic from the seed, and carries no meaning. */
function BubbleField({ rows = 6, cols = 14, seed = 7 }) {
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const h = Math.sin((r * 12.9898 + c * 78.233) * seed) * 43758.5453;
      const on = (h - Math.floor(h)) > 0.62;
      cells.push({ key: `${r}-${c}`, on, d: (r * cols + c) * 12 });
    }
  }
  return (
    <div className="rg-field" aria-hidden="true" style={{ '--cols': cols }}>
      {cells.map((c) => (
        <i
          key={c.key}
          className={`rg-field-b ${c.on ? 'on' : ''}`}
          style={{ '--d': `${c.d}ms` }}
        />
      ))}
    </div>
  );
}

/* ── The specimen answer sheet in the hero ────────────────────── */
const SHEET_ROWS = [
  { n: '01', mark: 2, tag: 'MCQ' },
  { n: '02', mark: 0, tag: 'T/F' },
  { n: '03', mark: 3, tag: 'MATCH' },
  { n: '04', mark: 1, tag: 'MCQ' },
  { n: '05', mark: 3, tag: 'MCQ' },
  { n: '06', mark: 2, tag: 'BLANK' },
];

function SpecimenSheet() {
  return (
    <div className="rg-sheet">
      <span className="rg-sheet-scan" aria-hidden="true" />
      <div className="rg-sheet-bar">
        <span className="rg-mono">Specimen · Response sheet</span>
        <span className="rg-sheet-live">
          <i />
          <span className="rg-mono">Invigilated</span>
        </span>
      </div>

      <div className="rg-sheet-rows">
        {SHEET_ROWS.map((row, ri) => (
          <div className="rg-row" key={row.n}>
            <span className="rg-row-n">{row.n}</span>
            <span className="rg-row-bubs">
              {[0, 1, 2, 3].map((bi) => (
                <span
                  key={bi}
                  className={`rg-bub rg-bub--lg ${bi === row.mark ? 'rg-bub--fill' : ''}`}
                  style={bi === row.mark ? { animationDelay: `${400 + ri * 130}ms` } : undefined}
                />
              ))}
            </span>
            <span className={`rg-row-tag ${row.tag === 'MCQ' ? 'is-ok' : ''}`}>{row.tag}</span>
          </div>
        ))}
      </div>

      <div className="rg-sheet-foot">
        <span className="rg-mono">Violations 00 · Fullscreen held</span>
        <span className="rg-sheet-score">06 / 06 saved</span>
      </div>
    </div>
  );
}

/* ── Roles, with a screenshot of the real product ─────────────── */
function Roles() {
  const [active, setActive] = useState(ROLES[0].id);
  const role = ROLES.find((r) => r.id === active) ?? ROLES[0];

  return (
    <>
      <Rv className="rg-tabs" role="tablist">
        {ROLES.map((r) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={r.id === active}
            className={`rg-tab ${r.id === active ? 'is-on' : ''}`}
            onClick={() => setActive(r.id)}
          >
            <span className="rg-bub" />
            {r.label}
          </button>
        ))}
      </Rv>

      <div className="rg-role">
        <div>
          <Rv as="p" className="rg-role-sum">{role.summary}</Rv>
          <Rv as="ul" className="rg-role-list" delay={80}>
            {role.features.map((f, i) => (
              <li key={f}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </Rv>
        </div>

        <Rv className="rg-shot" delay={140}>
          <div className="rg-shot-bar">
            <span className="rg-mono">{BRAND.domain} / {role.id}</span>
            <span className="rg-shot-dots"><i /><i /><i /></span>
          </div>
          <img src={role.src} alt={`${role.label} view in EvolveUs`} loading="lazy" />
        </Rv>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

/* The comparison page is the only link the shared chrome does not carry
   by default, so each page that wants it passes it in. */
const COMPARE_LINK = [{ href: '/compare', label: 'Compare' }];

export default function Register() {
  const root = useReveal();
  const sheetDrift = useDrift(0.05, 34);

  return (
    <div className="rg" ref={root}>
      <Nav extra={COMPARE_LINK} />

      {/* ── HERO ────────────────────────────────────────── */}
      <header className="rg-hero" id="top">
        <div className="rg-wrap rg-hero-in">
          <Rv className="rg-eyebrow">
            <span className="rg-bub rg-bub--fill" />
            <span className="rg-mono">{BRAND_HERO.eyebrow}</span>
          </Rv>

          <Rv as="h1" className="rg-display rg-rv--mask" delay={80}>
            {(() => {
              const EMPH = 'stand behind';
              const [before, after] = BRAND_HERO.headline.split(EMPH);
              return after === undefined
                ? BRAND_HERO.headline
                : <>{before}<em>{EMPH}</em>{after}</>;
            })()}
          </Rv>

          <div className="rg-hero-grid">
            <div>
              <Rv as="p" className="rg-lede" delay={160}>{BRAND_HERO.sub}</Rv>

              <Rv className="rg-hero-ctas" delay={220}>
                <a className="rg-btn" href="#contact">
                  Book a walkthrough
                  <Icon name="arrowRight" size={15} />
                </a>
                <a className="rg-btn rg-btn--ghost" href="#why">See what it does</a>
              </Rv>

              <Rv className="rg-hero-note" delay={280}>
                <Icon name="shieldCheck" size={15} />
                {BRAND_HERO.note}
              </Rv>
            </div>

            <Rv delay={300}>
              <div ref={sheetDrift}>
                <SpecimenSheet />
              </div>
            </Rv>
          </div>
        </div>
      </header>

      {/* ── WATCHED-DURING-EXAM TICKER ──────────────────── */}
      <div className="rg-ticker" aria-hidden="true">
        <div className="rg-ticker-in">
          {[0, 1].map((copy) => (
            <div className="rg-ticker-seq" key={copy}>
              {WATCHED.map((w) => (
                <span className="rg-ticker-item" key={w}>
                  <i />
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST ───────────────────────────────────────── */}
      <div className="rg-wrap">
        <div className="rg-trust">
          <Rv className="rg-trust-org">
            <span className="rg-mono rg-trust-label">{TRUST.label}</span>
            <img className="rg-trust-logo" src={TRUST.logo} alt={TRUST.org} />
          </Rv>
          <div className="rg-trust-figs">
            {TRUST.figures.map((f, i) => (
              <Rv className="rg-trust-fig" key={f.l} delay={i * 80}>
                <div className="rg-trust-n"><Counter text={f.n} /></div>
                <div className="rg-trust-l">{f.l}</div>
              </Rv>
            ))}
          </div>
        </div>
      </div>

      {/* ── §01 WHY ─────────────────────────────────────── */}
      <section className="rg-sec" id="why">
        <div className="rg-wrap">
          <SectionHead
            code="§01"
            kicker="Why colleges choose it"
            title="Everything an exam needs, from the paper to the report."
            lede="One system for setting the paper, supervising the exam, correcting the answers, and telling you what the results actually mean."
          />

          <div className="rg-pillars">
            {VALUE.map((v, i) => (
              <Rv className="rg-pillar" key={v.n} delay={i * 60}>
                <div className="rg-pillar-top">
                  <span className="rg-pillar-n">{v.n}</span>
                  <span className="rg-pillar-ico"><Icon name={v.icon} size={22} /></span>
                </div>
                <h3 className="rg-h3">{v.title}</h3>
                <p className="rg-pillar-body">{v.body}</p>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ── §02 EXAM SECURITY ───────────────────────────── */}
      <section className="rg-sec rg-sec--dark" id="security">
        <div className="rg-wrap">
          <SectionHead
            code="§02"
            kicker="Exam security"
            title="An online exam, invigilated properly."
            lede="The reason most colleges hesitate about online exams is supervision. This is how EvolveUs answers that."
          />

          <div className="rg-feat-grid">
            {SECURITY_PILLARS.map((f) => (
              <Rv className="rg-feat" key={f.title}>
                <span className="rg-feat-ico"><Icon name={f.icon} size={22} /></span>
                <h3 className="rg-h3">{f.title}</h3>
                <p>{f.desc}</p>
              </Rv>
            ))}
          </div>

          <div className="rg-sub">
            <Rv as="h3" className="rg-sub-h">And the invigilator never blinks</Rv>
            <Rv as="p" className="rg-sub-lede" delay={60}>
              While a student is writing, the system watches for the things a supervisor
              in the hall would notice. Anything unusual is recorded against that
              attempt and shown to faculty with the paper.
            </Rv>

            <div className="rg-log">
              <Rv className="rg-log-bar">
                <span className="rg-mono">Invigilation log</span>
                <span className="rg-log-live">
                  <i />
                  <span className="rg-mono">Recording</span>
                </span>
              </Rv>
              <ul className="rg-sig-list">
                {WATCHED.map((w, i) => (
                  <Rv as="li" key={w} delay={140 + i * 80}>
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    <span>{w}</span>
                  </Rv>
                ))}
              </ul>
              <Rv className="rg-log-foot" delay={140 + WATCHED.length * 80}>
                <span className="rg-mono">Awaiting next event</span>
                <i className="rg-caret" aria-hidden="true" />
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ── §03 EVALUATION ──────────────────────────────── */}
      <section className="rg-sec" id="evaluation">
        <div className="rg-wrap">
          <SectionHead
            code="§03"
            kicker="Evaluation"
            title="Correction that finishes with the exam."
            lede="The longest part of any examination is not writing it, it is correcting it. This is the part EvolveUs takes off your faculty."
          />

          <div className="rg-evals">
            {EVALUATION.map((e, i) => (
              <Rv className="rg-eval" key={e.id} delay={i * 100}>
                <div className="rg-eval-top">
                  <Icon name={e.icon} size={20} />
                  <span className="rg-mono">{e.label}</span>
                </div>
                <h3 className="rg-eval-h">{e.title}</h3>
                <p className="rg-eval-body">{e.body}</p>
                <ul className="rg-eval-list">
                  {e.points.map((pt) => (
                    <li key={pt}>
                      <Icon name="check" size={15} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Rv>
            ))}
          </div>

          <div className="rg-sub">
            <Rv as="h3" className="rg-sub-h">Faculty stay in charge of every mark</Rv>
            <Rv as="p" className="rg-sub-lede" delay={60}>
              Automatic correction is only useful if the college can defend the result.
              So nothing is final until a faculty member says so.
            </Rv>
            <Rv className="rg-assure" delay={100}>
              {AI_ASSURANCE.map((h) => (
                <div className="rg-hi" key={h.title}>
                  <span className="rg-hi-ico"><Icon name={h.icon} size={20} /></span>
                  <div>
                    <h3 className="rg-h3">{h.title}</h3>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </Rv>
          </div>

          <div className="rg-sub">
            <Rv as="h3" className="rg-sub-h">It helps set the paper too</Rv>
            <Rv className="rg-assure rg-assure--two" delay={80}>
              {AI_HELP.map((h) => (
                <div className="rg-hi" key={h.title}>
                  <span className="rg-hi-ico"><Icon name={h.icon} size={20} /></span>
                  <div>
                    <h3 className="rg-h3">{h.title}</h3>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </Rv>
          </div>
        </div>
      </section>

      {/* ── §04 REPORTS ─────────────────────────────────── */}
      <section className="rg-sec" id="reports">
        <div className="rg-wrap">
          <SectionHead
            code="§04"
            kicker="Reports"
            title="Marks are the start, not the answer."
            lede="Every question carries a topic and a course outcome, so results add up to something a tutor and a head of department can actually act on."
          />

          <div className="rg-mrows">
            {REPORTS.map((m, i) => (
              <div className={`rg-mrow ${i % 2 ? 'rg-mrow--flip' : ''}`} key={m.id}>
                <Rv className="rg-mrow-text">
                  <div className="rg-mast-top">
                    <Icon name={m.icon} size={20} />
                    <span className="rg-mono">{m.label}</span>
                  </div>
                  <h3>{m.title}</h3>
                  <p className="rg-mast-sum">{m.summary}</p>
                  <ul className="rg-mast-list">
                    {m.points.map((pt) => (
                      <li key={pt}>
                        <span className="rg-bub rg-bub--fill" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Rv>

                <Rv className="rg-mrow-art" delay={140}>
                  <BubbleField rows={8} cols={12} seed={i === 0 ? 7 : 19} />
                </Rv>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §05 ROLES ───────────────────────────────────── */}
      <section className="rg-sec" id="roles">
        <div className="rg-wrap">
          <SectionHead
            code="§05"
            kicker="Who uses it"
            title="Three seats at the same table."
            lede="Your office sets up the college, faculty run their own assessments, and students see only their own work."
          />
          <Roles />
        </div>
      </section>

      {/* ── §06 DEPLOYMENT ──────────────────────────────── */}
      <section className="rg-sec" id="deployment">
        <div className="rg-wrap">
          <SectionHead
            code="§06"
            kicker="Deployment"
            title="Our servers, or yours."
            lede="The same platform either way. The only question is where your student data sits."
          />

          <Rv className="rg-deploy">
            {BRAND_DEPLOY.map((m, i) => (
              <div className={`rg-mode ${i === 1 ? 'rg-mode--alt' : ''}`} key={m.id}>
                <div className="rg-mode-top">
                  <Icon name={m.icon} size={20} />
                  <span className="rg-mono">{m.label}</span>
                </div>
                <h3 className="rg-mode-h">{m.tagline}</h3>
                <p className="rg-mode-sub">{m.sub}</p>
                <ul className="rg-mode-list">
                  {m.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Rv>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section className="rg-sec rg-sec--dark" id="contact">
        <div className="rg-wrap">
          <div className="rg-cta-grid">
            <div>
              <Rv className="rg-eyebrow">
                <span className="rg-bub rg-bub--fill" />
                <span className="rg-mono">{BRAND_CTA.eyebrow}</span>
              </Rv>
              <Rv as="h2" className="rg-h2 rg-cta-h rg-rv--mask" delay={60}>{BRAND_CTA.headline}</Rv>
              <Rv as="p" className="rg-lede" delay={120} style={{ marginTop: 22 }}>{BRAND_CTA.sub}</Rv>
              <Rv className="rg-cta-contact" delay={180}>
                <a href={`https://${BRAND.domain}`} target="_blank" rel="noreferrer">
                  <Icon name="globe" size={14} />
                  {BRAND.domain}
                </a>
              </Rv>
            </div>

            <Rv delay={160}>
              <ContactForm submitLabel="Request a walkthrough" />
            </Rv>
          </div>
        </div>
      </section>

      <Footer extra={COMPARE_LINK} />
    </div>
  );
}
