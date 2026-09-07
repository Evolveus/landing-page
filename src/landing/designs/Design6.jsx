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
import './Design6.css';

// ─── Small shared pieces ───────────────────────────────────────

function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <Tag
      ref={ref}
      className={`p6-reveal ${visible ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// Signature corner-bracket frame used throughout the reference design.
function Frame({ children, className = '', dark = false }) {
  return (
    <div className={`p6-frame ${dark ? 'p6-frame-dark' : ''} ${className}`}>
      <span className="p6-corner p6-corner-tl" aria-hidden="true" />
      <span className="p6-corner p6-corner-tr" aria-hidden="true" />
      <span className="p6-corner p6-corner-bl" aria-hidden="true" />
      <span className="p6-corner p6-corner-br" aria-hidden="true" />
      {children}
    </div>
  );
}

function Eyebrow({ index, label }) {
  return (
    <div className="p6-eyebrow">
      {index && <span className="p6-eyebrow-idx">{index}</span>}
      {index && <span className="p6-eyebrow-dot" aria-hidden="true" />}
      <span>{label}</span>
    </div>
  );
}

function BrowserPanel({ src, alt, path }) {
  return (
    <Frame className="p6-browser" dark>
      <div className="p6-browser-bar">
        <span className="p6-browser-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="p6-browser-path">{path}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </Frame>
  );
}

// Small connected-node brand mark echoing the hero's data-graph motif.
function Mark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="2.6" fill="currentColor" />
      <circle cx="4" cy="6" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="24" cy="6" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="4" cy="22" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="24" cy="22" r="1.6" fill="currentColor" opacity="0.85" />
      <path
        d="M14 14L4 6M14 14L24 6M14 14L4 22M14 14L24 22"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
    </svg>
  );
}

// Radial burst of nodes, one per pillar / question type, echoing the
// reference site's network-diagram hero visual. Built from real content
// counts, not decorative filler.
function HeroBurst() {
  const nodeCount = PILLARS.length + QUESTION_TYPES.length; // 14
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2;
    const r = 60 + ((i * 37) % 70);
    const size = 3.5 + ((i * 13) % 5);
    const tone = i % 3;
    return {
      x: 150 + Math.cos(angle) * r,
      y: 150 + Math.sin(angle) * r,
      size,
      tone,
    };
  });
  return (
    <svg className="p6-burst" viewBox="0 0 300 300" aria-hidden="true">
      {nodes.map((n, i) => (
        <line key={`l${i}`} x1="150" y1="150" x2={n.x} y2={n.y} className="p6-burst-line" />
      ))}
      <circle cx="150" cy="150" r="7" className="p6-burst-core" />
      {nodes.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={n.size}
          className={`p6-burst-node p6-burst-node-${n.tone}`}
        />
      ))}
    </svg>
  );
}

// ─── Page ───────────────────────────────────────────────────────

export default function Design6({ active, onNavigate }) {
  return (
    <div className="p6">
      <DesignSwitcher active={active} onNavigate={onNavigate} />

      {/* NAV: three floating pill groups */}
      <header className="p6-nav">
        <nav className="p6-pill p6-pill-links">
          {NAV_LINKS.slice(0, 3).map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="p6-pill p6-pill-brand">
          <Mark size={16} />
          <span>{BRAND.name}</span>
        </a>
        <div className="p6-pill p6-pill-actions">
          {NAV_LINKS.slice(3).map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="p6-nav-cta">
            Request a demo
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="p6-hero">
          <div className="p6-hero-grid">
            <div>
              <Eyebrow label={HERO.eyebrow} />
              <h1 className="p6-h1">
                Run exams your institution can <em>stand behind</em>.
              </h1>
              <p className="p6-hero-sub">{HERO.sub}</p>
              <div className="p6-hero-actions">
                <a href="#contact" className="p6-btn p6-btn-solid">
                  {HERO.primaryCta}
                </a>
                <a href="#platform" className="p6-btn p6-btn-line">
                  {HERO.secondaryCta}
                </a>
              </div>
            </div>
            <div className="p6-hero-visual">
              <HeroBurst />
            </div>
          </div>

          <Frame className="p6-stats">
            {STATS.map((s) => (
              <div className="p6-stat" key={s.l}>
                <div className="p6-stat-n">{s.n}</div>
                <div className="p6-stat-l">{s.l}</div>
              </div>
            ))}
          </Frame>
        </section>

        {/* SUMMARY ESSAY STRIP */}
        <section className="p6-essay">
          <div className="p6-essay-rail">
            <span className="p6-essay-rule" />
            <span className="p6-essay-tick">SCOPE</span>
          </div>
          <p className="p6-essay-p">
            <span className="p6-drop">E</span>
            {SUMMARY.slice(1)}
          </p>
        </section>

        {/* 01, PLATFORM */}
        <section className="p6-section" id="platform">
          <div className="p6-section-head">
            <Eyebrow index="01" label="Where it fits" />
            <h2 className="p6-h2">
              One platform,
              <br />
              six working parts.
            </h2>
          </div>

          <div className="p6-platform-grid">
            <Frame dark className="p6-platform-intro">
              <div className="p6-eyebrow p6-eyebrow-onDark">The idea</div>
              <h3 className="p6-h3-onDark">
                Every part of the exam lifecycle,
                <br />
                one system.
              </h3>
              <p className="p6-onDark-p">
                Question banks, secure delivery, evaluation, and reporting live in the
                same platform instead of being stitched together from separate tools.
              </p>
            </Frame>

            <div className="p6-platform-stack">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 40}>
                  <Frame className="p6-pillar-row">
                    <div className="p6-pillar-num">{p.n}</div>
                    <div className="p6-pillar-body">
                      <div className="p6-pillar-head">
                        <Icon name={p.icon} size={16} />
                        <h4>{p.title}</h4>
                      </div>
                      <p>{p.body}</p>
                      <ul className="p6-taglist">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </Frame>
                </Reveal>
              ))}

              <Frame className="p6-pillar-row p6-tools-row">
                <div className="p6-pillar-num">+</div>
                <div className="p6-pillar-body">
                  <div className="p6-pillar-head">
                    <h4>Content tooling</h4>
                  </div>
                  <div className="p6-tools-grid">
                    {CONTENT_TOOLS.map((t) => (
                      <div className="p6-tool" key={t.title}>
                        <Icon name={t.icon} size={14} />
                        <span>{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </section>

        {/* 02, QUESTION TYPES */}
        <section className="p6-section" id="question-types">
          <div className="p6-section-head">
            <Eyebrow index="02" label="Every answer format" />
            <h2 className="p6-h2">
              Eight question types,
              <br />
              one grading engine.
            </h2>
          </div>

          <Frame className="p6-table-frame">
            <div className="p6-table">
              <div className="p6-table-row p6-table-head">
                <span>No.</span>
                <span>Type</span>
                <span>Description</span>
                <span>Grading</span>
              </div>
              {QUESTION_TYPES.map((q) => (
                <div className="p6-table-row" key={q.num}>
                  <span className="p6-mono">{q.num}</span>
                  <span className="p6-table-label">
                    <Icon name={q.icon} size={14} />
                    {q.label}
                  </span>
                  <span className="p6-table-desc">{q.desc}</span>
                  <span className="p6-mono p6-table-grading">{q.grading}</span>
                </div>
              ))}
            </div>
          </Frame>
        </section>

        {/* 03, ROLES (dark) */}
        <section className="p6-section p6-section-dark" id="roles">
          <div className="p6-section-head">
            <Eyebrow index="03" label="Who uses it" />
            <h2 className="p6-h2 p6-h2-onDark">
              A different view
              <br />
              for every role.
            </h2>
          </div>

          <div className="p6-roles">
            {ROLES.map((r, i) => (
              <Reveal key={r.id} delay={i * 60} className="p6-role">
                <Frame dark className="p6-role-frame">
                  <div className="p6-role-head">
                    <Icon name={r.icon} size={16} />
                    <h3>{r.label}</h3>
                  </div>
                  <p className="p6-onDark-p">{r.summary}</p>
                  <ul className="p6-taglist p6-taglist-onDark">
                    {r.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Frame>
                <BrowserPanel
                  src={r.src}
                  alt={`${r.label} dashboard`}
                  path={`evolveus.in/${r.id}`}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* 04, SECURITY */}
        <section className="p6-section" id="security">
          <div className="p6-section-head">
            <Eyebrow index="04" label="Exam integrity" />
            <h2 className="p6-h2">
              Twelve signals,
              <br />
              tracked in real time.
            </h2>
          </div>

          <div className="p6-security-grid">
            {SECURITY_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 40}>
                <Frame className="p6-security-card">
                  <Icon name={f.icon} size={18} />
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </Frame>
              </Reveal>
            ))}
          </div>

          <Frame dark className="p6-clauses">
            <div className="p6-eyebrow p6-eyebrow-onDark">Violation signals</div>
            <ol className="p6-clause-list">
              {SECURITY_SIGNALS.map((s, i) => (
                <li key={s}>
                  <span className="p6-mono p6-clause-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Frame>
        </section>

        {/* 05, AI EVALUATION (dark) */}
        <section className="p6-section p6-section-dark" id="ai-evaluation">
          <div className="p6-section-head">
            <Eyebrow index="05" label="Grading assistance" />
            <h2 className="p6-h2 p6-h2-onDark">
              Faculty stays
              <br />
              in the loop.
            </h2>
          </div>

          <div className="p6-ai-steps">
            {AI_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 50} className="p6-ai-step">
                <div className="p6-mono p6-ai-num">{s.num}</div>
                <Icon name={s.icon} size={18} />
                <h4>{s.title}</h4>
                <p className="p6-onDark-p">{s.desc}</p>
                {i < AI_STEPS.length - 1 && <span className="p6-ai-connector" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>

          <div className="p6-ai-bottom">
            <Frame dark className="p6-models">
              <div className="p6-eyebrow p6-eyebrow-onDark">Bring your own model</div>
              <div className="p6-model-list">
                {AI_MODELS.map((m) => (
                  <div className="p6-model" key={m.name}>
                    <span className="p6-model-name">{m.name}</span>
                    <span className="p6-model-sub p6-mono">{m.sub}</span>
                  </div>
                ))}
              </div>
            </Frame>
            <div className="p6-highlights">
              {AI_HIGHLIGHTS.map((h) => (
                <div className="p6-highlight" key={h.title}>
                  <Icon name={h.icon} size={16} />
                  <div>
                    <h4 className="p6-onDark-h">{h.title}</h4>
                    <p className="p6-onDark-p">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06, DEPLOYMENT */}
        <section className="p6-section" id="deployment">
          <div className="p6-section-head">
            <Eyebrow index="06" label="How it ships" />
            <h2 className="p6-h2">
              Managed, or
              <br />
              on your own servers.
            </h2>
          </div>

          <div className="p6-deploy-grid">
            {DEPLOY_MODES.map((d) => (
              <Frame className="p6-deploy-card" key={d.id}>
                <div className="p6-pillar-head">
                  <Icon name={d.icon} size={18} />
                  <h3>{d.label}</h3>
                </div>
                <p className="p6-deploy-tagline">{d.tagline}</p>
                <p>{d.sub}</p>
                <ul className="p6-taglist">
                  {d.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Frame>
            ))}
          </div>
        </section>

        {/* CTA + CONTACT (dark) */}
        <section className="p6-section p6-section-dark p6-cta" id="contact">
          <div className="p6-cta-head">
            <Eyebrow index={null} label={CTA.eyebrow} />
            <h2 className="p6-h1 p6-h2-onDark">
              Ready to bring <em>rigour</em>
              <br />
              to your assessments?
            </h2>
            <p className="p6-onDark-p p6-cta-sub">{CTA.sub}</p>
          </div>
          <Frame dark className="p6-contact-frame">
            <ContactForm submitLabel="Send request" />
          </Frame>
        </section>
      </main>

      {/* FOOTER (dark) */}
      <footer className="p6-footer">
        <div className="p6-footer-top">
          <div className="p6-footer-brand">
            <Mark size={22} />
            <span>{BRAND.name}</span>
          </div>
          <p className="p6-onDark-p">{FOOTER.tagline}</p>
        </div>
        <div className="p6-footer-cols">
          {FOOTER.columns.map((col) => (
            <div className="p6-footer-col" key={col.title}>
              <div className="p6-eyebrow p6-eyebrow-onDark">{col.title}</div>
              {col.links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="p6-footer-bottom">
          <span className="p6-mono">{BRAND.domain}</span>
          <span className="p6-mono">&copy; 2026 {BRAND.name}</span>
        </div>
      </footer>
    </div>
  );
}
