import { useEffect, useState } from 'react';
import { Icon } from '../_shared/Icon';
import { useScrollY, useReveal } from '../_shared/useParallax';
import './Design1.css';

const STATS = [
  { n: '2,000+', l: 'Quizzes conducted' },
  { n: '200,000+', l: 'Responses scored' },
  { n: '7', l: 'Languages supported' },
  { n: '8', l: 'Question formats' },
];

const PILLARS = [
  {
    icon: 'code',
    title: 'Coding Assessment',
    desc: 'Sandboxed code execution. Visible & hidden test cases. Partial marking. Time and memory limits.',
  },
  {
    icon: 'shieldCheck',
    title: 'Proctoring & Integrity',
    desc: 'Tab-switch, fullscreen-exit, copy-paste, kiosk enforcement, and IP/subnet locks — all logged.',
  },
  {
    icon: 'chart',
    title: 'Analytics & Reporting',
    desc: 'Per-student, per-question, and class-wide breakdowns. Exportable for accreditation.',
  },
  {
    icon: 'users',
    title: 'Role-Based Access',
    desc: 'Admin, Manager, Faculty, Student — separate dashboards with row-level security.',
  },
  {
    icon: 'database',
    title: 'Question Banks',
    desc: 'Reusable banks tagged by topic, Bloom\'s taxonomy, and course outcomes (CO1–CO8).',
  },
  {
    icon: 'building',
    title: 'Institution Setup',
    desc: 'Departments, batches, semesters, courses, labs, and instructors — managed centrally.',
  },
  {
    icon: 'brain',
    title: 'AI-Enhanced Grading',
    desc: 'Descriptive answers and fill-in-the-blank evaluated with synonym + semantic matching.',
  },
  {
    icon: 'refresh',
    title: 'Continuous Auto-Save',
    desc: 'Answers sync to server in real time. Network drops or refreshes never lose progress.',
  },
];

const WORKFLOW = [
  {
    id: 'admin',
    label: 'Academic setup',
    icon: 'building',
    title: 'Institution administration that matches campus structure.',
    desc: 'Departments, semesters, batches, courses, instructors, students, and labs are managed centrally instead of scattered across spreadsheets.',
    points: ['Bulk course creation', 'Batch and student assignment', 'Lab IP subnet configuration'],
    image: '/bankQuestions.png',
  },
  {
    id: 'banks',
    label: 'Question banks',
    icon: 'database',
    title: 'Reusable banks with curriculum metadata built in.',
    desc: 'Faculty organise banks by course, semester, topic, difficulty, Bloom level, and CO1-CO8 mapping, then share controlled access with colleagues.',
    points: ['Topic-wise organisation', 'Shared access controls', 'Spreadsheet MCQ upload'],
    image: '/questionCreation.png',
  },
  {
    id: 'delivery',
    label: 'Secure delivery',
    icon: 'shieldCheck',
    title: 'Every assessment can be tuned to the exam setting.',
    desc: 'Password protection, fullscreen, kiosk validation, lab restrictions, shuffled questions, auto-submit, and linear flow are all first-class quiz controls.',
    points: ['Fullscreen violation tracking', 'Kiosk and lab locks', 'Auto-submit and recovery'],
    image: '/quizView.png',
  },
  {
    id: 'results',
    label: 'Results',
    icon: 'chart',
    title: 'Evaluation, submissions, and outcomes in one review surface.',
    desc: 'Faculty can inspect student-wise and question-wise responses, violation history, submission status, manual overrides, and result publication.',
    points: ['Student-wise response review', 'Question performance analytics', 'Manual override tracking'],
    image: '/studentDashboard.png',
  },
];

const QUESTION_TYPES = [
  { name: 'Single-correct MCQ', tag: 'Auto-graded' },
  { name: 'Multiple-correct MCQ', tag: 'Partial marking' },
  { name: 'True / False', tag: 'Auto-graded' },
  { name: 'Descriptive (long-form)', tag: 'AI-assisted' },
  { name: 'Fill-in-the-blank', tag: 'AI-graded' },
  { name: 'Match-the-following', tag: 'Auto-graded' },
  { name: 'File upload', tag: 'Manual review' },
  { name: 'Coding', tag: 'Test-case run' },
];

