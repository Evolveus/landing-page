// ─── Brochure copy ───
// An eight-page A4 booklet a dean takes away and passes to heads of
// department and IT. Told in five chapters (I to V) between a cover, the
// case for it, a page on the faculty's final say, and an offer. What it
// carries is decided in docs/evolveus-context.md §6; every claim is from
// §3 and §4 there. The copy is the brochure's own: chapter names and
// lines differ from the home page's steps (JOURNEY_STEPS).
export const BROCHURE = {
  title: 'Evolveus brochure',
  titleDark: 'Evolveus brochure (dark)',

  // The chapters, in order; the contents page lists them.
  chapters: [
    { n: 'I', name: 'Setting', title: 'Questions from your own notes', page: 3 },
    { n: 'II', name: 'Sitting', title: 'The lab keeps its own record', page: 4 },
    { n: 'III', name: 'Marking', title: 'Three kinds of answer, one mark sheet', page: 5 },
    { n: 'IV', name: 'Reading', title: 'What the marks say about a class', page: 7 },
    { n: 'V', name: 'Running', title: 'On your servers or ours', page: 8 },
  ],
  // The one page in the contents that isn't a chapter.
  studentsPage: 6,

  // Page 2: the case, with the contents.
  caseLabel: 'In this booklet',
  figures: [
    { n: '1,500+', l: 'students' },
    { n: '2,000+', l: 'exams' },
    { n: '200,000+', l: 'answers marked' },
  ],

  setting: {
    intro: 'Build the paper from a shared bank, or from the notes you already teach from. Every question carries the tags the reports will need later.',
    // Drawn as a card. Sample data: the file and the questions are made up.
    pdf: {
      label: 'Questions from your notes',
      file: 'unit-3-normalisation.pdf',
      size: '4.2 MB',
      ask: '10 MCQ · 4 descriptive · medium',
      drafts: [
        { type: 'MCQ', q: 'A relation is in 2NF when it is in 1NF and…' },
        { type: 'MCQ', q: 'Which anomaly does splitting a table on a partial dependency remove?' },
        { type: 'Descriptive', q: 'Explain, with an example, why a transitive dependency breaks 3NF.' },
      ],
      actions: ['Keep', 'Edit', 'Drop'],
      more: '+ 11 more drafts',
      note: 'you keep, edit or drop each one',
    },
    rubric: {
      label: 'A rubric to start from',
      q: 'Explain, with an example, why a transitive dependency breaks 3NF.',
      lines: [
        { t: 'Defines a transitive dependency', m: 2 },
        { t: 'Gives a correct example', m: 2 },
        { t: 'Shows the decomposition that fixes it', m: 1 },
      ],
      foot: 'Drafted by AI · edit before use',
    },
    stats: [
      { n: '8', l: 'question types in one paper, in sections' },
      { n: '50', l: 'draft questions from one PDF of up to 25 MB' },
      { n: 'CO1–8', l: "on every question, with topic, Bloom's level and marks" },
    ],
    more: ['Banks by course and topic, shared with colleagues', 'MCQs uploaded from a spreadsheet', 'Maths in LaTeX, code blocks and images', 'Negative and part marks where you set them'],
  },

  sitting: {
    intro: 'The exam opens only where and how you allow, and what happens during it is written down against each attempt.',
    controls: [
      { title: 'Lab only', body: 'Opens only on the lab network, and in Safe Exam Browser if you want it locked down.' },
      { title: 'Full screen held', body: 'Leaving full screen is logged, and the exam waits until the student comes back.' },
      { title: 'Shuffled', body: 'Questions and options in a different order for each student.' },
      { title: 'Saved as they go', body: 'Answers survive a refresh, and the paper submits itself when time is up.' },
    ],
    // Sample data, with students as numbers, never names.
    log: {
      label: 'Violation log',
      sub: 'Ten kinds, recorded against the attempt. Visible to faculty only.',
      rows: [
        { t: '10:14:02', who: 'Student 14', kind: 'Tab switch' },
        { t: '10:21:47', who: 'Student 31', kind: 'Left full screen' },
        { t: '10:22:05', who: 'Student 31', kind: 'Copy and paste' },
        { t: '10:36:18', who: 'Student 08', kind: 'Developer tools' },
        { t: '10:41:55', who: 'Student 14', kind: 'Screenshot shortcut' },
      ],
      note: 'each one a flag for you to look at',
    },
    replay: {
      label: 'Session replay',
      title: "Watch an attempt again, step by step",
      body: "Afterwards, open any student's attempt in the real exam screen and step through it: each answer, each move between questions, each violation and each code run.",
      // A drawn timeline of one attempt. Sample data.
      steps: [
        { at: 0, l: 'Start' },
        { at: 16, l: 'Q1' },
        { at: 30, l: 'Q2' },
        { at: 44, l: 'Tab switch', flag: true },
        { at: 58, l: 'Q3 · ran code ×3' },
        { at: 82, l: 'Q4' },
        { at: 100, l: 'Submitted' },
      ],
    },
  },

  cover: {
    // Catchy is allowed on print (DESIGN.md §7). Picked 2026-10-05.
    headline: ['Every answer marked.', 'Every mark explained.'],
    // Under the headline, on the cover.
    tag: 'Exam software for universities, with AI at every step',
    lede: "Evolveus runs a university's exams on one system, from the question bank to the report. Objective, written and coding questions sit in the same paper, and all of them come back marked, each mark with its reason. Faculty check the marks and decide when students see them.",

    // Confirmed by the team, 2026-10-05.
    before: { n: '50', unit: 'hr', label: 'By hand' },
    after: { n: '14', unit: 'min', label: 'On Evolveus' },
    timeNote: 'Marking 420 written papers from one mid-term.',

    replacesLabel: 'The alternatives',
    replacesTitle: 'What it replaces',
    // Categories, never a claim about a named product (see COMPARE in
    // src/landing/content.js for the full version of this argument).
    replaces: [
      { tool: 'Form tools', eg: 'Google Forms, Microsoft Forms', gap: 'Built to collect answers quickly. Good for MCQs, but written answers are still marked by hand and the exam is not supervised.' },
      { tool: 'LMS quizzes', eg: 'Moodle, Classroom', gap: 'Built to deliver a course, with a quiz alongside. Coding, lab security and outcome reports usually arrive as plugins and spreadsheets.' },
      { tool: 'Coding-test services', eg: 'HackerRank, HackerEarth', gap: 'Built to screen candidates for jobs, and strong at it. A semester paper has more than code in it.' },
      { tool: 'Marking by hand', eg: 'Scripts and mark sheets', gap: 'Days of reading for each paper, and no written reason behind each mark.' },
    ],

    inUse: 'In use at',
    figures: '1,500+ students · 2,000+ exams · 200,000+ answers marked',
    // §1 of the context doc: adopted, never "developed at" or "built for".
    origin: 'Started by students as a small project, and taken up by the whole School of AI as more faculty asked for it.',
  },

  marking: {
    intro: 'Objective answers go by the key. Written answers and code are marked by AI against what your faculty set, and every written mark comes back with its reason.',
    shot: { n: 'Fig. 3', label: 'A written answer, marked', src: '/product/grading-remark.webp', srcDark: '/product/grading-remark-dark.webp', alt: 'A marked descriptive answer: the question, the student response, 2 of 2 marks, and the remark explaining the mark', note: 'the reason, in words a student can read' },
    codeLabel: 'Code',
    codeTitle: 'Passing the tests is not the whole answer',
    codeBody: 'Code runs against visible and hidden test cases, in seven languages, and the tests decide the marks. Then AI reads it for the method you asked for, such as "must use recursion". That check can only take marks away.',
    kinds: [
      { n: '01', title: 'Objective', body: 'MCQ, true/false, matching and fill in the blank, marked by the key as soon as the exam closes. Negative and part marks where you set them.' },
      { n: '02', title: 'Written', ai: true, body: 'Marked by AI against your model answer, keywords and rubric, with a short reason for every mark. You tell it how strict to be.' },
      { n: '03', title: 'Code', ai: true, body: 'Run in the browser against visible and hidden test cases, in seven languages. Then AI checks the answer uses the method you asked for.' },
    ],

    // A coding answer, drawn as a card. Sample data: the question and the
    // answer are made up to show the method check.
    sample: 'Sample data',
    code: {
      head: 'Question 7 · Coding',
      mark: 3,
      was: 6,
      of: 6,
      question: 'Return the nth Fibonacci number. Use recursion.',
      lines: ['def fib(n):', '    a, b = 0, 1', '    for _ in range(n):', '        a, b = b, a + b', '    return a'],
      tests: 'Test cases',
      testsResult: '5 of 5 passed',
      checkLabel: 'Method check',
      check: 'All tests pass, but the question asks for recursion and this answer uses a loop. Marks reduced.',
      notes: {
        tests: 'the tests decide the marks',
        check: 'AI checks how it was solved',
        mark: 'it can only take marks away',
      },
    },

    // What faculty can still do with the marks: one quiet row.
    sayLabel: 'And faculty can',
    say: [
      { title: 'Publish when ready', body: 'or show results on submission' },
      { title: 'Change any mark', body: 'a hand-set mark always wins' },
      { title: 'Re-mark one question', body: 'after fixing its rubric or key' },
      { title: 'Stop a run', body: 'and roll its marks back' },
    ],

    beforeLabel: 'AI before the exam',
    before: [
      { title: 'Questions from your notes', body: 'Upload a PDF of up to 25 MB and get up to 50 draft questions on the ideas it teaches, spread across the document. Keep, edit or drop each one.' },
      { title: 'A rubric to start from', body: 'For each written question, AI drafts the marking guidelines and how the marks split. Faculty edit it before it is used.' },
    ],
  },

  // A page of its own between chapters III and IV, on the forest panel:
  // what students get back. Replaced the faculty-control page on
  // 2026-10-05 (that was pushed too hard; it is now one row in III).
  students: {
    label: 'For students',
    title: ['What a student', 'gets back'],
    lede: 'Each student sees their marks question by question, with the reason behind each one, and where they stand by topic.',
    fig: { n: 'Fig. 6', label: 'How this attempt went', src: '/product/student-standing.webp', srcDark: '/product/student-standing-dark.webp', alt: "One student's standing: score, class average, rank, answers left blank, pacing, and marks by Bloom's level against the class" },
    items: [
      { title: 'Feedback on every answer', body: 'The mark and the written reason for each question, once results are out.' },
      { title: 'Where they stand', body: "Score, class average and rank, with marks by Bloom's level set against the class." },
      { title: 'A knowledge profile', body: 'Their strongest topic and the one to work on next, surer as they answer more questions.' },
      { title: 'One place for the course', body: 'Active, upcoming, finished and missed quizzes, with announcements and polls.' },
    ],
  },

  results: {
    intro: 'Marks come back by question, topic and course outcome, for one class or across sections, so a head of department can see which topic needs time next.',
    fig: { n: 'Fig. 7', label: 'How the class performed', src: '/product/cohort-results.webp', srcDark: '/product/cohort-results-dark.webp', alt: 'Class results: mean, spread, range, students below average, and a histogram of scores in ten-point bands' },
    items: [
      { title: 'The class at a glance', body: 'Mean, median and the spread of scores, with the students to follow up and why: well below the average, answers left blank, or finished unusually fast.' },
      { title: 'Topic mastery', body: "By topic and course outcome, across sections and semesters. Bloom's level and CO are on every question, so reports add up by outcome. All of it exports to Excel." },
      { title: 'Topics tagged for you', ai: true, body: 'AI suggests topics for each question and joins names like "DBMS" and "Database Management Systems". Faculty confirm.' },
      { title: 'For each student', body: 'A breakdown of every question with its written feedback, and a profile of their strongest topic and the next one to work on.' },
    ],
    assistant: {
      label: 'Ask the assistant',
      ai: true,
      ask: 'Which topics did section B find hardest in the last quiz?',
      // Sample data.
      answer: 'Normalisation (average 41%) and joins (48%). Nine students left both normalisation questions blank.',
      note: 'it asks before it changes anything',
      body: "Faculty ask about a class, a student or a quiz in plain words. It can also draft or publish a quiz, start marking or post an announcement, and checks with you before it changes anything.",
    },
  },

  it: {
    intro: 'Hosted by us or installed on your campus, with the AI models you choose. This chapter is for the IT head who has to sign off.',
    hosting: [
      { title: 'On our cloud', body: 'We host it and look after updates, backups and monitoring.' },
      { title: 'On your campus', body: 'Installed on your own servers or private cloud, and maintained by us.' },
    ],
    aiTitle: 'Your choice of AI model',
    ai: "Use the AI models that come with the platform, or connect your university's own. For answers that never leave campus, install on campus and use your own models, or switch AI marking off.",
    dataLabel: 'Data and accounts',
    data: [
      "Each institution's data is kept apart from every other's.",
      'Files are served through short-lived links that check permission first.',
      'Two-factor sign-in and passkeys.',
      'Admins, semester managers, faculty and students each see only their own tools and data.',
      'Departments, semesters, batches, courses and labs set up from spreadsheets, with duplicate checks.',
    ],
  },

  // Confirmed by the team, 2026-10-05. Its middle sentence ("What used to
  // take three days now takes thirty minutes") is left out: it gives a
  // second, different time from the cover's 50 hours to 14 minutes.
  quote: {
    text: 'Evolveus replaced our existing system overnight, and the difference is stark. Students can actually reflect on their performance while it still matters.',
    by: 'Faculty member, School of AI, Amrita Vishwa Vidyapeetham',
  },

  cta: {
    kicker: 'Book a walkthrough',
    text: "Send us a paper you've already set. We'll run it with one of your classes as a real exam, and go through the results with you.",
  },
  qr: '/flyer/qr-evolveus.svg',
};
