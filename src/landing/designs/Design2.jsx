import { DesignSwitcher } from '../_shared/DesignSwitcher';
import { Icon } from '../_shared/Icon';
import { useReveal } from '../_shared/useParallax';
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
import './Design2.css';

function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`d2-reveal ${visible ? 'd2-in' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

function Panel({ path, src, alt }) {
  return (
    <div className="d2-panel">
      <div className="d2-panel-bar">
        <span className="d2-panel-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="d2-panel-path">{path}</span>
      </div>
      <div className="d2-panel-body">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function SectionHead({ index, id, title, note }) {
  return (
    <div className="d2-section-head">
      <span className="d2-section-idx">SEC.{index}</span>
      <h2>{title}</h2>
      {note && <span className="d2-section-note">{note}</span>}
      <a className="d2-anchor-link" href={`#${id}`} aria-hidden="true">#{id}</a>
    </div>
  );
}

export default function Design2({ active, onNavigate }) {
  return (
    <div className="p2">
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      <header className="d2-nav">
        <a className="d2-brand" href="#top">
          <span className="d2-brand-mark">
            <Icon name="terminal" size={16} />
          </span>
          <span className="d2-brand-word">{BRAND.name}</span>
          <span className="d2-brand-domain">{BRAND.domain}</span>
        </a>
        <nav className="d2-nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <a className="d2-btn d2-btn-primary d2-nav-cta" href="#contact">
          Request access
        </a>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="d2-hero">
          <div className="d2-hero-grid">
            <div className="d2-hero-copy">
              <div className="d2-eyebrow">
                <span className="d2-status-dot" />
                {HERO.eyebrow}
              </div>
              <h1>{HERO.headline}</h1>
              <p className="d2-hero-sub">{HERO.sub}</p>
              <div className="d2-hero-actions">
                <a className="d2-btn d2-btn-primary" href="#contact">
                  {HERO.primaryCta}
                  <Icon name="arrowRight" size={14} />
                </a>
                <a className="d2-btn d2-btn-ghost" href="#platform">
                  {HERO.secondaryCta}
                </a>
              </div>
            </div>
            <div className="d2-hero-visual">
              <Panel path="~/evolveus/exam/staffDashboard.png" src="/staffDashboard.png" alt="Administrator dashboard" />
            </div>
          </div>

          <div className="d2-stats">
            {STATS.map((s) => (
              <div className="d2-stat" key={s.l}>
                <span className="d2-stat-n">{s.n}</span>
                <span className="d2-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PLATFORM PILLARS */}
        <section id="platform" className="d2-section">
          <SectionHead index="01" id="platform" title="Platform pillars" note={`${PILLARS.length} modules`} />
          <div className="d2-pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 40} className="d2-pillar">
                <div className="d2-pillar-top">
                  <span className="d2-pillar-num">{p.n}</span>
                  <Icon name={p.icon} size={18} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul className="d2-pillar-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}><Icon name="arrowRight" size={11} />{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <div className="d2-tools-strip">
            <span className="d2-tools-label">content tooling</span>
            <div className="d2-tools-row">
              {CONTENT_TOOLS.map((t) => (
                <div className="d2-tool" key={t.title}>
                  <Icon name={t.icon} size={15} />
                  <div>
                    <span className="d2-tool-title">{t.title}</span>
                    <span className="d2-tool-desc">{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUESTION TYPES */}
        <section id="question-types" className="d2-section">
          <SectionHead index="02" id="question-types" title="Question types" note={`${QUESTION_TYPES.length} formats`} />
          <div className="d2-qt-table">
            <div className="d2-qt-row d2-qt-head">
              <span>ID</span>
              <span>Type</span>
              <span>Description</span>
              <span>Grading</span>
            </div>
            {QUESTION_TYPES.map((q) => (
              <div className="d2-qt-row" key={q.num}>
                <span className="d2-qt-id">{q.num}</span>
                <span className="d2-qt-label">
                  <Icon name={q.icon} size={14} />
                  {q.label}
                </span>
                <span className="d2-qt-desc">{q.desc}</span>
                <span className="d2-qt-grading">{q.grading}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ROLES */}
        <section id="roles" className="d2-section">
          <SectionHead index="03" id="roles" title="Built for every role" note={`${ROLES.length} role types`} />
          <div className="d2-roles">
            {ROLES.map((r) => (
              <Reveal key={r.id} className="d2-role">
                <div className="d2-role-head">
                  <Icon name={r.icon} size={17} />
                  <h3>{r.label}</h3>
                </div>
                <p className="d2-role-summary">{r.summary}</p>
                <Panel path={`~/evolveus/roles/${r.id}${r.src}`} src={r.src} alt={`${r.label} view`} />
                <ul className="d2-role-features">
                  {r.features.map((f) => (
                    <li key={f}><Icon name="check" size={13} />{f}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECURITY */}
        <section id="security" className="d2-section">
          <SectionHead index="04" id="security" title="Exam security" note="12 signals tracked" />
          <div className="d2-security-grid">
            {SECURITY_FEATURES.map((f) => (
              <div className="d2-security-card" key={f.title}>
                <Icon name={f.icon} size={19} />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="d2-signals">
            <span className="d2-signals-label">$ violation_signals --list</span>
            <div className="d2-signals-grid">
              {SECURITY_SIGNALS.map((s) => (
                <div className="d2-signal-chip" key={s}>
                  <span className="d2-signal-dot" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI EVALUATION */}
        <section id="ai-evaluation" className="d2-section">
          <SectionHead index="05" id="ai-evaluation" title="AI evaluation" note="human review required" />
          <div className="d2-ai-steps">
            {AI_STEPS.map((s, i) => (
              <div className="d2-ai-step" key={s.num}>
                <div className="d2-ai-step-num">
                  <span>{s.num}</span>
                  {i < AI_STEPS.length - 1 && <div className="d2-ai-step-line" />}
                </div>
                <div className="d2-ai-step-body">
                  <Icon name={s.icon} size={16} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="d2-ai-lower">
            <div className="d2-ai-models">
              <span className="d2-ai-sub-label">supported providers</span>
              <div className="d2-model-list">
                {AI_MODELS.map((m) => (
                  <div className="d2-model" key={m.name}>
                    <span className="d2-model-name">{m.name}</span>
                    <span className="d2-model-sub">{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="d2-ai-highlights">
              <span className="d2-ai-sub-label">notes</span>
              {AI_HIGHLIGHTS.map((h) => (
                <div className="d2-ai-highlight" key={h.title}>
                  <Icon name={h.icon} size={15} />
                  <div>
                    <span className="d2-highlight-title">{h.title}</span>
                    <span className="d2-highlight-desc">{h.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPLOYMENT */}
        <section id="deployment" className="d2-section">
          <SectionHead index="06" id="deployment" title="Deployment modes" note="choose your topology" />
          <div className="d2-deploy-grid">
            {DEPLOY_MODES.map((d) => (
              <div className="d2-deploy-card" key={d.id}>
                <div className="d2-deploy-head">
                  <Icon name={d.icon} size={18} />
                  <h3>{d.label}</h3>
                </div>
                <p className="d2-deploy-tagline">{d.tagline}</p>
                <p className="d2-deploy-sub">{d.sub}</p>
                <ul className="d2-deploy-features">
                  {d.features.map((f) => (
                    <li key={f}><Icon name="arrowRight" size={11} />{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="d2-section d2-contact">
          <div className="d2-contact-head">
            <div className="d2-eyebrow">
              <span className="d2-status-dot" />
              {CTA.eyebrow}
            </div>
            <h2>{CTA.headline}</h2>
            <p>{CTA.sub}</p>
          </div>
          <div className="d2-contact-panel">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="d2-footer">
        <div className="d2-footer-top">
          <div className="d2-footer-brand">
            <span className="d2-brand-mark">
              <Icon name="terminal" size={16} />
            </span>
            <span className="d2-brand-word">{BRAND.name}</span>
          </div>
          <p>{FOOTER.tagline}</p>
        </div>
        <div className="d2-footer-cols">
          {FOOTER.columns.map((col) => (
            <div className="d2-footer-col" key={col.title}>
              <span>{col.title}</span>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="d2-footer-bottom">
          <span>© 2026 EvolveUs</span>
          <span className="d2-footer-domain">{BRAND.domain}</span>
        </div>
      </footer>
    </div>
  );
}
