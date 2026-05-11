import { useState, useRef } from "react";
import { Icon } from "../_shared/Icon";
import {
  useScrollY,
  useReveal,
  useParallaxOffset,
} from "../_shared/useParallax";
import "./Design5.css";
import "./Design5Hybrid.css";

// ─── Data ─────────────────────────────────────────────────────

const STATS_STRIP = [
  { n: "2,000+", l: "Quizzes conducted" },
  { n: "200,000+", l: "Responses scored" },
  { n: "8", l: "Question types" },
  { n: "7", l: "Languages supported" },
  { n: "12", l: "Proctoring signals" },
];

const PILLARS = [
  {
    n: "I",
    title: "Coding Assessment",
    icon: "code",
    body: "Sandboxed execution with visible and hidden test cases. Partial marking. Time and memory limits. Seven languages.",
    bullets: [
      "In-browser code editor",
      "Driver code & boilerplate",
      "Reference solutions",
      "Language per question",
    ],
  },
  {
    n: "II",
    title: "Question Bank",
    icon: "database",
    body: "Reusable question banks organised by topic, tagged with Bloom's taxonomy and course outcomes. Bulk upload via spreadsheet.",
    bullets: [
      "Topic-based organisation",
      "Bloom's: Remember → Create",
      "CO1–CO8 mapping",
      "Bulk upload + row validation",
    ],
  },
  {
    n: "III",
    title: "Secure Examination",
    icon: "shieldCheck",
    body: "Twelve violation signals tracked in real time. Fullscreen enforcement. Kiosk mode. IP and subnet restriction.",
    bullets: [
      "Tab-switch detection",
      "Copy/paste blocking",
      "Kiosk validation gate",
      "Audit logs per submission",
    ],
  },
  {
    n: "IV",
    title: "AI Evaluation",
    icon: "brain",
    body: "LLM-assisted grading for descriptive and fill-in-blank answers. Connect your preferred model. Faculty always in control.",
    bullets: [
      "Bring Your Own Key (BYOK)",
      "Any LLM provider",
      "Rubric-based scoring",
      "Manual override always",
    ],
  },
  {
    n: "V",
    title: "Analytics & Reporting",
    icon: "chart",
    body: "Per-student, per-question, and class-wide breakdowns. CO attainment tracking. Exportable for accreditation.",
    bullets: [
      "Difficulty trend analysis",
      "CO attainment reports",
      "Submission tracking",
      "Accreditation-ready exports",
    ],
  },
  {
    n: "VI",
    title: "Institution Management",
    icon: "building",
    body: "Departments, semesters, batches, courses, labs — all centralised. Role-based access for every user type.",
    bullets: [
      "Dept / batch / semester setup",
      "Course assignment at scale",
      "Lab IP-subnet config",
      "User profile management",
    ],
  },
];

const AI_STEPS = [
  {
    num: "01",
    icon: "edit",
    title: "Faculty defines the rubric",
    desc: "Set marking criteria, expected concepts, and acceptable responses. The rubric guides the AI on what full, partial, and zero marks look like.",
    badge: "Faculty-controlled",
  },
  {
    num: "02",
    icon: "globe",
    title: "Student submits answer",
    desc: "Descriptive paragraphs, fill-in-the-blank phrases, or long-form essays — the platform accepts all text-based response formats.",
    badge: null,
  },
  {
    num: "03",
    icon: "brain",
    title: "LLM evaluates against rubric",
    desc: "Your configured model receives the rubric and student response. It returns a score with reasoning — using your API key, on your chosen provider.",
    badge: "BYOK",
  },
  {
    num: "04",
    icon: "checkCircle",
    title: "Faculty reviews and confirms",
    desc: "AI scores are surfaced alongside reasoning. Faculty can accept, adjust, or override any score before results are published.",
    badge: "Final control",
  },
];

const AI_MODELS = [
  { name: "OpenAI", sub: "GPT-4o, GPT-4", color: "#10a37f" },
  { name: "Anthropic", sub: "Claude 3.5 Sonnet", color: "#d97757" },
  { name: "Google", sub: "Gemini 1.5 Pro", color: "#4285f4" },
  { name: "Azure", sub: "Azure OpenAI Service", color: "#0078d4" },
  {
    name: "Custom Endpoint",
    sub: "Any OpenAI-compatible API",
    color: "#6b7280",
  },
];

const AI_HIGHLIGHTS = [
  {
    icon: "flag",
    t: "Semantic fill-in-blank matching",
    d: "Accepts synonyms and semantically equivalent expressions, not just exact text matches.",
  },
  {
    icon: "lock",
    t: "Your keys, your data",
    d: "API keys stay on your infrastructure. Responses never stored beyond your evaluation call.",
  },
  {
    icon: "refresh",
    t: "Manual override always available",
    d: "Faculty can review, add remarks, and override any AI score before results are released.",
  },
];

const QUESTION_TYPES = [
  {
    id: "mcq1",
    num: "01",
    label: "Single-Choice MCQ",
    icon: "check",
    desc: "One correct answer from multiple options. Options can be shuffled per student. Supports marks and negative marks.",
    grading:
      "Fully automated. Correct → full marks. Wrong → zero or configurable negative marks.",
    tags: ["Auto-graded", "Negative marks", "Shuffle options"],
  },
  {
    id: "mcq2",
    num: "02",
    label: "Multiple-Choice MCQ",
    icon: "layers",
    desc: "Two or more correct answers from a set of options. Partial marking awards credit for each correct selection.",
    grading: "Full-only or partial marking mode, configurable per quiz.",
    tags: ["Auto-graded", "Partial marks", "Configurable"],
  },
  {
    id: "tf",
    num: "03",
    label: "True or False",
    icon: "check",
    desc: "Binary choice. Quick to create and answer. Useful for concept-check questions. Negative marking supported.",
    grading: "Fully automated. Binary evaluation — no partial credit.",
    tags: ["Auto-graded", "Negative marks"],
  },
  {
    id: "desc",
    num: "04",
    label: "Descriptive",
    icon: "edit",
    desc: "Long-form written answers — paragraphs, explanations, analyses. Faculty sets a marking rubric. AI evaluates against it.",
    grading:
      "AI-assisted grading with faculty rubric. Faculty reviews reasoning and can override any score.",
    tags: ["AI-graded", "BYOK", "Manual override"],
  },
  {
    id: "fitb",
    num: "05",
    label: "Fill-in-the-Blank",
    icon: "edit",
    desc: "Students complete sentences or supply missing terms. Exact match or semantic equivalence via LLM.",
    grading:
      "Exact string match, or AI semantic match if enabled. Configure per question.",
    tags: ["AI-assisted", "Semantic match", "Auto-graded"],
  },
  {
    id: "match",
    num: "06",
    label: "Match-the-Following",
    icon: "layers",
    desc: "Students pair items from two columns. Partial marking credits each correct pair independently.",
    grading: "Automated. Each correct pair earns proportional credit.",
    tags: ["Auto-graded", "Partial marks"],
  },
  {
    id: "file",
    num: "07",
    label: "File Upload",
    icon: "upload",
    desc: "Students upload documents, images, or project archives. Secure signed links. Faculty reviews and grades manually.",
    grading:
      "Manual faculty evaluation. Faculty enters score and optional remarks per submission.",
    tags: ["Manual grading", "Secure storage", "Signed links"],
  },
  {
    id: "code",
    num: "08",
    label: "Coding",
    icon: "code",
    desc: "In-browser code editor. Submissions compile and run in isolated sandboxes against visible and hidden test cases.",
    grading:
      "Automated test-case execution. Partial marks by proportion of cases passed.",
    tags: ["Sandboxed", "Partial marks", "7 languages"],
  },
];

