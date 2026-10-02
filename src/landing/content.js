// ─────────────────────────────────────────────────────────────
// Canonical copy for the EvolveUs landing page. Every design variant
// (Design 1 through 6) states the same facts, sourced from FEATURES.md.
// Nothing here is invented. Do not add testimonials, customer names,
// or numbers that aren't backed by FEATURES.md.
// ─────────────────────────────────────────────────────────────

export const SUMMARY =
  'EvolveUs gives institutions a complete assessment management system, from academic setup to secure exam delivery and result analysis. It reduces manual work for administrators and faculty, improves exam control, supports diverse question formats, and gives students a clear, organised assessment experience.';

export const BRAND = {
  name: 'Evolveus',
  domain: 'evolveus.in',
};

export const NAV_LINKS = [
  { href: '#platform', label: 'Platform' },
  { href: '#question-types', label: 'Question Types' },
  { href: '#roles', label: 'Roles' },
  { href: '#security', label: 'Security' },
  { href: '#ai-evaluation', label: 'AI Evaluation' },
  { href: '#deployment', label: 'Deployment' },
];

export const HERO = {
  eyebrow: 'Digital assessment platform',
  headline: 'Run exams your institution can stand behind.',
  sub: 'EvolveUs is a complete digital assessment platform for educational institutions: course planning, question banks, secure online exams, evaluation, and student performance review in one system.',
  primaryCta: 'Request a demo',
  secondaryCta: 'See the platform',
};

export const STATS = [
  { n: '2,000+', l: 'Quizzes conducted' },
  { n: '200,000+', l: 'Student responses processed' },
  { n: '8', l: 'Question types supported' },
  { n: '7', l: 'Programming languages for coding questions' },
  { n: '12', l: 'Exam violation signals tracked' },
];

export const PILLARS = [
  {
    n: '01',
    title: 'Coding assessment',
    icon: 'code',
    body: 'Sandboxed execution against visible and hidden test cases, with partial marking, time and memory limits, and support for seven languages.',
    bullets: [
      'In-browser code editor',
      'Boilerplate and driver code',
      'Reference solutions for setup',
      'Language selectable per question',
    ],
  },
  {
    n: '02',
    title: 'Question bank',
    icon: 'database',
    body: "Reusable question banks organised by topic and tagged with Bloom’s taxonomy and course outcomes. Bulk upload runs through spreadsheet templates.",
    bullets: [
      'Topic-based organisation',
      "Bloom’s taxonomy: remember through create",
      'CO1 to CO8 mapping',
      'Bulk upload with row validation',
    ],
  },
  {
    n: '03',
    title: 'Secure examination',
    icon: 'shieldCheck',
    body: 'Twelve violation signals tracked in real time, fullscreen enforcement, kiosk mode, and IP or subnet restriction by lab.',
    bullets: [
      'Tab-switch detection',
      'Copy, paste, and right-click blocking',
      'Kiosk validation gate',
      'Password-protected access',
    ],
  },
  {
    n: '04',
    title: 'AI evaluation',
    icon: 'brain',
    body: 'LLM-assisted grading for descriptive and fill-in-the-blank answers, using a provider you connect. Faculty reviews every score before it counts.',
    bullets: [
      'Bring your own API key',
      'Any OpenAI-compatible provider',
      'Rubric-based scoring',
      'Manual override always available',
    ],
  },
  {
    n: '05',
    title: 'Analytics and reporting',
    icon: 'chart',
    body: 'Per-student, per-question, and class-wide breakdowns, with course outcome attainment tracking exportable for accreditation.',
    bullets: [
      'Difficulty trend analysis',
      'CO attainment reports',
      'Submission and violation tracking',
      'Accreditation-ready exports',
    ],
  },
  {
    n: '06',
    title: 'Institution management',
    icon: 'building',
    body: 'Departments, semesters, batches, courses, and labs live in one place, with role-based access for every user type.',
    bullets: [
      'Department, batch, and semester setup',
      'Course assignment at scale',
      'Lab IP-subnet configuration',
      'User and profile management',
    ],
  },
];

