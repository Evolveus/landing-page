// ─────────────────────────────────────────────────────────────
// Canonical copy for the EvolveUs landing page. Every design variant
// (Design 1 through 6) states the same facts, sourced from FEATURES.md.
// Nothing here is invented. Do not add testimonials, customer names,
// or numbers that aren't backed by FEATURES.md.
// ─────────────────────────────────────────────────────────────

export const SUMMARY =
  'EvolveUs gives institutions a complete assessment management system, from academic setup to secure exam delivery and result analysis. It reduces manual work for administrators and faculty, improves exam control, supports diverse question formats, and gives students a clear, organised assessment experience.';

export const BRAND = {
  name: 'EvolveUs',
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
// Audience: college management, not engineers. Every line should be
// understood by a principal, dean, or exam controller. Benefit-led —
// say what the college gets, not how it is built.
// ─────────────────────────────────────────────────────────────

export const BRAND_NAV = [
  { href: '#why', label: 'Why EvolveUs' },
  { href: '#security', label: 'Exam security' },
  { href: '#evaluation', label: 'Evaluation' },
  { href: '#reports', label: 'Reports' },
  { href: '#roles', label: 'Who uses it' },
  { href: '#deployment', label: 'Deployment' },
];

export const BRAND_HERO = {
  eyebrow: 'Online examinations for colleges',
  headline: 'Run exams your institution can stand behind.',
  sub: 'EvolveUs conducts your online exams under real supervision, grades written and coding answers automatically, and gives you a clear report on every student and every class.',
  note: 'Runs on our cloud or on your own campus servers.',
};

export const TRUST = {
  label: 'In daily use at',
  org: 'Amrita Vishwa Vidyapeetham',
  logo: '/Amrita_Logo_Banner.svg',
  figures: [
    { n: '1,500+', l: 'Students examined every day' },
    { n: '2,000+', l: 'Exams conducted' },
    { n: '200,000+', l: 'Answers evaluated' },
  ],
};

export const VALUE = [
  {
    n: '01',
    icon: 'shieldCheck',
    title: 'Exams as controlled as the hall',
    body: 'A locked exam browser, full-screen enforcement, and live supervision mean an online exam is no easier to cheat than one written under an invigilator.',
  },
  {
    n: '02',
    icon: 'brain',
    title: 'Written answers graded in minutes',
    body: 'EvolveUs reads descriptive answers against the rubric your faculty wrote, then returns a mark and the reason for it. Faculty approve everything before students see it.',
  },
  {
    n: '03',
    icon: 'code',
    title: 'Coding exams that mark themselves',
    body: 'Students write and run code in the browser. EvolveUs tests each program and marks it on the spot, so nobody has to correct a lab exam by hand.',
  },
  {
    n: '04',
    icon: 'chart',
    title: 'A report on every student and class',
    body: 'See which topics a class has mastered, which student is falling behind, and how a course performs against its outcomes. The same figures go straight into your accreditation files.',
  },
  {
    n: '05',
    icon: 'building',
    title: 'Fits the college you already run',
    body: 'Departments, batches, semesters, courses, and labs are set up the way your institution already works. Nothing has to be reorganised to begin.',
  },
  {
    n: '06',
    icon: 'clock',
    title: 'Frees your faculty for teaching',
    body: 'Faculty reuse papers from their question banks, most of the correction happens without them, and results publish in a click. A department gets back weeks of correction time every semester.',
  },
];

export const SECURITY_PILLARS = [
  {
    icon: 'lock',
    title: 'Secure exam browser',
    desc: 'Students can only begin from the approved EvolveUs exam environment, so the exam runs on a locked-down screen with nothing else reachable.',
  },
  {
    icon: 'monitor',
    title: 'Full-screen enforcement',
    desc: 'The exam holds the whole screen for its full duration. Any attempt to leave is recorded and the student is prompted straight back.',
  },
  {
    icon: 'network',
    title: 'Restricted to your labs',
    desc: 'An exam can be limited to approved campus labs or your college network, so it cannot be attempted from home.',
  },
  {
    icon: 'key',
    title: 'Password-controlled start',
    desc: 'A quiz can require a password released by the invigilator, so no one begins before the exam is called.',
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

export const EVALUATION = [
  {
    id: 'descriptive',
    icon: 'edit',
    label: 'Descriptive answers',
    title: 'Long answers, corrected overnight',
    body: 'Faculty set a model answer and the points that earn marks. EvolveUs then judges every script against that same standard and returns a mark with a short reason for it, so a paper that once took a week is ready the next morning.',
    points: [
      'Marked against the rubric your own faculty wrote',
      'Every script judged to the same standard, first to last',
      'A short reason shown beside each mark',
      'Faculty can change any mark before results are published',
    ],
  },
  {
    id: 'coding',
    icon: 'code',
    label: 'Coding answers',
    title: 'Lab exams that need no correction',
    body: 'Students write and run their program in the browser. EvolveUs runs it against the test cases faculty prepared and gives marks for how much of it works, then checks that the student actually solved the problem instead of working around it.',
    points: [
      'Seven programming languages, chosen per question',
      'Part marks for a partly working program',
      'Results the moment the exam closes',
      'Shortcut answers flagged rather than quietly passed',
    ],
  },
];

export const AI_ASSURANCE = [
  {
    icon: 'checkCircle',
    title: 'Faculty always have the last word',
    desc: 'Nothing reaches a student until a faculty member has reviewed and approved it. Any mark can be changed.',
  },
  {
    icon: 'shield',
    title: 'Consistent from first script to last',
    desc: 'The same standard is applied to every paper, without the drift that creeps in over a long correction session.',
  },
  {
    icon: 'clock',
    title: 'Results back within days',
    desc: 'Correction is no longer the thing holding up results at the end of a semester.',
  },
];

export const REPORTS = [
  {
    id: 'student',
    label: 'For each student',
    icon: 'graduation',
    title: 'Every student gets their own picture',
    summary: 'Each student sees more than a mark out of a hundred: the topics they are strong in, the one to work on next, and how they have improved across the semester.',
    points: [
      'Strongest topic, and the topic needing attention',
      'Progress built up automatically across every exam taken',
      'A clear view of where marks were actually lost',
      'Something a tutor can act on in a mentoring session',
    ],
  },
  {
    id: 'class',
    label: 'For each class',
    icon: 'chart',
    title: 'And the department sees the whole cohort',
    summary: 'Results roll up by topic and by course outcome, so a weak area shows up while there is still time to teach it again.',
    points: [
      'Topic-wise mastery for the whole class at a glance',
      'Course outcome attainment, CO1 to CO8',
      'Exportable for NAAC and NBA accreditation files',
      'Comparison across batches, sections, and semesters',
    ],
  },
];

export const BRAND_DEPLOY = [
  {
    id: 'managed',
    icon: 'globe',
    label: 'Hosted by us',
    tagline: 'Your IT team has nothing to run.',
    sub: 'We host, update, back up, and monitor the platform. Your college can be conducting exams within days.',
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
    tagline: 'Student data never leaves your servers.',
    sub: 'Install it on your own machines or private cloud. We still look after the software; the data simply stays with you.',
    features: [
      'Student records remain on your own network',
      'We maintain and update it on your servers',
      'Meets institutional data-residency requirements',
    ],
  },
];

export const BRAND_CTA = {
  eyebrow: 'Book a walkthrough',
  headline: 'See it with your own question paper.',
  sub: 'We will take your team through a real exam, start to finish: setting the paper, supervising the hall, correcting the scripts, and publishing the reports. Half an hour is usually enough.',
};

export const AI_HELP = [
  {
    icon: 'fileText',
    title: 'Draft a paper from your own material',
    desc: 'Upload the notes or textbook chapter you taught from, and EvolveUs drafts a set of questions on that subject for faculty to review, edit, and keep.',
  },
  {
    icon: 'terminal',
    title: 'Ask for what you need in plain language',
    desc: 'Faculty can simply ask how a class is doing, which topics are weakest, or to set up a quiz, and the assistant does it on their confirmation.',
  },
];

export const BRAND_FOOTER = {
  tagline: 'Online examinations, evaluation, and reporting for colleges.',
  columns: [
    {
      title: 'Platform',
      links: [
        { href: '#why', label: 'Why EvolveUs' },
        { href: '#security', label: 'Exam security' },
        { href: '#evaluation', label: 'Evaluation' },
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
