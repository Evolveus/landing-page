import { Icon } from '../_shared/Icon';
import { useScrollY, useReveal } from '../_shared/useParallax';
import './Design2.css';

const FEATURES = [
  {
    num: '01',
    icon: 'code',
    title: 'Coding Assessment',
    desc: 'Full in-browser code execution against visible and hidden test cases. Partial marking calculated automatically. Supports Java, Python, C++, JavaScript, C, Octave, and Scala.',
  },
  {
    num: '02',
    icon: 'brain',
    title: 'AI-Assisted Evaluation',
    desc: 'Open-ended descriptive answers and fill-in-the-blank questions scored with AI assistance. Faculty supply marking criteria for nuanced, consistent grading at scale.',
  },
  {
    num: '03',
    icon: 'shieldCheck',
    title: 'Proctoring & Integrity',
    desc: 'Twelve violation signals — tab switching, fullscreen exit, copy-paste, kiosk validation — detected, logged, and surfaced in audit reports. Subnet locks for lab-only access.',
  },
  {
    num: '04',
    icon: 'database',
    title: 'Reusable Question Banks',
    desc: 'Build banks once; reuse across semesters. Organise by topic; tag with Bloom\'s taxonomy and course outcomes. Bulk upload via spreadsheet templates.',
  },
  {
    num: '05',
    icon: 'chart',
    title: 'Analytics & Reporting',
    desc: 'Per-student and per-question performance breakdowns, class-wide gap analysis, and exportable reports ready for accreditation and administrative review.',
  },
  {
    num: '06',
    icon: 'users',
    title: 'Role-Based Access',
    desc: 'Separate dashboards and permissions for Administrators, Semester Managers, Faculty, and Students. Row-level security ensures tenant data separation.',
  },
  {
    num: '07',
    icon: 'building',
    title: 'Institution Management',
    desc: 'Departments, batches, semesters, courses, instructors, students, and labs — managed centrally. Bulk-create users and courses via spreadsheet.',
  },
  {
    num: '08',
    icon: 'edit',
    title: 'Rich Content Tools',
    desc: 'Rich-text editor, LaTeX support, image embedding, file uploads. Built for academic depth with formatting tools faculty actually need.',
  },
];

