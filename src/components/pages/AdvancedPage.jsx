import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/advanced.css";

const RUBRIC = [
  { state: "ok", label: "Defines deadlock correctly", score: "2 / 2" },
  { state: "ok", label: "Lists 4 Coffman conditions", score: "2 / 2" },
  { state: "ok", label: "Concrete example with resources", score: "2 / 2" },
  { state: "warn", label: "Discusses prevention strategy", score: "1 / 4" },
];

const STATS = [
  { num: "6 hr", sub: "6 min", cap: "Cycle turnaround" },
  { num: "97%", sub: "— ", cap: "Rubric criteria addressed" },
  { num: "3×", sub: "— ", cap: "Consistency vs. manual" },
  { num: "100%", sub: "— ", cap: "Audit-ready, by default" },
];

export default function AdvancedPage() {
  return (
    <div className="page p5">
      <PageHeader folio="05" />

      <div className="p5-stage">
        <div className="p5-top">
          <div className="kicker">Chapter IV — The Hard Part</div>
          <h2 className="p5-headline">
            Where most platforms stop,
            <br />
            <em>Evolveus begins.</em>
          </h2>
          <p className="p5-lede">
            Long-form descriptive answers are where manual grading hurts most —
            hours per paper, drift between graders, no audit trail. Faculty
            define mark-allocation guidelines per criterion; Evolveus applies
            them at scale.
          </p>
        </div>

        <div className="p5-spread">
          <div className="p5-mock">
            <div className="p5-mock-bar">
              <span className="p5-mock-tag">DESCRIPTIVE EVALUATOR</span>
              <span className="p5-mock-meta">Q4 · 21CS084 · 12:41</span>
            </div>

            <div className="p5-mock-body">
              <div className="p5-mock-eyebrow">PROMPT — 10 marks</div>
              <p className="p5-mock-q">
                Explain how a deadlock can occur in a multi-threaded system.
              </p>

              <div className="p5-mock-eyebrow p5-mock-eyebrow--gap">
                STUDENT ANSWER · 86 words
              </div>
              <p className="p5-mock-a">
                A deadlock happens when two threads each hold a resource the
                other wants. The four conditions are mutual exclusion, hold and
                wait, no preemption, and circular wait.{" "}
                <span className="p5-mock-hi">
                  Thread A locks file1 and asks for file2 while thread B locks
                  file2 and asks for file1.
                </span>
              </p>

              <div className="p5-mock-eyebrow p5-mock-eyebrow--gap">
                RUBRIC — 3/4 met
              </div>
              <div className="p5-rubric">
                {RUBRIC.map(({ state, label, score }) => (
                  <div key={label} className="p5-rub-row">
                    <span className="p5-rub-tick" data-state={state}>
                      {state === "ok" ? "✓" : "~"}
                    </span>
                    <span className="p5-rub-label">{label}</span>
                    <span className="p5-rub-score">{score}</span>
                  </div>
                ))}
              </div>

              <div className="p5-mock-foot">
                <span className="p5-mock-foot-l">graded · 0.74s</span>
                <span className="p5-mock-foot-r">
                  <span>Score</span>
                  <strong>7 / 10</strong>
                </span>
              </div>
            </div>
          </div>

          <aside className="p5-side">
            <div className="p5-side-block">
              <div className="caption">How it works</div>
              <ol className="p5-steps">
                <li>
                  <strong>Faculty defines a rubric</strong>
                  <span>
                    Criteria, weights, key points — set once, applied
                    everywhere.
                  </span>
                </li>
                <li>
                  <strong>LLM scores per criterion</strong>
                  <span>
                    Each rubric line gets an independent score with rationale.
                  </span>
                </li>
                <li>
                  <strong>Faculty reviews edge cases</strong>
                  <span>
                    Borderline scores surface for review; clear ones land
                    graded.
                  </span>
                </li>
              </ol>
            </div>

            <div className="p5-side-block">
              <div className="caption">Why it scales</div>
              <ul className="p5-bullets">
                <li>
                  Semantic understanding — partial credit for partial reasoning,
                  not keyword counting.
                </li>
                <li>
                  Customisable rubrics per question — define criteria, weights,
                  key concepts.
                </li>
                <li>
                  Full audit trail — rubric, score, and rationale on every
                  response. Defensible at appeal.
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="p5-stats">
          {STATS.map(({ num, sub, cap }, i) => (
            <div key={cap} className="p5-stat">
              <div className="p5-stat-num">
                {num}
                {sub !== "— " && <span className="p5-stat-sub">→ {sub}</span>}
              </div>
              <div className="p5-stat-cap">{cap}</div>
              {i < STATS.length - 1 && <div className="p5-stat-div" />}
            </div>
          ))}
        </div>
      </div>

      <PageFooter chapter="The Hard Part" />
    </div>
  );
}
