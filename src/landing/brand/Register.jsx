import { useEffect, useRef, useState } from 'react';
import './register.css';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { Rv, SectionHead, Nav, Footer } from './chrome';
import { ThemedImg, Exhibit, Shot, OmrNumber } from './figures';
import { motionOK, useReveal } from './pageMotion';
import {
  BRAND, BRAND_HERO, TRUST, BEFORE,
  SECURITY_PILLARS, WATCHED, EVALUATION, MARKING_SHOTS, AI_ASSURANCE, AI_HELP,
  REPORTS, MASTERY_SAMPLE, BRAND_ROLES, BRAND_DEPLOY, BRAND_CTA,
} from '../content';

/* ═══════════════════════════════════════════════════════════════
   REGISTER — the Evolveus brand page.

   One idea carries the whole design: the answer sheet. Bubbles are
   the brand's atom, hairline rules do the structural work, and the
   margin rail numbers each section the way an exam booklet does.
   The sections follow one exam from start to finish: setting the
   paper, sitting it, marking it, reading the results.
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

/* The department view, drawn rather than screenshotted: the clone of
   production has no topic-mastery data yet, so this uses sample numbers
   and says so. Each cell is a row of ten bubbles shaded to the mastery
   level, so the table reads like a marked sheet; below 50% is amber. */