const DEPLOY_MODES = {
  managed: {
    label: "Managed Cloud",
    icon: "globe",
    tagline: "We host, operate, and maintain everything.",
    sub: "Go live in days. No infrastructure team required. We manage updates, backups, and monitoring — you focus on assessments.",
    features: [
      {
        icon: "bolt",
        t: "Instant setup",
        d: "Running within days — no server provisioning or configuration needed",
      },
      {
        icon: "refresh",
        t: "Zero-touch updates",
        d: "Platform updates deployed by our team with no downtime on your side",
      },
      {
        icon: "database",
        t: "Managed backups",
        d: "Daily backups with point-in-time recovery included",
      },
      {
        icon: "monitor",
        t: "Uptime monitoring",
        d: "We monitor and respond to incidents around the clock",
      },
      {
        icon: "lock",
        t: "Tenant isolation",
        d: "Your institution's data is strictly separated at the database layer",
      },
      {
        icon: "award",
        t: "SLA-backed support",
        d: "Dedicated support channel with response time commitments",
      },
    ],
    note: "All data is tenant-isolated. Your institution's data is never accessible to other customers.",
  },
  self: {
    label: "Self-Hosted",
    icon: "building",
    tagline: "Your servers. Your data. We handle the rest.",
    sub: "Deploy on your own infrastructure — on-premise or private cloud. Full data sovereignty. We maintain the platform for you.",
    features: [
      {
        icon: "lock",
        t: "Complete data control",
        d: "Student data stays on your network — never leaves your infrastructure",
      },
      {
        icon: "refresh",
        t: "We maintain it for you",
        d: "Our team handles updates, patches, and deployments on your servers",
      },
      {
        icon: "building",
        t: "Your infrastructure",
        d: "Run on existing servers, private cloud, or air-gapped environments",
      },
      {
        icon: "network",
        t: "SSO integration",
        d: "Connect to your existing identity provider",
      },
      {
        icon: "shieldCheck",
        t: "Compliance-ready",
        d: "Meets institutional data residency and regulatory requirements",
      },
      {
        icon: "globe",
        t: "Air-gap capable",
        d: "Can operate without external internet dependencies where required",
      },
    ],
    note: "We deploy, patch, and maintain the platform on your servers. You keep full ownership of your data and infrastructure.",
  },
};

const ROLES_DATA = [
  {
    id: "admin",
    label: "Administrator",
    icon: "building",
    src: "/staffDashboard.png",
    summary:
      "Full institutional control. Manage the academic structure, configure users, and monitor platform health across the institution.",
    features: [
      "Manage departments, batches, semesters, and courses",
      "Create users and assign roles: admin, manager, faculty, student",
      "Configure lab IP subnets for restricted exam access",
      "View platform-wide usage metrics and quiz summaries",
      "Audit logs for faculty actions, exam edits, and score overrides",
      "Bulk-create courses and users via spreadsheet upload",
    ],
  },
  {
    id: "faculty",
    label: "Faculty",
    icon: "edit",
    src: "/bankQuestions.png",
    summary:
      "End-to-end assessment workflow. Build question banks, design exams, configure evaluation, and analyse results.",
    features: [
      "Create reusable question banks organised by topic",
      "Tag questions with Bloom's taxonomy and CO1–CO8 mapping",
      "Configure coding test cases, boilerplate, and reference solutions",
      "Schedule quizzes to courses, batches, or individual students",
      "Review AI-generated grades and override any score before publishing",
      "Export class-wide results for accreditation and academic records",
    ],
  },
  {
    id: "student",
    label: "Student",
    icon: "graduation",
    src: "/studentDashboard.png",
    summary:
      "Clear, focused assessment experience. See all assigned quizzes, attempt them securely, and track results.",
    features: [
      "View active, upcoming, completed, and missed quizzes",
      "Clean exam interface with timer and question navigation panel",
      "Continuous answer sync — network drops never lose progress",
      "Write and run code in an in-browser editor with language selection",
      "Upload files for file-based questions with secure submission",
      "View published results and score breakdowns",
    ],
  },
];

const CO_BARS = [
  { label: "CO1 — Recall & Understand", pct: 88 },
  { label: "CO2 — Apply Concepts", pct: 74 },
  { label: "CO3 — Analyse Problems", pct: 61 },
  { label: "CO4 — Evaluate Solutions", pct: 45 },
  { label: "CO5 — Synthesis & Design", pct: 33, low: true },
];

const BLOOM_BARS = [
  { name: "Remember", pct: 28 },
  { name: "Understand", pct: 35 },
  { name: "Apply", pct: 22 },
  { name: "Analyse", pct: 10 },
  { name: "Evaluate", pct: 4 },
  { name: "Create", pct: 1 },
];

const CONTACT_INITIAL_VALUES = {
  email: "",
  name: "",
  organisationName: "",
  numberOfStudents: "",
  contactNumber: "",
};

