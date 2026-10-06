// ─────────────────────────────────────────────────────────────
// Canonical copy for the Evolveus site pages (src/landing/brand). The
// facts are sourced from FEATURES.md. Nothing here is invented. Do not
// add testimonials, customer names, or numbers that aren't backed by
// FEATURES.md.
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'Evolveus',
  domain: 'evolveus.in',
  email: 'aksay@evolveus.in',
};

export const CONTACT_FIELDS_INITIAL = {
  name: '',
  email: '',
  organisationName: '',
  numberOfStudents: '',
  contactNumber: '',
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

/* /product's own header: what the page is and the way back to the
   walkthrough on the home page. Its index is BRAND_NAV. */
export const PRODUCT_PAGE = {
  eyebrow: 'Product',
  title: 'How Evolveus works',
  sub: 'Every part of an exam in detail, in the order it runs. For the short version, see',
  walk: 'the walkthrough on the home page',
};

/* The sections of /product that the home page's walkthrough covers, and
   the step each one links back to. */
export const PRODUCT_WALK = {
  before: { href: '/#before', label: 'Walkthrough · step 01' },
  security: { href: '/#security', label: 'Walkthrough · step 02' },
  marking: { href: '/#marking', label: 'Walkthrough · step 03' },
  reports: { href: '/#reports', label: 'Walkthrough · step 04' },
};

export const TRUST = {
  org: 'Amrita Vishwa Vidyapeetham',
  logo: '/Amrita_Logo_Banner.svg',
  // Short labels: the digit grids carry the figures.
  figures: [
    { n: '1,500+', l: 'Students' },
    { n: '2,000+', l: 'Exams' },
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

/* ── /journey prototype ─────────────────────────────────────
   One exam told as a scroll story: the sheet on the right changes as
   each step passes. Copy is kept short on purpose; the detail lives on
   the home page. */
/* The header on every page: the other pages, not sections of the one
   you are on (/product has its own index for that). */
export const SITE_NAV = [
  { href: '/product', label: 'Product' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
];

/* The print pieces, smallest first, behind "Resources" in the header
   and listed again in the footer. The header's menu draws each one (RESOURCE_SKETCHES in
   chrome.jsx). */
export const SITE_RESOURCES = [
  { href: '/flyer', label: 'Flyer' },
  { href: '/brochure', label: 'Brochure' },
  { href: '/ppt', label: 'Presentation' },
];

/* Sign in sits apart from the links, as a button of its own. */
export const SIGNIN_LINK = { href: '/signin', label: 'Sign in' };

/* Under the home page's product tour: the way to every role's detail. */
export const JOURNEY_TOUR = {
  more: 'Everything each role can do',
};

/* The opening screen, Apple-style: what it is, then a greeting. */
export const JOURNEY_OPEN = {
  line: 'Online exams for universities',
  // TODO: placeholder greeting; the wording is the owner's call.
  title: 'Meet Evolveus.',
  inUse: 'In use at',
};

/* The gate before the story: a pencil tin; scrolling opens it. */
export const JOURNEY_INTRO = {
  kicker: 'A sample exam',
  title: 'Run one exam, start to finish.',
  // The tin's lid: what scrolling gives you.
  cue: 'Follow one exam',
};

/* One line of body and two short facts per step: the sheet beside the
   text does the explaining. */
export const JOURNEY_STEPS = [
  {
    id: 'before',
    more: '/product#before',
    n: '01',
    kicker: 'Before the exam',
    title: 'Set the paper from a shared bank',
    body: "Every question is tagged by topic, difficulty and Bloom's level.",
    facts: ['Eight question types, coding included', 'Questions drafted from your notes'],
  },
  {
    id: 'security',
    more: '/product#security',
    n: '02',
    kicker: 'During the exam',
    title: 'Run it in your labs',
    body: 'A locked browser, in full screen, on your lab network only. Every tab switch is logged.',
    facts: ['A password to start', 'Ten kinds of violation logged'],
  },
  {
    id: 'marking',
    more: '/product#marking',
    n: '03',
    kicker: 'After the exam',
    title: 'Graded in about ten minutes',
    body: 'Descriptive and coding answers are graded against your rubric, with a reason for every mark.',
    facts: ['Faculty approve before results go out', 'Code run against hidden tests'],
  },
  {
    id: 'reports',
    more: '/product#reports',
    n: '04',
    kicker: 'Results',
    title: 'See how the class did',
    body: 'Every score in context, and the students who need a follow-up.',
    facts: ['Rank and class average for each student', 'Export to Excel'],
  },
  {
    id: 'mastery',
    more: '/product#reports',
    n: '05',
    kicker: 'Across a course',
    title: 'Find the weak topic in time',
    body: 'Mastery by topic, compared across sections and semesters.',
    facts: ['Course outcomes, CO1 to CO8', 'Every batch, every semester'],
  },
];

/* Where the story hands over to /product: the exam above was a sample,
   and the real screens are there. */
export const JOURNEY_PROOF = {
  line: 'That was a sample exam.',
  sub: 'These are the real ones so far.',
  link: 'See the real screens',
};

export const JOURNEY_BRIEF = {
  deploy: {
    title: 'Where it runs',
    more: 'More on deployment',
    items: [
      { label: 'Our cloud', text: 'We host it, update it and back it up.' },
      // Full isolation needs the AI models on campus too; say so.
      { label: 'Your campus', text: 'On your servers, maintained by us. Run the AI models there too for full isolation.' },
    ],
  },
};

export const JOURNEY_CTA = {
  eyebrow: 'Book a walkthrough',
  headline: 'See it with your own question paper.',
  sub: "Send us a paper you've set. We'll run it with your team as a real exam. It takes half an hour.",
  // Underlined in pencil; must appear in sub.
  underline: 'half an hour',
};

/* The footer is the same on every page, so its links to /product's
   sections are full paths; only '#contact' stays on the page you are on. */
export const BRAND_FOOTER = {
  tagline: 'Online exams, marking, and reports for universities.',
  columns: [
    {
      title: 'Platform',
      links: [
        { href: '/product#before', label: 'Setting papers' },
        { href: '/product#security', label: 'Exam security' },
        { href: '/product#marking', label: 'Marking' },
        { href: '/product#reports', label: 'Reports' },
        { href: '/compare', label: 'Compare' },
      ],
    },
    {
      title: 'Deployment',
      links: [
        { href: '/product#deployment', label: 'Hosted by us' },
        { href: '/product#deployment', label: 'On your campus' },
      ],
    },
    {
      title: 'Resources',
      links: SITE_RESOURCES,
    },
    {
      title: 'Talk to us',
      links: [
        { href: '#contact', label: 'Book a walkthrough' },
        { href: '/product#roles', label: 'Who uses it' },
        { href: '/about', label: 'About' },
        { href: '/signin', label: 'Sign in' },
      ],
    },
  ],
};

export const BRAND_LOGO = {
  mark: '/evolveus-mark.png',
  markDark: '/evolveus-mark-dark.png',
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

/* ── /about ──────────────────────────────────────────────────────
   Facts only, from docs/evolveus-context.md. No team story beyond what
   the founding notes say. */
export const ABOUT_PAGE = {
  eyebrow: 'About',
  title: 'About Evolveus',
  lede: 'Evolveus is an exam platform for universities: setting the paper, running the exam, marking it and reporting on it, in one system. It is in use at the School of AI, Amrita Vishwa Vidyapeetham, Coimbatore.',
  covers: {
    kicker: 'What it covers',
    title: 'Everything one exam needs',
    text: 'It started with a few question types. It now runs the whole exam, from the question bank to the reports.',
    items: [
      { label: 'Eight question types', text: 'Multiple choice, multiple correct, true or false, fill in the blank, matching, descriptive, file upload and coding, in one paper.' },
      { label: 'Code in seven languages', text: 'Java, Python, C++, JavaScript, C, Octave and Scala, run against visible and hidden test cases, with partial marks.' },
      { label: 'Marked with a reason', text: 'Written and coding answers are marked against the faculty rubric with a remark for each one. Faculty approve before results go out.' },
      { label: 'On our cloud or your campus', text: 'We host it, or we install it on your own servers and keep it running.' },
    ],
  },
  today: {
    kicker: 'Today',
    title: 'In use at Amrita',
    text: 'The whole School of AI at Amrita took Evolveus up as more of its faculty asked to use it. On most weekdays a few batches write exams on it, about 500 students a day.',
  },
  why: {
    kicker: 'Why we build it',
    title: 'From our founding notes',
    lines: ['We like helping students.', 'We enjoy building it.'],
  },
  next: {
    kicker: 'Where it is going',
    title: 'More than exams',
    text: 'The longer-term idea is a learning platform for students and staff, with exams as one part of it.',
  },
  contact: {
    title: 'Talk to us',
    text: 'Write to us, or book a walkthrough with a paper of your own.',
  },
};

/* ── /signin ─────────────────────────────────────────────────────
   Each institution signs in at its own address. Add one entry per
   institution; the page lists them in this order. */
export const INSTITUTIONS = [
  {
    id: 'amrita-cb',
    name: 'Amrita Vishwa Vidyapeetham',
    place: 'Coimbatore',
    logo: '/Amrita_Logo.svg',
    url: 'https://evolveus.cb.amrita.edu/',
  },
];

export const SIGNIN_PAGE = {
  eyebrow: 'Sign in',
  title: 'Choose your institution',
  lede: 'Each institution has its own Evolveus. Pick yours to go to its sign-in page.',
  missing: 'Not listed? Evolveus is set up for each institution.',
  missingLink: 'Book a walkthrough',
};
