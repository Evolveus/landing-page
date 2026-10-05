import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import { Rubric, ScoreFoot, SideNotes, StatStrip } from "../Layout/Spread";
import "../../styles/advanced.css";

const RUBRIC = [
  { state: "ok", label: "Defines deadlock correctly", score: "2 / 2" },
  { state: "ok", label: "Lists 4 Coffman conditions", score: "2 / 2" },
  { state: "ok", label: "Concrete example with resources", score: "2 / 2" },
  { state: "warn", label: "Discusses prevention strategy", score: "1 / 4" },
];

const STATS = [
  { num: "6 hr", sub: "6 min", cap: "Cycle turnaround" },
  { num: "7", cap: "Coding languages" },
  { num: "8", cap: "Question formats" },
  { num: "100%", cap: "Audit-ready, by default" },
];

const SIDE = {
  steps: {
    caption: "How it works",
    items: [
      ["Faculty defines a rubric", "Criteria, weights, key points — set once, applied everywhere."],
      ["LLM scores per criterion", "Each rubric line gets an independent score with rationale."],
      ["Faculty reviews edge cases", "Borderline scores surface for review; clear ones land graded."],
    ],
  },
  bullets: {
    caption: "Why it scales",
    items: [
      "Semantic understanding — partial credit for partial reasoning, not keyword counting.",
      "Coding support — boilerplate, driver code, reference solutions, visible and hidden test cases.",
      "Rich question content — images, files, LaTeX, preview, and protected attachment access.",
      "Full audit trail — rubric, score, and rationale on every response. Defensible at appeal.",
    ],
  },
};

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
              <Rubric className="p5-rubric" row="p5-rub" items={RUBRIC} />

              <ScoreFoot base="p5-mock" note="graded · 0.74s" score="7 / 10" />
            </div>
          </div>

          <SideNotes p="p5" {...SIDE} />
        </div>

        <StatStrip p="p5" stats={STATS} />
      </div>

      <PageFooter chapter="The Hard Part" />
    </div>
  );
}
