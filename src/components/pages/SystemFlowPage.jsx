import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/systemflow.css";

const STEPS = [
  {
    num: "01",
    verb: "Author",
    title: "Question Creation",
    desc: "Build banks across formats. Bulk-upload from Excel, or generate exam-ready questions from a syllabus PDF.",
  },
  {
    num: "02",
    verb: "Configure",
    title: "Exam Setup",
    desc: "Time limits, attempt rules, randomised ordering, negative marking, subnet-based access — set once, applied everywhere.",
  },
  {
    num: "03",
    verb: "Conduct",
    title: "Secure Delivery",
    desc: "Tab switches, full-screen exits, copy-paste — all detected and logged in real time. Kiosk mode for lab environments.",
  },
  {
    num: "04",
    verb: "Evaluate",
    title: "Automated Grading",
    desc: "MCQ, LLM-graded descriptive, coding test cases, semantic fill-in-the-blank — without manual intervention.",
    flagship: true,
  },
  {
    num: "05",
    verb: "Analyse",
    title: "Insight Surface",
    desc: "Per-student breakdowns, class-wide trends, exportable audit-ready reports — faculty act on data, not just collect it.",
  },
  {
    num: "06",
    verb: "Refine",
    title: "Continuous Loop",
    desc: "Weak-topic signals from analytics feed back into question generation. Each cycle, the exam bank sharpens.",
  },
];

export default function SystemFlowPage() {
  return (
    <div className="page p3">
      <PageHeader folio="03" />

      <div className="p3-stage">
        <div className="p3-top">
          <div className="kicker">Chapter II — The System</div>
          <h2 className="p3-headline">
            Six steps.
            <br />
            One <em>continuous</em> loop.
          </h2>
          <p className="p3-lede">
            Each step feeds the next. Authoring shapes configuration, proctoring
            sharpens evaluation, analytics close the loop back into authoring.
          </p>
        </div>

        <div className="p3-grid">
          {STEPS.map(({ num, verb, title, desc, flagship }) => (
            <article
              key={num}
              className={`p3-step${flagship ? " p3-step--flag" : ""}`}
            >
              <div className="p3-step-head">
                <span className="p3-step-num">{num}</span>
                <span className="p3-step-verb">{verb}</span>
              </div>
              <h3 className="p3-step-title">{title}</h3>
              <p className="p3-step-desc">{desc}</p>
            </article>
          ))}
        </div>

        <div className="p3-loop">
          <svg
            className="p3-loop-line"
            viewBox="0 0 800 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M 4 20 Q 200 -10 400 20 T 796 20"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3 4"
            />
          </svg>
          <p className="p3-loop-text">
            <em>Insight</em> from step 05 becomes <em>authoring</em> in step 01.
          </p>
        </div>
      </div>

      <PageFooter chapter="The System" />
    </div>
  );
}
