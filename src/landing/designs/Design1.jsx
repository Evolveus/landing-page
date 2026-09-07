import { useEffect, useState } from 'react';
import { Icon } from '../_shared/Icon';
import { useReveal, useScrollY } from '../_shared/useParallax';
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
import './Design1.css';

function Mark({ className = '' }) {
  return (
    <svg
      className={`p1-mark ${className}`}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0.75" y="0.75" width="28.5" height="28.5" rx="2" />
      <path d="M8 9.5h14M8 15h10.5M8 20.5h14" />
      <circle cx="24" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Reveal({ children, className = '', as: Tag = 'div', delay = 0, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`p1-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function AccentHeadline({ text, className = '' }) {
  const words = text.trim().split(' ');
  const accented = words.slice(-2).join(' ');
  const lead = words.slice(0, -2).join(' ');
  return (
    <h1 className={className}>
      {lead ? `${lead} ` : ''}
      <span className="p1-accent">{accented}</span>
    </h1>
  );
}

function ScrollProgress() {
  const y = useScrollY();
  const [max, setMax] = useState(1);
  useEffect(() => {
    const update = () => setMax(Math.max(document.documentElement.scrollHeight - window.innerHeight, 1));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const pct = Math.min((y / max) * 100, 100);
  return <div className="p1-progress" style={{ transform: `scaleX(${pct / 100})` }} />;
}

function SectionHeading({ num, eyebrow, title, lede }) {
  return (
    <div className="p1-sec-head" data-ghost={num}>
      {eyebrow && (
        <div className="p1-sec-label">
          <span className="p1-eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="p1-sec-title">{title}</h2>
      {lede && <p className="p1-sec-lede">{lede}</p>}
    </div>
  );
}

function Frame({ src, alt, label, className = '' }) {
  return (
    <div className={`p1-frame ${className}`}>
      <div className="p1-frame-bar">
        <span className="p1-frame-dots">
          <i /><i /><i />
        </span>
        <span className="p1-frame-label">{label}</span>
      </div>
      <img src={src} alt={alt} className="p1-frame-img" loading="lazy" />
    </div>
  );
}

export default function Design1({ active, onNavigate }) {
  const y = useScrollY();
  return (
    <div className="p1">
      <div className="p1-grain" aria-hidden="true" />
      <ScrollProgress />
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      <header className={`p1-nav ${y > 8 ? 'is-scrolled' : ''}`}>
        <div className="p1-nav-inner">
          <a href="#top" className="p1-brand">
            <Mark />
            <span className="p1-wordmark">{BRAND.name}</span>
          </a>
          <nav className="p1-nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a href="#contact" className="p1-btn p1-btn-gold p1-nav-cta">
            Request a demo
          </a>
        </div>
      </header>

      <section className="p1-hero" id="top">
        <div className="p1-hero-inner">
          <div className="p1-hero-copy">
            <p className="p1-eyebrow p1-eyebrow-light">{HERO.eyebrow}</p>
            <AccentHeadline text={HERO.headline} className="p1-hero-headline" />
            <p className="p1-hero-sub">{HERO.sub}</p>
            <div className="p1-hero-ctas">
              <a href="#contact" className="p1-btn p1-btn-gold">
                {HERO.primaryCta}
                <Icon name="arrowRight" size={15} />
              </a>
              <a href="#platform" className="p1-btn p1-btn-outline">
                {HERO.secondaryCta}
              </a>
            </div>
          </div>

          <div className="p1-hero-visual p1-float">
            <Frame
              src="/staffDashboard.png"
              alt="Administrator dashboard"
              label="evolveus.in / staff / dashboard"
              className="p1-frame-primary"
            />
            <Frame
              src="/quizSettings.png"
              alt="Quiz configuration screen"
              label="quiz / settings"
              className="p1-frame-secondary"
            />
          </div>
        </div>

        <div className="p1-stats">
          <div className="p1-stats-inner">
            {STATS.map((s) => (
              <div className="p1-stat" key={s.l}>
                <span className="p1-stat-n">{s.n}</span>
                <span className="p1-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p1-section" id="platform">
        <div className="p1-container">
          <Reveal>
            <SectionHeading
              num="01"
              title="Six pillars covering the full assessment cycle"
            />
          </Reveal>

          <div className="p1-pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} className="p1-pillar" delay={i * 60}>
                <div className="p1-pillar-head">
                  <span className="p1-num p1-num-sm">{p.n}</span>
                  <span className="p1-icon-chip"><Icon name={p.icon} size={18} /></span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="p1-tools-row">
            <span className="p1-tools-label">Question content tools</span>
            <div className="p1-tools-grid">
              {CONTENT_TOOLS.map((t) => (
                <div className="p1-tool" key={t.title}>
                  <Icon name={t.icon} size={16} />
                  <div>
                    <strong>{t.title}</strong>
                    <span>{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="p1-section p1-section-alt" id="question-types">
        <div className="p1-container">
          <Reveal>
            <SectionHeading
              num="02"
              title="Eight formats, each graded the way it should be"
            />
          </Reveal>

          <Reveal className="p1-qtable" as="div">
            <div className="p1-qtable-head">
              <span>No.</span>
              <span>Type</span>
              <span>Description</span>
              <span>Grading</span>
            </div>
            {QUESTION_TYPES.map((q) => (
              <div className="p1-qtable-row" key={q.num}>
                <span className="p1-num p1-num-sm">{q.num}</span>
                <span className="p1-qtable-label">
                  <Icon name={q.icon} size={16} />
                  {q.label}
                </span>
                <span className="p1-qtable-desc">{q.desc}</span>
                <span className="p1-qtable-grading">{q.grading}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="p1-section" id="roles">
        <div className="p1-container">
          <Reveal>
            <SectionHeading
              num="03"
              title="A dedicated surface for every seat in the institution"
            />
          </Reveal>

          <div className="p1-roles">
            {ROLES.map((r, i) => (
              <Reveal className="p1-role" key={r.id} delay={i * 80}>
                <Frame src={r.src} alt={`${r.label} screen`} label={r.label.toLowerCase()} />
                <div className="p1-role-body">
                  <div className="p1-role-head">
                    <Icon name={r.icon} size={18} />
                    <h3>{r.label}</h3>
                  </div>
                  <p>{r.summary}</p>
                  <ul>
                    {r.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="p1-section p1-section-alt" id="security">
        <div className="p1-container">
          <Reveal>
            <SectionHeading
              num="04"
              eyebrow="Security"
              title="Exam integrity, enforced and logged"
            />
          </Reveal>

          <Reveal className="p1-security-banner">
            <Icon name={SECURITY_FEATURES[0].icon} size={26} />
            <div>
              <h3>{SECURITY_FEATURES[0].title}</h3>
              <p>{SECURITY_FEATURES[0].desc}</p>
            </div>
          </Reveal>

          <div className="p1-security-grid">
            {SECURITY_FEATURES.slice(1).map((f, i) => (
              <Reveal className="p1-security-card" key={f.title} delay={i * 60}>
                <Icon name={f.icon} size={22} />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="p1-signals">
            <span className="p1-tools-label">Violation signals tracked</span>
            <ol className="p1-signals-list">
              {SECURITY_SIGNALS.map((s, i) => (
                <li key={s}>
                  <span className="p1-num p1-num-sm">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="p1-section" id="ai-evaluation">
        <div className="p1-container">
          <Reveal>
            <SectionHeading
              num="05"
              title="Grading assistance faculty can verify, step by step"
            />
          </Reveal>

          <div className="p1-ai-steps">
            {AI_STEPS.map((s, i) => (
              <Reveal className="p1-ai-step" key={s.num} delay={i * 70}>
                <div className="p1-ai-step-num">
                  <span className="p1-num">{s.num}</span>
                  <Icon name={s.icon} size={18} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="p1-ai-bottom">
            <Reveal className="p1-ai-models">
              <span className="p1-tools-label">Supported model providers</span>
              <div className="p1-models-list">
                {AI_MODELS.map((m) => (
                  <div className="p1-model" key={m.name}>
                    <strong>{m.name}</strong>
                    <span>{m.sub}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="p1-ai-highlights">
              {AI_HIGHLIGHTS.map((h) => (
                <div className="p1-highlight" key={h.title}>
                  <Icon name={h.icon} size={18} />
                  <div>
                    <strong>{h.title}</strong>
                    <span>{h.desc}</span>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="p1-section p1-section-alt" id="deployment">
        <div className="p1-container">
          <Reveal>
            <SectionHeading
              num="06"
              title="Managed by us, or run on infrastructure you control"
            />
          </Reveal>

          <div className="p1-deploy-grid">
            {DEPLOY_MODES.map((d, i) => (
              <Reveal className="p1-deploy-card" key={d.id} delay={i * 90}>
                <div className="p1-deploy-head">
                  <Icon name={d.icon} size={20} />
                  <h3>{d.label}</h3>
                </div>
                <p className="p1-deploy-tagline">{d.tagline}</p>
                <p className="p1-deploy-sub">{d.sub}</p>
                <ul>
                  {d.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="p1-contact" id="contact">
        <div className="p1-container p1-contact-inner">
          <div className="p1-contact-copy">
            <p className="p1-eyebrow p1-eyebrow-light">{CTA.eyebrow}</p>
            <h2>{CTA.headline}</h2>
            <p className="p1-contact-sub">{CTA.sub}</p>
          </div>
          <div className="p1-contact-form-wrap">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="p1-footer">
        <div className="p1-container p1-footer-inner">
          <div className="p1-footer-brand">
            <a href="#top" className="p1-brand">
              <Mark />
              <span className="p1-wordmark">{BRAND.name}</span>
            </a>
            <p>{FOOTER.tagline}</p>
          </div>
          <div className="p1-footer-cols">
            {FOOTER.columns.map((c) => (
              <div className="p1-footer-col" key={c.title}>
                <span className="p1-tools-label">{c.title}</span>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="p1-container p1-footer-bottom">
          <span>© 2026 {BRAND.name}</span>
          <span>{BRAND.domain}</span>
        </div>
      </footer>
    </div>
  );
}
