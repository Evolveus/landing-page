import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/systemflow.css";

const STEPS = [
  {
    num: "01",
    verb: "Author",
    title: "Question Creation",
    desc: "Build topic-wise banks across formats. Add difficulty, Bloom level, CO1-CO8 mapping, solutions, marks, and negative marks.",
  },
  {
    num: "02",
    verb: "Configure",
    title: "Exam Setup",
    desc: "Set duration, schedule, sections, participants, lab access, password gates, shuffle rules, linear flow, and result visibility.",
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
    desc: "MCQ, descriptive, fill-in-the-blank, matching, file upload, and coding submissions move into the right review path.",
    flagship: true,
  },
  {
    num: "05",
    verb: "Analyse",
    title: "Insight Surface",
    desc: "Per-student responses, question performance, submission status, score overrides, and violation records sit in one view.",
  },
  {
    num: "06",
    verb: "Operate",
    title: "Deployment Loop",
    desc: "Self-hosted readiness, secure file storage, background auto-submit jobs, and durable exam state keep the system dependable.",
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
