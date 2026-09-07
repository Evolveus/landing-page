import { DesignSwitcher } from '../_shared/DesignSwitcher';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { useReveal } from '../_shared/useParallax';
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
import './Design4.css';

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, visible] = useReveal(0.12);
  return (
    <Tag ref={ref} className={`s4-reveal ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="24" height="24" rx="7" stroke="#0f766e" strokeWidth="1.6" />
      <path d="M8 13l3.4 3.4L18 9.4" stroke="#0f766e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Design4({ active, onNavigate }) {
  return (
    <div className="p4">
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      <header className="s4-nav">
        <div className="s4-container s4-nav-row">
          <a href="#top" className="s4-brand">
            <Mark />
            <span>{BRAND.name}</span>
          </a>
          <nav className="s4-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a href="#contact" className="s4-btn s4-btn-primary s4-btn-sm">Request a demo</a>
        </div>
      </header>

      <main id="top">
        <section className="s4-hero">
          <div className="s4-container">
            <Reveal className="s4-hero-inner">
              <span className="s4-eyebrow">{HERO.eyebrow}</span>
              <h1>{HERO.headline}</h1>
              <p className="s4-sub">{HERO.sub}</p>
              <div className="s4-hero-ctas">
                <a href="#contact" className="s4-btn s4-btn-primary">{HERO.primaryCta}</a>
                <a href="#platform" className="s4-btn s4-btn-ghost">{HERO.secondaryCta}</a>
              </div>
            </Reveal>

            <Reveal className="s4-stats">
              {STATS.map((s) => (
                <div className="s4-stat" key={s.l}>
                  <span className="s4-stat-n">{s.n}</span>
                  <span className="s4-stat-l">{s.l}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="s4-shot-wrap">
              <div className="s4-browser">
                <div className="s4-browser-bar">
                  <span /><span /><span />
                </div>
                <img src="/staffDashboard.png" alt="Administrator dashboard" />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="platform" className="s4-section">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">Platform</span>
              <h2>Everything an assessment cycle needs</h2>
            </Reveal>
            <div className="s4-pillars">
              {PILLARS.map((p) => (
                <Reveal as="div" className="s4-pillar" key={p.n}>
                  <div className="s4-icon-box"><Icon name={p.icon} size={18} /></div>
                  <span className="s4-mono s4-pillar-n">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <ul>
                    {p.bullets.map((b) => (
                      <li key={b}><Icon name="check" size={13} />{b}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="s4-tools">
              <span className="s4-kicker">Content tools</span>
              <div className="s4-tools-row">
                {CONTENT_TOOLS.map((t) => (
                  <div className="s4-tool" key={t.title}>
                    <div className="s4-icon-box s4-icon-box-sm"><Icon name={t.icon} size={15} /></div>
                    <div>
                      <h4>{t.title}</h4>
                      <p>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="question-types" className="s4-section s4-section-alt">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">Question types</span>
              <h2>Eight formats, one grading system</h2>
            </Reveal>
            <div className="s4-qgrid">
              {QUESTION_TYPES.map((q) => (
                <Reveal as="div" className="s4-qcard" key={q.num}>
                  <div className="s4-qcard-top">
                    <div className="s4-icon-box s4-icon-box-sm"><Icon name={q.icon} size={15} /></div>
                    <span className="s4-mono s4-qcard-n">{q.num}</span>
                  </div>
                  <h4>{q.label}</h4>
                  <p>{q.desc}</p>
                  <span className="s4-grading">{q.grading}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="roles" className="s4-section">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">Roles</span>
              <h2>One platform, three workflows</h2>
            </Reveal>
            <div className="s4-roles">
              {ROLES.map((r) => (
                <Reveal as="div" className="s4-role" key={r.id}>
                  <div className="s4-role-shot s4-browser">
                    <div className="s4-browser-bar"><span /><span /><span /></div>
                    <img src={r.src} alt={`${r.label} view`} />
                  </div>
                  <div className="s4-role-body">
                    <div className="s4-icon-box"><Icon name={r.icon} size={18} /></div>
                    <h3>{r.label}</h3>
                    <p>{r.summary}</p>
                    <ul>
                      {r.features.map((f) => (
                        <li key={f}><Icon name="check" size={13} />{f}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="s4-section s4-section-alt">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">Security</span>
              <h2>Exam integrity, built in</h2>
            </Reveal>
            <div className="s4-sec-features">
              {SECURITY_FEATURES.map((f) => (
                <Reveal as="div" className="s4-sec-card" key={f.title}>
                  <div className="s4-icon-box"><Icon name={f.icon} size={18} /></div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="s4-signals">
              <span className="s4-kicker s4-kicker-sm">Violation signals tracked</span>
              <div className="s4-signal-chips">
                {SECURITY_SIGNALS.map((s) => (
                  <span className="s4-chip" key={s}>{s}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="ai-evaluation" className="s4-section">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">AI evaluation</span>
              <h2>Faculty stays in control of every score</h2>
            </Reveal>
            <div className="s4-ai-steps">
              {AI_STEPS.map((s) => (
                <Reveal as="div" className="s4-ai-step" key={s.num}>
                  <div className="s4-icon-box"><Icon name={s.icon} size={18} /></div>
                  <span className="s4-mono">{s.num}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="s4-ai-lower">
              <div className="s4-ai-models">
                <span className="s4-kicker s4-kicker-sm">Supported providers</span>
                <div className="s4-model-list">
                  {AI_MODELS.map((m) => (
                    <div className="s4-model" key={m.name}>
                      <span className="s4-model-name">{m.name}</span>
                      <span className="s4-model-sub s4-mono">{m.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="s4-ai-highlights">
                {AI_HIGHLIGHTS.map((h) => (
                  <div className="s4-highlight" key={h.title}>
                    <div className="s4-icon-box s4-icon-box-sm"><Icon name={h.icon} size={15} /></div>
                    <div>
                      <h4>{h.title}</h4>
                      <p>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="deployment" className="s4-section s4-section-alt">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">Deployment</span>
              <h2>Two ways to run EvolveUs</h2>
            </Reveal>
            <div className="s4-deploy-grid">
              {DEPLOY_MODES.map((d) => (
                <Reveal as="div" className="s4-deploy-card" key={d.id}>
                  <div className="s4-icon-box"><Icon name={d.icon} size={18} /></div>
                  <h3>{d.label}</h3>
                  <p className="s4-deploy-tagline">{d.tagline}</p>
                  <p className="s4-deploy-sub">{d.sub}</p>
                  <ul>
                    {d.features.map((f) => (
                      <li key={f}><Icon name="check" size={13} />{f}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="s4-section s4-contact">
          <div className="s4-container">
            <Reveal className="s4-head">
              <span className="s4-kicker">{CTA.eyebrow}</span>
              <h2>{CTA.headline}</h2>
              <p className="s4-sub">{CTA.sub}</p>
            </Reveal>
            <Reveal className="s4-contact-card">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="s4-footer">
        <div className="s4-container s4-footer-grid">
          <div className="s4-footer-brand">
            <a href="#top" className="s4-brand">
              <Mark />
              <span>{BRAND.name}</span>
            </a>
            <p>{FOOTER.tagline}</p>
          </div>
          {FOOTER.columns.map((col) => (
            <div className="s4-footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="s4-container s4-footer-bottom">
          <span>© 2026 {BRAND.name}</span>
          <span>{BRAND.domain}</span>
        </div>
      </footer>
    </div>
  );
}
