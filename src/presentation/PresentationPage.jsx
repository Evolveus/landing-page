import { useState, useEffect, useCallback } from 'react';
import { Icon } from '../landing/_shared/Icon';
import './PresentationPage.css';

// ─── Shared data ──────────────────────────────────────────────

const STATS = [
  { n: '2,000+', l: 'Quizzes conducted' },
  { n: '200,000+', l: 'Responses scored' },
  { n: '8', l: 'Question types' },
  { n: '7', l: 'Languages' },
  { n: '12', l: 'Proctoring signals' },
];

const PILLARS = [
  {
    n: 'I', icon: 'code', title: 'Coding Assessment',
    bullets: ['Sandboxed execution', '7 languages supported', 'Partial marking'],
  },
  {
    n: 'II', icon: 'database', title: 'Question Bank',
    bullets: ["Bloom's taxonomy tagging", 'CO1–CO8 mapping', 'Bulk spreadsheet upload'],
  },
  {
    n: 'III', icon: 'shieldCheck', title: 'Secure Examination',
    bullets: ['12 proctoring signals', 'Fullscreen enforcement', 'Kiosk + IP lock'],
  },
  {
    n: 'IV', icon: 'brain', title: 'AI Evaluation',
    bullets: ['Bring Your Own Key', 'Rubric-based grading', 'Faculty override always'],
  },
  {
    n: 'V', icon: 'chart', title: 'Analytics & Reporting',
    bullets: ['CO attainment tracking', "Bloom's coverage", 'Accreditation exports'],
  },
  {
    n: 'VI', icon: 'building', title: 'Institution Management',
    bullets: ['Dept / batch / semester', 'Role-based access control', 'Lab IP subnet config'],
  },
];

const VIOLATIONS = [
  'Tab switching', 'Window focus loss', 'Fullscreen exit',
  'Window resizing', 'Copy / Paste / Cut', 'Right-click menu',
  'Developer tools', 'Print shortcuts', 'Screenshot keys',
  'Restricted keyboard', 'Kiosk validation', 'IP outside subnet',
];

const AI_STEPS = [
  { n: '01', title: 'Faculty defines the rubric', icon: 'edit', badge: 'Faculty-controlled' },
  { n: '02', title: 'Student submits their answer', icon: 'graduation', badge: null },
  { n: '03', title: 'LLM evaluates against rubric', icon: 'brain', badge: 'BYOK' },
  { n: '04', title: 'Faculty reviews and confirms', icon: 'checkCircle', badge: 'Final control' },
];

const AI_MODELS = [
  { name: 'OpenAI', sub: 'GPT-4o, GPT-4', color: '#10a37f' },
  { name: 'Anthropic', sub: 'Claude 3.5 Sonnet', color: '#d97757' },
  { name: 'Google', sub: 'Gemini 1.5 Pro', color: '#4285f4' },
  { name: 'Azure', sub: 'Azure OpenAI', color: '#0078d4' },
  { name: 'Custom API', sub: 'Any OpenAI-compatible', color: '#6b7280' },
];

const Q_TYPES = [
  { n: '01', label: 'Single-Choice MCQ', icon: 'check', tags: ['Auto-graded', 'Negative marks'] },
  { n: '02', label: 'Multiple-Choice MCQ', icon: 'layers', tags: ['Auto-graded', 'Partial marks'] },
  { n: '03', label: 'True or False', icon: 'check', tags: ['Auto-graded'] },
  { n: '04', label: 'Descriptive', icon: 'edit', tags: ['AI-graded', 'BYOK'] },
  { n: '05', label: 'Fill-in-the-Blank', icon: 'edit', tags: ['AI-assisted', 'Semantic match'] },
  { n: '06', label: 'Match-the-Following', icon: 'layers', tags: ['Auto-graded', 'Partial marks'] },
  { n: '07', label: 'File Upload', icon: 'upload', tags: ['Manual grading'] },
  { n: '08', label: 'Coding', icon: 'code', tags: ['Sandboxed', '7 languages'] },
];

const CO_BARS = [
  { label: 'CO1 — Recall & Understand', pct: 88 },
  { label: 'CO2 — Apply Concepts', pct: 74 },
  { label: 'CO3 — Analyse Problems', pct: 61 },
  { label: 'CO4 — Evaluate Solutions', pct: 45 },
  { label: 'CO5 — Synthesis & Design', pct: 33, low: true },
];

