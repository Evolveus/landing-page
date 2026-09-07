import { Icon } from '../_shared/Icon';
import { useReveal } from '../_shared/useParallax';
import { DesignSwitcher } from '../_shared/DesignSwitcher';
import { ContactForm } from '../_shared/ContactForm';
import {
  BRAND,
  SUMMARY,
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
import './Design7.css';

// ─── Small shared pieces, "Portworx" reference: cream surface, rounded
// pill nav, bold rounded headline, soft colour-block cards, alternating
// feature rows with a stat chip, dark "get started" band. ──────────────

function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <Tag
      ref={ref}
      className={`p7-reveal ${visible ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Mark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="7" fill="var(--p7-ink)" />
      <path d="M7 16V8l5 4 5-4v8" stroke="var(--p7-cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chip({ children, tone = 'line' }) {
  return <span className={`p7-chip p7-chip-${tone}`}>{children}</span>;
}

// Rounded "browser" frame used for real dashboard screenshots.
function ScreenFrame({ src, alt, path }) {
  return (
    <div className="p7-screen">
      <div className="p7-screen-bar">
        <span className="p7-screen-dots">
          <i /><i /><i />
        </span>
        <span className="p7-screen-path">{path}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

// Decorative stat panel standing in for the feature-row visual, built
// from a real STATS entry rather than a stock photo.
function StatPanel({ icon, stat }) {
  return (
    <div className="p7-statpanel">
      <div className="p7-statpanel-ring">
        <Icon name={icon} size={26} />
      </div>
      <div className="p7-statpanel-n">{stat.n}</div>
      <div className="p7-statpanel-l">{stat.l}</div>
    </div>
  );
}

function SpotlightCard({ icon, category, title, href }) {
  return (
    <a className="p7-spotlight" href={href}>
      <span className="p7-spotlight-icon">
        <Icon name={icon} size={18} />
      </span>
      <div>
        <div className="p7-spotlight-cat">{category}</div>
        <div className="p7-spotlight-title">{title}</div>
      </div>
      <span className="p7-spotlight-arrow">
        <Icon name="arrowRight" size={14} />
      </span>
    </a>
  );
}

export default function Design7({ active, onNavigate }) {
  return (
    <div className="p7">
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      {/* NAV */}
      <header className="p7-nav">
        <a href="#top" className="p7-brand">
          <Mark size={30} />
          <span>{BRAND.name}</span>
        </a>
        <nav className="p7-nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="p7-nav-cta">
          {HERO.primaryCta}
        </a>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="p7-hero">
          <div className="p7-hero-blob" aria-hidden="true" />
          <div className="p7-hero-grid">
            <div className="p7-hero-copy">
              <Chip tone="solid">{HERO.eyebrow}</Chip>
              <h1 className="p7-h1">{HERO.headline}</h1>
              <p className="p7-hero-sub">{HERO.sub}</p>
              <div className="p7-hero-actions">
                <a href="#contact" className="p7-btn p7-btn-solid">
                  {HERO.primaryCta}
                  <Icon name="arrowRight" size={15} />
                </a>
                <a href="#platform" className="p7-btn p7-btn-line">
                  {HERO.secondaryCta}
                </a>
              </div>
            </div>
            <div className="p7-hero-visual">
              <ScreenFrame src="/staffDashboard.png" alt="EvolveUs admin dashboard" path={`${BRAND.domain}/admin`} />
            </div>
          </div>

          {/* Spotlight strip, mirrors the reference site's three-card row under the hero */}
          <div className="p7-spotlights">
            <SpotlightCard icon="shieldCheck" category="Exam integrity" title="12 violation signals tracked live" href="#security" />
            <SpotlightCard icon="brain" category="Grading assistance" title="AI evaluation, faculty stays in the loop" href="#ai-evaluation" />
            <SpotlightCard icon="globe" category="Deployment" title="Managed cloud, or your own servers" href="#deployment" />
          </div>
        </section>

        {/* STAT BAR */}
        <section className="p7-statbar">
          {STATS.map((s) => (
            <div className="p7-statbar-item" key={s.l}>
              <span className="p7-statbar-n">{s.n}</span>
              <span className="p7-statbar-l">{s.l}</span>
            </div>
          ))}
        </section>

        {/* AI MODEL / ECOSYSTEM STRIP */}
        <section className="p7-ecosystem">
          <p className="p7-ecosystem-lede">
            Bring the AI provider your institution already trusts to grading, on your own key.
          </p>
          <div className="p7-ecosystem-row">
            {AI_MODELS.map((m) => (
              <div className="p7-ecosystem-chip" key={m.name}>
                <span className="p7-ecosystem-name">{m.name}</span>
                <span className="p7-ecosystem-sub">{m.sub}</span>
              </div>
            ))}
          </div>
          <a href="#deployment" className="p7-ecosystem-link">
            See deployment options <Icon name="arrowRight" size={13} />
          </a>
        </section>

        {/* PLATFORM PILLARS, alternating rows */}
        <section className="p7-section" id="platform">
          <div className="p7-section-head">
            <Chip>One data platform for every application</Chip>
            <h2 className="p7-h2">Six working parts, one platform</h2>
            <p className="p7-section-sub">
              Course setup, question banks, secure delivery, grading, and reporting run in the same
              system instead of being stitched together from separate tools.
            </p>
          </div>

          <div className="p7-pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 40} className={`p7-pillar-row ${i % 2 ? 'is-flip' : ''}`}>
                <div className="p7-pillar-copy">
                  <div className="p7-pillar-icon">
                    <Icon name={p.icon} size={20} />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <ul className="p7-check-list">
                    {p.bullets.map((b) => (
                      <li key={b}>
                        <Icon name="check" size={13} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <StatPanel icon={p.icon} stat={STATS[i % STATS.length]} />
              </Reveal>
            ))}
          </div>

          <Reveal className="p7-tools-strip">
            <div className="p7-tools-strip-head">
              <Icon name="edit" size={16} />
              <span>Content tooling, in every question editor</span>
            </div>
            <div className="p7-tools-strip-grid">
              {CONTENT_TOOLS.map((t) => (
                <div className="p7-tools-strip-item" key={t.title}>
                  <Icon name={t.icon} size={14} />
                  <div>
                    <strong>{t.title}</strong>
                    <span>{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* QUESTION TYPES */}
        <section className="p7-section" id="question-types">
          <div className="p7-section-head">
            <Chip>Every answer format</Chip>
            <h2 className="p7-h2">Eight question types, one grading engine</h2>
          </div>

          <div className="p7-qtype-grid">
            {QUESTION_TYPES.map((q, i) => (
              <Reveal key={q.num} delay={(i % 4) * 30} className="p7-qtype-card">
                <div className="p7-qtype-top">
                  <span className="p7-qtype-icon">
                    <Icon name={q.icon} size={16} />
                  </span>
                  <span className="p7-qtype-num">{q.num}</span>
                </div>
                <h4>{q.label}</h4>
                <p>{q.desc}</p>
                <Chip tone="soft">{q.grading}</Chip>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PLATFORM OVERVIEW / "report" style banner */}
        <section className="p7-report">
          <div className="p7-report-copy">
            <Chip tone="onDark">Platform overview</Chip>
            <h2 className="p7-h2 p7-onDark">The complete picture of your assessment workflow</h2>
            <p className="p7-onDark-p">{SUMMARY}</p>
            <a href="#roles" className="p7-btn p7-btn-cream">
              See it by role <Icon name="arrowRight" size={14} />
            </a>
          </div>
          <div className="p7-report-visual">
            <ScreenFrame src="/quizList.png" alt="EvolveUs quiz management view" path={`${BRAND.domain}/quizzes`} />
          </div>
        </section>

        {/* ROLES */}
        <section className="p7-section" id="roles">
          <div className="p7-section-head">
            <Chip>Who uses it</Chip>
            <h2 className="p7-h2">A different view for every role</h2>
          </div>

          <div className="p7-roles">
            {ROLES.map((r, i) => (
              <Reveal key={r.id} delay={i * 50} className={`p7-role-row ${i % 2 ? 'is-flip' : ''}`}>
                <div className="p7-role-copy">
                  <div className="p7-pillar-icon">
                    <Icon name={r.icon} size={20} />
                  </div>
                  <h3>{r.label}</h3>
                  <p>{r.summary}</p>
                  <ul className="p7-check-list">
                    {r.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={13} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <ScreenFrame src={r.src} alt={`${r.label} dashboard`} path={`${BRAND.domain}/${r.id}`} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECURITY */}
        <section className="p7-section" id="security">
          <div className="p7-section-head">
            <Chip>Exam integrity</Chip>
            <h2 className="p7-h2">Twelve signals, tracked in real time</h2>
          </div>

          <div className="p7-security-grid">
            {SECURITY_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 40} className="p7-security-card">
                <div className="p7-pillar-icon p7-pillar-icon-sm">
                  <Icon name={f.icon} size={17} />
                </div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="p7-signals">
            <div className="p7-signals-head">
              <Icon name="alert" size={16} />
              <span>Violation signals tracked during every exam</span>
            </div>
            <div className="p7-signals-grid">
              {SECURITY_SIGNALS.map((s, i) => (
                <div className="p7-signal-chip" key={s}>
                  <span className="p7-signal-num">{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* AI EVALUATION */}
        <section className="p7-section p7-section-dark" id="ai-evaluation">
          <div className="p7-section-head">
            <Chip tone="onDark">Grading assistance</Chip>
            <h2 className="p7-h2 p7-onDark">Faculty stays in the loop</h2>
          </div>

          <div className="p7-ai-steps">
            {AI_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 50} className="p7-ai-step">
                <span className="p7-ai-num">{s.num}</span>
                <div className="p7-pillar-icon p7-pillar-icon-onDark">
                  <Icon name={s.icon} size={18} />
                </div>
                <h4>{s.title}</h4>
                <p className="p7-onDark-p">{s.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="p7-ai-bottom">
            <div className="p7-ai-highlights">
              {AI_HIGHLIGHTS.map((h) => (
                <div className="p7-ai-highlight" key={h.title}>
                  <Icon name={h.icon} size={17} />
                  <div>
                    <strong>{h.title}</strong>
                    <span>{h.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPLOYMENT */}
        <section className="p7-section" id="deployment">
          <div className="p7-section-head">
            <Chip>How it ships</Chip>
            <h2 className="p7-h2">Managed, or on your own servers</h2>
          </div>

          <div className="p7-deploy-grid">
            {DEPLOY_MODES.map((d) => (
              <Reveal key={d.id} className="p7-deploy-card">
                <div className="p7-pillar-icon">
                  <Icon name={d.icon} size={20} />
                </div>
                <h3>{d.label}</h3>
                <p className="p7-deploy-tagline">{d.tagline}</p>
                <p>{d.sub}</p>
                <ul className="p7-check-list">
                  {d.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={13} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* RESOURCES */}
        <section className="p7-section" id="resources">
          <div className="p7-section-head">
            <Chip>Check out the details</Chip>
            <h2 className="p7-h2">Explore the platform further</h2>
          </div>
          <div className="p7-resources-grid">
            <SpotlightCard icon="lock" category="Security" href="#security" title="Your keys, your data. Nothing stored beyond the evaluation call." />
            <SpotlightCard icon="refresh" category="AI evaluation" href="#ai-evaluation" title="Manual override, always. Faculty confirms every score." />
            <SpotlightCard icon="building" category="Deployment" href="#deployment" title="Data residency options for managed cloud and self-hosted." />
          </div>
        </section>

        {/* CTA */}
        <section className="p7-cta" id="contact">
          <div className="p7-cta-inner">
            <div className="p7-cta-copy">
              <Chip tone="onDark">{CTA.eyebrow}</Chip>
              <h2 className="p7-h1 p7-onDark">{CTA.headline}</h2>
              <p className="p7-onDark-p p7-cta-sub">{CTA.sub}</p>
            </div>
            <div className="p7-cta-visual">
              <ScreenFrame src="/studentDashboard.png" alt="EvolveUs student dashboard" path={`${BRAND.domain}/student`} />
            </div>
          </div>
          <div className="p7-contact-card">
            <ContactForm submitLabel="Send request" />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="p7-footer">
        <div className="p7-footer-top">
          <div className="p7-footer-brand">
            <Mark size={26} />
            <span>{BRAND.name}</span>
          </div>
          <p className="p7-onDark-p">{FOOTER.tagline}</p>
        </div>
        <div className="p7-footer-cols">
          {FOOTER.columns.map((col) => (
            <div className="p7-footer-col" key={col.title}>
              <div className="p7-footer-col-title">{col.title}</div>
              {col.links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="p7-footer-bottom">
          <span>{BRAND.domain}</span>
          <span>&copy; 2026 {BRAND.name}</span>
        </div>
      </footer>
    </div>
  );
}
