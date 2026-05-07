import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/roles.css";

const ROLES = [
  {
    n: "01",
    role: "Faculty",
    quote: "Author once. Grade with the consistency of a senior reviewer.",
    body: "Build banks from a syllabus PDF, configure rules, and review AI-graded descriptive responses with a single override click. Audit-ready by default.",
    duties: [
      "Authoring · AI-assisted",
      "Rubric definition",
      "Override + sign-off",
      "Per-cohort analytics",
    ],
  },
  {
    n: "02",
    role: "Student",
    quote: "A quiet exam interface. Answers that don't get lost.",
    body: "Distraction-free environment with continuous server sync — no progress lost on dropped Wi-Fi. Real-time timer, auto-submit, instant feedback on objective questions.",
    duties: [
      "Clean exam UI · dark mode",
      "Auto-saved every few seconds",
      "Real-time timer",
      "Instant objective results",
    ],
  },
  {
    n: "03",
    role: "Administrator",
    quote: "Full visibility. Granular control. Defensible at every level.",
    body: "Manage institutions, departments, and users from one console. RBAC across faculty / student / admin. Audit logs track every score override and exam edit.",
    duties: [
      "Multi-institution console",
      "RBAC, fine-grained",
      "Platform health dashboard",
      "Full audit trail",
    ],
  },
];

export default function RolesPage() {
  return (
    <div className="page p6">
      <PageHeader folio="06" />

      <div className="p6-stage">
        <div className="p6-top">
          <div className="kicker">Chapter V — The People</div>
          <h2 className="p6-headline">
            One platform.
            <br />
            <em>Three rooms.</em>
          </h2>
          <p className="p6-lede">
            Faculty, students, and administrators each see a workspace built for
            their job — never a one-size-fits-all dashboard with three logins on
            top.
          </p>
        </div>

        <div className="p6-grid">
          {ROLES.map(({ n, role, quote, body, duties }) => (
            <article key={n} className="p6-col">
              <div className="p6-col-head">
                <span className="p6-col-num">{n}</span>
                <h3 className="p6-col-role">{role}</h3>
              </div>

              <p className="p6-col-quote">
                <span className="p6-col-mark">"</span>
                {quote}
              </p>

              <p className="p6-col-body">{body}</p>

              <div className="p6-col-duties">
                <div className="caption p6-col-duties-cap">
                  In the workspace
                </div>
                <ul>
                  {duties.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <PageFooter chapter="The People" />
    </div>
  );
}
