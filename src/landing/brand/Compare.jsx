import './register.css';
import './compare.css';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { Nav, Footer, Rv, SectionHead } from './chrome';
import { useReveal } from './pageMotion';
import {
  BRAND, COMPARE_HERO, COMPARE_ALTERNATIVES, COMPARE_COLUMNS, COMPARE_ROWS,
  COMPARE_HONEST, COMPARE_REPLACES, COMPARE_NOTE, COMPARE_CTA,
} from '../content';

/* ═══════════════════════════════════════════════════════════════
   COMPARE — how EvolveUs sits against the tools a college already has.

   Same answer sheet, used for a different job: the comparison grid is
   read as a marking scheme, one row per criterion, each cell a bubble
   that is filled, half filled, or empty. Nothing new is invented for
   this page; the facts come from ../content.js.
   ═══════════════════════════════════════════════════════════════ */

const NAV_EXTRA = [{ href: '/compare', label: 'Compare', current: true }];

const MARK = {
  full: { label: 'Built for this', icon: 'check' },
  part: { label: 'Partly, or through add-ons', icon: 'toggle' },
  none: { label: 'Not what it is for', icon: 'iBeam' },
};

/* One cell of the grid: the bubble carries the verdict, the caption
   says why. The bubble is decorative; the verdict is read out for
   screen readers so the table is not a wall of identical circles. */
function Cell({ mark, own }) {
  const m = MARK[mark.v];
  return (
    <td className={`cm-cell is-${mark.v} ${own ? 'is-own' : ''}`}>
      <span className={`cm-mark is-${mark.v}`} aria-hidden="true" />
      <span className="cm-sr">{m.label}.</span>
      <span className="cm-cell-t">{mark.t}</span>
    </td>
  );
}