const BLOOM_BARS = [
  { name: 'Remember', pct: 28 },
  { name: 'Understand', pct: 35 },
  { name: 'Apply', pct: 22 },
  { name: 'Analyse', pct: 10 },
  { name: 'Evaluate', pct: 4 },
  { name: 'Create', pct: 1 },
];

const ROLES = [
  {
    id: 'admin', label: 'Administrator', icon: 'building',
    summary: 'Full institutional control.',
    caps: [
      'Manage departments, batches & semesters',
      'Create users and assign roles',
      'Configure lab IP subnets',
      'Platform-wide audit logs',
    ],
  },
  {
    id: 'faculty', label: 'Faculty', icon: 'edit',
    summary: 'End-to-end assessment workflow.',
    caps: [
      'Build reusable question banks',
      'Configure coding test cases',
      'Review & override AI-generated scores',
      'Export results for accreditation',
    ],
  },
  {
    id: 'student', label: 'Student', icon: 'graduation',
    summary: 'Focused, distraction-free exams.',
    caps: [
      'View all assigned quizzes',
      'In-browser code editor',
      'Continuous answer sync — no lost progress',
      'Score breakdowns on published results',
    ],
  },
];

const TESTIMONIALS = [
  {
    init: 'RK',
    role: 'Head of CSE Dept',
    org: 'Amrita Vishwa Vidyapeetham',
    quote: 'The coding assessment module alone saved our faculty 40+ hours per exam cycle. Automated test-case evaluation with partial marking is exactly what we needed.',
  },
  {
    init: 'MV',
    role: 'Examination Controller',
    org: 'Amrita Vishwa Vidyapeetham',
    quote: 'Twelve proctoring signals, subnet-based lab locking, and kiosk mode validation. We went from paper-based exams to fully digital in one semester.',
  },
];

// ─── Slides ───────────────────────────────────────────────────