const VIOLATIONS = [
  { v: 'Tab switching', s: 'logged' },
  { v: 'Fullscreen exit', s: 'flagged' },
  { v: 'Copy / paste / cut', s: 'blocked' },
  { v: 'Right-click / context menu', s: 'blocked' },
  { v: 'DevTools shortcuts', s: 'blocked' },
  { v: 'Print / save shortcuts', s: 'blocked' },
  { v: 'Screenshot attempts', s: 'logged' },
  { v: 'Window focus loss', s: 'logged' },
  { v: 'Suspicious resize', s: 'logged' },
  { v: 'Kiosk validation missing', s: 'denied' },
  { v: 'IP outside lab subnet', s: 'denied' },
  { v: 'Restricted shortcuts', s: 'blocked' },
];

const ROLES = [
  {
    role: 'Administrator',
    icon: 'building',
    bullets: [
      'Manage institutions, departments, batches',
      'Create and manage all users',
      'Configure labs and IP subnets',
      'Full audit trail and platform health',
    ],
  },
  {
    role: 'Semester Manager',
    icon: 'flag',
    bullets: [
      'Oversee courses within their semester',
      'Manage instructors and assessments',
      'Bulk-create courses and batches',
      'Review semester-wide analytics',
    ],
  },
  {
    role: 'Faculty',
    icon: 'edit',
    bullets: [
      'Build question banks with topic tags',
      'Create exams with sections and rules',
      'Configure coding test cases',
      'Review submissions and override scores',
    ],
  },
  {
    role: 'Student',
    icon: 'graduation',
    bullets: [
      'See live, upcoming, completed quizzes',
      'Distraction-free exam interface',
      'Real-time timer and auto-submit',
      'Continuous answer sync',
    ],
  },
];

const LANGS = ['Python', 'Java', 'C++', 'JavaScript', 'C', 'Octave', 'Scala'];

const CONTROL_GROUPS = [
  {
    id: 'access',
    label: 'Access',
    icon: 'key',
    options: ['Password gate', 'Selected courses', 'Individual students', 'Batch alignment'],
  },
  {
    id: 'integrity',
    label: 'Integrity',
    icon: 'shield',
    options: ['Fullscreen required', 'Kiosk validation', 'Lab subnet lock', 'Violation ledger'],
  },
  {
    id: 'flow',
    label: 'Flow',
    icon: 'layers',
    options: ['Linear navigation', 'Shuffle questions', 'Shuffle options', 'Auto-submit'],
  },
  {
    id: 'grading',
    label: 'Grading',
    icon: 'award',
    options: ['MCQ partial marking', 'Negative marking', 'Coding partial marks', 'Manual override'],
  },
];

