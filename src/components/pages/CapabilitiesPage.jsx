import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/capabilities.css";

const PILLARS = [
  {
    n: "I",
    title: "Examination",
    sub: "Author. Schedule. Deliver.",
    body: "Build banks across MCQ, descriptive, coding, file upload, matching, and fill-in-the-blank. Configure timing, participants, access rules, and marking globally or per question.",
    items: [
      "Bulk import + templates",
      "Sections + bank reuse",
      "Course, batch, lab assignment",
    ],
  },
  {
    n: "II",
    title: "Analytics",
    sub: "See exactly where every student stands.",
    body: "Student-wise responses, question-wise outcomes, submission status, evaluation status, and exportable audit-ready reports — informing the next exam, not just summarising the last.",
    items: [
      "Student + question review",
      "Violation-aware results",
      "Publish / hide control",
    ],
    flagship: true,
  },
  {
    n: "III",
    title: "Integrity",
    sub: "Defensible at every level.",
    body: "Password gates, fullscreen enforcement, kiosk mode, lab/IP subnet locks, role-based access, and violation tracking. Every decision leaves a trail.",
    items: ["Fullscreen + kiosk", "Lab subnet locks", "RBAC + RLS-ready"],
  },
];

const FORMATS = [
  "Multiple choice",
  "True / false",
  "Descriptive",
  "Coding",
  "Fill-in-the-blank",
  "Match the following",
  "File Upload",
];

export default function CapabilitiesPage() {
  return (
    <div className="page p4">
      <PageHeader folio="04" />

      <div className="p4-stage">
        <div className="p4-top">
          <div className="kicker">Chapter III — Capabilities</div>
          <h2 className="p4-headline">
            Three pillars,
            <br />
            <em>built to compose.</em>
          </h2>
        </div>

        <div className="p4-pillars">
          {PILLARS.map(({ n, title, sub, body, items, flagship }) => (
            <article
              key={n}
              className={`p4-pillar${flagship ? " p4-pillar--flag" : ""}`}
            >
              <div className="p4-pillar-num">{n}</div>
              <div className="p4-pillar-content">
                <h3 className="p4-pillar-title">{title}</h3>
                <p className="p4-pillar-sub">{sub}</p>
                <p className="p4-pillar-body">{body}</p>
                <ul className="p4-pillar-items">
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="p4-formats">
          <div className="p4-formats-key">
            <div className="caption">Question formats supported</div>
            <div className="p4-formats-line" />
          </div>
          <div className="p4-formats-list">
            {FORMATS.map((f, i) => (
              <span key={f} className="p4-format">
                <span className="p4-format-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <PageFooter chapter="Capabilities" />
    </div>
  );
}
