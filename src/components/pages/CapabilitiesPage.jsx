import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/capabilities.css";

const PILLARS = [
  {
    n: "I",
    title: "Examination",
    sub: "Author. Schedule. Deliver.",
    body: "Build banks across MCQ, descriptive, coding, and fill-in-the-blank. Configure timing, access rules, and negative marking globally or per question.",
    items: [
      "Bulk import + AI authoring",
      "Per-student randomisation",
      "Linear & adaptive quizzes",
    ],
  },
  {
    n: "II",
    title: "Analytics",
    sub: "See exactly where every student stands.",
    body: "Real-time cohort dashboards, per-question difficulty, exportable audit-ready reports — informing the next exam, not just summarising the last.",
    items: [
      "Live cohort dashboards",
      "Per-question difficulty",
      "Audit-ready exports",
    ],
    flagship: true,
  },
  {
    n: "III",
    title: "Integrity",
    sub: "Defensible at every level.",
    body: "Kiosk mode, IP/subnet locks, role-based access, full audit logs with score-override tracking. Every decision leaves a trail.",
    items: ["Kiosk + subnet locks", "RBAC across roles", "Full override audit"],
  },
];

const FORMATS = [
  "Multiple choice",
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
