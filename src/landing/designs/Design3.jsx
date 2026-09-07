import { Icon } from '../_shared/Icon';
import { useReveal } from '../_shared/useParallax';
import { DesignSwitcher } from '../_shared/DesignSwitcher';
import { ContactForm } from '../_shared/ContactForm';
import {
  BRAND,
  NAV_LINKS,
  HERO,
  STATS,
  PILLARS,
  QUESTION_TYPES,
  ROLES,
  SECURITY_SIGNALS,
  SECURITY_FEATURES,
  AI_STEPS,
  AI_MODELS,
  AI_HIGHLIGHTS,
  DEPLOY_MODES,
  CONTENT_TOOLS,
  CTA,
  FOOTER,
} from '../content';
import './Design3.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

function Reveal({ children, className = '', as: As = 'div', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <As
      ref={ref}
      className={`p3-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

function ChapterMark({ numeral, kicker }) {
  return (
    <div className="p3-chapter-mark">
      <span className="p3-chapter-numeral">{numeral}</span>
      <span className="p3-chapter-rule" />
      <span className="p3-chapter-kicker">{kicker}</span>
    </div>
  );
}

function Figure({ src, alt, caption, className = '' }) {
  return (
    <figure className={`p3-figure ${className}`}>
      <div className="p3-figure-frame">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function BrandMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12.5" fill="none" stroke="#7a1f2b" strokeWidth="1.3" />
      <circle cx="14" cy="14" r="9" fill="none" stroke="#7a1f2b" strokeWidth="0.6" />
      <text x="14" y="18.5" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="13" fill="#1a1a1a">E</text>
    </svg>
  );
}

export default function Design3({ active, onNavigate }) {
  return (
    <div className="p3">
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      {/* NAV */}
      <nav className="p3-nav">
        <div className="p3-nav-inner">
          <a href="#top" className="p3-brand">
            <BrandMark />
            <span className="p3-brand-name">{BRAND.name}</span>
          </a>
          <div className="p3-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <a href="#contact" className="p3-nav-cta">{HERO.primaryCta}</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="p3-hero" id="top">
        <div className="p3-hero-inner">
          <div className="p3-hero-text">
            <p className="p3-eyebrow">{HERO.eyebrow}</p>
            <h1 className="p3-h1">{HERO.headline}</h1>
            <p className="p3-lede">{HERO.sub}</p>
            <div className="p3-hero-actions">
              <a href="#contact" className="p3-btn-primary">{HERO.primaryCta}</a>
              <a href="#platform" className="p3-btn-secondary">
                {HERO.secondaryCta}
                <Icon name="arrowRight" size={14} />
              </a>
            </div>
          </div>

          <div className="p3-hero-figures">
            <Figure
              src="/quiz.png"
              alt="Examination interface"
              caption="Fig. 1. Examination interface."
              className="p3-figure-main"
            />
            <Figure
              src="/quizView.png"
              alt="Question navigation panel"
              caption="Fig. 2. Question navigation panel."
              className="p3-figure-inset"
            />
          </div>
        </div>

        <div className="p3-stats">
          <div className="p3-stats-inner">
            {STATS.map((s) => (
              <div key={s.l} className="p3-stat">
                <div className="p3-stat-n">{s.n}</div>
                <div className="p3-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* I. PLATFORM */}
        <section className="p3-section" id="platform">
          <div className="p3-section-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[0]} kicker="The platform" />
              <h2 className="p3-h2">Six pillars of the assessment lifecycle.</h2>
            </Reveal>

            <div className="p3-pillars">
              {PILLARS.map((p, i) => (
                <Reveal key={p.n} delay={i * 40} as="article" className="p3-pillar">
                  <div className="p3-pillar-head">
                    <span className="p3-pillar-num">No. {p.n}</span>
                    <span className="p3-pillar-icon"><Icon name={p.icon} size={20} strokeWidth={1.5} /></span>
                  </div>
                  <h3 className="p3-pillar-title">{p.title}</h3>
                  <p className="p3-pillar-body">{p.body}</p>
                  <ul className="p3-pillar-bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="p3-tools" delay={80}>
              <h3 className="p3-tools-title">Question content tools</h3>
              <div className="p3-tools-row">
                {CONTENT_TOOLS.map((t) => (
                  <div key={t.title} className="p3-tool">
                    <span className="p3-tool-icon"><Icon name={t.icon} size={17} strokeWidth={1.5} /></span>
                    <div>
                      <div className="p3-tool-title">{t.title}</div>
                      <div className="p3-tool-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* II. QUESTION TYPES */}
        <section className="p3-section p3-section-alt" id="question-types">
          <div className="p3-section-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[1]} kicker="Question types" />
              <h2 className="p3-h2">Eight formats, one grading pipeline.</h2>
            </Reveal>

            <Reveal delay={60}>
              <div className="p3-qtable">
                <div className="p3-qtable-head">
                  <span>No.</span>
                  <span>Type</span>
                  <span>Description</span>
                  <span>Grading</span>
                </div>
                {QUESTION_TYPES.map((q) => (
                  <div key={q.num} className="p3-qrow">
                    <span className="p3-qrow-num">{q.num}</span>
                    <span className="p3-qrow-label">
                      <Icon name={q.icon} size={16} strokeWidth={1.5} />
                      {q.label}
                    </span>
                    <span className="p3-qrow-desc">{q.desc}</span>
                    <span className="p3-qrow-grading">{q.grading}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* III. ROLES */}
        <section className="p3-section" id="roles">
          <div className="p3-section-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[2]} kicker="Roles" />
              <h2 className="p3-h2">A dedicated view for every seat at the institution.</h2>
            </Reveal>

            <div className="p3-roles">
              {ROLES.map((r, i) => (
                <Reveal key={r.id} delay={i * 60} as="article" className="p3-role">
                  <Figure
                    src={r.src}
                    alt={`${r.label} dashboard`}
                    caption={`Fig. ${3 + i}. ${r.label} dashboard.`}
                    className="p3-role-figure"
                  />
                  <div className="p3-role-head">
                    <span className="p3-role-icon"><Icon name={r.icon} size={18} strokeWidth={1.5} /></span>
                    <h3 className="p3-role-title">{r.label}</h3>
                  </div>
                  <p className="p3-role-summary">{r.summary}</p>
                  <ul className="p3-role-list">
                    {r.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* IV. SECURITY */}
        <section className="p3-section p3-section-alt" id="security">
          <div className="p3-section-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[3]} kicker="Security" />
              <h2 className="p3-h2">Examination integrity, enforced and logged.</h2>
            </Reveal>

            <div className="p3-security-grid">
              <Reveal delay={40} className="p3-security-features">
                {SECURITY_FEATURES.map((f) => (
                  <div key={f.title} className="p3-sec-feature">
                    <span className="p3-sec-icon"><Icon name={f.icon} size={19} strokeWidth={1.5} /></span>
                    <div>
                      <div className="p3-sec-title">{f.title}</div>
                      <div className="p3-sec-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={100} className="p3-signals">
                <h3 className="p3-signals-title">Violation signals monitored</h3>
                <ul className="p3-signals-list">
                  {SECURITY_SIGNALS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* V. AI EVALUATION */}
        <section className="p3-section" id="ai-evaluation">
          <div className="p3-section-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[4]} kicker="AI evaluation" />
              <h2 className="p3-h2">Descriptive answers, evaluated against a faculty rubric.</h2>
            </Reveal>

            <div className="p3-ai-steps">
              {AI_STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 50} as="div" className="p3-ai-step">
                  <div className="p3-ai-step-num">{s.num}</div>
                  <div className="p3-ai-step-rule" />
                  <div className="p3-ai-step-body">
                    <span className="p3-ai-step-icon"><Icon name={s.icon} size={17} strokeWidth={1.5} /></span>
                    <h3 className="p3-ai-step-title">{s.title}</h3>
                    <p className="p3-ai-step-desc">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="p3-ai-lower">
              <Reveal delay={60} className="p3-ai-models">
                <h3 className="p3-ai-sub-title">Supported model providers</h3>
                <ul className="p3-models-list">
                  {AI_MODELS.map((m) => (
                    <li key={m.name}>
                      <span className="p3-model-name">{m.name}</span>
                      <span className="p3-model-sub">{m.sub}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={100} className="p3-ai-highlights">
                <h3 className="p3-ai-sub-title">Notes</h3>
                <div className="p3-highlights-list">
                  {AI_HIGHLIGHTS.map((h) => (
                    <div key={h.title} className="p3-highlight">
                      <span className="p3-highlight-icon"><Icon name={h.icon} size={16} strokeWidth={1.5} /></span>
                      <div>
                        <div className="p3-highlight-title">{h.title}</div>
                        <div className="p3-highlight-desc">{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* VI. DEPLOYMENT */}
        <section className="p3-section p3-section-alt" id="deployment">
          <div className="p3-section-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[5]} kicker="Deployment" />
              <h2 className="p3-h2">Two ways to run the platform.</h2>
            </Reveal>

            <div className="p3-deploy-grid">
              {DEPLOY_MODES.map((d, i) => (
                <Reveal key={d.id} delay={i * 60} as="article" className="p3-deploy-card">
                  <div className="p3-deploy-head">
                    <span className="p3-deploy-icon"><Icon name={d.icon} size={19} strokeWidth={1.5} /></span>
                    <h3 className="p3-deploy-title">{d.label}</h3>
                  </div>
                  <p className="p3-deploy-tagline">{d.tagline}</p>
                  <p className="p3-deploy-sub">{d.sub}</p>
                  <ul className="p3-deploy-list">
                    {d.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* VII. CONTACT */}
        <section className="p3-section p3-contact" id="contact">
          <div className="p3-contact-inner">
            <Reveal>
              <ChapterMark numeral={ROMAN[6]} kicker={CTA.eyebrow} />
              <h2 className="p3-h2">{CTA.headline}</h2>
              <p className="p3-lede p3-contact-sub">{CTA.sub}</p>
            </Reveal>
            <Reveal delay={60} className="p3-contact-form-wrap">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="p3-footer">
        <div className="p3-footer-inner">
          <div className="p3-footer-brand">
            <div className="p3-brand">
              <BrandMark size={24} />
              <span className="p3-brand-name">{BRAND.name}</span>
            </div>
            <p className="p3-footer-tagline">{FOOTER.tagline}</p>
          </div>
          <div className="p3-footer-columns">
            {FOOTER.columns.map((col) => (
              <div key={col.title} className="p3-footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="p3-footer-bottom">
          <span>© 2026 {BRAND.name}</span>
          <span>{BRAND.domain}</span>
        </div>
      </footer>
    </div>
  );
}
