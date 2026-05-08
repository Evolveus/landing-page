import { Icon } from '../_shared/Icon';
import { useScrollY, useReveal } from '../_shared/useParallax';
import './Design3.css';

const FEATURES = [
  { icon: 'code', title: 'Coding evaluation', desc: 'Real code execution against test cases. Sandboxed. Partial marks. Hidden cases.' },
  { icon: 'shieldCheck', title: 'Live proctoring', desc: 'Tab, fullscreen, copy-paste, kiosk, IP — every violation logged in real time.' },
  { icon: 'brain', title: 'AI grading', desc: 'Descriptive and fill-in-blank answers evaluated for synonyms and semantic match.' },
  { icon: 'database', title: 'Question banks', desc: 'Reusable, topic-organised, taxonomy-tagged. Bulk upload via spreadsheet.' },
  { icon: 'chart', title: 'Analytics', desc: 'Per-student, per-question, class-wide. Exportable for accreditation.' },
  { icon: 'users', title: 'Role-based access', desc: 'Admin, Manager, Faculty, Student — each with their own dashboard.' },
  { icon: 'building', title: 'Institution setup', desc: 'Departments, batches, semesters, courses, labs — managed centrally.' },
  { icon: 'refresh', title: 'Auto-save & resume', desc: 'Continuous answer sync. Network drops never lose progress.' },
  { icon: 'pin', title: 'Lab restriction', desc: 'IP/subnet enforcement keeps high-stakes exams campus-only.' },
];

const QTYPES = [
  { i: 'check', n: 'Single MCQ' },
  { i: 'check', n: 'Multiple MCQ' },
  { i: 'check', n: 'True / False' },
  { i: 'edit', n: 'Descriptive' },
  { i: 'edit', n: 'Fill-in-blank' },
  { i: 'layers', n: 'Match-the-following' },
  { i: 'upload', n: 'File upload' },
  { i: 'code', n: 'Coding' },
];

const LANGS = ['Python', 'Java', 'C++', 'JavaScript', 'C', 'Octave', 'Scala'];