function HeroParallax() {
  const y = useScrollY();
  return (
    <div className="d1-hero-mock" style={{ transform: `translateY(${y * -0.08}px)` }}>
      <div className="d1-mock-frame">
        <div className="d1-mock-bar">
          <div className="d1-mock-dots"><span /><span /><span /></div>
          <span className="d1-mock-url">evolveus.in / staff / dashboard</span>
        </div>
        <img src="/staffDashboard.png" alt="Evolveus staff dashboard" className="d1-mock-img" />
      </div>
      <div
        className="d1-hero-sub-mock"
        style={{ transform: `translateY(${y * -0.16}px)` }}
      >
        <div className="d1-mock-frame d1-mock-frame-sm">
          <div className="d1-mock-bar">
            <div className="d1-mock-dots"><span /><span /><span /></div>
            <span className="d1-mock-url">quiz settings</span>
          </div>
          <img src="/quizSettings.png" alt="Quiz settings" className="d1-mock-img" />
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`d1-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CodingPanel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 6), 1100);
    return () => clearInterval(t);
  }, []);
  const tests = [
    { id: 'TC-01', status: 'pass', ms: '12ms', pts: '2/2' },
    { id: 'TC-02', status: 'pass', ms: '8ms', pts: '2/2' },
    { id: 'TC-03', status: 'pass', ms: '15ms', pts: '2/2' },
    { id: 'TC-04', status: 'fail', ms: '9ms', pts: '0/2' },
    { id: 'TC-05', status: 'pass', ms: '11ms', pts: '2/2' },
  ];
  return (
    <div className="d1-coding-panel">
      <div className="d1-cp-bar">
        <span className="d1-cp-lang">PYTHON 3.11</span>
        <span className="d1-cp-meta">CS301 · Binary Search Tree</span>
      </div>
      <div className="d1-cp-body">
        {tests.map((t, i) => (
          <div
            key={t.id}
            className={`d1-cp-row ${i < step ? 'is-done' : ''} ${t.status} ${i === step - 1 ? 'is-now' : ''}`}
          >
            <span className="d1-cp-icon">
              {i < step ? (
                t.status === 'pass'
                  ? <Icon name="check" size={14} />
                  : <Icon name="alert" size={14} />
              ) : <span className="d1-cp-spin" />}
            </span>
            <span className="d1-cp-id">{t.id}</span>
            <span className="d1-cp-ms">{i < step ? t.ms : '—'}</span>
            <span className="d1-cp-pts">{i < step ? t.pts : ''}</span>
          </div>
        ))}
        <div className="d1-cp-total">
          <span>Final score</span>
          <div>
            <span className="d1-cp-score">{step >= 5 ? '8.0' : '—'}</span>
            <span className="d1-cp-denom"> / 10.0</span>
          </div>
        </div>
        <div className="d1-cp-bar-wrap">
          <div className="d1-cp-progress" style={{ width: step >= 5 ? '80%' : `${(step / 5) * 80}%` }} />
        </div>
      </div>
    </div>
  );
}

function WorkflowExplorer() {
  const [active, setActive] = useState(WORKFLOW[0].id);
  const item = WORKFLOW.find(w => w.id === active) ?? WORKFLOW[0];
  return (
    <div className="d1-workflow">
      <div className="d1-workflow-tabs" role="tablist" aria-label="Platform workflow">
        {WORKFLOW.map(w => (
          <button
            key={w.id}
            role="tab"
            aria-selected={w.id === item.id}
            className={`d1-workflow-tab ${w.id === item.id ? 'is-active' : ''}`}
            onClick={() => setActive(w.id)}
          >
            <Icon name={w.icon} size={16} />
            <span>{w.label}</span>
          </button>
        ))}
      </div>
      <div className="d1-workflow-body">
        <div className="d1-workflow-copy">
          <div className="d1-workflow-kicker">Selected module</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          <div className="d1-workflow-points">
            {item.points.map(point => (
              <span key={point}>
                <Icon name="check" size={13} />
                {point}
              </span>
            ))}
          </div>
        </div>
        <div className="d1-workflow-shot">
          <img src={item.image} alt={`${item.label} interface preview`} />
        </div>
      </div>
    </div>
  );
}

function QuizControlConsole() {
  const [active, setActive] = useState('integrity');
  const group = CONTROL_GROUPS.find(g => g.id === active) ?? CONTROL_GROUPS[1];
  const activeCount = group.options.length;
  return (
    <div className="d1-control-console">
      <div className="d1-control-head">
        <div>
          <span>Quiz control stack</span>
          <strong>{group.label}</strong>
        </div>
        <div className="d1-control-score">{activeCount}/4</div>
      </div>
      <div className="d1-control-segments" role="tablist" aria-label="Quiz controls">
        {CONTROL_GROUPS.map(g => (
          <button
            key={g.id}
            role="tab"
            aria-selected={g.id === active}
            className={g.id === active ? 'is-active' : ''}
            onClick={() => setActive(g.id)}
          >
            <Icon name={g.icon} size={15} />
            {g.label}
          </button>
        ))}
      </div>
      <div className="d1-control-list">
        {group.options.map((option, i) => (
          <label key={option} className="d1-control-option">
            <input type="checkbox" checked readOnly />
            <span className="d1-control-check"><Icon name="check" size={12} /></span>
            <span>{option}</span>
            <em>{String(i + 1).padStart(2, '0')}</em>
          </label>
        ))}
      </div>
      <div className="d1-control-preview">
        <div className="d1-control-preview-row">
          <span>Publish state</span>
          <strong>Ready</strong>
        </div>
        <div className="d1-control-preview-row">
          <span>Result visibility</span>
          <strong>Hidden until review</strong>
        </div>
        <div className="d1-control-preview-bar">
          <span style={{ width: `${68 + activeCount * 6}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function Design1({ onBrochure }) {
  const y = useScrollY();
  return (
    <div className="d1">
      {/* Subtle parallax background */}
      <div className="d1-bg-grid" style={{ transform: `translateY(${y * 0.15}px)` }} />
      <div className="d1-bg-glow" style={{ transform: `translate(${y * 0.05}px, ${y * -0.1}px)` }} />

      {/* NAV */}
      <nav className="d1-nav">
        <div className="d1-nav-inner">
          <div className="d1-logo">
            <span className="d1-logo-mark">
              <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="none" stroke="#c89b3c" strokeWidth="1.6" />
                <path d="M11 12 L21 12 M11 16 L18 16 M11 20 L21 20" stroke="#c89b3c" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="d1-logo-name">Evolveus</span>
          </div>
          <div className="d1-nav-links">
            <a href="#d1-platform">Platform</a>
            <a href="#d1-coding">Coding</a>
            <a href="#d1-security">Security</a>
            <a href="#d1-roles">Roles</a>
          </div>
          <div className="d1-nav-right">
            <button className="d1-nav-ghost" onClick={onBrochure}>Brochure</button>
            <button className="d1-nav-cta">
              Request Demo <Icon name="arrowRight" size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="d1-hero">
        <div className="d1-hero-inner">
          <div className="d1-hero-text">
            <div className="d1-pretitle">
              <span className="d1-pretitle-line" />
              For higher education institutions
            </div>
            <h1 className="d1-h1">
              The assessment platform that<br />
              <span className="d1-accent-text">institutions trust</span> for high-stakes exams.
            </h1>
            <p className="d1-lede">
              Evolveus is a complete digital examination system — from question banks
              and coding assessments to secure proctoring, AI-assisted grading, and
              accreditation-ready analytics. Deployed on your infrastructure.
            </p>
            <div className="d1-hero-actions">
              <button className="d1-cta-primary">
                Request a Demonstration <Icon name="arrowRight" size={15} />
              </button>
              <button className="d1-cta-text" onClick={onBrochure}>
                Read the Brochure <Icon name="bookOpen" size={14} />
              </button>
            </div>
            <div className="d1-trust">
              <div className="d1-trust-label">Battle-tested at scale</div>
              <div className="d1-trust-stats">
                {STATS.map(s => (
                  <div key={s.l} className="d1-trust-stat">
                    <div className="d1-trust-n">{s.n}</div>
                    <div className="d1-trust-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HeroParallax />
        </div>
      </section>

      {/* PLATFORM PILLARS */}
      <section className="d1-platform" id="d1-platform">
        <div className="d1-section-inner">
          <Reveal>
            <div className="d1-eyebrow"><span /> The Platform</div>
            <h2 className="d1-h2">A complete assessment system, in one place.</h2>
            <p className="d1-section-sub">
              From institution setup to final grade export, Evolveus replaces the
              fragmented stack of tools academic institutions rely on today.
            </p>
          </Reveal>
          <div className="d1-pillar-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="d1-pillar-card">
                  <div className="d1-pillar-icon">
                    <Icon name={p.icon} size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="d1-pillar-title">{p.title}</h3>
                  <p className="d1-pillar-desc">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <WorkflowExplorer />
          </Reveal>
        </div>
      </section>

      {/* CODING SPOTLIGHT */}
      <section className="d1-coding" id="d1-coding">
        <div className="d1-section-inner">
          <div className="d1-coding-grid">
            <div>
              <Reveal>
                <div className="d1-eyebrow d1-eyebrow-amber"><span /> Coding Assessment</div>
                <h2 className="d1-h2">Code submitted.<br />Marks awarded — instantly.</h2>
                <p className="d1-section-sub">
                  Faculty define the test cases. Evolveus compiles the submission,
                  runs it against visible and hidden cases in an isolated sandbox, and
                  awards partial marks proportional to cases passed.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="d1-coding-points">
                  {[
                    { i: 'cpu', t: 'Sandboxed execution', d: 'Isolated containers with configurable time and memory limits' },
                    { i: 'eye', t: 'Hidden test cases', d: 'Visible demos for students; hidden cases catch edge conditions' },
                    { i: 'gauge', t: 'Partial marking', d: 'Pass 4 of 5 cases → 80% of total marks, calculated automatically' },
                    { i: 'fileText', t: 'Boilerplate & driver code', d: 'Pre-fill function signatures and reference solutions' },
                  ].map(p => (
                    <div key={p.t} className="d1-coding-point">
                      <span className="d1-cp-pt-icon"><Icon name={p.i} size={16} /></span>
                      <div>
                        <div className="d1-cp-pt-t">{p.t}</div>
                        <div className="d1-cp-pt-d">{p.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d1-langs">
                  <span className="d1-langs-label">Languages</span>
                  {LANGS.map(l => <span key={l} className="d1-lang-chip">{l}</span>)}
                </div>
              </Reveal>
            </div>
            <Reveal delay={180}>
              <CodingPanel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUESTION TYPES */}
      <section className="d1-qtypes">
        <div className="d1-section-inner">
          <Reveal>
            <div className="d1-eyebrow"><span /> Assessment Formats</div>
            <h2 className="d1-h2">Eight question types. One platform.</h2>
          </Reveal>
          <div className="d1-qtypes-grid">
            {QUESTION_TYPES.map((q, i) => (
              <Reveal key={q.name} delay={i * 40}>
                <div className="d1-qtype">
                  <span className="d1-qtype-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="d1-qtype-name">{q.name}</span>
                  <span className="d1-qtype-tag">{q.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <QuizControlConsole />
          </Reveal>
        </div>
      </section>

      {/* SECURITY */}
      <section className="d1-security" id="d1-security">
        <div className="d1-section-inner">
          <div className="d1-security-grid">
            <Reveal>
              <div>
                <div className="d1-eyebrow d1-eyebrow-amber"><span /> Exam Integrity</div>
                <h2 className="d1-h2">Every violation is on record.</h2>
                <p className="d1-section-sub">
                  Evolveus enforces controlled exam environments. Suspicious actions
                  are detected, logged with timestamps, and surfaced in audit reports.
                  Subnet-locked exams ensure students attempt only from approved labs.
                </p>
                <div className="d1-sec-stack">
                  {[
                    { i: 'monitor', t: 'Fullscreen enforcement', d: 'Blocks exam progress unless fullscreen is active' },
                    { i: 'lock', t: 'Kiosk mode', d: 'Restricts exams to approved kiosk environments' },
                    { i: 'pin', t: 'IP / Subnet restriction', d: 'Lock exams to specific labs or campus networks' },
                    { i: 'shield', t: 'Password protection', d: 'Add an additional access gate per exam' },
                  ].map(p => (
                    <div key={p.t} className="d1-sec-item">
                      <Icon name={p.i} size={20} />
                      <div>
                        <div className="d1-sec-t">{p.t}</div>
                        <div className="d1-sec-d">{p.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="d1-viol-table">
                <div className="d1-viol-head">
                  <span>Violation</span>
                  <span>Action</span>
                </div>
                {VIOLATIONS.map(v => (
                  <div key={v.v} className="d1-viol-row">
                    <span className="d1-viol-name">{v.v}</span>
                    <span className={`d1-viol-status d1-viol-${v.s}`}>{v.s}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="d1-roles" id="d1-roles">
        <div className="d1-section-inner">
          <Reveal>
            <div className="d1-eyebrow"><span /> Designed for every role</div>
            <h2 className="d1-h2">One platform. Four dashboards.</h2>
            <p className="d1-section-sub">
              Role-based access ensures every user — administrator, manager, faculty,
              or student — sees precisely the tools relevant to them.
            </p>
          </Reveal>
          <div className="d1-roles-grid">
            {ROLES.map((r, i) => (
              <Reveal key={r.role} delay={i * 70}>
                <article className="d1-role-card">
                  <div className="d1-role-head">
                    <Icon name={r.icon} size={20} />
                    <span>{r.role}</span>
                  </div>
                  <ul className="d1-role-list">
                    {r.bullets.map(b => (
                      <li key={b}>
                        <Icon name="check" size={13} className="d1-role-check" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT TOOLS */}
      <section className="d1-content">
        <div className="d1-section-inner">
          <div className="d1-content-grid">
            <Reveal>
              <div>
                <div className="d1-eyebrow d1-eyebrow-amber"><span /> Content & Analytics</div>
                <h2 className="d1-h2">Built for academic depth.</h2>
                <div className="d1-content-list">
                  {[
                    { i: 'edit', t: 'Rich-text editor', d: 'Bold, italic, lists, code, quotes — full formatting' },
                    { i: 'bookOpen', t: 'LaTeX support', d: 'Mathematical and scientific notation in questions' },
                    { i: 'upload', t: 'Image & file upload', d: 'Embed media in questions and accept file submissions' },
                    { i: 'tag', t: 'Bloom\'s taxonomy', d: 'Tag every question — Remember through Create' },
                    { i: 'flag', t: 'Course outcome mapping', d: 'CO1–CO8 alignment for accreditation' },
                    { i: 'database', t: 'Bulk upload', d: 'Spreadsheet-based MCQ creation with validation' },
                  ].map(c => (
                    <div key={c.t} className="d1-content-item">
                      <Icon name={c.i} size={18} />
                      <div>
                        <strong>{c.t}.</strong> {c.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="d1-analytics-card">
                <div className="d1-an-head">
                  <Icon name="chart" size={18} />
                  <span>Performance Insights</span>
                </div>
                <div className="d1-an-stat-grid">
                  {[
                    { n: '94%', l: 'Auto-graded', accent: true },
                    { n: '0.8s', l: 'Avg. compile time' },
                    { n: '100%', l: 'Audit-traced' },
                    { n: '24/7', l: 'Self-hosted ready' },
                  ].map(s => (
                    <div key={s.l} className={`d1-an-stat ${s.accent ? 'is-accent' : ''}`}>
                      <div className="d1-an-n">{s.n}</div>
                      <div className="d1-an-l">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="d1-an-bars">
                  {[78, 64, 52, 88, 71, 45, 82].map((h, i) => (
                    <div key={i} className="d1-an-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="d1-an-foot">
                  Per-question difficulty distribution · CS301 Midterm
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d1-cta">
        <div className="d1-cta-inner">
          <Reveal>
            <h2 className="d1-cta-h">
              Bring rigour and reliability<br />
              <span className="d1-accent-text">to your assessments.</span>
            </h2>
            <p className="d1-cta-sub">
              Schedule a demo with our team. We'll walk through coding evaluation,
              proctoring, analytics, and deployment options for your institution.
            </p>
            <div className="d1-cta-btns">
              <button className="d1-cta-primary d1-cta-lg">
                Request a Demonstration <Icon name="arrowRight" size={15} />
              </button>
              <button className="d1-cta-text" onClick={onBrochure}>
                Download Brochure <Icon name="download" size={14} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="d1-footer">
        <div className="d1-footer-inner">
          <div className="d1-logo">
            <span className="d1-logo-mark">
              <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
                <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="none" stroke="#c89b3c" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="d1-logo-name">Evolveus</span>
          </div>
          <p className="d1-footer-copy">© 2026 Evolveus · Digital assessment for higher education</p>
        </div>
      </footer>
    </div>
  );
}