export const QUESTION_TYPES = [
  {
    num: '01',
    label: 'Single-choice MCQ',
    icon: 'radio',
    desc: 'One correct answer from several options, with shuffle and negative marking.',
    grading: 'Fully automated.',
  },
  {
    num: '02',
    label: 'Multiple-choice MCQ',
    icon: 'checkSquare',
    desc: 'Two or more correct answers, with full-only or partial marking.',
    grading: 'Automated, partial marking configurable.',
  },
  {
    num: '03',
    label: 'True or false',
    icon: 'toggle',
    desc: 'Binary choice for quick concept checks, with negative marking support.',
    grading: 'Fully automated.',
  },
  {
    num: '04',
    label: 'Descriptive',
    icon: 'edit',
    desc: 'Long-form written answers graded against a faculty-set rubric.',
    grading: 'AI-assisted, faculty can override.',
  },
  {
    num: '05',
    label: 'Fill-in-the-blank',
    icon: 'iBeam',
    desc: 'Exact match or, where enabled, semantic match via LLM for equivalent phrasing.',
    grading: 'Automated or AI-assisted.',
  },
  {
    num: '06',
    label: 'Match-the-following',
    icon: 'link',
    desc: 'Students pair items across two columns, with proportional credit per pair.',
    grading: 'Fully automated.',
  },
  {
    num: '07',
    label: 'File upload',
    icon: 'upload',
    desc: 'Documents, images, or project archives, submitted through secure signed links.',
    grading: 'Manual, faculty enters score and remarks.',
  },
  {
    num: '08',
    label: 'Coding',
    icon: 'code',
    desc: 'In-browser editor with sandboxed execution against visible and hidden test cases.',
    grading: 'Automated, partial marks by test cases passed.',
  },
];

export const ROLES = [
  {
    id: 'admin',
    label: 'Administrator',
    icon: 'building',
    src: '/staffDashboard.png',
    summary: 'Manages the academic structure, configures users, and monitors platform health across the institution.',
    features: [
      'Manage departments, batches, semesters, and courses',
      'Create users and assign roles across admin, manager, faculty, and student',
      'Configure lab IP subnets for restricted exam access',
      'View platform-wide usage metrics and quiz summaries',
      'Audit logs for faculty actions, exam edits, and score overrides',
      'Bulk-create courses and users through spreadsheet upload',
    ],
  },
  {
    id: 'faculty',
    label: 'Faculty',
    icon: 'edit',
    src: '/bankQuestions.png',
    summary: 'Builds question banks, designs exams, configures evaluation, and reviews results.',
    features: [
      'Create reusable question banks organised by topic',
      "Tag questions with Bloom’s taxonomy and CO1 to CO8 mapping",
      'Configure coding test cases, boilerplate, and reference solutions',
      'Schedule quizzes to courses, batches, or individual students',
      'Review AI-generated grades and override any score before publishing',
      'Export class-wide results for accreditation and academic records',
    ],
  },
  {
    id: 'student',
    label: 'Student',
    icon: 'graduation',
    src: '/studentDashboard.png',
    summary: 'Sees assigned quizzes, attempts them securely, and tracks results.',
    features: [
      'View active, upcoming, completed, and missed quizzes',
      'Timer-based exam interface with a question navigation panel',
      'Answers save continuously during the exam',
      'Write and run code in an in-browser editor with language selection',
      'Upload files for file-based questions',
      'View published results once released',
    ],
  },
];

export const SECURITY_SIGNALS = [
  'Tab switching, detected and logged in real time',
  'Window focus loss',
  'Fullscreen exit, flagged with a return-to-fullscreen prompt',
  'Suspicious window resizing',
  'Copy, paste, and cut attempts',
  'Right-click and context-menu attempts',
  'Developer tool shortcuts',
  'Print and save shortcuts',
  'Screenshot shortcut attempts',
  'Restricted keyboard shortcuts',
];

export const SECURITY_FEATURES = [
  {
    icon: 'monitor',
    title: 'Fullscreen enforcement',
    desc: 'Students stay in fullscreen for the duration of the exam. Exits are recorded as violations with a prompt to return.',
  },
  {
    icon: 'lock',
    title: 'Kiosk mode',
    desc: 'Restricts the exam to an approved kiosk environment and blocks access without the required validation.',
  },
  {
    icon: 'network',
    title: 'Lab and network restriction',
    desc: 'Locks a quiz to configured lab IP subnets, so it can only be attempted from approved campus locations.',
  },
  {
    icon: 'key',
    title: 'Password protection',
    desc: 'Quizzes can require a password before a student can begin.',
  },
];

