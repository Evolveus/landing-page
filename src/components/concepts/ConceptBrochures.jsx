import heroAsset from "../../assets/hero.png";
import "../../styles/concepts.css";

const impact = [
  ["2,000+", "quizzes conducted"],
  ["2,00,000", "responses processed"],
  ["93%", "faculty agreement"],
  ["0.8s", "avg. response grade"],
];

function Mark({ light = false }) {
  return (
    <div
      className={`concept-wordmark${light ? " concept-wordmark--light" : ""}`}
    >
      <span className="concept-mark" />
      <span>Evolveus</span>
    </div>
  );
}

function ConceptLabel({ name, direction }) {
  return (
    <section className="concept-divider">
      <div>
        <span>{direction}</span>
        <h1>{name}</h1>
      </div>
      <p>Independent visual route for Evolveus · A4 brochure system</p>
    </section>
  );
}

function GradePanel({ compact = false }) {
  return (
    <div className={`grade-panel${compact ? " grade-panel--compact" : ""}`}>
      <div className="grade-panel__top">
        <span>Descriptive evaluator</span>
        <b>Q4 · CS-301</b>
      </div>
      <p>Explain how a deadlock can occur in a multi-threaded system.</p>
      {[
        ["Correct definition", "2 / 2"],
        ["Four conditions named", "2 / 2"],
        ["Example is specific", "2 / 2"],
        ["Prevention is partial", "1 / 4"],
      ].map(([label, score], index) => (
        <div className="grade-panel__row" key={label}>
          <i>{index === 3 ? "~" : "✓"}</i>
          <span>{label}</span>
          <b>{score}</b>
        </div>
      ))}
      <strong>7 / 10</strong>
    </div>
  );
}

export function EditorialInstitutional({ showLabel = false } = {}) {
  return (
    <>
      {showLabel && (
        <ConceptLabel direction="Direction 01" name="Civic Editorial" />
      )}

      <article className="concept-page civic civic-cover">
        <header>
          <Mark />
          <span>Assessment memorandum · 2026</span>
        </header>
        <main>
          <span>Institutional Evaluation</span>
          <h2>A quieter system for serious exams.</h2>
          <p>
            Evolveus helps universities run authored, proctored, rubric-scored,
            and audit-ready assessment without turning academic judgement into
            clerical work.
          </p>
        </main>
        <aside>
          <b>Prepared for</b>
          <span>
            Departments, examination cells, deans, accreditation teams
          </span>
        </aside>
      </article>

      <article className="concept-page civic civic-brief">
        <header>
          <Mark />
          <span>Briefing note 01</span>
        </header>
        <section>
          <span>What has to change</span>
          <h3>
            The bottleneck is no longer conducting exams. It is returning
            reliable evidence after them.
          </h3>
        </section>
        <div className="civic-columns">
          {[
            [
              "01",
              "Manual correction stretches feedback cycles beyond the moment students can use it.",
            ],
            [
              "02",
              "Separate tools split authoring, proctoring, grading, reports, and accountability.",
            ],
            [
              "03",
              "Descriptive answers need consistency without removing faculty oversight.",
            ],
          ].map(([n, text]) => (
            <p key={n}>
              <b>{n}</b>
              {text}
            </p>
          ))}
        </div>
        <blockquote>
          Evolveus does not ask institutions to trust an opaque score. It gives
          every score a rubric, a trail, and a review path.
        </blockquote>
      </article>

      <article className="concept-page civic civic-map">
        <header>
          <Mark />
          <span>Operating sequence</span>
        </header>
        <h3>One governed line from syllabus to sign-off.</h3>
        <div className="civic-timeline">
          {[
            "Syllabus",
            "Question bank",
            "Secure exam",
            "AI scoring",
            "Faculty review",
            "Cohort report",
          ].map((item, index) => (
            <section key={item}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{item}</span>
            </section>
          ))}
        </div>
        <GradePanel compact />
      </article>

      <article className="concept-page civic civic-close">
        <header>
          <Mark />
          <span>Impact and next step</span>
        </header>
        <h3>
          From delayed correction to defensible institutional intelligence.
        </h3>
        <div>
          {impact.map(([n, l]) => (
            <section key={l}>
              <b>{n}</b>
              <span>{l}</span>
            </section>
          ))}
        </div>
        <footer>
          <span>Invite Evolveus for an examination-cell walkthrough</span>
          <b>evolveus.in · info@evolveus.in</b>
        </footer>
      </article>
    </>
  );
}