export default function Compare() {
  const root = useReveal();

  return (
    <div className="rg cm" ref={root}>
      <Nav base="/" extra={NAV_EXTRA} />

      {/* ── HERO ────────────────────────────────────────── */}
      <header className="rg-hero cm-hero" id="top">
        <div className="rg-wrap rg-hero-in">
          <Rv className="rg-eyebrow">
            <span className="rg-bub rg-bub--fill" />
            <span className="rg-mono">{COMPARE_HERO.eyebrow}</span>
          </Rv>

          <Rv as="h1" className="rg-display rg-rv--mask" delay={80}>
            {(() => {
              const EMPH = 'comparing it against';
              const [before, after] = COMPARE_HERO.headline.split(EMPH);
              return after === undefined
                ? COMPARE_HERO.headline
                : <>{before}<em>{EMPH}</em>{after}</>;
            })()}
          </Rv>

          <div className="cm-hero-grid">
            <Rv as="p" className="rg-lede" delay={160}>{COMPARE_HERO.sub}</Rv>
            <Rv className="cm-hero-note" delay={220}>
              <Icon name="flag" size={15} />
              {COMPARE_HERO.note}
            </Rv>
          </div>
        </div>
      </header>

      {/* ── §01 THE ALTERNATIVES ────────────────────────── */}
      <section className="rg-sec" id="alternatives">
        <div className="rg-wrap">
          <SectionHead
            code="§01"
            kicker="The alternatives"
            title="Four tools, each built for a different problem."
            lede="None of these are bad software. Each one is very good at the job it was designed for. The question is only whether that job is the same as running your examinations."
          />

          <div className="cm-alts">
            {COMPARE_ALTERNATIVES.map((a, i) => (
              <Rv className="cm-alt" key={a.id} delay={i * 70}>
                <div className="cm-alt-top">
                  <span className="cm-alt-ico"><Icon name={a.icon} size={20} /></span>
                  <span className="rg-mono">{a.label}</span>
                </div>
                <p className="cm-alt-eg">{a.examples}</p>
                <h3 className="cm-alt-h">{a.built}</h3>
                <div className="cm-alt-gap">
                  <span className="rg-mono cm-alt-gaplabel">For a college exam</span>
                  <p>{a.gap}</p>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ── §02 THE GRID ────────────────────────────────── */}
      <section className="rg-sec rg-sec--dark" id="grid">
        <div className="rg-wrap">
          <SectionHead
            code="§02"
            kicker="Side by side"
            title="Nine things a college examination needs."
            lede="Read it as a marking scheme. A filled bubble means the tool was built for that row; a half bubble means it gets there through add-ons or configuration; an empty one means it was never the point of that product."
          />

          <Rv className="cm-key">
            {Object.entries(MARK).map(([k, m]) => (
              <span className="cm-key-item" key={k}>
                <span className={`cm-mark is-${k}`} aria-hidden="true" />
                {m.label}
              </span>
            ))}
          </Rv>

          <div className="cm-scroll" tabIndex={0} role="region" aria-label="Comparison grid">
            <table className="cm-grid">
              <caption className="cm-sr">
                How EvolveUs and four categories of alternative tool are built
                against nine requirements of a college examination.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="cm-th-crit">
                    <span className="rg-mono">Requirement</span>
                  </th>
                  {COMPARE_COLUMNS.map((c) => (
                    <th
                      scope="col"
                      key={c.id}
                      className={`cm-th ${c.id === 'evolveus' ? 'is-own' : ''}`}
                    >
                      <span className="cm-th-l">{c.label}</span>
                      <span className="cm-th-s">{c.sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.id}>
                    <th scope="row" className="cm-crit">
                      <span className="cm-crit-in">
                        <span className="cm-crit-n">{String(i + 1).padStart(2, '0')}</span>
                        <span>
                          <span className="cm-crit-h">{row.criterion}</span>
                          <span className="cm-crit-d">{row.detail}</span>
                        </span>
                      </span>
                    </th>
                    {COMPARE_COLUMNS.map((c) => (
                      <Cell key={c.id} mark={row.cells[c.id]} own={c.id === 'evolveus'} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Rv as="p" className="cm-note">
            <Icon name="alert" size={15} />
            {COMPARE_NOTE}
          </Rv>
        </div>
      </section>

      {/* ── §03 WHERE WE ARE NOT THE ANSWER ─────────────── */}
      <section className="rg-sec" id="honest">
        <div className="rg-wrap">
          <SectionHead
            code="§03"
            kicker="When not to buy this"
            title="Three cases where you should keep what you have."
            lede="A platform that claims to win every comparison is not describing software, it is describing a brochure. These are the situations where we would tell you not to switch."
          />

          <div className="cm-honest">
            {COMPARE_HONEST.map((h, i) => (
              <Rv className="cm-hon" key={h.title} delay={i * 80}>
                <span className="cm-hon-ico"><Icon name={h.icon} size={20} /></span>
                <h3 className="rg-h3">{h.title}</h3>
                <p>{h.body}</p>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ── §04 WHAT IT REPLACES ────────────────────────── */}
      <section className="rg-sec" id="replaces">
        <div className="rg-wrap">
          <SectionHead
            code="§04"
            kicker="What it replaces"
            title="Usually it is not one product. It is six habits."
            lede="Colleges rarely arrive here from another examination platform. They arrive from a stack of manual steps that nobody owns and everybody repeats each semester."
          />

          <ul className="cm-repl">
            {COMPARE_REPLACES.map((r, i) => (
              <Rv as="li" key={r} delay={i * 60}>
                <span className="cm-repl-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="cm-repl-t">{r}</span>
                <span className="cm-mark is-full" aria-hidden="true" />
              </Rv>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section className="rg-sec rg-sec--dark" id="contact">
        <div className="rg-wrap">
          <div className="rg-cta-grid">
            <div>
              <Rv className="rg-eyebrow">
                <span className="rg-bub rg-bub--fill" />
                <span className="rg-mono">{COMPARE_CTA.eyebrow}</span>
              </Rv>
              <Rv as="h2" className="rg-h2 rg-cta-h rg-rv--mask" delay={60}>{COMPARE_CTA.headline}</Rv>
              <Rv as="p" className="rg-lede" delay={120} style={{ marginTop: 22 }}>{COMPARE_CTA.sub}</Rv>
              <Rv className="rg-cta-contact" delay={180}>
                <a href={`https://${BRAND.domain}`} target="_blank" rel="noreferrer">
                  <Icon name="globe" size={14} />
                  {BRAND.domain}
                </a>
              </Rv>
            </div>

            <Rv delay={160}>
              <ContactForm submitLabel="Send us last semester's paper" />
            </Rv>
          </div>
        </div>
      </section>

      <Footer base="/" extra={NAV_EXTRA} />
    </div>
  );
}