export const AI_STEPS = [
  {
    num: '01',
    icon: 'edit',
    title: 'Faculty defines the rubric',
    desc: 'Marking criteria and expected concepts set what full, partial, and zero marks look like.',
  },
  {
    num: '02',
    icon: 'globe',
    title: 'Student submits an answer',
    desc: 'Descriptive paragraphs, fill-in-the-blank phrases, or long-form responses.',
  },
  {
    num: '03',
    icon: 'brain',
    title: 'The model evaluates against the rubric',
    desc: 'Your configured model receives the rubric and the response, then returns a score with reasoning, on your key and your chosen provider.',
  },
  {
    num: '04',
    icon: 'checkCircle',
    title: 'Faculty reviews and confirms',
    desc: 'Scores appear with the model\'s reasoning. Faculty can accept, adjust, or override any score before results publish.',
  },
];

export const AI_MODELS = [
  { name: 'OpenAI', sub: 'GPT-4o, GPT-4' },
  { name: 'Anthropic', sub: 'Claude 3.5 Sonnet' },
  { name: 'Google', sub: 'Gemini 1.5 Pro' },
  { name: 'Azure', sub: 'Azure OpenAI Service' },
  { name: 'Custom endpoint', sub: 'Any OpenAI-compatible API' },
];

export const AI_HIGHLIGHTS = [
  {
    icon: 'flag',
    title: 'Semantic fill-in-blank matching',
    desc: 'Accepts synonyms and semantically equivalent phrasing, not only exact text.',
  },
  {
    icon: 'lock',
    title: 'Your keys, your data',
    desc: 'API keys stay on your infrastructure. Responses are not stored beyond the evaluation call.',
  },
  {
    icon: 'refresh',
    title: 'Manual override, always',
    desc: 'Faculty can review, annotate, and override any AI score before results release.',
  },
];

export const DEPLOY_MODES = [
  {
    id: 'managed',
    label: 'Managed cloud',
    icon: 'globe',
    tagline: 'We host, operate, and maintain everything.',
    sub: 'No infrastructure team required. Updates, backups, and monitoring are handled for you.',
    features: [
      'Running within days, no server provisioning',
      'Platform updates deployed with no downtime on your side',
      'Daily backups with point-in-time recovery',
      'Uptime monitoring and incident response',
      "Tenant isolation at the database layer",
      'SLA-backed support',
    ],
  },
  {
    id: 'self',
    label: 'Self-hosted',
    icon: 'building',
    tagline: 'Your servers, your data.',
    sub: 'Deploy on-premise or on a private cloud. We maintain the platform on your infrastructure.',
    features: [
      'Student data stays on your network',
      'We handle updates, patches, and deployments on your servers',
      'Runs on existing servers, private cloud, or air-gapped environments',
      'SSO integration with your identity provider',
      'Meets institutional data residency requirements',
      'Can operate without external internet dependencies',
    ],
  },
];

export const CONTENT_TOOLS = [
  { icon: 'edit', title: 'Rich text editor', desc: 'Bold, italic, lists, block quotes, code, and horizontal rules for question content.' },
  { icon: 'upload', title: 'Image embedding', desc: 'Upload and embed images directly inside question content.' },
  { icon: 'fileText', title: 'LaTeX support', desc: 'For mathematical and scientific notation, with a live preview.' },
  { icon: 'shareNodes', title: 'Bank sharing', desc: 'Share question banks with other faculty and revoke access at any time.' },
];

export const CONTACT_FIELDS_INITIAL = {
  name: '',
  email: '',
  organisationName: '',
  numberOfStudents: '',
  contactNumber: '',
};

export const CTA = {
  eyebrow: 'Schedule a demonstration',
  headline: 'Ready to bring rigour to your assessments?',
  sub: "We’ll walk through the platform: question banks, secure exam delivery, AI evaluation, analytics, and deployment options, matched to your institution’s workflows.",
};

