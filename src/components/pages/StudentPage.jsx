import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/student.css";

const TOPICS = [
  { label: "Computer Networks", pct: 91, state: "strong" },
  { label: "Algorithms", pct: 88, state: "strong" },
  { label: "Data Structures", pct: 72, state: "ok" },
  { label: "Operating Systems", pct: 65, state: "ok" },
  { label: "Database Systems", pct: 55, state: "weak" },
];

const FEEDBACK_RUBRIC = [
  { state: "ok",   label: "Divide step described",      score: "2 / 2" },
  { state: "ok",   label: "Merge operation correct",    score: "2 / 2" },
  { state: "ok",   label: "Time complexity stated",     score: "2 / 2" },
  { state: "warn", label: "Space complexity analysis",  score: "1 / 4" },
];

const STATS = [
  { num: "< 1s", cap: "Result after submission" },
  { num: "Topic", cap: "Granularity of breakdown" },
  { num: "+22", cap: "Avg. score gain across term" },
  { num: "100%", cap: "Questions with rationale" },
];

export default function StudentPage() {
  return (
    <div className="page pstu">
      <PageHeader folio="07" />

      <div className="pstu-stage">
        <div className="pstu-top">
          <div className="kicker">Chapter VI — Feedback Loop</div>
          <h2 className="pstu-headline">
            Fast feedback students
            <br />
            <em>can actually act on.</em>
          </h2>
          <p className="pstu-lede">
            Results land in seconds, not days. Every score comes with a
            topic-level breakdown and a view of how understanding has grown
            across the term — so students know exactly where to focus next.
          </p>
        </div>

        <div className="pstu-spread">
          <div className="pstu-mock">
            <div className="pstu-mock-bar">
              <span className="pstu-mock-tag">STUDENT RESULTS</span>
              <span className="pstu-mock-meta">21CS084 · CS-301</span>
            </div>

            <div className="pstu-mock-body">
              <div className="pstu-score-row">
                <div className="pstu-score-hero">
                  <span className="pstu-score-num">84</span>
                  <span className="pstu-score-denom">/ 100</span>
                </div>
                <div className="pstu-score-meta">
                  <span className="pstu-score-label">Mid-Term · 2026</span>
                  <span className="pstu-score-delta">↑ +10 from last exam</span>
                </div>
              </div>

              <div className="pstu-section-label">TOPIC BREAKDOWN</div>
              <div className="pstu-bars">
                {TOPICS.map(({ label, pct, state }) => (
                  <div key={label} className="pstu-bar-row">
                    <span className="pstu-bar-label">{label}</span>
                    <div className="pstu-bar-track">
                      <div
                        className="pstu-bar-fill"
                        data-state={state}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="pstu-bar-pct" data-state={state}>
                      {pct}%
                    </span>
                    {state === "weak" && (
                      <span className="pstu-bar-flag">needs focus</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pstu-section-label pstu-section-label--gap">
                LATEST FEEDBACK · Q3 · Data Structures
              </div>
              <div className="pstu-feedback">
                <div className="pstu-feedback-q">
                  Merge Sort — Implementation &amp; Complexity · 10 marks
                </div>
                <blockquote className="pstu-feedback-quote">
                  Good coverage of the divide step and merge operation. The
                  O(n&nbsp;log&nbsp;n) time complexity was correctly stated.
                  Space complexity analysis (O(n) auxiliary) was not addressed
                  — this criterion carries 4 marks.
                </blockquote>
                <div className="pstu-feedback-rubric">
                  {FEEDBACK_RUBRIC.map(({ state, label, score }) => (
                    <div key={label} className="pstu-fb-row">
                      <span className="pstu-fb-tick" data-state={state}>
                        {state === "ok" ? "✓" : "~"}
                      </span>
                      <span className="pstu-fb-label">{label}</span>
                      <span className="pstu-fb-score">{score}</span>
                    </div>
                  ))}
                </div>
                <div className="pstu-feedback-foot">
                  <span className="pstu-feedback-foot-l">graded · 0.74s</span>
                  <span className="pstu-feedback-foot-r">
                    <span>Score</span>
                    <strong>7 / 10</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <aside className="pstu-side">
            <div className="pstu-side-block">
              <div className="caption">What students see</div>
              <ol className="pstu-steps">
                <li>
                  <strong>Score in under a second</strong>
                  <span>
                    Objective questions grade instantly on submit — no waiting
                    for a faculty batch run.
                  </span>
                </li>
                <li>
                  <strong>Topic gaps, not just totals</strong>
                  <span>
                    Every result breaks down by syllabus topic, so students
                    know where understanding fell short.
                  </span>
                </li>
                <li>
                  <strong>Progress across the term</strong>
                  <span>
                    Scores from every quiz in the course accumulate into a
                    visible improvement trend.
                  </span>
                </li>
              </ol>
            </div>

            <div className="pstu-side-block">
              <div className="caption">Why it matters</div>
              <ul className="pstu-bullets">
                <li>
                  Feedback within the learning window — not after the next
                  topic has already started.
                </li>
                <li>
                  Rubric rationale on descriptive answers — students see
                  exactly which criteria they missed and why.
                </li>
                <li>
                  Weak-topic signals are private and actionable, not just a
                  number on a leaderboard.
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="pstu-stats">
          {STATS.map(({ num, cap }, i) => (
            <div key={cap} className="pstu-stat">
              <div className="pstu-stat-num">{num}</div>
              <div className="pstu-stat-cap">{cap}</div>
              {i < STATS.length - 1 && <div className="pstu-stat-div" />}
            </div>
          ))}
        </div>
      </div>

      <PageFooter chapter="Feedback Loop" />
    </div>
  );
}
