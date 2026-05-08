import { Icon } from '../_shared/Icon';
import { useScrollY, useReveal } from '../_shared/useParallax';
import './Design5.css';

const PILLARS = [
  {
    n: 'I',
    title: 'Coding Assessment',
    icon: 'code',
    body: 'Sandboxed code execution. Visible and hidden test cases. Partial marking. Time and memory limits. Seven languages: Python, Java, C++, JavaScript, C, Octave, Scala.',
    bullets: [
      'In-browser code editor',
      'Driver code & boilerplate',
      'Reference solutions',
      'Configurable language per question',
    ],
  },
  {
    n: 'II',
    title: 'Question Bank',
    icon: 'database',
    body: 'A reusable repository of questions organised by topic, tagged with Bloom\'s taxonomy and course outcomes. Bulk upload via spreadsheet. Sharing across faculty.',
    bullets: [
      'Topic-based organization',
      "Bloom's level: Remember → Create",
      'CO1 through CO8 mapping',
      'Bulk upload with row validation',
    ],
  },
  {
    n: 'III',
    title: 'Secure Examination',
    icon: 'shieldCheck',
    body: 'Twelve violation signals tracked in real time. Fullscreen enforcement. Kiosk mode. IP and subnet restriction for lab-only access.',
    bullets: [
      'Tab-switch & focus loss detection',
      'Copy/paste/right-click blocking',
      'Kiosk validation gate',
      'Audit logs per submission',
    ],
  },
  {
    n: 'IV',
    title: 'Evaluation Engine',
    icon: 'brain',
    body: 'Automated scoring across all question types. AI-enhanced grading for descriptive answers and fill-in-the-blank. Faculty can configure marking criteria.',
    bullets: [
      'MCQ partial marking',
      'Negative marking (fixed or %)',
      'Coding test-case scoring',
      'Manual override per question',
    ],
  },
  {
    n: 'V',
    title: 'Analytics & Reporting',
    icon: 'chart',
    body: 'Per-student, per-question, and class-wide performance breakdowns. Submission tracking with violations. Exportable reports for accreditation.',
    bullets: [
      'Question-level difficulty analysis',
      'Class-wide gap identification',
      'Submission status tracking',
      'Audit-ready exports',
    ],
  },
  {
    n: 'VI',
    title: 'Institution Management',
    icon: 'building',
    body: 'Departments, semesters, batches, courses, instructors, students, labs — all centralised. Role-based access for every user type.',
    bullets: [
      'Department / batch / semester setup',
      'Course assignment and bulk creation',
      'Lab IP-subnet configuration',
      'User profile management',
    ],
  },
];

const STATS = [
  { n: '2,000', s: '+', l: 'Quizzes conducted' },
  { n: '200,000', s: '+', l: 'Responses scored' },
  { n: '8', s: '', l: 'Question types' },
  { n: '7', s: '', l: 'Languages supported' },
];

