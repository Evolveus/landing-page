import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/problem.css";

const SHIFTS = [
  {
    metric: "Grading a 420-paper mid-term",
    before: "6 days",
    after: "14 minutes",
    note: "AI grades, faculty reviews edge cases — defensible at appeal.",
  },
  {
    metric: "Tools per assessment cycle",
    before: "6 + apps",
    after: "One platform",
    note: "Authoring, proctoring, grading, analytics — under a single login.",
  },
  {
    metric: "When faculty see weak topics",
    before: "After term",
    after: "Live",
    note: "Question-level analytics surface in real time, not in retrospect.",
  },
  {
    metric: "Descriptive answers, scored by",
    before: "A human",
    after: "A rubric",
    note: "LLM applies faculty-defined criteria; no keyword matching.",
  },
];

export default function ProblemSolutionPage() {
  return (
    <div className="page p2">
      <PageHeader folio="02" />

      <div className="p2-stage">
        <div className="kicker">Chapter I — The Gap</div>

        <h2 className="p2-headline">
          The classroom moved on.
          <br />
          Most evaluation tools <em>didn't.</em>
        </h2>

        <p className="p2-lede">
          <span className="dropcap-letter">M</span>odern institutions still stitch assessment together by hand — paper
          for some courses, half a dozen quiz apps for others, spreadsheets to
          glue it all back. It scales by adding people, not by adding
          intelligence. Evolveus replaces that stack with a single platform
          built for evaluation at institutional volume.
        </p>

        <div className="p2-shift">
          <div className="p2-shift-head">
            <span className="caption">Then</span>
            <span className="caption">Now, with Evolveus</span>
          </div>

          <div className="p2-shift-body">
            {SHIFTS.map(({ metric, before, after, note }, i) => (
              <article key={metric} className="p2-row">
                <div className="p2-row-num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="p2-row-metric">{metric}</div>
                <div className="p2-row-before">{before}</div>
                <div className="p2-row-arrow">→</div>
                <div className="p2-row-after">{after}</div>
                <div className="p2-row-note">{note}</div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <PageFooter chapter="The Gap" />
    </div>
  );
}