const STATS = [
  { n: '2,000+', l: 'Quizzes conducted' },
  { n: '200,000+', l: 'Student responses scored' },
  { n: '8', l: 'Question formats' },
  { n: '7', l: 'Programming languages' },
];

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`d2-reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Design2({ onBrochure }) {
  const y = useScrollY();
  return (
    <div className="d2">
      <div className="d2-deco d2-deco-1" style={{ transform: `translateY(${y * 0.2}px)` }} />
      <div className="d2-deco d2-deco-2" style={{ transform: `translateY(${y * -0.12}px)` }} />

      {/* NAV */}
      <nav className="d2-nav">
        <div className="d2-nav-inner">
          <div className="d2-logo">
            <span className="d2-logo-mark">
              <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#1a2744" strokeWidth="1.4" />
                <path d="M16 6 L16 26 M6 16 L26 16" stroke="#c9a227" strokeWidth="1.4" />
                <circle cx="16" cy="16" r="4" fill="#c9a227" />
              </svg>
            </span>
            <span className="d2-logo-text">
              <span className="d2-logo-e">E</span>
              <span className="d2-logo-rest">volveus</span>
            </span>
          </div>
          <div className="d2-nav-links">
            <a href="#d2-platform">Platform</a>
            <a href="#d2-coding">Coding</a>
            <a href="#d2-roles">Roles</a>
          </div>
          <div className="d2-nav-right">
            <button className="d2-nav-ghost" onClick={onBrochure}>Brochure</button>
            <button className="d2-nav-cta">
              Schedule Demo <Icon name="arrowRight" size={13} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="d2-hero">
        <div className="d2-hero-inner">
          <p className="d2-hero-kicker">Digital assessment for higher education</p>
          <h1 className="d2-h1">
            Where rigorous<br />
            <em>examination</em> meets<br />
            modern intelligence.
          </h1>
          <div className="d2-hero-rule" />
          <p className="d2-hero-sub">
            Evolveus is a complete assessment management system — from question banks
            and coding evaluations to secure proctoring, AI-assisted grading, and
            accreditation-ready analytics. Built for the daily demands of academic
            institutions.
          </p>
          <div className="d2-hero-btns">
            <button className="d2-btn-primary">
              Request a Demonstration <Icon name="arrowRight" size={14} />
            </button>
            <button className="d2-btn-text" onClick={onBrochure}>
              <Icon name="bookOpen" size={14} /> Read the Brochure
            </button>
          </div>
        </div>

        <div className="d2-stats-strip">
          {STATS.map(s => (
            <Reveal key={s.l}>
              <div className="d2-stat">
                <span className="d2-stat-n">{s.n}</span>
                <span className="d2-stat-l">{s.l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CODING SPOTLIGHT */}
      <section className="d2-coding" id="d2-coding">
        <div className="d2-coding-inner">
          <Reveal>
            <div className="d2-coding-label"><span /> FEATURED CAPABILITY</div>
          </Reveal>
          <div className="d2-coding-grid">
            <Reveal>
              <div className="d2-coding-left">
                <h2 className="d2-h2">
                  Code is submitted.<br />
                  <em>Marks awarded</em> automatically.
                </h2>
                <p className="d2-coding-body">
                  Evolveus executes student-submitted code against structured test cases
                  in a sandboxed environment. Faculty configure visible examples and
                  hidden edge cases — the platform handles compilation, execution,
                  comparison, and scoring.
                </p>
                <p className="d2-coding-body">
                  Partial marking distributes credit proportionally across passed test
                  cases. A student who solves four of five cases receives four-fifths of
                  the total mark — fairly and without manual intervention.
                </p>
                <div className="d2-coding-langs">
                  <span className="d2-coding-langs-label">Languages —</span>
                  <div className="d2-coding-langs-list">
                    {['Java', 'Python', 'C++', 'JavaScript', 'C', 'Octave', 'Scala'].map(l => (
                      <span key={l} className="d2-lang-chip">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="d2-coding-right">
                <div className="d2-pull-quote">
                  <div className="d2-pq-mark">"</div>
                  <p className="d2-pq-text">
                    Faculty design the problems. Evolveus runs every submission —
                    instantly, consistently, and without bias.
                  </p>
                </div>
                <div className="d2-coding-steps">
                  {[
                    { i: 'edit', t: 'Write', d: 'Student codes in the browser editor with syntax support and boilerplate scaffolding' },
                    { i: 'cpu', t: 'Execute', d: 'Submission runs in an isolated container with time and memory limits enforced' },
                    { i: 'eye', t: 'Evaluate', d: 'Each test case is checked; hidden cases catch edge conditions and hardcoded answers' },
                    { i: 'award', t: 'Award', d: 'Partial marks calculated by ratio of passed cases — no rounding, no ambiguity' },
                  ].map((s, i) => (
                    <div key={s.t} className="d2-step">
                      <span className="d2-step-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="d2-step-icon"><Icon name={s.i} size={14} /></span>
                      <div>
                        <span className="d2-step-title">{s.t}.</span>
                        <span className="d2-step-desc"> {s.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="d2-platform" id="d2-platform">
        <div className="d2-platform-inner">
          <Reveal>
            <div className="d2-platform-header">
              <p className="d2-section-kicker">THE PLATFORM</p>
              <h2 className="d2-h2-center">
                Every tool an institution needs,<br />
                <em>in one place.</em>
              </h2>
            </div>
          </Reveal>
          <div className="d2-feat-list">
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={i * 60}>
                <div className="d2-feat-item">
                  <span className="d2-feat-num">{f.num}</span>
                  <div className="d2-feat-body">
                    <div className="d2-feat-title-row">
                      <span className="d2-feat-icon"><Icon name={f.icon} size={18} /></span>
                      <h3 className="d2-feat-title">{f.title}</h3>
                    </div>
                    <p className="d2-feat-desc">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTION TYPES + EVALUATION */}
      <section className="d2-evaluation">
        <div className="d2-section-inner">
          <div className="d2-eval-grid">
            <Reveal>
              <div className="d2-eval-col">
                <p className="d2-section-kicker">QUESTION FORMATS</p>
                <h3 className="d2-h3">Eight types. One platform.</h3>
                <ol className="d2-q-types">
                  {[
                    'Single-correct multiple choice',
                    'Multiple-correct multiple choice',
                    'True or false',
                    'Descriptive (long-form)',
                    'Fill-in-the-blank',
                    'Match-the-following',
                    'File upload',
                    'Coding (test-case executed)',
                  ].map((q, i) => (
                    <li key={q}>
                      <span className="d2-q-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="d2-q-name">{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="d2-eval-col">
                <p className="d2-section-kicker">EVALUATION CONTROLS</p>
                <h3 className="d2-h3">Rigorous. Configurable.</h3>
                <div className="d2-eval-list">
                  {[
                    { t: 'MCQ partial marking', d: 'Configurable per quiz — full or proportional credit' },
                    { t: 'Negative marking', d: 'Fixed value or percentage; global or per-question' },
                    { t: 'Coding partial marks', d: 'Test-case ratio multiplied by maximum marks' },
                    { t: 'AI fill-in-blank', d: 'Synonym and semantic equivalence accepted' },
                    { t: 'AI descriptive grading', d: 'Faculty supply criteria; AI scores with consistency' },
                    { t: 'Manual override', d: 'Faculty can adjust any score post-evaluation' },
                  ].map(e => (
                    <div key={e.t} className="d2-eval-row">
                      <Icon name="checkCircle" size={16} className="d2-eval-check" />
                      <div>
                        <strong>{e.t}.</strong> {e.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="d2-security">
        <div className="d2-section-inner">
          <Reveal>
            <div className="d2-platform-header">
              <p className="d2-section-kicker">EXAM INTEGRITY</p>
              <h2 className="d2-h2-center">
                Every violation,<br /><em>on record.</em>
              </h2>
            </div>
          </Reveal>
          <div className="d2-sec-grid">
            <Reveal>
              <div>
                <h4 className="d2-sec-h">Detection signals</h4>
                <ul className="d2-sec-list">
                  {[
                    'Tab switching', 'Window focus loss', 'Fullscreen exit',
                    'Suspicious resize', 'Copy / paste / cut', 'Right-click',
                    'DevTools shortcuts', 'Print / save', 'Screenshot attempts',
                    'Restricted shortcuts', 'Kiosk validation', 'IP outside subnet',
                  ].map(s => (
                    <li key={s}>
                      <Icon name="check" size={12} className="d2-sec-check" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <h4 className="d2-sec-h">Enforcement controls</h4>
                <div className="d2-enf">
                  {[
                    { i: 'monitor', t: 'Fullscreen Required' },
                    { i: 'lock', t: 'Kiosk Mode' },
                    { i: 'pin', t: 'Lab / Subnet Lock' },
                    { i: 'key', t: 'Password Gate' },
                    { i: 'refresh', t: 'Continuous Sync' },
                    { i: 'rss', t: 'Audit Logs' },
                  ].map(e => (
                    <div key={e.t} className="d2-enf-pill">
                      <Icon name={e.i} size={14} /> {e.t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="d2-roles" id="d2-roles">
        <div className="d2-roles-inner">
          <Reveal>
            <p className="d2-section-kicker">DESIGNED FOR EVERYONE</p>
            <h2 className="d2-h2-center">One platform. Four roles.</h2>
          </Reveal>
          <div className="d2-roles-grid">
            {[
              {
                role: 'Administrator',
                color: '#8b1a1a',
                icon: 'building',
                desc: 'Manages departments, batches, semesters, users, and labs from a single superuser interface. Full audit trail included.',
              },
              {
                role: 'Semester Manager',
                color: '#c9a227',
                icon: 'flag',
                desc: 'Oversees courses and assessments within their semester. Manages instructors, creates quizzes, and reviews analytics.',
              },
              {
                role: 'Faculty',
                color: '#1a3a5c',
                icon: 'edit',
                desc: 'Builds question banks, creates exams, configures coding test cases, and reviews student results.',
              },
              {
                role: 'Student',
                color: '#2d6a4f',
                icon: 'graduation',
                desc: 'Distraction-free exam interface with real-time timer, auto-save, and continuous answer sync.',
              },
            ].map((r, i) => (
              <Reveal key={r.role} delay={i * 80}>
                <div className="d2-role-card" style={{ borderTopColor: r.color }}>
                  <div className="d2-role-icon" style={{ color: r.color, background: r.color + '12' }}>
                    <Icon name={r.icon} size={18} />
                  </div>
                  <h3 className="d2-role-title" style={{ color: r.color }}>{r.role}</h3>
                  <p className="d2-role-desc">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d2-cta">
        <div className="d2-cta-inner">
          <Reveal>
            <div className="d2-cta-ornament">✦</div>
            <h2 className="d2-cta-h">
              Bring rigour and reliability<br />
              to your assessments.
            </h2>
            <p className="d2-cta-sub">
              Evolveus is ready for institutional deployment on your own infrastructure.
            </p>
            <div className="d2-cta-btns">
              <button className="d2-btn-primary">
                Request a Demonstration <Icon name="arrowRight" size={14} />
              </button>
              <button className="d2-btn-text" onClick={onBrochure}>
                <Icon name="download" size={14} /> Download Brochure
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="d2-footer">
        <div className="d2-footer-inner">
          <div className="d2-logo">
            <span className="d2-logo-text">
              <span className="d2-logo-e">E</span>
              <span className="d2-logo-rest">volveus</span>
            </span>
          </div>
          <p className="d2-footer-copy">© 2026 Evolveus · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