const QTYPES = [
  'Single-correct multiple choice',
  'Multiple-correct multiple choice',
  'True or false',
  'Descriptive (long-form)',
  'Fill-in-the-blank',
  'Match-the-following',
  'File upload',
  'Coding (with test cases)',
];

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`d5-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Design5({ onBrochure }) {
  const y = useScrollY();
  return (
    <div className="d5">
      {/* parallax decorations */}
      <div className="d5-deco d5-deco-1" style={{ transform: `translateY(${y * 0.2}px)` }} />
      <div className="d5-deco d5-deco-2" style={{ transform: `translateY(${y * -0.1}px)` }} />

      {/* NAV */}
      <nav className="d5-nav">
        <div className="d5-nav-inner">
          <div className="d5-logo">
            <span className="d5-logo-mark">
              <svg viewBox="0 0 36 36" width="26" height="26" aria-hidden="true">
                <path d="M18 3 L33 11 L33 25 L18 33 L3 25 L3 11 Z" fill="none" stroke="#1f4e2c" strokeWidth="1.4" />
                <path d="M11 14 L18 18 L25 14 M18 18 L18 25" stroke="#1f4e2c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <div className="d5-logo-text">
              <span className="d5-logo-name">Evolveus</span>
              <span className="d5-logo-tag">Digital Assessment · est. 2024</span>
            </div>
          </div>
          <div className="d5-nav-links">
            <a href="#d5-pillars">Platform</a>
            <a href="#d5-coding">Coding</a>
            <a href="#d5-formats">Formats</a>
            <a href="#d5-roles">Roles</a>
          </div>
          <div className="d5-nav-right">
            <button className="d5-nav-ghost" onClick={onBrochure}>Brochure</button>
            <button className="d5-nav-cta">
              Schedule Demo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO — magazine masthead */}
      <section className="d5-hero">
        <div className="d5-masthead">
          <div className="d5-mast-edition">
            <span>VOL. I · NO. 1</span>
            <span>EDITION 2026</span>
            <span>ASSESSMENT QUARTERLY</span>
          </div>
          <div className="d5-mast-rule" />
          <div className="d5-mast-rule-2" />
        </div>

        <div className="d5-hero-inner">
          <div className="d5-hero-meta">
            <span>FEATURE</span>
            <span>·</span>
            <span>The Platform Issue</span>
          </div>

          <h1 className="d5-h1">
            <span className="d5-h1-main">A complete</span>
            <span className="d5-h1-italic">digital examination</span>
            <span className="d5-h1-main">system for higher</span>
            <span className="d5-h1-main">education institutions.</span>
          </h1>

          <div className="d5-hero-grid">
            <div className="d5-hero-lede">
              <p>
                <span className="d5-dropcap">E</span>volveus is a complete assessment management system,
                from academic setup to secure exam delivery and result analysis. It reduces manual
                work for administrators and faculty, improves exam control, supports diverse
                question formats, and gives students a clear, organised assessment experience.
              </p>
            </div>
            <div className="d5-hero-side">
              <div className="d5-hero-quote">
                <span className="d5-quote-mark">"</span>
                Battle-tested across 2,000+ quizzes and 200,000+ student responses.
              </div>
              <div className="d5-hero-actions">
                <button className="d5-cta-primary">
                  Schedule a Demonstration
                  <Icon name="arrowRight" size={14} />
                </button>
                <button className="d5-cta-text" onClick={onBrochure}>
                  <Icon name="bookOpen" size={14} /> Read the Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* hero image strip with parallax */}
        <div className="d5-hero-img-strip">
          <div
            className="d5-hero-img-frame"
            style={{ transform: `translateY(${y * -0.05}px)` }}
          >
            <img src="/staffDashboard.png" alt="Faculty dashboard" />
            <div className="d5-img-caption">Plate I — Faculty dashboard view</div>
          </div>
        </div>

        {/* stats banner */}
        <div className="d5-stats">
          {STATS.map((s, i) => (
            <div key={s.l} className="d5-stat">
              <div className="d5-stat-n">{s.n}<span>{s.s}</span></div>
              <div className="d5-stat-l">{s.l}</div>
              {i < STATS.length - 1 && <div className="d5-stat-sep" />}
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="d5-pillars" id="d5-pillars">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER ONE · THE PLATFORM</div>
              <h2 className="d5-h2">Six pillars,<br />one assessment system.</h2>
              <p className="d5-section-sub">
                Evolveus replaces the fragmented stack of tools institutions use today —
                question banks in spreadsheets, exams in proctored portals, grading in
                manual scripts — with a single coherent platform.
              </p>
            </div>
          </Reveal>

          <div className="d5-pillars-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="d5-pillar">
                  <div className="d5-pillar-head">
                    <span className="d5-pillar-roman">{p.n}</span>
                    <span className="d5-pillar-icon">
                      <Icon name={p.icon} size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="d5-pillar-title">{p.title}</h3>
                  <p className="d5-pillar-body">{p.body}</p>
                  <ul className="d5-pillar-list">
                    {p.bullets.map(b => (
                      <li key={b}>
                        <Icon name="check" size={12} className="d5-pillar-check" />
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

      {/* CODING SPOTLIGHT */}
      <section className="d5-coding" id="d5-coding">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head d5-section-head-light">
              <div className="d5-eyebrow d5-eyebrow-light">CHAPTER TWO · CODING ASSESSMENT</div>
              <h2 className="d5-h2 d5-h2-light">
                Code is submitted.<br />
                <span className="d5-italic">Marks are awarded</span> — instantly.
              </h2>
            </div>
          </Reveal>

          <div className="d5-coding-grid">
            <Reveal>
              <div className="d5-coding-prose">
                <p>
                  Faculty configure the test cases — visible demonstrations and hidden
                  edge cases. Evolveus compiles each submission, executes it in an
                  isolated sandbox under enforced time and memory limits, and verifies
                  output against expected results.
                </p>
                <p>
                  Partial marking distributes credit proportionally. A student who passes
                  four of five test cases receives four-fifths of the marks — fairly, and
                  without any manual review. Faculty supervision is reduced to designing
                  good problems, not running submissions.
                </p>
                <p className="d5-coding-quote">
                  Faculty design problems. Evolveus runs every submission — instantly,
                  consistently, without bias.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="d5-coding-card">
                <div className="d5-cc-tag">SUBMISSION RESULT — CS301 MIDTERM</div>
                <div className="d5-cc-title">Binary Search Tree Validation</div>
                <div className="d5-cc-meta">Python 3.11 · 0.34s compile</div>

                <div className="d5-cc-tests">
                  {[
                    { id: 'TC-01', s: 'pass', ms: '12ms', p: '2.0 / 2.0' },
                    { id: 'TC-02', s: 'pass', ms: '8ms', p: '2.0 / 2.0' },
                    { id: 'TC-03', s: 'pass', ms: '15ms', p: '2.0 / 2.0' },
                    { id: 'TC-04', s: 'fail', ms: '9ms', p: '0.0 / 2.0' },
                    { id: 'TC-05', s: 'pass', ms: '11ms', p: '2.0 / 2.0' },
                  ].map(t => (
                    <div key={t.id} className={`d5-cc-tc d5-cc-${t.s}`}>
                      <Icon name={t.s === 'pass' ? 'check' : 'alert'} size={13} className="d5-cc-tc-icon" />
                      <span className="d5-cc-tc-id">{t.id}</span>
                      <span className="d5-cc-tc-s">{t.s.toUpperCase()}</span>
                      <span className="d5-cc-tc-ms">{t.ms}</span>
                      <span className="d5-cc-tc-p">{t.p}</span>
                    </div>
                  ))}
                </div>

                <div className="d5-cc-total">
                  <span>Final score</span>
                  <span className="d5-cc-total-s">8.0 / 10.0</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="d5-coding-feats">
              {[
                { i: 'cpu', t: 'Sandboxed', d: 'Isolated containers with time and memory limits' },
                { i: 'eye', t: 'Hidden tests', d: 'Catch edge cases and hardcoded answers' },
                { i: 'gauge', t: 'Partial marks', d: 'Proportional scoring by cases passed' },
                { i: 'fileText', t: 'Boilerplate', d: 'Driver code and reference solutions' },
                { i: 'globe', t: '7 languages', d: 'Python, Java, C++, JS, C, Octave, Scala' },
                { i: 'clock', t: 'Per-question limits', d: 'Time and memory configurable individually' },
              ].map(f => (
                <div key={f.t} className="d5-coding-feat">
                  <Icon name={f.i} size={18} className="d5-cf-icon" />
                  <div>
                    <div className="d5-cf-t">{f.t}</div>
                    <div className="d5-cf-d">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORMATS + EVALUATION */}
      <section className="d5-formats" id="d5-formats">
        <div className="d5-section-inner">
          <div className="d5-formats-grid">
            <Reveal>
              <div className="d5-format-col">
                <div className="d5-eyebrow">CHAPTER THREE · FORMATS</div>
                <h2 className="d5-h2">Eight question types.</h2>
                <p className="d5-section-sub">
                  Mix any combination within a single exam. Configure marks, negative
                  marks, difficulty, Bloom's level, and CO mapping per question.
                </p>
                <ol className="d5-q-list">
                  {QTYPES.map((q, i) => (
                    <li key={q}>
                      <span className="d5-q-num">{String(i + 1).padStart(2, '0')}</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="d5-format-col">
                <div className="d5-eyebrow">EVALUATION & GRADING</div>
                <h2 className="d5-h2">Automated. Auditable.</h2>
                <p className="d5-section-sub">
                  The core evaluation engine handles automated scoring across all
                  question types. AI-assisted grading for descriptive answers and
                  fill-in-the-blank.
                </p>
                <div className="d5-eval-list">
                  {[
                    { t: 'MCQ partial marking', d: 'Configurable per quiz; full or proportional credit' },
                    { t: 'Negative marking', d: 'Fixed value or percentage; global or per-question' },
                    { t: 'Coding partial marks', d: 'Test-case ratio multiplied by max marks' },
                    { t: 'AI fill-in-blank', d: 'Synonym and semantic equivalence accepted' },
                    { t: 'Descriptive AI grading', d: 'Faculty supplies criteria; AI scores accordingly' },
                    { t: 'Manual override', d: 'Faculty can adjust any score post-evaluation' },
                  ].map(e => (
                    <div key={e.t} className="d5-eval-row">
                      <Icon name="checkCircle" size={15} className="d5-eval-check" />
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
      <section className="d5-security">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER FOUR · INTEGRITY</div>
              <h2 className="d5-h2">Every violation. On record.</h2>
              <p className="d5-section-sub">
                Evolveus enforces controlled exam environments. Suspicious actions are
                detected, timestamped, and surfaced in audit reports for academic review.
              </p>
            </div>
          </Reveal>

          <div className="d5-sec-grid">
            <div>
              <h3 className="d5-h3">Detection signals</h3>
              <ul className="d5-sec-signals">
                {[
                  'Tab switching',
                  'Window focus loss',
                  'Fullscreen exit',
                  'Suspicious window resizing',
                  'Copy / paste / cut attempts',
                  'Right-click / context menu',
                  'Developer tool shortcuts',
                  'Print / save shortcuts',
                  'Screenshot shortcuts',
                  'Restricted keyboard inputs',
                  'Kiosk validation missing',
                  'IP outside lab subnet',
                ].map(s => (
                  <li key={s}>
                    <Icon name="check" size={12} className="d5-sec-check" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="d5-h3">Enforcement controls</h3>
              <div className="d5-enf-list">
                {[
                  { i: 'monitor', t: 'Fullscreen Required', d: 'Blocks exam progression unless fullscreen mode is active' },
                  { i: 'lock', t: 'Kiosk Mode', d: 'Restricts exams to approved kiosk environments only' },
                  { i: 'pin', t: 'Lab / Subnet Lock', d: 'IP-based restriction enforces campus-only access' },
                  { i: 'key', t: 'Password Gate', d: 'Optional access password configured per exam' },
                  { i: 'refresh', t: 'Continuous Sync', d: 'Answers saved continuously; resilient to disconnection' },
                  { i: 'rss', t: 'Audit Logs', d: 'Track faculty actions, exam edits, and score overrides' },
                ].map(e => (
                  <div key={e.t} className="d5-enf-row">
                    <span className="d5-enf-icon"><Icon name={e.i} size={16} /></span>
                    <div>
                      <div className="d5-enf-t">{e.t}</div>
                      <div className="d5-enf-d">{e.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES — editorial portrait grid */}
      <section className="d5-roles" id="d5-roles">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER FIVE · ROLES</div>
              <h2 className="d5-h2">A view for every<br />member of the institution.</h2>
            </div>
          </Reveal>
          <div className="d5-roles-grid">
            {[
              {
                role: 'The Administrator',
                src: '/staffDashboard.png',
                items: [
                  'Manage institutions, departments, batches, and labs',
                  'Bulk-create users and courses with validation',
                  'Configure lab IP subnets for restricted access',
                  'Audit logs across faculty actions and edits',
                ],
              },
              {
                role: 'The Faculty',
                src: '/bankQuestions.png',
                items: [
                  'Build reusable question banks, share with peers',
                  'Configure coding test cases and reference solutions',
                  'Schedule exams to courses, batches, students, or labs',
                  'Review submissions and override scores manually',
                ],
              },
              {
                role: 'The Student',
                src: '/studentDashboard.png',
                items: [
                  'See active, upcoming, completed, and missed quizzes',
                  'Distraction-free exam interface with real-time timer',
                  'Continuous answer sync resilient to disconnections',
                  'Detailed results when faculty publishes them',
                ],
              },
            ].map((r, i) => (
              <Reveal key={r.role} delay={i * 80}>
                <article className="d5-role">
                  <div className="d5-role-frame">
                    <img src={r.src} alt={r.role} />
                    <div className="d5-role-plate">{`PLATE ${i + 2}`}</div>
                  </div>
                  <h3 className="d5-role-title">{r.role}</h3>
                  <ul className="d5-role-list">
                    {r.items.map(it => (
                      <li key={it}>
                        <span className="d5-role-bullet">—</span>
                        {it}
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
      <section className="d5-content">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER SIX · CONTENT TOOLS</div>
              <h2 className="d5-h2">Built for academic depth.</h2>
            </div>
          </Reveal>
          <div className="d5-content-grid">
            {[
              { i: 'edit', t: 'Rich-text editor', d: 'Bold, italic, lists, code blocks, quotes, horizontal rules.' },
              { i: 'bookOpen', t: 'LaTeX support', d: 'Mathematical and scientific notation in question content.' },
              { i: 'upload', t: 'Image embedding', d: 'Inline images in questions; signed access links.' },
              { i: 'download', t: 'File submissions', d: 'Accept student file uploads where permitted by question type.' },
              { i: 'tag', t: "Bloom's taxonomy", d: 'Tag every question — Remember, Understand, Apply, Analyze, Evaluate, Create.' },
              { i: 'flag', t: 'CO mapping', d: 'CO1 through CO8 alignment for accreditation reports.' },
              { i: 'database', t: 'Bulk MCQ upload', d: 'Spreadsheet import with row-level validation and templates.' },
              { i: 'share', t: 'Bank sharing', d: 'Share question banks with controlled access; revoke at any time.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 40}>
                <div className="d5-c-item">
                  <Icon name={c.i} size={20} className="d5-c-icon" />
                  <div>
                    <div className="d5-c-t">{c.t}</div>
                    <div className="d5-c-d">{c.d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d5-cta">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-cta-rule" />
            <div className="d5-cta-eyebrow">SUBSCRIPTION & DEMO</div>
            <h2 className="d5-cta-h">
              Ready to bring rigour and<br />
              <span className="d5-italic">reliability</span> to your assessments?
            </h2>
            <p className="d5-cta-sub">
              Schedule a demonstration with our team. Self-hosted deployment options
              available for institutions that require data sovereignty.
            </p>
            <div className="d5-cta-btns">
              <button className="d5-cta-primary">
                Schedule a Demonstration
                <Icon name="arrowRight" size={14} />
              </button>
              <button className="d5-cta-text" onClick={onBrochure}>
                <Icon name="download" size={14} /> Download Brochure
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="d5-footer">
        <div className="d5-footer-inner">
          <div className="d5-footer-left">
            <div className="d5-logo">
              <span className="d5-logo-mark">
                <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
                  <path d="M18 3 L33 11 L33 25 L18 33 L3 25 L3 11 Z" fill="none" stroke="#1f4e2c" strokeWidth="1.4" />
                </svg>
              </span>
              <span className="d5-logo-name">Evolveus</span>
            </div>
            <p className="d5-footer-tagline">
              Digital assessment for higher education. Battle-tested at scale.
            </p>
          </div>
          <p className="d5-footer-copy">© 2026 Evolveus · Vol. I, No. 1</p>
        </div>
      </footer>
    </div>
  );
}