export const FOOTER = {
  tagline: 'Complete digital assessment for higher education institutions.',
  columns: [
    {
      title: 'Platform',
      links: [
        { href: '#platform', label: 'Pillars' },
        { href: '#ai-evaluation', label: 'AI evaluation' },
        { href: '#question-types', label: 'Question types' },
      ],
    },
    {
      title: 'Deployment',
      links: [
        { href: '#deployment', label: 'Managed cloud' },
        { href: '#deployment', label: 'Self-hosted' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '#contact', label: 'Schedule a demo' },
        { href: '#contact', label: 'Contact' },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Brand page copy (src/landing/brand/Register.jsx).
//
// Audience: university management, not engineers. Every line should be
// understood by a dean, registrar, or exam controller. Benefit-led —
// say what the college gets, not how it is built.
// ─────────────────────────────────────────────────────────────

export const BRAND_NAV = [
  { href: '#before', label: 'Setting papers' },
  { href: '#security', label: 'Exam security' },
  { href: '#marking', label: 'Marking' },
  { href: '#reports', label: 'Reports' },
  { href: '#roles', label: 'Who uses it' },
  { href: '#deployment', label: 'Deployment' },
];

export const BRAND_HERO = {
  eyebrow: 'Online exams for universities',
  headline: 'Set the paper, run the exam, mark it, see the results. One place.',
  emphasis: 'One place.',
  sub: 'Evolveus runs a university\'s online exams from start to finish. Students write in your labs on a secured browser, AI marks written and coding answers for faculty to approve, and results come back by topic and course outcome.',
  note: 'Runs on our cloud or on your own campus servers.',
};

export const TRUST = {
  label: 'In use at',
  org: 'Amrita Vishwa Vidyapeetham',
  note: 'Developed at the School of AI, Amrita Vishwa Vidyapeetham, Coimbatore.',
  logo: '/Amrita_Logo_Banner.svg',
  figures: [
    { n: '1,500+', l: 'Students on the platform' },
    { n: '2,000+', l: 'Exams conducted' },
    { n: '200,000+', l: 'Answers evaluated' },
  ],
};

/* §01 — setting the paper */
export const BEFORE = [
  {
    n: '01',
    icon: 'database',
    title: 'Question banks by topic',
    body: 'Questions live in banks organised by course and topic. A bank can be shared with colleagues, with control over who may edit it, and MCQs can be uploaded in bulk from a spreadsheet.',
  },
  {
    n: '02',
    icon: 'tag',
    title: 'Tagged for outcomes',
    body: "Each question carries a difficulty, a Bloom's level and a course outcome from CO1 to CO8. The reports read these tags later, so nobody maps marks to outcomes by hand before an audit.",
  },
  {
    n: '03',
    icon: 'fileText',
    title: 'Drafted from your notes',
    body: 'Upload a PDF of the notes or chapter you taught from and Evolveus drafts questions on it. Faculty keep the ones they like, edit some, and throw the rest away.',
  },
  {
    n: '04',
    icon: 'layers',
    title: 'Any mix of question types',
    body: 'MCQ, true or false, fill in the blank, matching, descriptive, file upload and coding questions can sit in the same paper, with one mark sheet at the end.',
  },
];

/* §02 — during the exam */
export const SECURITY_PILLARS = [
  {
    icon: 'lock',
    title: 'Locked exam browser',
    desc: 'An exam can require the Evolveus kiosk browser. Until the student submits, other apps and websites stay closed.',
  },
  {
    icon: 'monitor',
    title: 'Full screen throughout',
    desc: 'Leaving full screen is logged, and the student has to return to it before carrying on.',
  },
  {
    icon: 'network',
    title: 'Only from your labs',
    desc: "An exam can be limited to approved lab networks by IP range, so it can't be taken from a hostel room or from home.",
  },
  {
    icon: 'key',
    title: 'Started with a password',
    desc: 'The invigilator reads out the password when the exam begins, so nobody starts early.',
  },
];

export const WATCHED = [
  'Switching to another tab',
  'Moving away from the exam window',
  'Leaving full-screen mode',
  'Resizing the exam window',
  'Copy, paste, and cut attempts',
  'Right-click and context menus',
  'Developer tool shortcuts',
  'Print and save shortcuts',
  'Screenshot attempts',
  'Other restricted keyboard shortcuts',
];

/* §03 — marking */
export const EVALUATION = [
  {
    id: 'descriptive',
    icon: 'edit',
    label: 'Written answers',
    title: 'Graded against your rubric, with a reason',
    body: 'Faculty write the model answer and the points that earn marks. Evolveus grades every answer against them and writes a short remark explaining each mark.',
    points: [
      'Marked against the rubric your faculty wrote',
      'The same standard for the first answer and the last',
      'A written reason beside every mark',
      'Faculty can change any mark before results go out',
    ],
  },
  {
    id: 'coding',
    icon: 'code',
    label: 'Coding answers',
    title: 'Run against test cases, then checked for method',
    body: 'Students write and run code in the browser. The program runs against the visible and hidden test cases faculty set, and earns part marks for the cases it passes. When a question asks for a particular approach, such as dynamic programming, an AI check confirms the student used it, even if every test passed.',
    points: [
      'Seven languages, chosen per question',
      'Part marks for a partly working program',
      'Off-method solutions flagged for faculty',
      'Time and memory limits set per question',
    ],
  },
];

/* Real screens from the product, captured with names replaced. */
export const MARKING_SHOTS = [
  {
    src: '/product/grading-remark.webp',
    fig: '3.1',
    label: 'Written answer, marked',
    alt: 'A descriptive answer from an operating systems quiz, marked 2 out of 2, with the remark explaining why it earned full marks.',
    caption: 'A written answer from an operating systems quiz, with the mark and the remark Evolveus wrote for it.',
  },
  {
    src: '/product/attempt-analytics.webp',
    fig: '3.2',
    label: 'One question, one student',
    alt: "One question from a student's attempt, showing the chosen option, the time spent, clicks and views.",
    caption: 'For every question: the answer, the time spent, how many times the student opened it, and how many clicks it took.',
  },
];

export const AI_ASSURANCE = [
  {
    icon: 'checkCircle',
    title: 'Nothing is published until faculty say so',
    desc: 'Students see results only after a faculty member publishes them. Any mark can be edited before that, and every edit is logged.',
  },
  {
    icon: 'refresh',
    title: 'Fix the rubric, re-grade the question',
    desc: 'If a rubric turns out to be wrong, correct it and re-evaluate that one question for the whole class.',
  },
];

/* §04 — reports */
export const REPORTS = [
  {
    id: 'student',
    label: 'For one student',
    icon: 'graduation',
    title: 'Where the marks went',
    summary: "Each attempt shows the student's score against the class, their rank, the time spent on each question, and marks broken down by Bloom's level. Students see their own trend across every course they take.",
    points: [
      'Score, rank, and distance from the class average',
      "Marks by Bloom's level and course outcome",
      'A score trend across all their courses',
      'Blank answers and rushed attempts flagged',
    ],
    shot: { src: '/product/student-standing.webp', fig: '4.1', label: 'One attempt', alt: "One student's attempt: score, class average, rank, and marks by Bloom's level." },
  },
  {
    id: 'class',
    label: 'For one exam',
    icon: 'chart',
    title: 'How the class did, and who needs a word',
    summary: 'The spread of scores for the whole class, with the students who need attention listed beside it and the reason for each: well below average, answers left blank, or finished unusually fast.',
    points: [
      'Score distribution, mean and median',
      'Students to follow up, with the reason',
      'Question difficulty measured from real answers',
      'Results exported to Excel',
    ],
    shot: { src: '/product/cohort-results.webp', fig: '4.2', label: 'One quiz, 131 students', alt: 'Results for a 131-student quiz: score histogram and a list of students to follow up.' },
  },
  {
    id: 'department',
    label: 'For a department',
    icon: 'building',
    title: 'Topic mastery across batches',
    summary: 'Mastery for each topic, compared across sections and semesters, so a weak topic shows up while there is still time to teach it again.',
    points: [
      'Topic mastery for every class',
      'Course outcome attainment, CO1 to CO8',
      'Comparison across batches, sections, and semesters',
    ],
  },
];

/* Illustrative numbers for the department view. Labelled as sample data on the page.
   \u00AD is a soft hyphen, so long topic names can break cleanly in a narrow column. */
export const MASTERY_SAMPLE = {
  course: 'Operating Systems, semester 3',
  batches: ['Section A', 'Section B', 'Section C'],
  topics: [
    { name: 'Processes and threads', v: [78, 74, 81] },
    { name: 'CPU scheduling', v: [71, 66, 69] },
    { name: 'Synchroni\u00ADsation', v: [52, 44, 58] },
    { name: 'Deadlocks', v: [63, 61, 57] },
    { name: 'Memory manage\u00ADment', v: [47, 39, 51] },
    { name: 'File systems', v: [69, 72, 64] },
  ],
};

export const AI_HELP = {
  title: 'Or just ask',
  desc: 'Faculty can ask the built-in assistant how a class is doing or which topics are weakest, or have it set up a quiz. It shows what it is about to do and waits for a yes.',
};

/* §05 — roles, with current screens */
export const BRAND_ROLES = [
  {
    id: 'admin',
    label: 'Administrator',
    src: '/product/role-admin.webp',
    summary: 'Sets up departments, batches, semesters, courses and labs, and manages every account in the university.',
    features: [
      'Departments, batches, semesters, and courses',
      'Accounts and roles for admins, managers, faculty, and students',
      'Lab IP ranges for exams that must be taken on campus',
      'Bulk import of courses and users from a spreadsheet',
      'An audit log of exam edits and mark changes',
    ],
  },
  {
    id: 'faculty',
    label: 'Faculty',
    src: '/product/role-faculty.webp',
    summary: 'Writes questions, sets and schedules exams, checks the marking, and follows up on the results.',
    features: [
      'Question banks organised by topic and shared with colleagues',
      "Bloom's level and course outcome on every question",
      'Exams scheduled to courses, batches, or single students',
      'AI marks reviewed and changed before publishing',
      'Analytics for each course, quiz, question, and student',
    ],
  },
  {
    id: 'student',
    label: 'Student',
    src: '/product/role-student.webp',
    summary: 'Takes exams, sees results once they are published, and keeps track of their own progress.',
    features: [
      'Live, upcoming, completed, and missed exams in one list',
      'A timed exam with a question navigator and continuous saving',
      'An in-browser code editor for coding questions',
      'Results and remarks once faculty publish them',
      'A score trend across every course',
    ],
  },
];

/* §06 — deployment */
export const BRAND_DEPLOY = [
  {
    id: 'managed',
    icon: 'globe',
    label: 'Hosted by us',
    tagline: 'Nothing for your IT team to run.',
    sub: 'We host, update, back up and monitor it. A university can be running exams within days.',
    features: [
      'Running in days, with no servers to buy',
      'Updates and backups handled for you',
      'Monitored, with support when you need it',
    ],
  },
  {
    id: 'self',
    icon: 'building',
    label: 'On your campus',
    tagline: 'Student data stays on your servers.',
    sub: 'Install it on your own machines or private cloud, and we maintain it there.',
    features: [
      'Student records stay on your own network',
      'We update and maintain it on your servers',
      'For complete isolation, run the AI models on your own hardware or switch AI marking off',
    ],
  },
];

export const BRAND_CTA = {
  eyebrow: 'Book a walkthrough',
  headline: 'See it with your own question paper.',
  sub: 'Send us a paper you have already set. We will run it as a real exam with your team, from setting it up to the report at the end. It takes about half an hour.',
};

export const BRAND_FOOTER = {
  tagline: 'Online exams, marking, and reports for universities.',
  columns: [
    {
      title: 'Platform',
      links: [
        { href: '#before', label: 'Setting papers' },
        { href: '#security', label: 'Exam security' },
        { href: '#marking', label: 'Marking' },
        { href: '#reports', label: 'Reports' },
      ],
    },
    {
      title: 'Deployment',
      links: [
        { href: '#deployment', label: 'Hosted by us' },
        { href: '#deployment', label: 'On your campus' },
      ],
    },
    {
      title: 'Talk to us',
      links: [
        { href: '#contact', label: 'Book a walkthrough' },
        { href: '#roles', label: 'Who uses it' },
      ],
    },
  ],
};

export const BRAND_LOGO = {
  mark: '/evolveus-mark.png',
  markLight: '/evolveus-mark-light.png',
};

/* ─────────────────────────────────────────────────────────────
   COMPARISON PAGE

   A college almost never compares Evolveus against one named
   product. It compares Evolveus against a *kind* of tool it already
   has — a form, its LMS, a coding-test service, a proctoring vendor.
   So this page compares categories, and names well-known products
   only as examples of the category they belong to.

   The rule for everything below: describe what each kind of tool was
   BUILT for. Never assert that a named vendor lacks a named feature.
   Vendors ship; a claim that is true this quarter becomes a liability
   the next one. Every Evolveus column entry is backed by FEATURES.md.
   ───────────────────────────────────────────────────────────── */

export const COMPARE_HERO = {
  eyebrow: 'How Evolveus compares',
  headline: 'What are you comparing it against?',
  sub: 'Most colleges are not choosing between two exam platforms. They are deciding whether the tools already on campus, such as a form, the LMS or a coding-test service, are enough to run a real exam. This page tries to answer that honestly.',
  note: 'Including the cases where the answer is no, and you should keep what you have.',
};

/* The four things a college actually weighs Evolveus against. */
export const COMPARE_ALTERNATIVES = [
  {
    id: 'forms',
    icon: 'checkSquare',
    label: 'Free form tools',
    examples: 'Google Forms, Microsoft Forms',
    built: 'Built to collect answers from anyone, quickly and free.',
    gap: 'A form has no invigilator, no concept of a batch or a semester, and no way to mark a written answer. It is excellent for a class poll and unsuited to an examination that decides a grade.',
  },
  {
    id: 'lms',
    icon: 'bookOpen',
    label: 'LMS quiz modules',
    examples: 'Moodle, Google Classroom, Canvas',
    built: 'Built to deliver a course: material, assignments, discussion, and a quiz alongside them.',
    gap: 'The quiz is one feature among many, so supervision, coding questions, and outcome attainment usually arrive as add-ons, plugins, and spreadsheets your department maintains itself.',
  },
  {
    id: 'judge',
    icon: 'terminal',
    label: 'Coding-test platforms',
    examples: 'HackerRank, HackerEarth',
    built: 'Built to screen engineers for a job, at scale, on code alone.',
    gap: 'They are strong at exactly the thing they do. A semester exam has more than code in it, though, and these tools think in candidates moving through a hiring funnel, where a college thinks in students in a batch working through a syllabus.',
  },
  {
    id: 'proctor',
    icon: 'eye',
    label: 'Proctoring and hiring suites',
    examples: 'Mercer | Mettl, Talview',
    built: 'Built to supervise high-stakes tests for employers and certification bodies.',
    gap: 'Supervision is their strength. They are not built around your academic year: course outcomes, internal marks, and a head of department asking which topic a class did badly on.',
  },
];

export const COMPARE_COLUMNS = [
  { id: 'evolveus', label: 'Evolveus', sub: 'Examinations for colleges' },
  { id: 'forms', label: 'Form tools', sub: 'Google, Microsoft Forms' },
  { id: 'lms', label: 'LMS quizzes', sub: 'Moodle, Classroom' },
  { id: 'judge', label: 'Coding tests', sub: 'HackerRank, HackerEarth' },
  { id: 'proctor', label: 'Proctoring suites', sub: 'Mettl, Talview' },
];

/* v: 'full' | 'part' | 'none' — how squarely the category is built for the row. */
export const COMPARE_ROWS = [
  {
    id: 'structure',
    criterion: 'Shaped like a college',
    detail: 'Departments, programmes, batches, semesters and courses are set up first, and every exam hangs off them.',
    cells: {
      evolveus: { v: 'full', t: 'The academic structure is step one' },
      forms: { v: 'none', t: 'A form has no batches' },
      lms: { v: 'part', t: 'Courses and enrolment, yes' },
      judge: { v: 'part', t: 'Organised around candidates' },
      proctor: { v: 'part', t: 'Organised around campaigns' },
    },
  },
  {
    id: 'supervision',
    criterion: 'Exams actually supervised',
    detail: 'Full-screen held, a locked browser, restricted lab access, and every violation recorded against the attempt.',
    cells: {
      evolveus: { v: 'full', t: 'Logged against the attempt' },
      forms: { v: 'none', t: 'No supervision at all' },
      lms: { v: 'part', t: 'Usually a paid add-on' },
      judge: { v: 'full', t: 'Core to their product' },
      proctor: { v: 'full', t: 'Core to their product' },
    },
  },
  {
    id: 'descriptive',
    criterion: 'Written answers graded automatically',
    detail: 'Long answers read against the rubric your own faculty wrote, returned with a mark and a reason.',
    cells: {
      evolveus: { v: 'full', t: 'Faculty approve every mark' },
      forms: { v: 'none', t: 'Exact-match answers only' },
      lms: { v: 'none', t: 'Marked by hand, script by script' },
      judge: { v: 'none', t: 'Built for code, not prose' },
      proctor: { v: 'part', t: 'Varies by vendor' },
    },
  },
  {
    id: 'coding',
    criterion: 'Coding answers graded by running them',
    detail: 'Students write and run code in the browser; programs are tested against hidden cases and marked on the spot.',
    cells: {
      evolveus: { v: 'full', t: 'Seven languages, partial marks' },
      forms: { v: 'none', t: 'Not possible' },
      lms: { v: 'part', t: 'Usually a plugin' },
      judge: { v: 'full', t: 'Their strongest ground' },
      proctor: { v: 'part', t: 'Often a bolt-on module' },
    },
  },
  {
    id: 'mixed',
    criterion: 'One paper, every kind of question',
    detail: 'Objective, descriptive and coding questions in the same paper, with one mark sheet at the end.',
    cells: {
      evolveus: { v: 'full', t: 'Eight question types' },
      forms: { v: 'part', t: 'Objective only, in practice' },
      lms: { v: 'part', t: 'Mixed papers, but no code' },
      judge: { v: 'part', t: 'Coding-led by design' },
      proctor: { v: 'part', t: 'Depends on the module bought' },
    },
  },
  {
    id: 'bank',
    criterion: "Question bank tagged by Bloom's level and course outcome",
    detail: 'Reusable questions carrying the tags a report later needs, uploaded in bulk from a spreadsheet.',
    cells: {
      evolveus: { v: 'full', t: "Bloom's and CO on every question" },
      forms: { v: 'none', t: 'No reusable bank' },
      lms: { v: 'part', t: 'Banks yes, tagging left to you' },
      judge: { v: 'part', t: 'Tagged by skill, not outcome' },
      proctor: { v: 'part', t: 'Tagged by competency' },
    },
  },
  {
    id: 'attainment',
    criterion: 'Reports a head of department can act on',
    detail: 'Results rolled up by topic and course outcome, for one class or across a whole batch.',
    cells: {
      evolveus: { v: 'full', t: 'Topic and outcome attainment' },
      forms: { v: 'none', t: 'A spreadsheet of responses' },
      lms: { v: 'part', t: 'Attainment maths ends in Excel' },
      judge: { v: 'none', t: 'Reports on hiring readiness' },
      proctor: { v: 'none', t: 'Reports on the candidate' },
    },
  },
  {
    id: 'hosting',
    criterion: 'Can run on your own campus servers',
    detail: 'Student records stay inside the institution, on infrastructure your IT department controls.',
    cells: {
      evolveus: { v: 'full', t: 'Our cloud or yours' },
      forms: { v: 'none', t: 'Vendor cloud only' },
      lms: { v: 'full', t: 'Self-hosting is the norm' },
      judge: { v: 'part', t: 'Enterprise terms vary' },
      proctor: { v: 'part', t: 'Enterprise terms vary' },
    },
  },
  {
    id: 'roles',
    criterion: 'A seat each for the office, faculty and students',
    detail: 'Administration sets up the college, faculty run their own assessments, students see only their own work.',
    cells: {
      evolveus: { v: 'full', t: 'Three separated roles' },
      forms: { v: 'none', t: 'An editor and a respondent' },
      lms: { v: 'full', t: 'Roles are core to an LMS' },
      judge: { v: 'part', t: 'Recruiter and candidate' },
      proctor: { v: 'part', t: 'Recruiter and candidate' },
    },
  },
];

/* Said plainly, because a comparison page nobody believes is worth nothing. */
export const COMPARE_HONEST = [
  {
    icon: 'checkSquare',
    title: 'You only need to collect answers',
    body: 'A weekly practice quiz that carries no marks does not need supervision, a rubric, or an attainment report. A free form is the right tool, and we will say so.',
  },
  {
    icon: 'users',
    title: 'You are hiring, not teaching',
    body: 'For placement drives and screening at scale, a hiring platform is built around exactly that problem. Evolveus is built around the semester.',
  },
  {
    icon: 'bookOpen',
    title: 'Your LMS already carries the course',
    body: 'If material, assignments and discussion live in your LMS and it is working, keep it. Colleges usually bring in Evolveus for the examination alone and leave the LMS where it is.',
  },
];

/* What a college is usually replacing, in its own words. */
export const COMPARE_REPLACES = [
  'Question papers assembled by hand each semester',
  'Answer scripts carried between faculty for correction',
  'Marks copied from scripts into a departmental spreadsheet',
  'Course-outcome attainment worked out manually before an audit',
  'A separate coding-test service bought only for the lab exam',
  'Invigilation that ends the moment the exam moves online',
];

export const COMPARE_NOTE =
  'This page compares categories of tool by what they were designed to do, not the current feature list of any one vendor. Products change; confirm specifics with each vendor before you decide. Every claim in the Evolveus column is something we will demonstrate live.';

export const COMPARE_CTA = {
  eyebrow: 'Judge it yourself',
  headline: 'Put it beside whatever you use now.',
  sub: 'Send us the paper you set last semester. We will run it through Evolveus and show you the supervision log, the corrected scripts, and the report your department would have received.',
};
