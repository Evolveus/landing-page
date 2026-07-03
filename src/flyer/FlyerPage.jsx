import { useRef, useState } from "react";
import { Icon } from "../landing/_shared/Icon";
import "./FlyerPage.css";

const STATS = [
  { n: "2,000+", l: "Quizzes run" },
  { n: "200K+", l: "Responses scored" },
  { n: "99.9%", l: "Uptime SLA" },
  { n: "8", l: "Question types" },
];

const PILLARS = [
  {
    n: "I",
    icon: "code",
    title: "Coding Assessment",
    body: "Sandboxed execution with visible and hidden test cases, partial marking, and time & memory limits across seven languages.",
  },
  {
    n: "II",
    icon: "database",
    title: "Question Bank",
    body: "Reusable banks organised by topic, tagged with Bloom's taxonomy and course outcomes. Bulk upload via spreadsheet.",
  },
  {
    n: "III",
    icon: "shieldCheck",
    title: "Secure Examination",
    body: "Twelve violation signals tracked live — tab-switch detection, kiosk mode, IP restriction, and per-submission audit logs.",
  },
  {
    n: "IV",
    icon: "brain",
    title: "AI Evaluation",
    body: "LLM-assisted grading for descriptive and fill-in-blank answers. Bring your own key, any provider — faculty always in control.",
  },
  {
    n: "V",
    icon: "chart",
    title: "Analytics & Reporting",
    body: "Per-student, per-question and class-wide breakdowns with CO attainment tracking. Accreditation-ready exports.",
  },
  {
    n: "VI",
    icon: "building",
    title: "Institution Management",
    body: "Departments, semesters, batches, courses and labs centralised, with role-based access for every user type.",
  },
];

const AI_EVAL = {
  icon: "brain",
  title: "AI evaluation, on your terms",
  body: "Descriptive answers and fill-in-the-blanks graded by the model you choose — OpenAI, Anthropic, Google, Azure, or any OpenAI-compatible endpoint.",
  bullets: [
    "Bring your own key — responses never leave your evaluation call",
    "Rubric-based scoring returned with transparent reasoning",
    "Semantic matching accepts synonyms and equivalent phrasing",
    "Faculty reviews and can override every AI score",
  ],
};

const PERFORMANCE = {
  icon: "bolt",
  title: "Built for scale & uptime",
  body: "Engineered to stay fast and online through peak exam load, on infrastructure you can trust.",
  bullets: [
    "99.9% availability with zero-touch failover",
    "Low-latency editor and sub-second answer sync",
    "Continuous autosave — network drops never lose progress",
    "Isolated sandboxes and tenant-level data separation",
  ],
};

const DEPLOY = [
  {
    icon: "globe",
    name: "Managed Cloud",
    tag: "We host, operate and maintain everything. Go live in days with backups, monitoring and SLA-backed support.",
  },
  {
    icon: "lock",
    name: "Self-Hosted",
    tag: "Your servers, your data. On-premise or private cloud with full data sovereignty — we maintain it for you.",
  },
];

export default function FlyerPage({ onHome }) {
  const sheetRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(sheetRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#faf6ec",
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      pdf.save("evolveus-flyer.pdf");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="fl-root">
      <div className="fl-toolbar">
        {onHome && (
          <button
            className="fl-export-btn"
            style={{ background: "#2f3438" }}
            onClick={onHome}
          >
            ← Home
          </button>
        )}
        <button className="fl-export-btn" onClick={exportPDF} disabled={exporting}>
          {exporting ? (
            "Exporting…"
          ) : (
            <>
              <Icon name="fileText" size={14} strokeWidth={2} />
              Export A4 PDF
            </>
          )}
        </button>
      </div>

      <div className="fl-sheet" ref={sheetRef}>
        {/* Masthead */}
        <div className="fl-masthead">
          <div className="fl-brand">
            <div className="fl-brand-mark">
              <Icon name="checkCircle" size={17} strokeWidth={2} />
            </div>
            <div>
              <div className="fl-brand-name">Evolveus</div>
              <div className="fl-brand-sub">Assessment Platform</div>
            </div>
          </div>
          <div className="fl-edition">
            <div>Complete assessment</div>
            <div>for higher education</div>
            <div>Edition 2026</div>
          </div>
        </div>
        <div className="fl-rule" />
        <div className="fl-rule-thin" />

        {/* Hero */}
        <div className="fl-hero">
          <div>
            <div className="fl-eyebrow">
              <span className="fl-eyebrow-dot" />
              One platform, end to end
            </div>
            <h1 className="fl-headline">
              Examinations,
              <br />
              <em>reimagined</em> for the
              <br />
              digital classroom.
            </h1>
          </div>
          <p className="fl-lede">
            From academic setup and question banks to secure exam delivery,
            AI-assisted grading and performance analytics — Evolveus runs the
            entire assessment lifecycle in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="fl-stats">
          {STATS.map((s) => (
            <div className="fl-stat" key={s.l}>
              <div className="fl-stat-n">{s.n}</div>
              <div className="fl-stat-l">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="fl-section-label">The Platform · Six Pillars</div>
        <div className="fl-pillars">
          {PILLARS.map((p) => (
            <div className="fl-pillar" key={p.title}>
              <div className="fl-pillar-top">
                <div className="fl-pillar-icon">
                  <Icon name={p.icon} size={14} strokeWidth={1.9} />
                </div>
                <div className="fl-pillar-num">{p.n}</div>
              </div>
              <div className="fl-pillar-title">{p.title}</div>
              <div className="fl-pillar-body">{p.body}</div>
            </div>
          ))}
        </div>

        {/* AI Evaluation + Performance */}
        <div className="fl-section-label">Where Evolveus goes further</div>
        <div className="fl-cols">
          {[AI_EVAL, PERFORMANCE].map((f) => (
            <div className="fl-feature" key={f.title}>
              <div className="fl-feature-head">
                <div className="fl-feature-icon">
                  <Icon name={f.icon} size={15} strokeWidth={1.9} />
                </div>
                <div className="fl-feature-title">{f.title}</div>
              </div>
              <div className="fl-feature-body">{f.body}</div>
              <ul className="fl-feature-list">
                {f.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" size={11} strokeWidth={2.4} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Deployment */}
        <div className="fl-section-label" style={{ marginTop: 22 }}>
          Deploy your way
        </div>
        <div className="fl-deploy-row">
          {DEPLOY.map((d) => (
            <div className="fl-deploy-card" key={d.name}>
              <div className="fl-deploy-head">
                <span className="fl-deploy-icon">
                  <Icon name={d.icon} size={13} strokeWidth={1.9} />
                </span>
                <span className="fl-deploy-name">{d.name}</span>
              </div>
              <div className="fl-deploy-tag">{d.tag}</div>
            </div>
          ))}
        </div>

        <div className="fl-spacer" />

        {/* Contact band */}
        <div className="fl-footer">
          <div>
            <div className="fl-footer-cta-label">Ready to see it live?</div>
            <div className="fl-footer-cta">Schedule a demonstration</div>
          </div>
          <div className="fl-footer-contact">
            <div className="fl-footer-line">
              <Icon name="globe" size={12} strokeWidth={1.9} />
              evolveus.in
            </div>
            <div className="fl-footer-line">
              <Icon name="edit" size={12} strokeWidth={1.9} />
              aksay@evolveus.in
            </div>
          </div>
        </div>

        <div className="fl-colophon">
          <span>Evolveus © 2026</span>
          <span>Managed Cloud · Self-Hosted · BYOK AI</span>
        </div>
      </div>
    </div>
  );
}
