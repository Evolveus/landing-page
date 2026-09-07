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
import './Design5.css';

// Small hexagon-shield seal mark, used in nav and footer.
function Seal({ size = 34 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" className="p5-seal-svg">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M20 10 L29 14 V22 C29 27 25 30 20 32 C15 30 11 27 11 22 V14 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M15.5 20.5 L18.5 23.5 L24.5 16.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`p5-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function SectionRule() {
  return <div className="p5-rule" aria-hidden="true" />;
}

function Eyebrow({ children }) {
  return <div className="p5-eyebrow">{children}</div>;
}

export default function Design5({ active, onNavigate }) {
  return (
    <div className="p5">
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      {/* NAV */}
      <header className="p5-nav">
        <div className="p5-nav-inner">
          <a className="p5-brand" href="#top">
            <span className="p5-seal"><Seal size={30} /></span>
            <span className="p5-brand-text">
              <span className="p5-brand-name">{BRAND.name}</span>
              <span className="p5-brand-sub">Assessment Systems Registry</span>
            </span>
          </a>
          <nav className="p5-nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a className="p5-nav-cta" href="#contact">Request a demo</a>
        </div>
      </header>

      {/* HERO */}
      <section className="p5-hero" id="top">
        <div className="p5-hero-inner">
          <div className="p5-hero-text">
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="p5-h1">{HERO.headline}</h1>
            <p className="p5-hero-sub">{HERO.sub}</p>
            <div className="p5-hero-actions">
              <a className="p5-btn p5-btn-primary" href="#contact">
                {HERO.primaryCta}
                <Icon name="arrowRight" size={16} />
              </a>
              <a className="p5-btn p5-btn-secondary" href="#platform">
                {HERO.secondaryCta}
              </a>
            </div>
          </div>

          <div className="p5-hero-visual">
            <div className="p5-frame">
              <div className="p5-frame-bar">
                <span className="p5-frame-dot" />
                <span className="p5-frame-dot" />
                <span className="p5-frame-dot" />
                <span className="p5-frame-url">{BRAND.domain}/staff/dashboard</span>
              </div>
              <img src="/staffDashboard.png" alt="Staff dashboard" className="p5-frame-img" />
            </div>
            <div className="p5-frame p5-frame-sub">
              <div className="p5-frame-bar">
                <span className="p5-frame-dot" />
                <span className="p5-frame-dot" />
                <span className="p5-frame-dot" />
                <span className="p5-frame-url">{BRAND.domain}/exam/quiz</span>
              </div>
              <img src="/quiz.png" alt="Exam interface" className="p5-frame-img" />
            </div>
          </div>
        </div>

        <div className="p5-stats">
          {STATS.map((s) => (
            <div className="p5-stat" key={s.l}>
              <span className="p5-stat-n">{s.n}</span>
              <span className="p5-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM PILLARS */}
      <section className="p5-section" id="platform">
        <SectionRule />
        <div className="p5-section-inner">
          <Reveal as="div" className="p5-section-head">
            <Eyebrow>Section I : platform capabilities</Eyebrow>
            <h2 className="p5-h2">Platform pillars</h2>
          </Reveal>
          <div className="p5-pillars-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 50} className="p5-pillar">
                <div className="p5-pillar-head">
                  <span className="p5-pillar-num">{p.n}</span>
                  <Icon name={p.icon} size={20} strokeWidth={1.5} />
                </div>
                <h3 className="p5-pillar-title">{p.title}</h3>
                <p className="p5-pillar-body">{p.body}</p>
                <ul className="p5-pillar-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="p5-tools-row">
            <div className="p5-tools-label">Question content tooling</div>
            <div className="p5-tools-grid">
              {CONTENT_TOOLS.map((t) => (
                <div className="p5-tool" key={t.title}>
                  <Icon name={t.icon} size={16} strokeWidth={1.5} />
                  <div>
                    <div className="p5-tool-title">{t.title}</div>
                    <div className="p5-tool-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUESTION TYPES */}
      <section className="p5-section p5-section-alt" id="question-types">
        <SectionRule />
        <div className="p5-section-inner">
          <Reveal className="p5-section-head">
            <Eyebrow>Section II : assessment instruments</Eyebrow>
            <h2 className="p5-h2">Question types</h2>
          </Reveal>
          <div className="p5-qtypes-table">
            <div className="p5-qtypes-row p5-qtypes-row-head">
              <span>No.</span>
              <span>Type</span>
              <span>Description</span>
              <span>Grading</span>
            </div>
            {QUESTION_TYPES.map((q) => (
              <div className="p5-qtypes-row" key={q.num}>
                <span className="p5-qtypes-num">{q.num}</span>
                <span className="p5-qtypes-label">
                  <Icon name={q.icon} size={15} strokeWidth={1.6} />
                  {q.label}
                </span>
                <span className="p5-qtypes-desc">{q.desc}</span>
                <span className="p5-qtypes-grading">{q.grading}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="p5-section" id="roles">
        <SectionRule />
        <div className="p5-section-inner">
          <Reveal className="p5-section-head">
            <Eyebrow>Section III : registered roles</Eyebrow>
            <h2 className="p5-h2">Roles and access</h2>
          </Reveal>
          <div className="p5-roles-list">
            {ROLES.map((r, i) => (
              <Reveal key={r.id} delay={i * 60} className="p5-role">
                <div className="p5-role-info">
                  <div className="p5-role-head">
                    <Icon name={r.icon} size={20} strokeWidth={1.5} />
                    <h3>{r.label}</h3>
                  </div>
                  <p className="p5-role-summary">{r.summary}</p>
                  <ul className="p5-role-features">
                    {r.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="p5-role-visual">
                  <div className="p5-frame p5-frame-role">
                    <div className="p5-frame-bar">
                      <span className="p5-frame-dot" />
                      <span className="p5-frame-dot" />
                      <span className="p5-frame-dot" />
                      <span className="p5-frame-url">{r.label.toLowerCase()} view</span>
                    </div>
                    <img src={r.src} alt={`${r.label} view`} className="p5-frame-img" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="p5-section p5-section-dark" id="security">
        <SectionRule dark />
        <div className="p5-section-inner">
          <Reveal className="p5-section-head">
            <Eyebrow light>Section IV : compliance disclosure</Eyebrow>
            <h2 className="p5-h2 p5-h2-light">Exam security and integrity</h2>
          </Reveal>

          <div className="p5-security-grid">
            {SECURITY_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 50} className="p5-security-card">
                <Icon name={f.icon} size={20} strokeWidth={1.5} />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="p5-clauses">
            <div className="p5-clauses-label">Clause register : violation signals monitored</div>
            <ol className="p5-clauses-list">
              {SECURITY_SIGNALS.map((s, i) => (
                <li key={s}>
                  <span className="p5-clause-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* AI EVALUATION */}
      <section className="p5-section" id="ai-evaluation">
        <SectionRule />
        <div className="p5-section-inner">
          <Reveal className="p5-section-head">
            <Eyebrow>Section V : evaluation procedure</Eyebrow>
            <h2 className="p5-h2">AI-assisted evaluation</h2>
          </Reveal>

          <div className="p5-ai-steps">
            {AI_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 60} className="p5-ai-step">
                <span className="p5-ai-num">{s.num}</span>
                <div className="p5-ai-step-body">
                  <div className="p5-ai-step-head">
                    <Icon name={s.icon} size={18} strokeWidth={1.5} />
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.desc}</p>
                </div>
                {i < AI_STEPS.length - 1 && <span className="p5-ai-connector" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>

          <div className="p5-ai-lower">
            <Reveal className="p5-ai-models">
              <div className="p5-tools-label">Approved provider register</div>
              <ul className="p5-models-list">
                {AI_MODELS.map((m) => (
                  <li key={m.name}>
                    <span className="p5-model-name">{m.name}</span>
                    <span className="p5-model-sub">{m.sub}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="p5-ai-highlights">
              {AI_HIGHLIGHTS.map((h) => (
                <div className="p5-highlight" key={h.title}>
                  <Icon name={h.icon} size={18} strokeWidth={1.5} />
                  <div>
                    <div className="p5-highlight-title">{h.title}</div>
                    <div className="p5-highlight-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section className="p5-section p5-section-alt" id="deployment">
        <SectionRule />
        <div className="p5-section-inner">
          <Reveal className="p5-section-head">
            <Eyebrow>Section VI : deployment options</Eyebrow>
            <h2 className="p5-h2">Deployment modes</h2>
          </Reveal>
          <div className="p5-deploy-grid">
            {DEPLOY_MODES.map((d, i) => (
              <Reveal key={d.id} delay={i * 80} className="p5-deploy-card">
                <div className="p5-deploy-head">
                  <Icon name={d.icon} size={20} strokeWidth={1.5} />
                  <h3>{d.label}</h3>
                </div>
                <p className="p5-deploy-tagline">{d.tagline}</p>
                <p className="p5-deploy-sub">{d.sub}</p>
                <ul className="p5-deploy-features">
                  {d.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={13} strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="p5-section p5-section-dark" id="contact">
        <SectionRule dark />
        <div className="p5-section-inner p5-contact-inner">
          <Reveal className="p5-contact-head">
            <Eyebrow light>{CTA.eyebrow}</Eyebrow>
            <h2 className="p5-h2 p5-h2-light">{CTA.headline}</h2>
            <p className="p5-contact-sub">{CTA.sub}</p>
          </Reveal>
          <Reveal className="p5-contact-form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p5-footer">
        <div className="p5-footer-inner">
          <div className="p5-footer-brand">
            <span className="p5-seal"><Seal size={30} /></span>
            <div>
              <div className="p5-brand-name">{BRAND.name}</div>
              <p className="p5-footer-tagline">{FOOTER.tagline}</p>
            </div>
          </div>
          <div className="p5-footer-cols">
            {FOOTER.columns.map((col) => (
              <div className="p5-footer-col" key={col.title}>
                <div className="p5-footer-col-title">{col.title}</div>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="p5-footer-bottom">
          <span>Copyright 2026 {BRAND.name}. All rights reserved.</span>
          <span>{BRAND.domain}</span>
        </div>
      </footer>
    </div>
  );
}