const VIOLATIONS = [
  'Tab switching', 'Fullscreen exit', 'Copy / paste / cut', 'Right-click',
  'DevTools shortcuts', 'Print / save', 'Screenshot attempts', 'Window focus loss',
  'Suspicious resize', 'Kiosk validation', 'IP / subnet check', 'Restricted shortcuts',
];

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`d3-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HeroVisual() {
  const y = useScrollY();
  return (
    <div className="d3-hero-visual">
      <div
        className="d3-hv-card d3-hv-card-main"
        style={{ transform: `translateY(${y * -0.06}px)` }}
      >
        <div className="d3-hv-bar">
          <div className="d3-hv-dots"><span /><span /><span /></div>
          <span className="d3-hv-url">evolveus.in / faculty</span>
        </div>
        <img src="/staffDashboard.png" alt="Faculty dashboard" className="d3-hv-img" />
      </div>

      <div
        className="d3-hv-card d3-hv-card-float"
        style={{ transform: `translateY(${y * -0.14}px)` }}
      >
        <div className="d3-hv-float-head">
          <div className="d3-hv-float-icon"><Icon name="code" size={16} /></div>
          <div>
            <div className="d3-hv-float-title">Coding · Python</div>
            <div className="d3-hv-float-sub">CS301 · Binary Tree</div>
          </div>
          <div className="d3-hv-float-score">8.0<span>/10</span></div>
        </div>
        <div className="d3-hv-tcs">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`d3-hv-tc ${i === 4 ? 'fail' : 'pass'}`}>
              <Icon name={i === 4 ? 'alert' : 'check'} size={12} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="d3-hv-card d3-hv-card-stats"
        style={{ transform: `translateY(${y * -0.1}px)` }}
      >
        <div className="d3-hv-stat-icon"><Icon name="shieldCheck" size={18} /></div>
        <div>
          <div className="d3-hv-stat-n">100%</div>
          <div className="d3-hv-stat-l">violations logged</div>
        </div>
      </div>
    </div>
  );
}

export default function Design3({ onBrochure }) {
  const y = useScrollY();

  return (
    <div className="d3">
      <div className="d3-bg-shape d3-bg-shape-1" style={{ transform: `translateY(${y * 0.08}px)` }} />
      <div className="d3-bg-shape d3-bg-shape-2" style={{ transform: `translateY(${y * -0.05}px)` }} />

      {/* NAV */}
      <nav className="d3-nav">
        <div className="d3-nav-inner">
          <div className="d3-logo">
            <span className="d3-logo-mark">
              <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#0d3b4a" strokeWidth="2" />
                <path d="M10 16 L14 20 L22 12" stroke="#e07856" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="d3-logo-name">Evolveus</span>
          </div>
          <div className="d3-nav-links">
            <a href="#d3-features">Platform</a>
            <a href="#d3-coding">Coding</a>
            <a href="#d3-security">Security</a>
            <a href="#d3-analytics">Analytics</a>
          </div>
          <div className="d3-nav-right">
            <button className="d3-nav-ghost" onClick={onBrochure}>Brochure</button>
            <button className="d3-nav-cta">
              Book a demo <Icon name="arrowRight" size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="d3-hero">
        <div className="d3-hero-inner">
          <div className="d3-hero-text">
            <div className="d3-eyebrow">
              <span className="d3-eyebrow-dot" />
              Trusted by higher education institutions
            </div>
            <h1 className="d3-h1">
              Examinations,<br />
              <em>reimagined</em> for the<br />
              digital classroom.
            </h1>
            <p className="d3-lede">
              Evolveus is a complete digital assessment platform — coding evaluation,
              proctoring, AI-assisted grading, and analytics — built for daily use by
              faculty, semester managers, and administrators.
            </p>
            <div className="d3-hero-actions">
              <button className="d3-cta-primary">
                Book a demo <Icon name="arrowRight" size={15} />
              </button>
              <button className="d3-cta-text" onClick={onBrochure}>
                <Icon name="bookOpen" size={16} /> Read the brochure
              </button>
            </div>
          </div>
          <HeroVisual />
        </div>

        {/* trust strip */}
        <div className="d3-hero-strip">
          <div className="d3-hero-strip-inner">
            <div className="d3-strip-label">Battle-tested at scale</div>
            {[
              { n: '2,000+', l: 'Quizzes conducted' },
              { n: '200,000+', l: 'Responses scored' },
              { n: '8', l: 'Question types' },
              { n: '7', l: 'Languages supported' },
              { n: '100%', l: 'Auto-graded coverage' },
            ].map(s => (
              <div key={s.l} className="d3-strip-stat">
                <div className="d3-strip-n">{s.n}</div>
                <div className="d3-strip-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="d3-features" id="d3-features">
        <div className="d3-section-inner">
          <Reveal>
            <div className="d3-section-head">
              <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> The Platform</p>
              <h2 className="d3-h2">A single system for the<br />entire assessment lifecycle.</h2>
            </div>
          </Reveal>
          <div className="d3-feat-grid">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 50}>
                <article className="d3-feat-card">
                  <div className="d3-feat-icon">
                    <Icon name={f.icon} size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="d3-feat-title">{f.title}</h3>
                  <p className="d3-feat-desc">{f.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CODING SPOTLIGHT */}
      <section className="d3-coding" id="d3-coding">
        <div className="d3-section-inner">
          <div className="d3-coding-grid">
            <div>
              <Reveal>
                <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> Coding Assessment</p>
                <h2 className="d3-h2">
                  Code submitted.<br />
                  <em>Marks awarded</em> — instantly.
                </h2>
                <p className="d3-section-sub">
                  Faculty define visible and hidden test cases. Evolveus runs each
                  submission in a sandboxed container, verifies output, and awards
                  partial marks based on cases passed.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <div className="d3-coding-points">
                  {[
                    { i: 'cpu', t: 'Sandboxed execution', d: 'Isolated containers with time and memory limits' },
                    { i: 'eye', t: 'Hidden test cases', d: 'Catch edge conditions and hardcoded answers' },
                    { i: 'gauge', t: 'Partial marking', d: 'Proportional scoring — pass 4/5 → get 80%' },
                    { i: 'fileText', t: 'Driver & boilerplate code', d: 'Pre-fill function signatures and reference solutions' },
                  ].map(p => (
                    <div key={p.t} className="d3-coding-point">
                      <span className="d3-cp-icon"><Icon name={p.i} size={16} /></span>
                      <div>
                        <div className="d3-cp-t">{p.t}</div>
                        <div className="d3-cp-d">{p.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d3-langs">
                  <span className="d3-langs-label">Supported languages</span>
                  <div className="d3-langs-list">
                    {LANGS.map(l => <span key={l} className="d3-lang-chip">{l}</span>)}
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <div className="d3-result-card">
                <div className="d3-rc-head">
                  <div>
                    <div className="d3-rc-tag">SUBMISSION RESULT</div>
                    <div className="d3-rc-title">Binary Search Tree Validation</div>
                  </div>
                  <div className="d3-rc-lang"><Icon name="code" size={13} /> Python 3.11</div>
                </div>
                <div className="d3-rc-tests">
                  {[
                    { id: 'TC-01', s: 'pass', ms: '12ms', p: '2/2' },
                    { id: 'TC-02', s: 'pass', ms: '8ms', p: '2/2' },
                    { id: 'TC-03', s: 'pass', ms: '15ms', p: '2/2' },
                    { id: 'TC-04', s: 'fail', ms: '9ms', p: '0/2', m: 'expected [1,2,3], got [1,3,2]' },
                    { id: 'TC-05', s: 'pass', ms: '11ms', p: '2/2' },
                  ].map(t => (
                    <div key={t.id} className={`d3-rc-tc d3-rc-${t.s}`}>
                      <div className="d3-rc-tc-row">
                        <span className="d3-rc-tc-icon">
                          <Icon name={t.s === 'pass' ? 'check' : 'alert'} size={13} />
                        </span>
                        <span className="d3-rc-tc-id">{t.id}</span>
                        <span className="d3-rc-tc-ms">{t.ms}</span>
                        <span className="d3-rc-tc-pts">{t.p}</span>
                      </div>
                      {t.m && <div className="d3-rc-tc-msg">{t.m}</div>}
                    </div>
                  ))}
                </div>
                <div className="d3-rc-foot">
                  <div>
                    <div className="d3-rc-foot-label">Final score</div>
                    <div className="d3-rc-foot-bar">
                      <div className="d3-rc-foot-fill" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="d3-rc-foot-score">8.0<span>/10</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUESTION TYPES + SECURITY (split) */}
      <section className="d3-split">
        <div className="d3-section-inner">
          <div className="d3-split-grid">
            <Reveal>
              <div className="d3-split-card d3-split-types">
                <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> Question Formats</p>
                <h3 className="d3-h3">Eight types. Mix in any exam.</h3>
                <div className="d3-types-list">
                  {QTYPES.map((q, i) => (
                    <div key={q.n} className="d3-type-row">
                      <span className="d3-type-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="d3-type-icon"><Icon name={q.i} size={14} /></span>
                      <span className="d3-type-name">{q.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="d3-split-card d3-split-sec" id="d3-security">
                <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> Proctoring</p>
                <h3 className="d3-h3">Twelve violation signals.</h3>
                <p className="d3-split-sub">
                  Detected, timestamped, and surfaced in audit reports. Subnet-locked
                  exams enforce campus-only access.
                </p>
                <div className="d3-viol-grid">
                  {VIOLATIONS.map(v => (
                    <div key={v} className="d3-viol-tag">
                      <Icon name="check" size={11} className="d3-viol-tag-icon" />
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ANALYTICS / DASHBOARDS */}
      <section className="d3-analytics" id="d3-analytics">
        <div className="d3-section-inner">
          <Reveal>
            <div className="d3-section-head">
              <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> Dashboards</p>
              <h2 className="d3-h2">A view for every role.</h2>
              <p className="d3-section-sub">
                Administrators see institution-wide health. Faculty see their courses
                and quizzes. Students see only what's relevant. Every role gets the
                tools they need — nothing more.
              </p>
            </div>
          </Reveal>
          <div className="d3-roles-grid">
            {[
              {
                role: 'Administrator',
                icon: 'building',
                src: '/staffDashboard.png',
                items: [
                  'Total users · active users',
                  'Department, batch, semester health',
                  'Course summary',
                  'Audit logs and platform metrics',
                ],
              },
              {
                role: 'Faculty',
                icon: 'edit',
                src: '/bankQuestions.png',
                items: [
                  'Active, upcoming, completed quizzes',
                  'Question bank coverage',
                  'Student reach across courses',
                  'Quick navigation to creation tools',
                ],
              },
              {
                role: 'Student',
                icon: 'graduation',
                src: '/studentDashboard.png',
                items: [
                  'Live and upcoming quiz cards',
                  'Completed and missed tracking',
                  'Active courses',
                  'Distraction-free exam interface',
                ],
              },
            ].map((r, i) => (
              <Reveal key={r.role} delay={i * 100}>
                <article className="d3-role-card">
                  <div className="d3-role-img">
                    <img src={r.src} alt={`${r.role} dashboard`} />
                  </div>
                  <div className="d3-role-body">
                    <div className="d3-role-head">
                      <span className="d3-role-icon"><Icon name={r.icon} size={16} /></span>
                      <span className="d3-role-name">{r.role}</span>
                    </div>
                    <ul className="d3-role-list">
                      {r.items.map(it => (
                        <li key={it}>
                          <Icon name="check" size={12} className="d3-role-check" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT TOOLS */}
      <section className="d3-content">
        <div className="d3-section-inner">
          <div className="d3-content-grid">
            <Reveal>
              <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> Content & Quality</p>
              <h2 className="d3-h2">Built for academic depth.</h2>
              <p className="d3-section-sub">
                Rich content tools, taxonomy mapping, and bulk workflows reduce
                faculty effort while improving consistency across assessments.
              </p>
            </Reveal>
            <div className="d3-content-bullets">
              {[
                { i: 'edit', t: 'Rich-text editor', d: 'Bold, italic, lists, code blocks, quotes, horizontal rules' },
                { i: 'bookOpen', t: 'LaTeX support', d: 'Render mathematical and scientific notation in questions' },
                { i: 'upload', t: 'Image & file upload', d: 'Embed media; accept file submissions where permitted' },
                { i: 'tag', t: "Bloom's taxonomy", d: 'Tag every question — Remember through Create' },
                { i: 'flag', t: 'Course outcome mapping', d: 'CO1–CO8 alignment for accreditation reporting' },
                { i: 'database', t: 'Bulk MCQ upload', d: 'Spreadsheet-based creation with row-level validation' },
                { i: 'share', t: 'Bank sharing', d: 'Share question banks across faculty with controlled access' },
                { i: 'filter', t: 'Topic organization', d: 'Group questions by topic for filtered selection' },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 50}>
                  <div className="d3-content-bullet">
                    <span className="d3-cb-icon"><Icon name={c.i} size={16} /></span>
                    <div>
                      <div className="d3-cb-t">{c.t}</div>
                      <div className="d3-cb-d">{c.d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d3-cta">
        <div className="d3-cta-card">
          <Reveal>
            <p className="d3-eyebrow d3-eyebrow-coral"><span className="d3-eyebrow-dot" /> Get started</p>
            <h2 className="d3-cta-h">
              Schedule a demo for<br />
              <em>your institution.</em>
            </h2>
            <p className="d3-cta-sub">
              Our team will walk through coding evaluation, proctoring, analytics,
              and deployment options. Free, no commitment.
            </p>
            <div className="d3-cta-btns">
              <button className="d3-cta-primary d3-cta-lg">
                Book a demo <Icon name="arrowRight" size={15} />
              </button>
              <button className="d3-cta-text" onClick={onBrochure}>
                <Icon name="download" size={15} /> Download brochure
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="d3-footer">
        <div className="d3-footer-inner">
          <div className="d3-logo">
            <span className="d3-logo-mark">
              <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#0d3b4a" strokeWidth="2" />
                <path d="M10 16 L14 20 L22 12" stroke="#e07856" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="d3-logo-name">Evolveus</span>
          </div>
          <p className="d3-footer-copy">© 2026 Evolveus · Digital assessment for higher education</p>
        </div>
      </footer>
    </div>
  );
}
