import { Icon } from '../_shared/Icon';
import { useScrollY, useReveal } from '../_shared/useParallax';
import './Design4.css';

const FEATURES = [
  { n: '01', icon: 'code', t: 'Coding Evaluation', d: 'Execute submitted code against test cases. Award partial marks by ratio of passed cases. Supports 7 languages. Time and memory limits per question.' },
  { n: '02', icon: 'shieldCheck', t: 'Secure Examination', d: 'Fullscreen enforcement, tab-switch detection, kiosk mode, IP and subnet restrictions combine to create a controlled exam environment.' },
  { n: '03', icon: 'database', t: 'Question Bank', d: 'Build reusable banks organised by topic. Tag by Bloom\'s taxonomy level (Remember → Create) and course outcome (CO1–CO8). Randomise per student.' },
  { n: '04', icon: 'brain', t: 'AI-Assisted Grading', d: 'Descriptive and fill-in-the-blank questions evaluated by AI — accounting for synonyms and semantic equivalence. Faculty supply marking criteria.' },
  { n: '05', icon: 'users', t: 'Role-Based Access', d: 'Admin, Manager, Faculty, Student — each sees their own tools. Row-level security enforced at the database layer. Tenant data separation.' },
  { n: '06', icon: 'chart', t: 'Analytics & Audit', d: 'Per-student, per-question, and class-wide breakdowns. Submission tracking with violations. Audit logs across faculty edits and overrides.' },
  { n: '07', icon: 'building', t: 'Institution Management', d: 'Centralised setup of departments, batches, semesters, courses, instructors, and labs. Bulk-create entities via spreadsheet.' },
  { n: '08', icon: 'edit', t: 'Content Tools', d: 'Rich-text editor, LaTeX, image embedding, file uploads. Built for academic content with formatting tools faculty actually need.' },
  { n: '09', icon: 'refresh', t: 'Continuous Sync', d: 'Answers saved to server in real time. Network drops and refreshes never lose progress. Resilient exam state during active sessions.' },
];

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`d4-reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Design4({ onBrochure }) {
  const y = useScrollY();
  return (
    <div className="d4">
      <div className="d4-deco" style={{ transform: `translateY(${y * 0.25}px)` }}>
        <span /><span /><span />
      </div>

      {/* NAV */}
      <nav className="d4-nav">
        <div className="d4-nav-inner">
          <div className="d4-logo">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" fill="none" stroke="#111" strokeWidth="2" />
              <rect x="6" y="6" width="12" height="12" fill="#e63946" />
            </svg>
            <span>EVOLVEUS</span>
          </div>
          <div className="d4-nav-links">
            <a href="#d4-features">Features</a>
            <a href="#d4-coding">Coding</a>
            <a href="#d4-formats">Formats</a>
            <a href="#d4-security">Security</a>
          </div>
          <button className="d4-nav-cta" onClick={onBrochure}>
            Brochure <Icon name="arrowRight" size={12} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="d4-hero">
        <div className="d4-hero-inner">
          <div className="d4-hero-left">
            <p className="d4-kicker">DIGITAL ASSESSMENT PLATFORM — 2026</p>
            <h1 className="d4-h1">
              Assess.<br />
              Execute.<br />
              <span className="d4-accent">Grade.</span>
            </h1>
            <div className="d4-hero-rule" />
            <p className="d4-hero-sub">
              Evolveus automates the entire assessment lifecycle — from question
              creation to code execution to final grading. Built for institutions
              that demand precision, deployable on infrastructure you control.
            </p>
            <div className="d4-hero-btns">
              <button className="d4-btn-primary">
                Request Demo <Icon name="arrowRight" size={13} />
              </button>
              <button className="d4-btn-outline" onClick={onBrochure}>
                <Icon name="bookOpen" size={13} /> Brochure
              </button>
            </div>
          </div>
          <div className="d4-hero-right">
            <Reveal>
              <div className="d4-stats-block">
                {[
                  { n: '2,000+', l: 'Quizzes conducted' },
                  { n: '200k+', l: 'Responses scored' },
                  { n: '7', l: 'Languages supported' },
                  { n: '8', l: 'Question types' },
                ].map(s => (
                  <div key={s.l} className="d4-stat-item">
                    <span className="d4-stat-n">{s.n}</span>
                    <span className="d4-stat-l">{s.l}</span>
                    <div className="d4-stat-rule" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CODING SECTION */}
      <section className="d4-coding" id="d4-coding">
        <div className="d4-section-inner">
          <Reveal>
            <div className="d4-section-header">
              <p className="d4-kicker">CODING ASSESSMENT</p>
              <div className="d4-section-title-row">
                <h2 className="d4-h2">Code runs.<br />Marks are instant.</h2>
                <div className="d4-title-line" />
              </div>
            </div>
          </Reveal>

          <div className="d4-coding-layout">
            <Reveal>
              <div className="d4-coding-desc">
                <p>
                  Evolveus compiles and executes student code in a sandboxed
                  environment. Faculty define test cases — visible for demonstration,
                  hidden for rigorous evaluation. Partial marking is calculated
                  automatically based on cases passed.
                </p>
                <div className="d4-langs-row">
                  {['Python', 'Java', 'C++', 'JavaScript', 'C', 'Octave', 'Scala'].map(l => (
                    <span key={l} className="d4-lang">{l}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="d4-code-steps">
                {[
                  { i: 'edit', t: 'Student writes code in the browser editor with boilerplate support' },
                  { i: 'cpu', t: 'Submission executes in an isolated container — time and memory limits enforced' },
                  { i: 'eye', t: 'Each test case runs; visible cases shown to student, hidden cases evaluate edge conditions' },
                  { i: 'award', t: 'Partial marks calculated: cases passed ÷ total cases × max marks' },
                ].map((s, i) => (
                  <div key={i} className="d4-step">
                    <span className="d4-step-icon"><Icon name={s.i} size={14} /></span>
                    <span className="d4-step-text">{s.t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="d4-code-example">
              <div className="d4-code-label">PARTIAL MARKING EXAMPLE — CS301 MIDTERM</div>
              <div className="d4-code-visual">
                {[
                  { id: 'test_case_01', s: 'pass', p: '2.0 / 2.0' },
                  { id: 'test_case_02', s: 'pass', p: '2.0 / 2.0' },
                  { id: 'test_case_03', s: 'pass', p: '2.0 / 2.0' },
                  { id: 'test_case_04', s: 'fail', p: '0.0 / 2.0' },
                  { id: 'test_case_05', s: 'pass', p: '2.0 / 2.0' },
                ].map(t => (
                  <div key={t.id} className={`d4-test-row d4-${t.s}`}>
                    <span className="d4-test-icon">
                      <Icon name={t.s === 'pass' ? 'check' : 'alert'} size={13} />
                    </span>
                    <span className="d4-test-name">{t.id}</span>
                    <span className="d4-test-result">{t.s.toUpperCase()}</span>
                    <span className="d4-test-marks">{t.p}</span>
                  </div>
                ))}
                <div className="d4-test-total">
                  <span>Total</span>
                  <span className="d4-total-score">8.0 / 10.0</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="d4-features" id="d4-features">
        <div className="d4-section-inner">
          <Reveal>
            <p className="d4-kicker">PLATFORM CAPABILITIES</p>
          </Reveal>
          <div className="d4-feat-grid">
            {FEATURES.map((f, i) => (
              <Reveal key={f.n} delay={i * 50}>
                <div className="d4-feat-item">
                  <div className="d4-feat-header">
                    <span className="d4-feat-n">{f.n}</span>
                    <Icon name={f.icon} size={16} className="d4-feat-icon" />
                    <div className="d4-feat-line" />
                  </div>
                  <h3 className="d4-feat-t">{f.t}</h3>
                  <p className="d4-feat-d">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTION TYPES */}
      <section className="d4-qtypes" id="d4-formats">
        <div className="d4-section-inner">
          <div className="d4-qtypes-row">
            <Reveal>
              <div className="d4-qtypes-left">
                <p className="d4-kicker">ASSESSMENT FORMATS</p>
                <h2 className="d4-h2-sm">8 question types.<br />One platform.</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="d4-qtypes-right">
                {[
                  { n: 'Single-correct MCQ', tag: '' },
                  { n: 'Multiple-correct MCQ', tag: '' },
                  { n: 'True / False', tag: '' },
                  { n: 'Descriptive (long-form)', tag: 'AI-ASSISTED' },
                  { n: 'Fill-in-the-blank', tag: 'AI-GRADED' },
                  { n: 'Match-the-following', tag: '' },
                  { n: 'File upload', tag: '' },
                  { n: 'Coding', tag: 'EXECUTED' },
                ].map((q, i) => (
                  <div key={q.n} className="d4-qtype-row">
                    <span className="d4-qtype-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="d4-qtype-name">{q.n}</span>
                    {q.tag && <span className="d4-qtype-tag">{q.tag}</span>}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="d4-security" id="d4-security">
        <div className="d4-section-inner">
          <Reveal>
            <p className="d4-kicker">EXAM INTEGRITY</p>
          </Reveal>
          <div className="d4-sec-row">
            <Reveal>
              <h2 className="d4-h2-sm">Every violation<br />is on record.</h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="d4-sec-right">
                <div className="d4-viol-table">
                  {[
                    ['TAB_SWITCH', 'LOGGED'],
                    ['FULLSCREEN_EXIT', 'FLAGGED'],
                    ['COPY_ATTEMPT', 'BLOCKED'],
                    ['DEVTOOLS_OPEN', 'BLOCKED'],
                    ['RIGHT_CLICK', 'BLOCKED'],
                    ['SCREENSHOT_SHORTCUT', 'LOGGED'],
                    ['PRINT_SHORTCUT', 'BLOCKED'],
                    ['WINDOW_FOCUS_LOSS', 'LOGGED'],
                    ['SUSPICIOUS_RESIZE', 'LOGGED'],
                    ['KIOSK_INVALID', 'ACCESS DENIED'],
                    ['IP_OUTSIDE_SUBNET', 'ACCESS DENIED'],
                    ['RESTRICTED_KEY', 'BLOCKED'],
                  ].map(([v, s]) => (
                    <div key={v} className="d4-viol-row">
                      <span className="d4-viol-name">{v}</span>
                      <span className={`d4-viol-status ${s === 'ACCESS DENIED' ? 'd4-status-block' : s === 'FLAGGED' ? 'd4-status-flag' : s === 'BLOCKED' ? 'd4-status-block' : 'd4-status-log'}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="d4-roles">
        <div className="d4-section-inner">
          <Reveal>
            <p className="d4-kicker">ROLE-BASED ACCESS</p>
            <h2 className="d4-h2-sm">Four roles.<br />One platform.</h2>
          </Reveal>
          <div className="d4-roles-grid">
            {[
              { role: 'Administrator', icon: 'building', items: ['Manage institutions, departments, batches', 'Configure labs and IP subnets', 'Bulk-create users and courses', 'Audit logs and platform metrics'] },
              { role: 'Semester Manager', icon: 'flag', items: ['Oversee courses within their semester', 'Manage instructors and assessments', 'Bulk-create courses', 'Review semester analytics'] },
              { role: 'Faculty', icon: 'edit', items: ['Build reusable question banks', 'Create exams with sections', 'Configure coding test cases', 'Override scores manually'] },
              { role: 'Student', icon: 'graduation', items: ['Live and upcoming quizzes', 'Distraction-free exam interface', 'Real-time timer & auto-submit', 'Continuous answer sync'] },
            ].map((r, i) => (
              <Reveal key={r.role} delay={i * 70}>
                <div className="d4-role-card">
                  <div className="d4-role-head">
                    <Icon name={r.icon} size={16} />
                    <span className="d4-role-name">{r.role.toUpperCase()}</span>
                  </div>
                  <ul className="d4-role-list">
                    {r.items.map(it => (
                      <li key={it}>
                        <span className="d4-role-arrow">→</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d4-cta">
        <div className="d4-section-inner">
          <div className="d4-cta-inner">
            <Reveal>
              <div className="d4-cta-left">
                <h2 className="d4-cta-h">Ready?</h2>
                <p className="d4-cta-sub">
                  Evolveus is ready for institutional deployment on your own
                  infrastructure. Scalable, auditable, and built for academic
                  workflows.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="d4-cta-right">
                <button className="d4-btn-primary d4-btn-lg">
                  Request Demo <Icon name="arrowRight" size={14} />
                </button>
                <button className="d4-btn-text" onClick={onBrochure}>
                  View Brochure <Icon name="arrowRight" size={11} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="d4-footer">
        <div className="d4-footer-inner">
          <div className="d4-logo">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" fill="none" stroke="#111" strokeWidth="2" />
              <rect x="6" y="6" width="12" height="12" fill="#e63946" />
            </svg>
            <span>EVOLVEUS</span>
          </div>
          <p className="d4-footer-copy">© 2026 Evolveus</p>
        </div>
      </footer>
    </div>
  );
}