export function StructuredEnterprise({ showLabel = false } = {}) {
  return (
    <>
      {showLabel && (
        <ConceptLabel direction="Direction 02" name="Command Center" />
      )}

      <article className="concept-page command command-cover">
        <header>
          <Mark light />
          <span>Platform readiness packet</span>
        </header>
        <main>
          <span className="command-chip">Subscription case · 2026</span>
          <h2>Govern every assessment cycle.</h2>
          <p>
            Evolveus gives universities and enterprise education teams one
            governed assessment platform: authoring, secure delivery, AI
            evaluation, coding tests, analytics, audit trails, and role-based
            administration.
          </p>
        </main>
        <aside className="command-cover-card">
          <b>Why clients subscribe</b>
          <span>
            Lower faculty workload, faster result cycles, defensible grading,
            and analytics leaders can act on.
          </span>
        </aside>
        <div className="command-strip">
          {[
            "AI grading",
            "Coding tests",
            "RBAC",
            "Audit logs",
            "Analytics",
            "LMS-ready",
          ].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </article>

      <article className="concept-page command command-case">
        <header>
          <Mark />
          <span>Business case · the current gap</span>
        </header>
        <section>
          <span className="command-chip">Problem statement</span>
          <h3>The classroom moved on. Most evaluation operations did not.</h3>
          <p>
            Institutions still stitch assessment together with paper, quiz
            tools, spreadsheets, manual correction, separate coding platforms,
            and delayed reports. It scales by adding people, not by adding
            intelligence.
          </p>
        </section>
        <div className="command-before-after">
          {[
            ["Grading a 420-paper mid-term", "6 days", "14 minutes"],
            ["Tools per assessment cycle", "6+ apps", "One platform"],
            ["When weak-topic data appears", "After term", "Live dashboards"],
            [
              "Descriptive scoring logic",
              "Human memory",
              "Faculty rubric + AI",
            ],
          ].map(([label, before, after]) => (
            <article key={label}>
              <b>{label}</b>
              <span>{before}</span>
              <i>→</i>
              <strong>{after}</strong>
            </article>
          ))}
        </div>
      </article>

      <article className="concept-page command command-grid">
        <header>
          <Mark />
          <span>System inventory · one subscription</span>
        </header>
        <h3>
          Every module required to run institutional evaluation, under one
          login.
        </h3>
        <div className="command-matrix">
          {[
            [
              "Question creation",
              "Question banks, bulk Excel import, syllabus PDF generation, MCQ, descriptive, coding, and fill-in formats.",
            ],
            [
              "Exam configuration",
              "Time limits, attempts, random ordering, negative marking, subnet access, and lab-ready controls.",
            ],
            [
              "Secure exams",
              "Tab-switch detection, full-screen exits, copy-paste logs, autosave, timers, and kiosk-mode workflows.",
            ],
            [
              "AI evaluation",
              "Rubric-led descriptive scoring, semantic fill-in checks, MCQ automation, and faculty override sign-off.",
            ],
            [
              "Analytics & reporting",
              "Cohort dashboards, weak-topic signals, question difficulty, exports, and audit-ready evidence.",
            ],
            [
              "Security & scale",
              "RBAC, multi-institution admin, departments, users, score override history, and operational logs.",
            ],
          ].map(([title, text], i) => (
            <section key={title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </article>

      <article className="concept-page command command-ops">
        <header>
          <Mark />
          <span>AI-powered evaluation · defensible by design</span>
        </header>
        <aside>
          <b>Where most platforms stop, Evolveus begins.</b>
          <span>
            Long-form descriptive answers are where manual grading hurts most:
            hours per paper, grader drift, no trail. Evolveus scores against
            faculty criteria, then surfaces edge cases for review.
          </span>
        </aside>
        <GradePanel />
        <div className="command-bars">
          {[
            "Rubric coverage",
            "Faculty review",
            "Audit completeness",
            "Result readiness",
          ].map((label, i) => (
            <section key={label}>
              <span>{label}</span>
              <b style={{ width: `${72 + i * 6}%` }} />
            </section>
          ))}
        </div>
      </article>

      <article className="concept-page command command-code">
        <header>
          <Mark light />
          <span>Coding tests · automatic test-case evaluation</span>
        </header>
        <section>
          <span className="command-chip">
            For programming courses and technical hiring
          </span>
          <h3>
            Code is evaluated like a lab examiner who never misses a test case.
          </h3>
          <p>
            Evolveus runs student submissions against configured test cases,
            reports pass/fail outcomes, and keeps the same audit trail as
            written exams.
          </p>
        </section>
        <CodeEditorPanel />
        <div className="command-code-metrics">
          {[
            ["08", "test cases run"],
            ["06", "passed"],
            ["02", "failed"],
            ["0.42s", "runtime"],
          ].map(([n, l]) => (
            <b key={l}>
              {n}
              <span>{l}</span>
            </b>
          ))}
        </div>
      </article>

      <article className="concept-page command command-analytics">
        <header>
          <Mark />
          <span>Analytics, roles, and institutional control</span>
        </header>
        <h3>Different users. Different rooms. One source of truth.</h3>
        <div className="command-role-grid">
          {[
            [
              "Faculty",
              "Author banks, define rubrics, review AI-graded answers, override with sign-off, and see per-cohort analytics.",
            ],
            [
              "Student",
              "Take exams in a quiet, autosaved interface with timers, secure delivery, and instant objective feedback.",
            ],
            [
              "Administrator",
              "Manage institutions, departments, users, RBAC, platform health, audit trails, and report exports.",
            ],
          ].map(([role, text]) => (
            <section key={role}>
              <b>{role}</b>
              <p>{text}</p>
            </section>
          ))}
        </div>
        <div className="command-dashboard">
          <section>
            <b>Performance analytics</b>
            <span>Weak topics by cohort</span>
            <i />
          </section>
          <section>
            <b>Security & compliance</b>
            <span>Overrides, access, proctoring logs</span>
            <i />
          </section>
          <section>
            <b>Integration capability</b>
            <span>Excel import, exports, LMS-ready flows</span>
            <i />
          </section>
        </div>
      </article>

      <article className="concept-page command command-close">
        <header>
          <Mark light />
          <span>Procurement summary</span>
        </header>
        <h3>
          Subscribe when assessment speed, quality, and accountability matter.
        </h3>
        <p>
          Case study: 420 descriptive papers in CS-301 moved from an estimated
          50-hour manual cycle to a 14-minute Evolveus workflow, with the same
          rubric, faculty review, and defensible audit trail.
        </p>
        <div>
          {impact.map(([n, l]) => (
            <section key={l}>
              <b>{n}</b>
              <span>{l}</span>
            </section>
          ))}
        </div>
        <blockquote>
          Evolveus cut our mid-term turnaround from three days to under thirty
          minutes. The grading on descriptive answers is consistent in a way
          manual review simply isn't.
        </blockquote>
        <footer>
          <b>Request a 30-minute institutional walkthrough</b>
          <span>evolveus.in · info@evolveus.in</span>
        </footer>
      </article>
    </>
  );
}

function CodeEditorPanel() {
  return (
    <div className="code-editor-panel">
      <div className="code-editor-panel__bar">
        <span />
        <span />
        <span />
        <b>student_solution.py</b>
      </div>
      <pre>{`def two_sum(nums, target):
    seen = {}
    for i, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], i]
        seen[value] = i
    return []`}</pre>
      <div className="code-editor-panel__tests">
        {[
          ["✓", "sample_case_01", "passed"],
          ["✓", "duplicate_values", "passed"],
          ["✓", "negative_numbers", "passed"],
          ["×", "empty_input_guard", "failed"],
          ["×", "large_dataset_timeout", "failed"],
        ].map(([state, name, result]) => (
          <section key={name} data-result={result}>
            <i>{state}</i>
            <span>{name}</span>
            <b>{result}</b>
          </section>
        ))}
      </div>
    </div>
  );
}

export function ModernAcademic({ showLabel = false } = {}) {
  return (
    <>
      {showLabel && (
        <ConceptLabel direction="Direction 03" name="Smart Evaluation" />
      )}

      <article className="concept-page smart smart-cover">
        <header>
          <Mark />
          <span>Smart evaluation suite</span>
        </header>
        <main>
          <section>
            <span>AI evaluation platform</span>
            <h2>
              Smart evaluation. <em>Better learning outcomes.</em>
            </h2>
            <p>
              An AI-powered assessment and evaluation platform built for
              teachers, colleges, departments, and academic teams who need fast
              feedback with human control.
            </p>
            <div>
              <b>Book demo</b>
              <span>
                For universities · autonomous colleges · enterprise education
              </span>
            </div>
          </section>
          <ProductMock />
        </main>
      </article>

      <article className="concept-page smart smart-problem">
        <header>
          <Mark />
          <span>01 · why it matters</span>
        </header>
        <h3>
          The education ecosystem is evolving.{" "}
          <em>Evaluation has not kept up.</em>
        </h3>
        <div className="smart-split">
          <section>
            <b>Challenges institutions face today</b>
            {[
              "Manual evaluation delays results",
              "No unified exam workflow",
              "Weak topic visibility arrives too late",
              "Descriptive answers remain hard to scale",
            ].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </section>
          <section>
            <b>A unified evaluation platform</b>
            {[
              "AI-assisted question generation",
              "Secure exam delivery",
              "Rubric-based answer evaluation",
              "Analytics dashboards for academic action",
            ].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </section>
        </div>
        <div className="smart-stats">
          {impact.map(([n, l]) => (
            <span key={l}>
              <b>{n}</b>
              {l}
            </span>
          ))}
        </div>
      </article>

      <article className="concept-page smart smart-flow">
        <header>
          <Mark />
          <span>02 · platform modules</span>
        </header>
        <h3>One platform powering every stage of institutional evaluation.</h3>
        <div>
          {[
            "Question creation",
            "Exam configuration",
            "Secure exams",
            "AI-powered evaluation",
            "Analytics & insights",
            "Performance optimisation",
          ].map((item, i) => (
            <section key={item} className={i === 3 ? "is-hot" : ""}>
              <b>{item}</b>
              <p>
                {
                  [
                    "Upload syllabus, generate banks, structure rubrics.",
                    "Set rules, timings, attempts, and access.",
                    "Run exams with integrity logs and autosave.",
                    "Evaluate objective and descriptive answers at scale.",
                    "See topic gaps, class trends, and item quality.",
                    "Feed reports back into future teaching.",
                  ][i]
                }
              </p>
            </section>
          ))}
        </div>
      </article>

      <article className="concept-page smart smart-close">
        <header>
          <Mark />
          <span>03 · bring it to campus</span>
        </header>
        <h3>Beyond traditional evaluation.</h3>
        <p>
          Give every assessment cycle a measurable loop: create, conduct,
          evaluate, understand, improve.
        </p>
        <ProductMock dark />
        <footer>
          <b>Bring Evolveus to your institution</b>
          <span>Book a walkthrough · evolveus.in</span>
        </footer>
      </article>
    </>
  );
}

function ProductMock({ dark = false }) {
  return (
    <div className={`product-mock${dark ? " product-mock--dark" : ""}`}>
      <div className="product-mock__window">
        <span />
        <span />
        <span />
        <b>Evolveus dashboard</b>
      </div>
      <div className="product-mock__hero">
        <strong>86%</strong>
        <p>Evaluation complete</p>
      </div>
      <div className="product-mock__chart">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="product-mock__list">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function BoldMinimal({ showLabel = false } = {}) {
  return (
    <>
      {showLabel && (
        <ConceptLabel direction="Direction 04" name="Blackline Minimal" />
      )}

      <article className="concept-page blackline blackline-cover">
        <header>
          <Mark />
          <span>Evolveus / Examination OS</span>
        </header>
        <main>
          <h2>Stop grading the past.</h2>
          <p>Start reading what the institution needs to improve next.</p>
        </main>
        <b>01</b>
      </article>

      <article className="concept-page blackline blackline-type">
        <header>
          <Mark />
          <span>Problem</span>
        </header>
        <h3>Exams generate more evidence than institutions can process.</h3>
        <p>
          Evolveus compresses the distance between answer, score, explanation,
          review, report, and action.
        </p>
        <div>
          {["Answer", "Rubric", "Score", "Review", "Report"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </article>

      <article className="concept-page blackline blackline-system">
        <header>
          <Mark />
          <span>System</span>
        </header>
        <div className="blackline-stack">
          {[
            "Create banks",
            "Run exams",
            "Score responses",
            "Explain results",
            "Improve teaching",
          ].map((item, i) => (
            <section key={item}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>{item}</span>
            </section>
          ))}
        </div>
        <img src={heroAsset} alt="" />
      </article>

      <article className="concept-page blackline blackline-close">
        <header>
          <Mark light />
          <span>Impact</span>
        </header>
        <h3>50 hr became 14 min.</h3>
        <div>
          {impact.map(([n, l]) => (
            <section key={l}>
              <b>{n}</b>
              <span>{l}</span>
            </section>
          ))}
        </div>
        <footer>
          <b>Walkthrough</b>
          <span>info@evolveus.in · evolveus.in</span>
        </footer>
      </article>
    </>
  );
}

export default function ConceptBrochures() {
  return (
    <div className="concepts">
      <EditorialInstitutional showLabel />
      <StructuredEnterprise showLabel />
      <ModernAcademic showLabel />
      <BoldMinimal showLabel />
    </div>
  );
}