function Slide01Cover() {
  return (
    <div className="ps ps-cover">
      <div className="ps-cover-inner">
        <div className="ps-cover-masthead">
          <span>DIGITAL ASSESSMENT PLATFORM</span>
          <span className="ps-bull">·</span>
          <span>HIGHER EDUCATION</span>
          <span className="ps-bull">·</span>
          <span>EST. 2024</span>
        </div>
        <div className="ps-cover-rule" />
        <h1 className="ps-cover-h1">
          Examinations,<br />
          <em>Reimagined</em><br />
          for the digital<br />
          classroom.
        </h1>
        <p className="ps-cover-lead">
          A complete assessment platform for higher education — from question banks and secure exam
          delivery to AI-assisted grading and accreditation-ready analytics.
        </p>
        <div className="ps-cover-stats">
          {STATS.map((s) => (
            <div key={s.l} className="ps-cover-stat">
              <span className="ps-cover-stat-n">{s.n}</span>
              <span className="ps-cover-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide02Problem() {
  const problems = [
    {
      icon: 'layers',
      title: 'Fragmented Tools',
      desc: 'Question banks in spreadsheets. Exams on one portal. Grading in another. No single source of truth for assessment data.',
    },
    {
      icon: 'edit',
      title: 'Manual Grading at Scale',
      desc: 'Faculty spending hours marking descriptive answers by hand — inconsistent, slow, and impossible to scale across large batches.',
    },
    {
      icon: 'shieldCheck',
      title: 'Zero Integrity Signals',
      desc: 'Paper-based or easily-circumvented digital exams. No real-time monitoring. No audit trail. No accountability.',
    },
  ];

  return (
    <div className="ps ps-problem">
      <div className="ps-inner">
        <div className="ps-eyebrow ps-eyebrow--sepia stagger-1">THE CHALLENGE</div>
        <h2 className="ps-h2 ps-h2--light stagger-2">
          Assessment in higher education<br />
          is <em className="ps-em--sepia">still running on duct tape.</em>
        </h2>
        <div className="ps-problem-grid">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="ps-problem-card"
              style={{ animationDelay: `${0.3 + i * 0.12}s` }}
            >
              <div className="ps-problem-icon">
                <Icon name={p.icon} size={24} strokeWidth={1.4} />
              </div>
              <h3 className="ps-problem-title">{p.title}</h3>
              <p className="ps-problem-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide03Platform() {
  return (
    <div className="ps ps-platform">
      <div className="ps-inner">
        <div className="ps-section-top">
          <div>
            <div className="ps-eyebrow stagger-1">THE SOLUTION</div>
            <h2 className="ps-h2 stagger-2">
              Six pillars,<br />
              <em>one assessment system.</em>
            </h2>
          </div>
          <p className="ps-subtext stagger-3">
            Replace the fragmented stack with a single, coherent platform built for higher education.
            One place for question banks, secure exams, AI grading, and accreditation reports.
          </p>
        </div>
        <div className="ps-pillars-grid">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              className="ps-pillar-card"
              style={{ animationDelay: `${0.3 + i * 0.07}s` }}
            >
              <div className="ps-pillar-head">
                <span className="ps-pillar-roman">{p.n}</span>
                <span className="ps-pillar-icon">
                  <Icon name={p.icon} size={17} strokeWidth={1.5} />
                </span>
              </div>
              <div className="ps-pillar-title">{p.title}</div>
              <ul className="ps-pillar-bullets">
                {p.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" size={10} className="ps-pillar-check" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide04Security() {
  const enforcements = [
    { icon: 'monitor', t: 'Fullscreen Required', d: 'Blocks exam progress until fullscreen is active' },
    { icon: 'lock', t: 'Kiosk Mode', d: 'Restricts access to approved kiosk environments only' },
    { icon: 'pin', t: 'Lab / Subnet Lock', d: 'IP-based restriction enforces campus-only access' },
    { icon: 'refresh', t: 'Continuous Sync', d: 'Answers saved continuously — network drops lose nothing' },
    { icon: 'rss', t: 'Audit Logs', d: 'Every faculty action and score override is timestamped' },
    { icon: 'key', t: 'Password Gate', d: 'Optional per-exam access password for added control' },
  ];

  return (
    <div className="ps ps-security">
      <div className="ps-inner ps-split-inner">
        <div className="ps-security-left">
          <div className="ps-eyebrow stagger-1">EXAM INTEGRITY</div>
          <h2 className="ps-h2-sm stagger-2">
            Every violation.<br />
            <em>On record.</em>
          </h2>
          <p className="ps-subtext stagger-3">
            Twelve behavioural signals tracked in real time. Suspicious actions are timestamped,
            logged, and surfaced for faculty review before results are finalised.
          </p>
          <div className="ps-enforce-list stagger-4">
            {enforcements.map((e) => (
              <div key={e.t} className="ps-enforce-item">
                <span className="ps-enforce-icon">
                  <Icon name={e.icon} size={14} />
                </span>
                <div>
                  <span className="ps-enforce-t">{e.t}</span>
                  <span className="ps-enforce-sep"> — </span>
                  <span className="ps-enforce-d">{e.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ps-security-right stagger-5">
          <div className="ps-violations-card">
            <div className="ps-violations-head">
              <Icon name="shieldCheck" size={16} />
              <span>12 Detection Signals</span>
            </div>
            <div className="ps-violations-grid">
              {VIOLATIONS.map((v) => (
                <div key={v} className="ps-violation-badge">
                  <Icon name="check" size={10} />
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className="ps-violations-note">
              All signals are timestamped and stored in per-student audit logs,
              reviewable by faculty before results are published.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide05Coding() {
  const features = [
    { i: 'cpu', t: 'Sandboxed execution', d: 'Isolated containers, enforced time + memory limits' },
    { i: 'eye', t: 'Hidden test cases', d: 'Catch edge cases and hardcoded submissions' },
    { i: 'gauge', t: 'Partial marking', d: 'Proportional credit by test cases passed' },
    { i: 'fileText', t: 'Boilerplate support', d: 'Driver code and reference solutions per question' },
  ];

  const langs = ['Python', 'Java', 'C++', 'JavaScript', 'C', 'Octave', 'Scala'];

  return (
    <div className="ps ps-coding">
      <div className="ps-inner ps-split-inner">
        <div className="ps-coding-left">
          <div className="ps-eyebrow stagger-1">CODING ASSESSMENT</div>
          <h2 className="ps-h2-sm stagger-2">
            Code submitted.<br />
            <em>Graded in seconds.</em>
          </h2>
          <div className="ps-coding-langs stagger-3">
            <span className="ps-coding-langs-n">7</span>
            <div>
              <div className="ps-coding-langs-label">Programming languages</div>
              <div className="ps-coding-langs-list">{langs.join(' · ')}</div>
            </div>
          </div>
          <div className="ps-coding-features stagger-4">
            {features.map((f) => (
              <div key={f.t} className="ps-coding-feat">
                <span className="ps-coding-feat-icon">
                  <Icon name={f.i} size={14} />
                </span>
                <div>
                  <div className="ps-coding-feat-t">{f.t}</div>
                  <div className="ps-coding-feat-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ps-coding-right stagger-5">
          <div className="ps-terminal">
            <div className="ps-terminal-bar">
              <div className="ps-terminal-dots">
                <span /><span /><span />
              </div>
              <span className="ps-terminal-title">evolveus · sandbox · CS301</span>
            </div>
            <div className="ps-terminal-body">
              <div className="ps-terminal-tag">SUBMISSION — CS301 MIDTERM</div>
              <div className="ps-terminal-prob">Binary Search Tree Validation</div>
              <div className="ps-terminal-meta">
                <span className="ps-terminal-lang">Python 3.11</span>
                <span className="ps-terminal-time">0.34s compile</span>
              </div>
              {[
                { id: 'TC-01', s: 'pass', p: '2.0 / 2.0' },
                { id: 'TC-02', s: 'pass', p: '2.0 / 2.0' },
                { id: 'TC-03', s: 'pass', p: '2.0 / 2.0' },
                { id: 'TC-04', s: 'fail', p: '0.0 / 2.0' },
                { id: 'TC-05', s: 'pass', p: '2.0 / 2.0' },
              ].map((t) => (
                <div key={t.id} className={`ps-tc ps-tc--${t.s}`}>
                  <span className="ps-tc-sym">{t.s === 'pass' ? '✓' : '✗'}</span>
                  <span className="ps-tc-id">{t.id}</span>
                  <span className="ps-tc-status">{t.s.toUpperCase()}</span>
                  <span className="ps-tc-pts">{t.p}</span>
                </div>
              ))}
              <div className="ps-terminal-total">
                <span>Final score</span>
                <span className="ps-terminal-score">8.0 / 10.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide06AI() {
  return (
    <div className="ps ps-ai">
      <div className="ps-inner">
        <div className="ps-ai-header">
          <div>
            <div className="ps-eyebrow ps-eyebrow--sepia stagger-1">AI-ASSISTED EVALUATION</div>
            <h2 className="ps-h2 ps-h2--light stagger-2">
              Descriptive grading<br />
              <em className="ps-em--gold">at scale.</em>
            </h2>
          </div>
          <p className="ps-subtext ps-subtext--light stagger-3">
            Faculty write the rubric. The LLM grades against it. Faculty review and confirm.
            Every score is auditable, adjustable, and in your control.
          </p>
        </div>
        <div className="ps-ai-body">
          <div className="ps-ai-steps stagger-4">
            {AI_STEPS.map((s, i) => (
              <div key={s.n} className="ps-ai-step">
                <div className="ps-ai-step-left">
                  <div className="ps-ai-step-circle">{s.n}</div>
                  {i < AI_STEPS.length - 1 && <div className="ps-ai-step-line" />}
                </div>
                <div className="ps-ai-step-body">
                  <div className="ps-ai-step-header">
                    <div className="ps-ai-step-icon">
                      <Icon name={s.icon} size={14} />
                    </div>
                    <div className="ps-ai-step-title">{s.title}</div>
                    {s.badge && <span className="ps-ai-badge">{s.badge}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ps-ai-right stagger-5">
            <div className="ps-byok-card">
              <div className="ps-byok-head">
                <div className="ps-byok-icon">
                  <Icon name="key" size={16} />
                </div>
                <div>
                  <div className="ps-byok-title">Bring Your Own Key (BYOK)</div>
                  <div className="ps-byok-sub">Any LLM provider. Your key, your data, your control.</div>
                </div>
              </div>
              <div className="ps-byok-models">
                {AI_MODELS.map((m) => (
                  <div key={m.name} className="ps-model-pill">
                    <span className="ps-model-dot" style={{ background: m.color }} />
                    <div>
                      <div className="ps-model-name">{m.name}</div>
                      <div className="ps-model-sub">{m.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ps-ai-highlights">
              {[
                { icon: 'flag', t: 'Semantic fill-in-blank', d: 'Accepts synonyms, not just exact matches' },
                { icon: 'lock', t: 'Your keys, your data', d: 'API keys stay on your infrastructure' },
                { icon: 'refresh', t: 'Faculty always in control', d: 'Override any AI score before publishing' },
              ].map((h) => (
                <div key={h.t} className="ps-ai-hl">
                  <span className="ps-ai-hl-icon">
                    <Icon name={h.icon} size={14} />
                  </span>
                  <div>
                    <div className="ps-ai-hl-t">{h.t}</div>
                    <div className="ps-ai-hl-d">{h.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide07Questions() {
  return (
    <div className="ps ps-questions">
      <div className="ps-inner">
        <div className="ps-section-top">
          <div>
            <div className="ps-eyebrow stagger-1">QUESTION FORMATS</div>
            <h2 className="ps-h2 stagger-2">
              Eight question types.<br />
              <em>One unified exam.</em>
            </h2>
          </div>
          <p className="ps-subtext stagger-3">
            Mix any combination in a single assessment. Every type supports independent marks,
            negative marks, difficulty rating, Bloom's level, and CO mapping.
          </p>
        </div>
        <div className="ps-qtypes-grid">
          {Q_TYPES.map((q, i) => (
            <div
              key={q.n}
              className="ps-qtype-card"
              style={{ animationDelay: `${0.28 + i * 0.07}s` }}
            >
              <div className="ps-qtype-top">
                <span className="ps-qtype-num">{q.n}</span>
                <span className="ps-qtype-icon">
                  <Icon name={q.icon} size={14} strokeWidth={1.75} />
                </span>
              </div>
              <div className="ps-qtype-label">{q.label}</div>
              <div className="ps-qtype-tags">
                {q.tags.map((t) => (
                  <span
                    key={t}
                    className={`ps-qtype-tag ${(t === 'AI-graded' || t === 'AI-assisted' || t === 'BYOK' || t === 'Semantic match') ? 'ai' : ''}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide08Analytics() {
  return (
    <div className="ps ps-analytics">
      <div className="ps-inner">
        <div className="ps-analytics-top">
          <div>
            <div className="ps-eyebrow stagger-1">PERFORMANCE ANALYTICS</div>
            <h2 className="ps-h2-sm stagger-2">
              Understand every student.<br />
              <em>Every question.</em>
            </h2>
          </div>
          <div className="ps-analytics-feats stagger-3">
            {[
              { i: 'users', t: 'Student-level tracking', d: 'Scores, time, violations, per-question accuracy' },
              { i: 'chart', t: 'Class-wide insights', d: 'Difficulty trends, common errors, distribution' },
              { i: 'flag', t: 'Accreditation-ready', d: 'CO1–CO8 + Bloom\'s exports for NBA/NAAC' },
            ].map((f) => (
              <div key={f.t} className="ps-analytics-feat">
                <span className="ps-analytics-feat-icon">
                  <Icon name={f.i} size={16} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="ps-analytics-feat-t">{f.t}</div>
                  <div className="ps-analytics-feat-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ps-analytics-charts stagger-4">
          <div className="ps-chart-block">
            <div className="ps-chart-title">Course Outcome Attainment — CS301</div>
            {CO_BARS.map((c) => (
              <div key={c.label} className="ps-co-row">
                <div className="ps-co-meta">
                  <span className="ps-co-label">{c.label}</span>
                  <span className="ps-co-pct">{c.pct}%</span>
                </div>
                <div className="ps-co-track">
                  <div
                    className={`ps-co-fill ${c.low ? 'low' : ''}`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="ps-chart-block">
            <div className="ps-chart-title">Bloom's Taxonomy Coverage</div>
            {BLOOM_BARS.map((b) => (
              <div key={b.name} className="ps-bloom-row">
                <span className="ps-bloom-name">{b.name}</span>
                <div className="ps-bloom-track">
                  <div className="ps-bloom-fill" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="ps-bloom-pct">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide09Roles() {
  return (
    <div className="ps ps-roles">
      <div className="ps-inner">
        <div className="ps-eyebrow stagger-1">USER ROLES</div>
        <h2 className="ps-h2 stagger-2">
          Built for every person<br />
          <em>in your institution.</em>
        </h2>
        <p className="ps-subtext stagger-3">
          Each role gets exactly the tools they need. Administrators control structure,
          faculty run assessments, students focus on learning.
        </p>
        <div className="ps-roles-grid">
          {ROLES.map((r, i) => (
            <div
              key={r.id}
              className="ps-role-card"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="ps-role-icon">
                <Icon name={r.icon} size={22} strokeWidth={1.4} />
              </div>
              <div className="ps-role-label">{r.label}</div>
              <div className="ps-role-summary">{r.summary}</div>
              <ul className="ps-role-caps">
                {r.caps.map((c) => (
                  <li key={c}>
                    <Icon name="checkCircle" size={12} className="ps-role-check" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide10Deploy() {
  const MODES = [
    {
      icon: 'globe', label: 'Managed Cloud',
      tagline: 'We host, operate, and maintain everything.',
      sub: 'Go live in days. No infrastructure team required. We manage updates, backups, and monitoring.',
      features: [
        { i: 'bolt', t: 'Instant setup', d: 'Running within days — no server provisioning needed' },
        { i: 'refresh', t: 'Zero-touch updates', d: 'Our team deploys patches with no downtime on your side' },
        { i: 'database', t: 'Managed backups', d: 'Daily backups with point-in-time recovery' },
        { i: 'award', t: 'SLA-backed support', d: 'Dedicated channel with response commitments' },
      ],
    },
    {
      icon: 'building', label: 'Self-Hosted',
      tagline: 'Your servers. Your data. We handle the rest.',
      sub: 'Deploy on your own infrastructure — on-premise or private cloud. Full data sovereignty.',
      features: [
        { i: 'lock', t: 'Complete data control', d: 'Student data stays on your network permanently' },
        { i: 'refresh', t: 'We maintain it for you', d: 'Our team handles all updates on your servers' },
        { i: 'shieldCheck', t: 'Compliance-ready', d: 'Data residency and regulatory requirements met' },
        { i: 'network', t: 'SSO integration', d: 'Connect to your existing identity provider' },
      ],
    },
  ];

  return (
    <div className="ps ps-deploy">
      <div className="ps-inner">
        <div className="ps-section-top">
          <div>
            <div className="ps-eyebrow stagger-1">DEPLOYMENT</div>
            <h2 className="ps-h2 stagger-2">
              Deploy on<br />
              <em>your terms.</em>
            </h2>
          </div>
          <p className="ps-subtext stagger-3">
            Either way, our team handles all platform maintenance, updates, and support.
            You choose the model that fits your institution.
          </p>
        </div>
        <div className="ps-deploy-grid">
          {MODES.map((m, i) => (
            <div
              key={m.label}
              className="ps-deploy-card"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="ps-deploy-card-head">
                <div className="ps-deploy-card-icon">
                  <Icon name={m.icon} size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="ps-deploy-label">{m.label}</div>
                  <div className="ps-deploy-tagline">{m.tagline}</div>
                </div>
              </div>
              <p className="ps-deploy-sub">{m.sub}</p>
              <div className="ps-deploy-feats">
                {m.features.map((f) => (
                  <div key={f.t} className="ps-deploy-feat">
                    <span className="ps-deploy-feat-icon">
                      <Icon name={f.i} size={13} />
                    </span>
                    <div>
                      <span className="ps-deploy-feat-t">{f.t}</span>
                      <span className="ps-deploy-feat-sep"> — </span>
                      <span className="ps-deploy-feat-d">{f.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide11CTA({ onHome }) {
  return (
    <div className="ps ps-cta">
      <div className="ps-cta-inner">
        <div className="ps-eyebrow ps-eyebrow--cream stagger-1">PROVEN AT SCALE</div>
        <div className="ps-cta-stats stagger-2">
          {[
            { n: '2,000+', l: 'Quizzes conducted' },
            { n: '200,000+', l: 'Responses evaluated' },
            { n: 'Live', l: 'at Amrita Vishwa Vidyapeetham' },
          ].map((s) => (
            <div key={s.l} className="ps-cta-stat">
              <span className="ps-cta-stat-n">{s.n}</span>
              <span className="ps-cta-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="ps-cta-testimonials stagger-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.init} className="ps-testimonial">
              <div className="ps-test-quotemark">"</div>
              <p className="ps-test-quote">{t.quote}</p>
              <div className="ps-test-author">
                <div className="ps-test-init">{t.init}</div>
                <div>
                  <div className="ps-test-role">{t.role}</div>
                  <div className="ps-test-org">{t.org}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ps-cta-actions stagger-4">
          <a href="mailto:aksaykanthan@gmail.com" className="ps-cta-primary-btn">
            Schedule a Demonstration
            <Icon name="arrowRight" size={16} />
          </a>
          <button className="ps-cta-ghost-btn" onClick={onHome}>
            Return to Website
          </button>
        </div>
        <p className="ps-cta-footnote stagger-5">
          No commitment. Tailored demo for your institution's workflows.
        </p>
      </div>
    </div>
  );
}

// ─── Slide registry ───────────────────────────────────────────

const SLIDES = [
  { id: 'cover',     component: Slide01Cover,    label: 'Overview'   },
  { id: 'problem',   component: Slide02Problem,  label: 'Challenge'  },
  { id: 'platform',  component: Slide03Platform, label: 'Platform'   },
  { id: 'security',  component: Slide04Security, label: 'Security'   },
  { id: 'coding',    component: Slide05Coding,   label: 'Coding'     },
  { id: 'ai',        component: Slide06AI,       label: 'AI Grading' },
  { id: 'questions', component: Slide07Questions, label: 'Questions' },
  { id: 'analytics', component: Slide08Analytics, label: 'Analytics' },
  { id: 'roles',     component: Slide09Roles,    label: 'Roles'      },
  { id: 'deploy',    component: Slide10Deploy,   label: 'Deployment' },
  { id: 'cta',       component: Slide11CTA,      label: 'Demo'       },
];

// ─── Logo ─────────────────────────────────────────────────────

function EvolveLogo() {
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" aria-hidden="true">
      <path
        d="M18 3 L33 11 L33 25 L18 33 L3 25 L3 11 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11 14 L18 18 L25 14 M18 18 L18 25"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Main presentation ────────────────────────────────────────

export default function PresentationPage({ onHome }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (index === current || index < 0 || index >= SLIDES.length) return;
      setDirection(index > current ? 'next' : 'prev');
      setAnimKey((k) => k + 1);
      setCurrent(index);
    },
    [current],
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      else if (e.key === 'Escape') onHome?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onHome]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.padding;
    const prevBg = document.body.style.background;
    document.body.style.overflow = 'hidden';
    document.body.style.padding = '0';
    document.body.style.background = 'transparent';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.padding = prevPadding;
      document.body.style.background = prevBg;
    };
  }, []);

  const total = SLIDES.length;
  const progress = ((current + 1) / total) * 100;
  const slide = SLIDES[current];
  const SlideComp = slide.component;

  return (
    <div className="pres" role="main" aria-label="Evolveus presentation">
      {/* Progress bar */}
      <div className="pres-progress-bar" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
        <div className="pres-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Slide stage */}
      <div className="pres-stage">
        <div key={animKey} className="pres-slide" data-dir={direction}>
          <SlideComp onHome={onHome} />
        </div>
      </div>

      {/* Controls */}
      <div className="pres-controls">
        <button
          className="pres-home-btn"
          onClick={onHome}
          aria-label="Exit presentation and return to website"
        >
          <EvolveLogo />
          <span>Evolveus</span>
        </button>

        <nav className="pres-dot-nav" aria-label="Slide navigation">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`pres-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}: ${s.label}`}
              aria-current={i === current ? 'true' : undefined}
              title={s.label}
            />
          ))}
        </nav>

        <div className="pres-nav-row">
          <button
            className="pres-nav-btn"
            onClick={goPrev}
            disabled={current === 0}
            aria-label="Previous slide"
          >
            <Icon
              name="arrowRight"
              size={14}
              style={{ transform: 'rotate(180deg)', display: 'block' }}
            />
          </button>
          <span className="pres-counter" aria-live="polite">
            <span className="pres-counter-cur">{current + 1}</span>
            <span className="pres-counter-sep"> / </span>
            <span className="pres-counter-tot">{total}</span>
          </span>
          <button
            className="pres-nav-btn"
            onClick={goNext}
            disabled={current === total - 1}
            aria-label="Next slide"
          >
            <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
