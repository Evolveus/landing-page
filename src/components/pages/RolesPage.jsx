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
    role: "Manager",
    quote: "Keep semester execution aligned without owning every exam.",
    body: "Semester managers oversee courses, instructors, batches, quiz planning, and cohort progress across their academic window.",
    duties: [
      "Semester oversight",
      "Course + instructor mapping",
      "Batch coordination",
      "Progress review",
    ],
  },
  {
    n: "03",
    role: "Student",
    quote: "A quiet exam interface. Answers that don't get lost.",
    body: "A clear dashboard for live, upcoming, completed, and missed quizzes, then a focused timer-based exam room with saved answers.",
    duties: [
      "Course + quiz dashboard",
      "Section-aware navigation",
      "Real-time timer",
      "Manual or auto-submit",
    ],
  },
  {
    n: "04",
    role: "Administrator",
    quote: "Full visibility. Granular control. Defensible at every level.",
    body: "Manage departments, semesters, batches, users, courses, labs, and platform access from one console with institutional separation.",
    duties: [
      "Departments + batches",
      "Users + role status",
      "Labs + IP subnets",
      "Tenant-aware access",
    ],
  },
];

export default function RolesPage() {
  return (
    <div className="page p6">
      <PageHeader folio="08" />

      <div className="p6-stage">
        <div className="p6-top">
          <div className="kicker">Chapter VII — The People</div>
          <h2 className="p6-headline">
            One platform.
            <br />
            <em>Four rooms.</em>
          </h2>
          <p className="p6-lede">
            Administrators, semester managers, faculty, and students each see a
            workspace built for their job — never a one-size-fits-all dashboard
            with role names pasted on top.
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