function MasteryTable() {
  const { course, batches, topics } = MASTERY_SAMPLE;
  return (
    <Exhibit fig="4.3" label="Sample data">
      <div className="rg-mastery">
        <div className="rg-mastery-course">{course} · topic mastery</div>
        <table>
          <thead>
            <tr>
              <th scope="col">Topic</th>
              {batches.map((b) => <th scope="col" key={b}>{b}</th>)}
            </tr>
          </thead>
          <tbody>
            {topics.map((t) => (
              <tr key={t.name}>
                <th scope="row">{t.name}</th>
                {t.v.map((v, i) => {
                  const filled = Math.round(v / 10);
                  return (
                    <td key={batches[i]} className={v < 50 ? 'is-weak' : ''}>
                      <span className="rg-mastery-bubs" aria-hidden="true">
                        {Array.from({ length: 10 }, (_, n) => <i key={n} className={n < filled ? 'on' : ''} />)}
                      </span>
                      <span className="rg-mastery-n">{v}%</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Exhibit>
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
  const [active, setActive] = useState(BRAND_ROLES[0].id);
  const role = BRAND_ROLES.find((r) => r.id === active) ?? BRAND_ROLES[0];

  return (
    <>
      <Rv className="rg-tabs" role="tablist">
        {BRAND_ROLES.map((r) => (
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
          <ThemedImg src={role.src} alt={`${role.label} view in Evolveus`} />
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
        <div className="rg-wrap rg-hero-in rg-hero-grid">
          <div>
            <Rv className="rg-eyebrow">
              <span className="rg-bub rg-bub--fill" />
              <span className="rg-mono">{BRAND_HERO.eyebrow}</span>
            </Rv>

            <Rv as="h1" className="rg-display rg-rv--mask" delay={80}>
              {(() => {
                const [before, after] = BRAND_HERO.headline.split(BRAND_HERO.emphasis);
                return after === undefined
                  ? BRAND_HERO.headline
                  : <>{before}<em>{BRAND_HERO.emphasis}</em>{after}</>;
              })()}
            </Rv>

            <Rv as="p" className="rg-lede" delay={160}>{BRAND_HERO.sub}</Rv>

            <Rv className="rg-hero-ctas" delay={220}>
              <a className="rg-btn" href="#contact">
                Book a walkthrough
                <Icon name="arrowRight" size={15} />
              </a>
              <a className="rg-btn rg-btn--ghost" href="#before">Follow one exam through</a>
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
      </header>

      {/* ── TRUST ───────────────────────────────────────── */}
      <div className="rg-wrap">
        <div className="rg-trust">
          <Rv className="rg-trust-org">
            <span className="rg-mono rg-trust-label">{TRUST.label}</span>
            <img className="rg-trust-logo" src={TRUST.logo} alt={TRUST.org} />
            <p className="rg-trust-note">{TRUST.note}</p>
          </Rv>
          <div className="rg-trust-figs">
            {TRUST.figures.map((f, i) => (
              <Rv className="rg-trust-fig" key={f.l} delay={i * 80}>
                <OmrNumber text={f.n} />
                <div className="rg-trust-l">{f.l}</div>
              </Rv>
            ))}
          </div>
        </div>
      </div>

      {/* ── §01 BEFORE THE EXAM ─────────────────────────── */}
      <section className="rg-sec" id="before">
        <div className="rg-wrap">
          <SectionHead
            code="§01"
            kicker="Before the exam"
            title="Papers built from a shared question bank"
            lede="A good question written once can be used again next semester, by anyone in the department the bank is shared with."
          />

          <div className="rg-pillars rg-pillars--two">
            {BEFORE.map((v, i) => (
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

      {/* ── §02 DURING THE EXAM ─────────────────────────── */}
      <section className="rg-sec rg-sec--dark" id="security">
        <div className="rg-wrap">
          <SectionHead
            code="§02"
            kicker="During the exam"
            title="Controls while the exam is running"
            lede="An online exam is only worth running if the university trusts the result. These controls make cheating hard, and the log shows when someone tried."
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
            <Rv as="h3" className="rg-sub-h">What gets logged</Rv>
            <Rv as="p" className="rg-sub-lede" delay={60}>
              Each of these is recorded against the student's attempt, with the time it
              happened. Faculty see the log next to the answers and decide what it means.
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

      {/* ── §03 MARKING ─────────────────────────────────── */}
      <section className="rg-sec" id="marking">
        <div className="rg-wrap">
          <SectionHead
            code="§03"
            kicker="After the exam"
            title="Marked within minutes of the exam closing"
            lede="Objective questions are marked the moment a student submits. Written and coding answers go to a marking queue, and on a normal day the whole paper is done within about ten minutes."
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
            <Rv as="h3" className="rg-sub-h">From a real exam</Rv>
            <Rv as="p" className="rg-sub-lede" delay={60}>
              Two screens from a 131-student operating systems quiz. Student names and IP
              addresses are replaced. The time, click and view
              counts are a rough signal of how sure a student was. They help spot a
              confusing question or a rushed attempt, but nobody should mark on them alone.
            </Rv>
            <div className="rg-shots">
              {MARKING_SHOTS.map((sh, i) => <Shot key={sh.src} {...sh} delay={i * 100} />)}
            </div>
          </div>

          <div className="rg-sub">
            <Rv as="h3" className="rg-sub-h">Faculty sign off on every mark</Rv>
            <Rv className="rg-assure rg-assure--two" delay={80}>
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
        </div>
      </section>

      {/* ── §04 REPORTS ─────────────────────────────────── */}
      <section className="rg-sec" id="reports">
        <div className="rg-wrap">
          <SectionHead
            code="§04"
            kicker="Results"
            title="Results by student, by class, and by topic"
            lede="Every question carries a topic and a course outcome, so results add up to more than a mark list. A tutor can see what one student needs, and a head of department can see where a whole batch is weak."
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

                <div className="rg-mrow-art">
                  {m.shot
                    ? <Shot {...m.shot} delay={140} />
                    : <Rv delay={140}><MasteryTable /></Rv>}
                </div>
              </div>
            ))}
          </div>

          <div className="rg-sub">
            <Rv className="rg-hi rg-ask">
              <span className="rg-hi-ico"><Icon name="terminal" size={20} /></span>
              <div>
                <h3 className="rg-h3">{AI_HELP.title}</h3>
                <p>{AI_HELP.desc}</p>
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* ── §05 ROLES ───────────────────────────────────── */}
      <section className="rg-sec" id="roles">
        <div className="rg-wrap">
          <SectionHead
            code="§05"
            kicker="Who uses it"
            title="Administrators, faculty, and students"
            lede="The exam office sets up the university, faculty run their own exams, and students see only their own work."
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
            title="Hosted by us, or on your campus"
            lede="The software is the same either way. What changes is where your student data is stored."
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

      <Footer extra={COMPARE_LINK} />
    </div>
  );
}