const TESTIMONIALS = [
  {
    role: "Head of CSE Dept",
    org: "Amrita Vishwa Vidyapeetham, Coimbatore",
    quote:
      "The coding assessment module alone saved our faculty 40+ hours per exam cycle. Automated test-case evaluation with partial marking is exactly what we needed.",
    init: "RK",
    accent: "green",
  },
  {
    role: "Faculty — Data Science",
    org: "Amrita Vishwa Vidyapeetham, Coimbatore",
    quote:
      "I was skeptical about AI grading for descriptive answers, but the rubric-based approach is genuinely good. I reviewed about 15% of scores and found the AI's reasoning sound.",
    init: "SP",
    accent: "sepia",
  },
  {
    role: "Examination Controller",
    org: "Amrita Vishwa Vidyapeetham, Coimbatore",
    quote:
      "Twelve proctoring signals, subnet-based lab locking, and kiosk mode validation. We went from paper-based hall tickets to fully digital in one semester.",
    init: "MV",
    accent: "sepia",
  },
  {
    role: "Senior Faculty — Mathematics",
    org: "Amrita Vishwa Vidyapeetham, Coimbatore",
    quote:
      "LaTeX support in questions and Bloom's taxonomy tagging were the two things our previous platform never had. Evolveus makes NBA documentation actually feasible.",
    init: "AL",
    accent: "green",
  },
];

// ─── Shared helpers ───────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`d5-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="d5-section-divider" aria-hidden="true">
      <div className="d5-section-divider-line" />
      <span className="d5-section-divider-label">{label}</span>
      <div className="d5-section-divider-line" />
    </div>
  );
}

// ─── Hero visual ──────────────────────────────────────────────
function HeroVisual() {
  const y = useScrollY();
  return (
    <div className="d5-split-hero-visual">
      <div
        className="d5-hv-card d5-hv-card-main"
        style={{ transform: `translateY(${y * -0.06}px)` }}
      >
        <div className="d5-hv-bar">
          <div className="d5-hv-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="d5-hv-url">evolveus.in / faculty</span>
        </div>
        <img
          src="/staffDashboard.png"
          alt="Faculty dashboard"
          className="d5-hv-img"
        />
      </div>
      <div
        className="d5-hv-card d5-hv-card-float"
        style={{ transform: `translateY(${y * -0.14}px)` }}
      >
        <div className="d5-hv-float-head">
          <div className="d5-hv-float-icon">
            <Icon name="code" size={15} />
          </div>
          <div>
            <div className="d5-hv-float-title">Coding · Python</div>
            <div className="d5-hv-float-sub">CS301 · Binary Tree</div>
          </div>
          <div className="d5-hv-float-score">
            8.0<span>/10</span>
          </div>
        </div>
        <div className="d5-hv-tcs">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`d5-hv-tc ${i === 4 ? "fail" : "pass"}`}>
              <Icon name={i === 4 ? "alert" : "check"} size={11} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="d5-hv-card d5-hv-card-stat"
        style={{ transform: `translateY(${y * -0.1}px)` }}
      >
        <div className="d5-hv-stat-icon">
          <Icon name="shieldCheck" size={17} />
        </div>
        <div>
          <div className="d5-hv-stat-n">100%</div>
          <div className="d5-hv-stat-l">violations logged</div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive: Question Type Explorer ──────────────────────
function QuestionExplorer() {
  const [active, setActive] = useState(0);
  const qt = QUESTION_TYPES[active];
  return (
    <div className="d5-qx-layout">
      <div className="d5-qx-list">
        {QUESTION_TYPES.map((q, i) => (
          <button
            key={q.id}
            className={`d5-qx-item ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="d5-qx-num">{q.num}</span>
            <span className="d5-qx-item-icon">
              <Icon name={q.icon} size={14} strokeWidth={2} />
            </span>
            <span className="d5-qx-label">{q.label}</span>
            <Icon name="arrowRight" size={13} className="d5-qx-arrow" />
          </button>
        ))}
      </div>
      <div className="d5-qx-panel" key={active}>
        <div className="d5-qx-panel-chap">
          TYPE {qt.num} OF {QUESTION_TYPES.length}
        </div>
        <h3 className="d5-qx-panel-title">{qt.label}</h3>
        <p className="d5-qx-panel-desc">{qt.desc}</p>
        <div className="d5-qx-eval-box">
          <div className="d5-qx-eval-label">Evaluation method</div>
          <div className="d5-qx-eval-text">{qt.grading}</div>
        </div>
        <div className="d5-qx-tags">
          {qt.tags.map((t) => (
            <span
              key={t}
              className={`d5-qx-tag ${t === "AI-graded" || t === "AI-assisted" || t === "BYOK" ? "ai" : ""}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Interactive: Deployment Toggle ──────────────────────────
function DeploySection() {
  const [mode, setMode] = useState("managed");
  const panel = DEPLOY_MODES[mode];
  return (
    <section className="d5-deploy">
      <div className="d5-section-inner">
        <Reveal>
          <div className="d5-section-head">
            <div className="d5-eyebrow">DEPLOYMENT & OPERATIONS</div>
            <h2 className="d5-h2">
              Deploy the way your
              <br />
              institution requires.
            </h2>
            <p className="d5-section-sub">
              Evolveus runs as a managed cloud service or self-hosted on your
              own infrastructure. Either way, our team handles all platform
              maintenance, updates, and support.
            </p>
          </div>
        </Reveal>

        <div className="d5-deploy-toggle">
          {Object.entries(DEPLOY_MODES).map(([key, val]) => (
            <button
              key={key}
              className={`d5-deploy-tab ${mode === key ? "active" : ""}`}
              onClick={() => setMode(key)}
            >
              <Icon name={val.icon} size={16} />
              {val.label}
            </button>
          ))}
        </div>

        <div className="d5-deploy-panel" key={mode}>
          <div className="d5-deploy-tagline">
            <div className="d5-deploy-tagline-label">{panel.label}</div>
            <div className="d5-deploy-tagline-text">{panel.tagline}</div>
            <div className="d5-deploy-tagline-sub">{panel.sub}</div>
          </div>
          <div className="d5-deploy-feats">
            {panel.features.map((f) => (
              <div key={f.t} className="d5-deploy-feat">
                <Icon name={f.icon} size={16} className="d5-deploy-feat-icon" />
                <div>
                  <div className="d5-deploy-feat-t">{f.t}</div>
                  <div className="d5-deploy-feat-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="d5-deploy-note">
          <Icon name="shieldCheck" size={16} className="d5-deploy-note-icon" />
          <div className="d5-deploy-note-text">{panel.note}</div>
        </div>
      </div>
    </section>
  );
}

// ─── Interactive: Role Tab Switcher ──────────────────────────
function RolesSection() {
  const [active, setActive] = useState(0);
  const role = ROLES_DATA[active];
  return (
    <section className="d5-role-tabs-section">
      <div className="d5-section-inner">
        <Reveal>
          <div className="d5-section-head">
            <div className="d5-eyebrow">CHAPTER SEVEN · ROLES</div>
            <h2 className="d5-h2">
              Built for every person
              <br />
              in your institution.
            </h2>
            <p className="d5-section-sub">
              Each role gets exactly the tools they need — nothing more.
              Administrators control the academic structure, faculty run
              assessments, students focus on learning.
            </p>
          </div>
        </Reveal>

        <div className="d5-role-tab-row">
          {ROLES_DATA.map((r, i) => (
            <button
              key={r.id}
              className={`d5-role-tab-btn ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <Icon name={r.icon} size={15} />
              {r.label}
            </button>
          ))}
        </div>

        <div className="d5-role-view" key={active}>
          <div className="d5-role-view-img">
            <img src={role.src} alt={role.label} />
            <div className="d5-role-view-summary">{role.summary}</div>
          </div>
          <div className="d5-role-view-feats">
            {role.features.map((f) => (
              <div key={f} className="d5-role-feat">
                <Icon
                  name="checkCircle"
                  size={15}
                  className="d5-role-feat-icon"
                />
                <div className="d5-role-feat-text">{f}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Feedback / Testimonials ──────────────────────────────────
function FeedbackSection() {
  return (
    <section className="d5-feedback">
      <div className="d5-section-inner">
        <Reveal>
          <div className="d5-section-head">
            <div className="d5-eyebrow">CHAPTER NINE · IN THEIR WORDS</div>
            <h2 className="d5-h2">
              What faculty and administrators
              <br />
              <span className="d5-italic">actually say.</span>
            </h2>
            <p className="d5-section-sub">
              From CSE departments running coding assessments to examination
              controllers managing university-wide digital exams — Evolveus is
              in active daily use.
            </p>
          </div>
        </Reveal>

        <div className="d5-feedback-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.init} delay={i * 80}>
              <article className={`d5-fb-card d5-fb-card--${t.accent}`}>
                <div className="d5-fb-quote-mark">"</div>
                <blockquote className="d5-fb-quote">{t.quote}</blockquote>
                <div className="d5-fb-author">
                  <div className={`d5-fb-init d5-fb-init--${t.accent}`}>
                    {t.init}
                  </div>
                  <div>
                    <div className="d5-fb-role">{t.role}</div>
                    <div className="d5-fb-org">{t.org}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="d5-feedback-foot">
            <div className="d5-feedback-foot-stat">
              <span className="d5-feedback-foot-n">2,000+</span>
              <span className="d5-feedback-foot-l">quizzes conducted</span>
            </div>
            <div className="d5-feedback-foot-divider" />
            <div className="d5-feedback-foot-stat">
              <span className="d5-feedback-foot-n">200,000+</span>
              <span className="d5-feedback-foot-l">responses evaluated</span>
            </div>
            <div className="d5-feedback-foot-divider" />
            <div className="d5-feedback-foot-stat">
              <span className="d5-feedback-foot-n">Multiple</span>
              <span className="d5-feedback-foot-l">institutions active</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Design5Hybrid({ onBrochure }) {
  const y = useScrollY();
  const codingRef = useRef(null);
  const codingOffset = useParallaxOffset(codingRef, 0.08);
  const [contactValues, setContactValues] = useState(CONTACT_INITIAL_VALUES);
  const [contactStatus, setContactStatus] = useState({
    state: "idle",
    message: "",
  });

  const scrollToContact = () => {
    document
      .getElementById("d5-contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactValues((current) => ({ ...current, [name]: value }));
  };

  const submitContactForm = async (event) => {
    event.preventDefault();
    setContactStatus({ state: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactValues),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to send your request right now.",
        );
      }

      setContactValues(CONTACT_INITIAL_VALUES);
      setContactStatus({
        state: "success",
        message:
          result.message ||
          "Your request has been sent. Please check your email for acknowledgement.",
      });
    } catch (error) {
      setContactStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your request right now.",
      });
    }
  };

  return (
    <div className="d5">
      {/* Parallax decorative blobs */}
      <div
        className="d5-deco d5-deco-1"
        style={{ transform: `translateY(${y * 0.2}px)` }}
      />
      <div
        className="d5-deco d5-deco-2"
        style={{ transform: `translateY(${y * -0.1}px)` }}
      />
      <div
        className="d5-deco d5-deco-3"
        style={{ transform: `translateY(${y * 0.15}px)` }}
      />
      <div
        className="d5-deco d5-deco-4"
        style={{ transform: `translateY(${y * -0.08}px)` }}
      />

      {/* ── NAV ────────────────────────────────────────────── */}
      <nav className="d5-nav">
        <div className="d5-nav-inner">
          <div className="d5-logo">
            <span className="d5-logo-mark">
              <svg
                viewBox="0 0 36 36"
                width="26"
                height="26"
                aria-hidden="true"
              >
                <path
                  d="M18 3 L33 11 L33 25 L18 33 L3 25 L3 11 Z"
                  fill="none"
                  stroke="#1f4e2c"
                  strokeWidth="1.4"
                />
                <path
                  d="M11 14 L18 18 L25 14 M18 18 L18 25"
                  stroke="#1f4e2c"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="d5-logo-text">
              <span className="d5-logo-name">Evolveus</span>
              <span className="d5-logo-tag">
                Digital Assessment · est. 2024
              </span>
            </div>
          </div>
          <div className="d5-nav-links">
            <a href="#d5-platform">Platform</a>
            <a href="#d5-ai-eval">AI Grading</a>
            <a href="#d5-coding">Coding</a>
            <a href="#d5-deploy">Deployment</a>
          </div>
          <div className="d5-nav-right">
            <button className="d5-nav-ghost" onClick={onBrochure}>
              Brochure
            </button>
            <button className="d5-nav-cta" onClick={scrollToContact}>
              Schedule Demo
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="d5-split-hero">
        {/* Parallax decorative roman numeral */}
        <div
          className="d5-hero-deco-num"
          style={{ transform: `translateY(${y * 0.15}px)` }}
          aria-hidden="true"
        >
          I
        </div>

        <div className="d5-split-hero-masthead">
          <div className="d5-split-hero-edition">
            <span>VOL. I · NO. 1</span>
            <span>EDITION 2026</span>
            <span>ASSESSMENT QUARTERLY</span>
          </div>
          <div className="d5-split-hero-rule" />
          <div className="d5-split-hero-rule2" />
        </div>

        <div className="d5-split-hero-inner">
          <div className="d5-split-hero-text">
            <div className="d5-split-hero-eyebrow">
              <span className="d5-split-hero-eyebrow-dot" />
              Complete assessment management for higher education
            </div>
            <h1 className="d5-split-h1">
              Examinations,
              <br />
              <em>reimagined</em>
              <br />
              for the digital
              <br />
              classroom.
            </h1>
            <p className="d5-split-hero-lede">
              Evolveus is a complete assessment platform — from academic setup
              and question banks to secure exam delivery, AI-assisted grading,
              and performance analytics.
            </p>
            <div className="d5-split-hero-actions">
              <button className="d5-cta-primary" onClick={scrollToContact}>
                Schedule a Demonstration
                <Icon name="arrowRight" size={14} />
              </button>
              <button className="d5-cta-text" onClick={onBrochure}>
                <Icon name="bookOpen" size={14} /> Read the brochure
              </button>
            </div>
          </div>
          <HeroVisual />
        </div>

        <div className="d5-split-hero-strip">
          <div className="d5-strip-label">Battle-tested at scale</div>
          {STATS_STRIP.map((s) => (
            <div key={s.l} className="d5-strip-stat">
              <div className="d5-strip-n">{s.n}</div>
              <div className="d5-strip-l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORM PILLARS ───────────────────────────────── */}
      <section className="d5-pillars" id="d5-platform">
        {/* Parallax decorative horizontal rule */}
        <div
          className="d5-pillars-deco-rule"
          style={{ transform: `translateY(${y * 0.05}px)` }}
          aria-hidden="true"
        />
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER ONE · THE PLATFORM</div>
              <h2 className="d5-h2">
                Six pillars,
                <br />
                one assessment system.
              </h2>
              <p className="d5-section-sub">
                Evolveus replaces the fragmented stack of tools institutions
                rely on today — question banks in spreadsheets, exams in
                separate portals, grading in manual scripts — with a single,
                coherent, maintainable platform.
              </p>
            </div>
          </Reveal>
          <div className="d5-pillars-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="d5-pillar">
                  <div className="d5-pillar-head">
                    <span className="d5-pillar-roman">{p.n}</span>
                    <span className="d5-pillar-icon">
                      <Icon name={p.icon} size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="d5-pillar-title">{p.title}</h3>
                  <p className="d5-pillar-body">{p.body}</p>
                  <ul className="d5-pillar-list">
                    {p.bullets.map((b) => (
                      <li key={b}>
                        <Icon
                          name="check"
                          size={12}
                          className="d5-pillar-check"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="CHAPTER TWO" />

      {/* ── AI EVALUATION — Editorial dark redesign ────────── */}
      <section className="d5-ai" id="d5-ai-eval">
        {/* Large decorative background number */}
        <div className="d5-ai-bg-num" aria-hidden="true">
          02
        </div>

        <div
          className="d5-section-inner"
          style={{ position: "relative", zIndex: 1 }}
        >
          <Reveal>
            <div className="d5-ai-editorial-head">
              <div
                className="d5-eyebrow"
                style={{ color: "var(--d5-sepia-soft)" }}
              >
                CHAPTER TWO · AI-ASSISTED EVALUATION
              </div>
              <div className="d5-ai-editorial-layout">
                <div className="d5-ai-editorial-left">
                  <h2 className="d5-ai-editorial-h2">
                    Descriptive grading
                    <br />
                    <span className="d5-italic">at scale.</span>
                  </h2>
                  <div className="d5-ai-pull-quote">
                    Faculty write the rubric. The LLM grades against it. Faculty
                    review and confirm. Every score is auditable, adjustable,
                    and in your control.
                  </div>
                  <div className="d5-ai-highlights">
                    {AI_HIGHLIGHTS.map((h) => (
                      <div key={h.t} className="d5-ai-highlight">
                        <div className="d5-ai-hl-icon">
                          <Icon name={h.icon} size={18} />
                        </div>
                        <div>
                          <div className="d5-ai-hl-t">{h.t}</div>
                          <div className="d5-ai-hl-d">{h.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d5-ai-editorial-right">
                  <div className="d5-ai-flow-v2">
                    {AI_STEPS.map((s, i) => (
                      <div key={s.num} className="d5-ai-step-v2">
                        <div className="d5-ai-step-v2-left">
                          <div className="d5-ai-step-v2-circle">{s.num}</div>
                          {i < AI_STEPS.length - 1 && (
                            <div className="d5-ai-step-v2-line" />
                          )}
                        </div>
                        <div className="d5-ai-step-v2-body">
                          <div className="d5-ai-step-v2-header">
                            <div className="d5-ai-step-v2-icon">
                              <Icon name={s.icon} size={16} />
                            </div>
                            <div className="d5-ai-step-v2-title">{s.title}</div>
                            {s.badge && (
                              <div className="d5-ai-step-badge">{s.badge}</div>
                            )}
                          </div>
                          <div className="d5-ai-step-v2-desc">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* BYOK — full width horizontal */}
          <Reveal>
            <div className="d5-byok-v2">
              <div className="d5-byok-v2-head">
                <div className="d5-byok-icon">
                  <Icon name="key" size={18} />
                </div>
                <div>
                  <div className="d5-byok-title">Bring Your Own Key (BYOK)</div>
                  <div className="d5-byok-sub">
                    Connect any LLM provider. Your key, your model, your
                    control.
                  </div>
                </div>
                <div
                  className="d5-byok-note"
                  style={{ marginLeft: "auto", marginTop: 0 }}
                >
                  <Icon
                    name="shieldCheck"
                    size={14}
                    className="d5-byok-note-icon"
                  />
                  API keys stored on your deployment. Responses only sent to
                  your provider during evaluation.
                </div>
              </div>
              <div className="d5-byok-models d5-byok-models-h">
                {AI_MODELS.map((m) => (
                  <div key={m.name} className="d5-model-pill">
                    <div
                      className="d5-model-dot"
                      style={{ background: m.color }}
                    />
                    <div>
                      <div className="d5-model-name">{m.name}</div>
                      <div className="d5-model-sub">{m.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider label="CHAPTER THREE" />

      {/* ── CODING — Light terminal redesign ───────────────── */}
      <section
        className="d5-coding d5-coding-light"
        id="d5-coding"
        ref={codingRef}
      >
        {/* Decorative code symbol with parallax */}
        <div
          className="d5-coding-deco-sym"
          style={{ transform: `translateY(${codingOffset}px)` }}
          aria-hidden="true"
        >
          {"{ }"}
        </div>

        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">
                CHAPTER THREE · CODING ASSESSMENT
              </div>
              <h2 className="d5-h2">
                Code submitted.
                <br />
                <span className="d5-italic">Marks awarded</span> — instantly.
              </h2>
            </div>
          </Reveal>

          <div className="d5-coding-v2-grid">
            {/* Left: stat + features */}
            <Reveal>
              <div className="d5-coding-v2-left">
                <div className="d5-coding-v2-stat">
                  <span className="d5-coding-v2-stat-n">7</span>
                  <div>
                    <div className="d5-coding-v2-stat-l">
                      Programming languages
                    </div>
                    <div className="d5-coding-v2-stat-s">
                      Python · Java · C++ · JavaScript · C · Octave · Scala
                    </div>
                  </div>
                </div>

                <div className="d5-coding-v2-prose">
                  <p>
                    Faculty configure visible test cases students see during
                    practice, and hidden cases that prevent hardcoding. Evolveus
                    compiles each submission in an isolated sandbox under
                    enforced time and memory limits, verifies output, and scores
                    proportionally.
                  </p>
                  <p>
                    Partial marking distributes credit by test cases passed. A
                    student who clears four of five cases receives four-fifths
                    of the marks — consistently, without manual review.
                  </p>
                </div>

                <div className="d5-coding-v2-feats">
                  {[
                    {
                      i: "cpu",
                      t: "Sandboxed",
                      d: "Isolated containers, enforced time + memory limits",
                    },
                    {
                      i: "eye",
                      t: "Hidden test cases",
                      d: "Catch edge cases and hardcoded answers",
                    },
                    {
                      i: "gauge",
                      t: "Partial marking",
                      d: "Proportional credit by cases passed",
                    },
                    {
                      i: "fileText",
                      t: "Boilerplate support",
                      d: "Driver code and reference solutions",
                    },
                  ].map((f) => (
                    <div key={f.t} className="d5-coding-v2-feat">
                      <Icon
                        name={f.i}
                        size={16}
                        className="d5-coding-v2-feat-icon"
                      />
                      <div>
                        <div className="d5-coding-v2-feat-t">{f.t}</div>
                        <div className="d5-coding-v2-feat-d">{f.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: terminal card */}
            <Reveal delay={120}>
              <div className="d5-terminal-card">
                <div className="d5-terminal-bar">
                  <div className="d5-hv-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="d5-terminal-title">
                    evolveus · sandbox · CS301
                  </span>
                </div>
                <div className="d5-terminal-body">
                  <div className="d5-terminal-tag">
                    SUBMISSION RESULT — CS301 MIDTERM
                  </div>
                  <div className="d5-terminal-prob">
                    Binary Search Tree Validation
                  </div>
                  <div className="d5-terminal-meta">
                    <span className="d5-terminal-lang">Python 3.11</span>
                    <span className="d5-terminal-time">0.34s compile</span>
                  </div>

                  <div className="d5-terminal-tests">
                    {[
                      { id: "TC-01", s: "pass", ms: "12ms", p: "2.0 / 2.0" },
                      { id: "TC-02", s: "pass", ms: "8ms", p: "2.0 / 2.0" },
                      { id: "TC-03", s: "pass", ms: "15ms", p: "2.0 / 2.0" },
                      { id: "TC-04", s: "fail", ms: "9ms", p: "0.0 / 2.0" },
                      { id: "TC-05", s: "pass", ms: "11ms", p: "2.0 / 2.0" },
                    ].map((t) => (
                      <div
                        key={t.id}
                        className={`d5-terminal-tc d5-terminal-tc--${t.s}`}
                      >
                        <span className="d5-terminal-tc-status">
                          {t.s === "pass" ? "✓" : "✗"}
                        </span>
                        <span className="d5-terminal-tc-id">{t.id}</span>
                        <span className="d5-terminal-tc-label">
                          {t.s.toUpperCase()}
                        </span>
                        <span className="d5-terminal-tc-ms">{t.ms}</span>
                        <span className="d5-terminal-tc-pts">{t.p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d5-terminal-total">
                    <span className="d5-terminal-total-label">Final score</span>
                    <span className="d5-terminal-total-val">8.0 / 10.0</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider label="CHAPTER FOUR" />

      {/* ── QUESTION TYPES EXPLORER ────────────────────────── */}
      <section className="d5-qx" id="d5-formats">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER FOUR · QUESTION FORMATS</div>
              <h2 className="d5-h2">
                Eight question types.
                <br />
                One unified exam.
              </h2>
              <p className="d5-section-sub">
                Mix any combination in a single assessment. Every type can carry
                independent marks, negative marks, difficulty ratings, Bloom's
                level, and course outcome mapping.
              </p>
            </div>
          </Reveal>
          <QuestionExplorer />
        </div>
      </section>

      {/* ── SECURITY ───────────────────────────────────────── */}
      <section className="d5-security">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER FIVE · EXAM INTEGRITY</div>
              <h2 className="d5-h2">
                Every violation.
                <br />
                On record.
              </h2>
              <p className="d5-section-sub">
                Evolveus tracks twelve behavioural signals during every exam
                session. Suspicious actions are timestamped, logged, and
                surfaced in audit reports so faculty can review them before
                finalising results.
              </p>
            </div>
          </Reveal>
          <div className="d5-sec-grid">
            <div>
              <h3 className="d5-h3">Detection signals</h3>
              <ul className="d5-sec-signals">
                {[
                  "Tab switching",
                  "Window focus loss",
                  "Fullscreen exit",
                  "Suspicious window resizing",
                  "Copy / paste / cut attempts",
                  "Right-click / context menu",
                  "Developer tool shortcuts",
                  "Print / save shortcuts",
                  "Screenshot shortcuts",
                  "Restricted keyboard inputs",
                  "Kiosk validation missing",
                  "IP outside lab subnet",
                ].map((s) => (
                  <li key={s}>
                    <Icon name="check" size={12} className="d5-sec-check" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="d5-h3">Enforcement controls</h3>
              <div className="d5-enf-list">
                {[
                  {
                    i: "monitor",
                    t: "Fullscreen Required",
                    d: "Blocks exam progress unless fullscreen is active",
                  },
                  {
                    i: "lock",
                    t: "Kiosk Mode",
                    d: "Restricts exams to approved kiosk environments only",
                  },
                  {
                    i: "pin",
                    t: "Lab / Subnet Lock",
                    d: "IP-based restriction enforces campus-only access",
                  },
                  {
                    i: "key",
                    t: "Password Gate",
                    d: "Optional access password per exam",
                  },
                  {
                    i: "refresh",
                    t: "Continuous Sync",
                    d: "Answers saved continuously — disconnects never lose progress",
                  },
                  {
                    i: "rss",
                    t: "Audit Logs",
                    d: "Faculty actions, score overrides, and exam edits all logged",
                  },
                ].map((e) => (
                  <div key={e.t} className="d5-enf-row">
                    <span className="d5-enf-icon">
                      <Icon name={e.i} size={16} />
                    </span>
                    <div>
                      <div className="d5-enf-t">{e.t}</div>
                      <div className="d5-enf-d">{e.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANALYTICS ──────────────────────────────────────── */}
      <section className="d5-analytics" id="d5-analytics">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">
                CHAPTER SIX · PERFORMANCE ANALYTICS
              </div>
              <h2 className="d5-h2">
                Understand every student.
                <br />
                <span className="d5-italic">Every question.</span>
              </h2>
              <p className="d5-section-sub">
                Evolveus surfaces the insights faculty and administrators need —
                from individual student performance to class-wide learning gaps.
                All data is exportable for accreditation, academic review, and
                institutional reporting.
              </p>
            </div>
          </Reveal>

          <div className="d5-analytics-grid">
            <Reveal>
              <div className="d5-analytic-card">
                <div className="d5-analytic-icon">
                  <Icon name="users" size={20} strokeWidth={1.5} />
                </div>
                <div className="d5-analytic-title">Student-level tracking</div>
                <p className="d5-analytic-desc">
                  Full submission history per student — scores, time taken,
                  violations flagged, and question-by-question accuracy.
                </p>
                <ul className="d5-analytic-bullets">
                  {[
                    "Score and percentile per quiz",
                    "Question accuracy breakdown",
                    "Submission and start time tracking",
                    "Violation log per student",
                  ].map((b) => (
                    <li key={b}>
                      <Icon name="check" size={12} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="d5-analytic-card">
                <div className="d5-analytic-icon">
                  <Icon name="chart" size={20} strokeWidth={1.5} />
                </div>
                <div className="d5-analytic-title">Class-wide insights</div>
                <p className="d5-analytic-desc">
                  Identify which questions tripped up most students, where the
                  class scored consistently low, and which topics need
                  revisiting.
                </p>
                <ul className="d5-analytic-bullets">
                  {[
                    "Question-level difficulty trends",
                    "Class score distribution",
                    "Common wrong answers by question",
                    "Submission status overview",
                  ].map((b) => (
                    <li key={b}>
                      <Icon name="check" size={12} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="d5-analytic-card">
                <div className="d5-analytic-icon">
                  <Icon name="flag" size={20} strokeWidth={1.5} />
                </div>
                <div className="d5-analytic-title">CO & Bloom's tracking</div>
                <p className="d5-analytic-desc">
                  Track course outcome attainment and Bloom's taxonomy coverage
                  across assessments. Essential for NBA, NAAC, and accreditation
                  cycles.
                </p>
                <ul className="d5-analytic-bullets">
                  {[
                    "CO1–CO8 attainment per batch",
                    "Bloom's level coverage per quiz",
                    "Cumulative CO attainment trends",
                    "Exportable attainment reports",
                  ].map((b) => (
                    <li key={b}>
                      <Icon name="check" size={12} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="d5-co-section">
              <div className="d5-co-grid">
                <div>
                  <div className="d5-co-col-title">
                    Course Outcome Attainment — CS301 Midterm
                  </div>
                  <div className="d5-co-bars">
                    {CO_BARS.map((c) => (
                      <div key={c.label} className="d5-co-row">
                        <div className="d5-co-label-row">
                          <span className="d5-co-label">{c.label}</span>
                          <span className="d5-co-val">{c.pct}%</span>
                        </div>
                        <div className="d5-co-track">
                          <div
                            className={`d5-co-fill ${c.low ? "low" : ""}`}
                            style={{ width: `${c.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="d5-co-col-title">
                    Bloom's Taxonomy Coverage — Same Quiz
                  </div>
                  <div className="d5-bloom-grid">
                    {BLOOM_BARS.map((b) => (
                      <div key={b.name} className="d5-bloom-row">
                        <span className="d5-bloom-name">{b.name}</span>
                        <div className="d5-bloom-bar-wrap">
                          <div
                            className="d5-bloom-bar"
                            style={{ width: `${b.pct}%` }}
                          />
                        </div>
                        <span className="d5-bloom-pct">{b.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DEPLOYMENT ─────────────────────────────────────── */}
      <div id="d5-deploy">
        <DeploySection />
      </div>

      {/* ── ROLES ──────────────────────────────────────────── */}
      <RolesSection />

      {/* ── CONTENT TOOLS ──────────────────────────────────── */}
      <section className="d5-content">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-section-head">
              <div className="d5-eyebrow">CHAPTER EIGHT · CONTENT TOOLS</div>
              <h2 className="d5-h2">
                Questions built for
                <br />
                academic depth.
              </h2>
            </div>
          </Reveal>
          <div className="d5-content-grid">
            {[
              {
                i: "edit",
                t: "Rich-text editor",
                d: "Bold, italic, lists, code blocks, quotes, horizontal rules — full formatting control.",
              },
              {
                i: "bookOpen",
                t: "LaTeX support",
                d: "Render mathematical and scientific notation inline in question content.",
              },
              {
                i: "upload",
                t: "Image embedding",
                d: "Inline images in question bodies with secure signed access links.",
              },
              {
                i: "download",
                t: "File submissions",
                d: "Accept student file uploads for project-based and portfolio assessments.",
              },
              {
                i: "tag",
                t: "Bloom's taxonomy",
                d: "Tag every question — Remember, Understand, Apply, Analyse, Evaluate, Create.",
              },
              {
                i: "flag",
                t: "CO mapping",
                d: "CO1 through CO8 alignment per question, for accreditation reporting.",
              },
              {
                i: "database",
                t: "Bulk MCQ upload",
                d: "Spreadsheet-based import with row-level validation and downloadable template.",
              },
              {
                i: "share",
                t: "Bank sharing",
                d: "Share question banks with other faculty. Revoke access at any time.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 40}>
                <div className="d5-c-item">
                  <Icon name={c.i} size={20} className="d5-c-icon" />
                  <div>
                    <div className="d5-c-t">{c.t}</div>
                    <div className="d5-c-d">{c.d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="CHAPTER NINE" />

      {/* ── FEEDBACK ───────────────────────────────────────── */}
      <FeedbackSection />

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="d5-cta" id="d5-contact">
        <div className="d5-section-inner">
          <Reveal>
            <div className="d5-trust-row">
              <div className="d5-trust-item">
                <Icon name="shieldCheck" size={18} className="d5-trust-icon" />
                <div>
                  <div className="d5-trust-t">Data sovereignty</div>
                  <div className="d5-trust-d">
                    Self-host on your infrastructure. Student data never leaves
                    your network.
                  </div>
                </div>
              </div>
              <div className="d5-trust-item">
                <Icon name="refresh" size={18} className="d5-trust-icon" />
                <div>
                  <div className="d5-trust-t">We maintain it</div>
                  <div className="d5-trust-d">
                    Platform updates, patches, and ops handled by our team on
                    any deployment.
                  </div>
                </div>
              </div>
              <div className="d5-trust-item">
                <Icon name="lock" size={18} className="d5-trust-icon" />
                <div>
                  <div className="d5-trust-t">Role-based access</div>
                  <div className="d5-trust-d">
                    Every user sees only what their role requires. Row-level
                    data separation.
                  </div>
                </div>
              </div>
              <div className="d5-trust-item">
                <Icon name="globe" size={18} className="d5-trust-icon" />
                <div>
                  <div className="d5-trust-t">Your AI provider</div>
                  <div className="d5-trust-d">
                    BYOK — connect OpenAI, Anthropic, Google, Azure, or any
                    compatible endpoint.
                  </div>
                </div>
              </div>
            </div>

            <div className="d5-cta-rule" />
            <div className="d5-cta-eyebrow">SCHEDULE A DEMONSTRATION</div>
            <h2 className="d5-cta-h">
              Ready to bring rigour and
              <br />
              <span className="d5-italic">reliability</span> to your
              assessments?
            </h2>
            <p className="d5-cta-sub">
              Our team will walk through the full platform — question banks,
              secure exam delivery, AI evaluation, performance analytics, and
              deployment options. No commitment. No generic demo — we tailor it
              to your institution's workflows.
            </p>
            <form className="d5-contact-form" onSubmit={submitContactForm}>
              <div className="d5-contact-grid">
                <label className="d5-contact-field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={contactValues.name}
                    onChange={updateContactField}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="d5-contact-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={contactValues.email}
                    onChange={updateContactField}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="d5-contact-field">
                  <span>Organisation name</span>
                  <input
                    type="text"
                    name="organisationName"
                    value={contactValues.organisationName}
                    onChange={updateContactField}
                    autoComplete="organization"
                    required
                  />
                </label>
                <label className="d5-contact-field">
                  <span>Number of students</span>
                  <input
                    type="number"
                    name="numberOfStudents"
                    value={contactValues.numberOfStudents}
                    onChange={updateContactField}
                    min="1"
                    step="1"
                    inputMode="numeric"
                    required
                  />
                </label>
                <label className="d5-contact-field d5-contact-field--wide">
                  <span>Contact number</span>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={contactValues.contactNumber}
                    onChange={updateContactField}
                    autoComplete="tel"
                    required
                  />
                </label>
              </div>

              <div className="d5-contact-actions">
                <button
                  className="d5-cta-primary"
                  type="submit"
                  disabled={contactStatus.state === "submitting"}
                >
                  {contactStatus.state === "submitting"
                    ? "Sending..."
                    : "Send Request"}
                  <Icon name="arrowRight" size={14} />
                </button>
                <button
                  className="d5-cta-text"
                  type="button"
                  onClick={onBrochure}
                >
                  <Icon name="download" size={14} /> Download Brochure
                </button>
              </div>

              {contactStatus.message && (
                <div
                  className={`d5-contact-message d5-contact-message--${contactStatus.state}`}
                  role={contactStatus.state === "error" ? "alert" : "status"}
                >
                  {contactStatus.message}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="d5-footer">
        <div className="d5-footer-inner">
          <div className="d5-footer-brand">
            <div className="d5-logo">
              <span className="d5-logo-mark">
                <svg
                  viewBox="0 0 36 36"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <path
                    d="M18 3 L33 11 L33 25 L18 33 L3 25 L3 11 Z"
                    fill="none"
                    stroke="#1f4e2c"
                    strokeWidth="1.4"
                  />
                </svg>
              </span>
              <span className="d5-logo-name">Evolveus</span>
            </div>
            <p className="d5-footer-tagline">
              Complete digital assessment for higher education institutions.
            </p>
          </div>

          <div className="d5-footer-links-group">
            <div className="d5-footer-col">
              <div className="d5-footer-col-title">Platform</div>
              <a href="#d5-platform">Pillars</a>
              <a href="#d5-ai-eval">AI Evaluation</a>
              <a href="#d5-coding">Coding Assessment</a>
              <a href="#d5-formats">Question Types</a>
              <a href="#d5-analytics">Analytics</a>
            </div>
            <div className="d5-footer-col">
              <div className="d5-footer-col-title">Deployment</div>
              <a href="#d5-deploy">Managed Cloud</a>
              <a href="#d5-deploy">Self-Hosted</a>
              <a href="#d5-deploy">Data Sovereignty</a>
            </div>
            <div className="d5-footer-col">
              <div className="d5-footer-col-title">Company</div>
              <a href="#d5-platform">About</a>
              <a onClick={onBrochure} style={{ cursor: "pointer" }}>
                Brochure
              </a>
              <a href="#d5-contact">Schedule Demo</a>
              <a href="#d5-contact">Contact</a>
            </div>
          </div>

          <div className="d5-footer-bottom">
            <p className="d5-footer-copy">© 2026 Evolveus · Vol. I, No. 1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
