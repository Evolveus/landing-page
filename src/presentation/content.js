// ─── Deck copy ───
// The 16:9 deck, presented in person to a room: dean, registrar, exam
// controller, heads of department and the IT head, in about half an hour.
// What it carries is decided in docs/evolveus-context.md §6; every claim
// is from §3 and §4 there, or from the home page (src/landing/brand).
//
// The deck is written from the customer's chair. Each slide is a question
// the people who answer for an exam will ask, in their words, followed by
// the short answer and the evidence. The running head is an answer sheet
// that fills in as the questions are answered.
//
// Anything drawn as a card (a PDF's drafts, the violation log, a replay,
// topic mastery) is sample data, made up to show the feature, and says
// so on the slide. The real screens are real, anonymised captures.
//
// Slide 16 says what the product does not do, on purpose: §5's limits are
// the questions this room asks anyway, and answering them first is worth
// more than leaving them to come up.

// The sections of the paper. Each question is one slide; n is its number.
export const PARTS = [
  { name: 'Before', qs: [1, 2, 3] },
  { name: 'On the day', qs: [4, 5, 6] },
  { name: 'Marking', qs: [7, 8, 9] },
  { name: 'Results', qs: [10, 11, 12, 13] },
  { name: 'Deciding', qs: [14, 15, 16, 17] },
];

// The slide that holds question n: the cover and the worry list come first.
export const slideOfQuestion = (n) => n + 2;

export const DECK = {
  title: 'Evolveus deck',
  sample: 'Sample data',

  // No slogan: the name, what it is, and where it is in use.
  cover: {
    sub: "One system for a university's exams, and the questions your office will want answered.",
    inUse: 'In use at',
    notes: 'Say who this is for: the people who get the call when an exam goes wrong. The deck takes their questions in the order an exam raises them. Anyone can stop you at their own.',
  },

  // The worry list. Each row points at the questions that answer it, and
  // the numbers are links, so the speaker can jump to the room's concern.
  worries: {
    title: 'What your office answers for in every exam.',
    head: ['When', 'What goes wrong', 'Who gets the call', 'Questions'],
    rows: [
      { when: 'Setting the paper', what: 'Papers arrive late, questions repeat, and the good ones leave with the faculty member who wrote them.', who: 'Heads of department', qs: [1, 2] },
      { when: 'Planning', what: 'Batches, electives and labs are tracked in separate sheets that go out of date.', who: 'Exam controller, registrar', qs: [3] },
      { when: 'Exam day', what: 'Too few invigilators, other tabs a click away, a screen that freezes when everyone starts together.', who: 'Exam controller, IT head', qs: [4, 5, 6] },
      { when: 'Marking', what: 'Scripts carried between faculty, teaching time lost for weeks, and two evaluators with two standards.', who: 'Dean, faculty', qs: [7, 8, 9] },
      { when: 'Results', what: 'Marks retyped into spreadsheets, disputes with no recorded reason, and weak topics found once the semester is over.', who: 'Registrar, heads of department', qs: [10, 12, 13] },
      { when: 'The audit', what: 'Course-outcome attainment worked out by hand, in a hurry, just before the visit.', who: 'Dean, heads of department', qs: [11] },
      { when: 'Choosing a system', what: 'Where student data goes, who keeps it running, and who is behind it.', who: 'IT head, dean', qs: [14, 15, 16, 17] },
    ],
    notes: 'Ask which row costs them the most. The question numbers are links, so go straight to that one and come back. If nobody picks, go in order.',
  },

  // ── Before ──────────────────────────────────────────────
  setting: {
    q: 1,
    asks: 'Heads of department',
    title: 'Will papers reach us on time, every semester?',
    answer: 'Faculty set a paper from a shared bank and from drafts of the notes they teach from, so nobody starts with an empty page.',
    // Drawn as cards. Sample data: the file and questions are made up.
    pdf: {
      label: 'Questions from your notes · drafted by AI',
      file: 'unit-4-process-scheduling.pdf',
      size: '6.8 MB',
      ask: '12 MCQ · 3 descriptive · mixed difficulty',
      drafts: [
        { type: 'MCQ', q: 'Which scheduling algorithm can leave a long job waiting indefinitely?' },
        { type: 'MCQ', q: 'Round robin with a very large time quantum behaves like which algorithm?' },
        { type: 'Descriptive', q: 'Compare SJF and round robin for an interactive system.' },
      ],
      actions: ['Keep', 'Edit', 'Drop'],
      more: 'Up to 50 drafts a run, from a PDF as large as 25 MB',
    },
    items: [
      { title: 'A bank that stays', body: 'Questions live in banks by course and topic, shared with colleagues under access control. They stay when a faculty member moves on.' },
      { title: 'Rubrics drafted for you', body: 'AI drafts the marks breakdown for a written question from its expected answer. Faculty edit it.' },
      { title: 'Bulk upload', body: 'MCQs you already have come in from a spreadsheet template.' },
      { title: 'Topics tagged', body: 'AI suggests each topic and merges "DBMS" with "Database Management Systems". Faculty confirm.' },
    ],
    notes: 'Demo: upload a PDF of lecture notes and keep two of the drafts. AI never adds a question on its own: faculty keep, edit or discard each one. Drafts are held for a week.',
  },

  types: {
    q: 2,
    asks: 'Dean, heads of department',
    title: 'Will it work for every department, or only computer science?',
    answer: 'One paper can mix any of these, across subjects, and each comes back marked in the way that suits it.',
    // The subject examples are illustrations, from the home page's sample units.
    cells: [
      { id: 'objective', kind: 'Objective', eg: 'MCQ, multiple select, true or false, matching, fill in the blank', how: 'Scored against the key' },
      { id: 'written', kind: 'Written', eg: 'Economics: who gains and who loses from a price ceiling?', how: 'AI marks it against the rubric, with a reason' },
      { id: 'code', kind: 'Code', eg: 'Java, Python, C, C++, JavaScript, Octave, Scala', how: 'Test cases, then an AI method check' },
      { id: 'file', kind: 'File upload', eg: 'A report or a drawing, submitted as a file', how: 'Marked by faculty' },
      { id: 'canvas', kind: 'Canvas', eg: 'Physics: draw every force on a free-body diagram', how: 'Students sketch the idea' },
      { id: 'talk', kind: 'Conversation', eg: 'Economics: walk through a market shock, step by step', how: 'Students talk it through' },
    ],
    foot: 'The question editor takes formatting, images, code blocks and LaTeX maths. Answers are typed or drawn on screen.',
    notes: "Ask a non-CS head of department what their paper looks like. Handwritten answers are out of scope, and slide 16 says so. Check with the team before demonstrating canvas or conversation: they're on the home page but not yet in our fact sheet.",
  },

  structure: {
    q: 3,
    asks: 'Exam controller, registrar',
    title: 'Will it fit how our university is organised?',
    answer: 'Departments, semesters, batches, courses and labs are set up first, and every exam hangs off them.',
    tree: ['Department', 'Semester', 'Batch and section', 'Course', 'Exam'],
    assign: 'Each exam goes to a course, a batch, a single student or a lab, and appears on a shared calendar.',
    shot: {
      label: 'What an administrator sees. Real screen.',
      src: '/product/role-admin.webp',
      srcDark: '/product/role-admin-dark.webp',
      alt: 'The administrator view of Evolveus, with its academic setup',
    },
    roles: [
      { title: 'Administrator', body: 'Sets up the university and every account, with bulk import from spreadsheets and duplicate checks.' },
      { title: 'Semester manager', body: 'Oversees the courses and exams in their semester.' },
      { title: 'Faculty', body: 'Sets, schedules and marks exams for their own courses.' },
      { title: 'Student', body: 'Sees live, upcoming, completed and missed exams in one list.' },
    ],
    audit: 'An audit log records exam edits and mark changes.',
    notes: 'For the registrar: each role sees only its own tools and data. Courses can be core, elective or micro-credential. We have no timetable or seating generator, so do not imply one.',
  },

  // ── On the day ──────────────────────────────────────────
  security: {
    q: 4,
    asks: 'Exam controller',
    title: 'How do we stop copying when we are short of invigilators?',
    answer: 'The exam itself is locked down, and whatever a student tries goes in a log with a time against it.',
    locks: [
      { title: 'Safe Exam Browser', body: 'An exam can require it. Other apps and sites stay closed, and copy and paste are locked, until the student submits.' },
      { title: 'Only from your labs', body: "The exam opens only on the lab's IP range, not from a hostel room or from home." },
      { title: 'A password to start', body: 'The invigilator reads it out when the exam begins, so nobody starts early.' },
      { title: 'Full screen throughout', body: 'Leaving it is logged, and the exam stays blocked until the student returns.' },
      { title: 'A different order for each student', body: "Questions and options are shuffled per student, and a linear flow can stop anyone going back." },
    ],
    watched: 'The ten things it logs',
    plain: 'Someone still needs to be in the room. There is no webcam and no live proctoring.',
    notes: 'A violation is a flag, not a verdict: faculty decide what it means. Do not call any of this live monitoring. The log is shown to faculty and hidden from students.',
  },

  replay: {
    q: 5,
    asks: 'Exam controller, dean',
    title: 'When a student disputes a flag, what can we show?',
    answer: 'The attempt itself. Faculty can replay it in the real exam screen: every answer, move, violation and code run.',
    // Sample data, with students as numbers, never names.
    log: {
      label: 'Violation log · faculty only',
      rows: [
        { t: '09:42:10', who: 'Student 07', kind: 'Tab switch' },
        { t: '09:48:33', who: 'Student 22', kind: 'Window resized' },
        { t: '09:51:02', who: 'Student 22', kind: 'Right-click' },
      ],
      foot: 'Faculty can note a reason on any flag, and act on several students at once.',
    },
    shot: {
      label: 'One question, one student. Real screen.',
      src: '/product/attempt-analytics.webp',
      srcDark: '/product/attempt-analytics-dark.webp',
      alt: "One question from a student's attempt, showing the chosen option, the time spent, clicks and views",
    },
    track: {
      head: 'Session replay · Student 22',
      plain: 'It replays actions in the exam screen. There is no video, webcam or screen recording to store.',
      steps: [
        { at: 0, t: '09:30', l: 'Started' },
        { at: 16, t: '09:36', l: 'Q1 to Q4' },
        { at: 32, t: '09:42', l: 'Q5' },
        { at: 46, t: '09:48', l: 'Window resized', flag: true },
        { at: 58, t: '09:51', l: 'Right-click', flag: true },
        { at: 72, t: '09:58', l: 'Q12, ran code 4 times' },
        { at: 100, t: '10:28', l: 'Submitted' },
      ],
      now: 3,
    },
    notes: 'Demo: open a replay and scrub to the flagged moment. It is reviewed after the exam. Time, clicks and views per question are a rough signal, not proof, so say so before someone else does.',
  },

  failure: {
    q: 6,
    asks: 'Exam controller, IT head',
    title: 'What happens when something goes wrong in the lab?',
    answer: 'The exam itself handles the common failures, and a few settings catch the rest.',
    head: ['If', 'Then'],
    rows: [
      { if: 'A browser is refreshed mid-exam', then: 'Answers save as the student goes, with a local backup, and the refresh brings them back.' },
      { if: 'A student leaves full screen', then: 'The exam blocks until they return, and the exit goes in the log.' },
      { if: 'Time runs out before they submit', then: 'The paper is handed in automatically with what has been answered.' },
      { if: 'A file answer is large, or its name is not in English', then: 'The upload still works.' },
      { if: 'A wrong answer key is found afterwards', then: 'Correct it, and that question is scored again for the class.' },
      { if: 'A setting is changed after marking', then: 'Evolveus warns that the results are out of date.' },
    ],
    load: {
      n: '500',
      l: 'students write an exam on it most weekdays',
      body: 'Built for scale and low latency, so an exam keeps moving as more students join. Try it in the trial with your largest batch.',
    },
    notes: 'We quote no uptime or failover figures, so offer the trial instead. On a power cut: answers saved before it are kept. Confirm with the team how the clock is handled before promising anything.',
  },

  // ── Marking ─────────────────────────────────────────────
  speed: {
    q: 7,
    asks: 'Dean, registrar',
    title: 'How soon can marks be ready?',
    answer: 'Usually within about ten minutes of the exam closing, waiting for faculty to review and publish.',
    // Drawn to scale: 3,000 minutes against 14.
    bars: {
      label: 'One Amrita mid-term, 420 written papers',
      rows: [
        { who: 'By hand', t: 'About 50 hours', min: 3000 },
        { who: 'Evolveus', t: '14 minutes', min: 14 },
      ],
    },
    parts: [
      { part: 'Part A', kind: 'Objective', how: 'Scored against the key when the exam ends' },
      { part: 'Part B', kind: 'Written', how: "AI marks against the faculty's rubric and gives a reason" },
      { part: 'Part C', kind: 'Code', how: 'Test cases run first, then AI checks the method asked for' },
    ],
    // The drawn answer sheet. Sample data.
    sheet: {
      head: 'CS2203 · Mid-term · Student 14',
      a: { q: 'Q1 to Q10', marks: '9 / 10', key: [1, 3, 0, 2, 2, 1, 3, 0, 1, 2], wrong: 6 },
      b: {
        n: 'Q11',
        q: 'What is a race condition? Give an example.',
        marks: '4 / 5',
        answer: 'Two threads add to a shared counter at the same time and one update is lost, because the read and the write are separate steps.',
        reason: 'Right definition and a fitting example. It does not say how a lock would prevent it.',
      },
      c: {
        n: 'Q12',
        q: 'Reverse a linked list in place.',
        marks: '5 / 8',
        tests: '6 of 6 tests passed',
        check: 'Builds a second list, though the question asks for in place.',
      },
      total: '18 / 23',
    },
    notes: 'The 14 minutes is the marking, and faculty still review before publishing. Marking time depends on AI load. File-upload answers go to faculty and are not in this figure.',
  },

  marking: {
    q: 8,
    asks: 'Dean, faculty',
    title: 'Can AI mark written answers and code fairly?',
    answer: 'It marks against the rubric your faculty wrote, to the same standard for the first answer and the last, and writes down why.',
    shot: {
      label: 'A written answer, marked by AI. Real screen.',
      src: '/product/grading-remark.webp',
      srcDark: '/product/grading-remark-dark.webp',
      alt: 'A marked descriptive answer: the question, the student response, 2 of 2 marks, and the remark explaining the mark',
      note: 'the reason, in plain words',
    },
    written: 'One instruction for the whole quiz sets how strict the marking is and what it should reward.',
    code: {
      label: 'Code',
      body: 'Answers run in the browser against visible and hidden test cases, with time and memory limits and part marks per case. Faculty can also name a method. When a passing answer ignores it, AI takes marks off. It never adds any.',
      // Drawn as a card. Sample data.
      card: {
        head: 'Q14 · Coding',
        lines: ['def digit_sum(n):', '    total = 0', '    while n:', '        total += n % 10', '        n //= 10', '    return total'],
        tests: '6 of 6 tests passed',
        mark: 4,
        of: 8,
        check: 'Passes every test, but loops where a recursive answer was required.',
      },
    },
    notes: 'Demo: mark a written question live and read out the reason. Let a faculty member in the room disagree with it, then go to the next slide.',
  },

  control: {
    q: 9,
    asks: 'Dean, faculty',
    title: 'If the AI gets one wrong, who answers for it?',
    answer: 'Your faculty, because nothing reaches a student until they publish. A quiz owner can choose to release marks on submission instead.',
    aiLabel: 'Where AI is used',
    aiHead: ['It does', 'Who checks'],
    ai: [
      { job: 'Drafts questions from notes', check: 'Faculty keep, edit or drop each' },
      { job: 'Drafts rubrics', check: 'Faculty edit before use' },
      { job: 'Tags topics', check: 'Faculty confirm' },
      { job: 'Marks written answers', check: 'Faculty publish or change' },
      { job: 'Checks coding method', check: 'It can only lower a mark' },
      { job: 'Answers questions on results', check: 'Every change waits for a yes' },
    ],
    controlLabel: 'What faculty can do',
    controls: [
      { title: 'Override a mark', body: 'A mark typed by hand always wins, and shows as "Evaluated manually".' },
      { title: 'Re-grade one question', body: 'Fix its rubric or key, and it is marked again across the class.' },
      { title: 'Halt a run', body: 'Stop an evaluation part way, and its marks go back to how they were.' },
      { title: 'See it all on record', body: 'Mark changes go in the audit log, and stale results are flagged.' },
    ],
    models: "It runs on the models that come with Evolveus, or on your university's own.",
    notes: 'A worked example: AI gives 3 of 5 to an answer that says "mutex" where the rubric says "lock". The faculty member adds "mutex" and re-grades that one question for everyone.',
  },

  // ── Results ─────────────────────────────────────────────
  results: {
    q: 10,
    asks: 'Heads of department',
    title: 'What does a department learn from one exam?',
    answer: 'How the class did, who needs a word and why, and which questions did not work.',
    shot: {
      label: 'How one class performed. Real screen.',
      src: '/product/cohort-results.webp',
      srcDark: '/product/cohort-results-dark.webp',
      alt: "A histogram of a class's scores in ten-point bands, with the class mean marked",
    },
    // Sample data, with students as numbers, never names.
    follow: {
      label: 'Students to follow up',
      rows: [
        { who: 'Student 041', why: 'Left 3 answers blank' },
        { who: 'Student 087', why: 'Finished in 9 minutes' },
        { who: 'Student 112', why: 'Well below the class average' },
      ],
    },
    items: [
      { title: 'Each question', body: 'How the class did on it, and how hard it turned out to be. Fix a wrong key and the scores update.' },
      { title: 'Ready to share', body: 'Mean, median and spread on screen, and everything exports to Excel.' },
    ],
    notes: 'The follow-up list gives reasons and leaves the judgement to faculty. Never call these students weak.',
  },

  outcomes: {
    q: 11,
    asks: 'Dean, heads of department',
    title: 'Can we show course outcomes without a month of spreadsheets?',
    answer: "Each question carries its topic, Bloom's level and course outcome from the day it is set, so the reports already add up by them.",
    // A topic-by-section grid, drawn. Sample data.
    mastery: {
      label: 'Topic mastery · CS2203 · this semester',
      cols: ['Sec A', 'Sec B', 'Sec C'],
      rows: [
        { topic: 'Process scheduling', v: [78, 72, 81] },
        { topic: 'Synchronisation', v: [64, 58, 69] },
        { topic: 'Deadlocks', v: [52, 44, 57] },
        { topic: 'Paging', v: [61, 52, 66] },
        { topic: 'File systems', v: [74, 70, 77] },
      ],
      also: 'Also compared across batches and semesters.',
    },
    co: {
      label: 'Course outcome attainment',
      rows: [
        { co: 'CO1', l: 'Understand', v: 76 },
        { co: 'CO2', l: 'Apply', v: 64 },
        { co: 'CO3', l: 'Analyse', v: 53 },
      ],
      foot: 'CO1 to CO8, on every course',
    },
    // The home page's knowledge graph, as a still. Sample unit from that page.
    graph: {
      label: 'Knowledge connections',
      hub: 'Recursion',
      nodes: [
        { name: 'Base cases', x: 15, y: 18 },
        { name: 'Call stack', x: 80, y: 14 },
        { name: 'Tree traversal', x: 18, y: 84 },
        { name: 'Merge sort', x: 82, y: 82 },
        { name: 'Memoization', x: 90, y: 48 },
      ],
      body: 'See how topics connect to the questions that test them and the outcomes they serve.',
    },
    notes: "Expect \"Is it NAAC or NBA ready?\" The honest answer is that it exports generic Excel, and your team formats it. Do not say accreditation-ready. Comparison across semesters is still being finished. The connections view is on the home page as an illustration, so check with the team before demonstrating it.",
  },

  assistant: {
    q: 12,
    asks: 'Heads of department, faculty',
    title: 'Can we get an answer without waiting for a report?',
    answer: 'Faculty can ask the built-in assistant in plain language. It shows what it is about to do and waits for a yes.',
    // Sample conversation. The figures match the mastery sample on question 11.
    chat: {
      label: 'Evolveus assistant',
      turns: [
        { from: 'you', text: 'Which topics did CS-B find hardest?' },
        { from: 'it', text: 'Deadlocks at 44%, then paging at 52%.' },
        { from: 'you', text: 'Set up a re-test on Deadlocks for Thursday.' },
        { from: 'it', text: 'I will draft this quiz for CS-B on Thursday. It stays unpublished until you publish it.', confirm: ['Confirm', 'Cancel'] },
      ],
    },
    can: [
      { title: 'It can tell you', body: "How a class is doing, the weakest topics, one student's marks, and whether grading has finished." },
      { title: 'It can do', body: 'Draft, update or publish a quiz, start grading, post an announcement, or create a poll. Each change waits for a confirmation.' },
      { title: 'It connects', body: 'Through WebMCP, to bring assistance into your assessment workflow.' },
    ],
    notes: 'Demo: ask live which topics a section found hardest. It does not write questions. Check with the team before going into detail on WebMCP: it is on the home page but not yet in our fact sheet.',
  },

  students: {
    q: 13,
    asks: 'Dean',
    title: 'What do students get back?',
    answer: 'Their mark and the reason for it, while the exam is still fresh, and a clear view of what to work on.',
    shot: {
      label: "One student's standing. Real screen.",
      src: '/product/student-standing.webp',
      srcDark: '/product/student-standing-dark.webp',
      alt: "One student's standing: score, class average, rank, answers left blank, pacing, and marks by Bloom's level against the class",
    },
    items: [
      { title: 'Feedback on every answer', body: 'Each question shows their mark and why, once faculty publish.' },
      { title: 'Where they stand', body: "Their score beside the class average and their rank, and their marks at each Bloom's level against the class." },
      { title: 'What to work on next', body: 'The topic they handle best and the one to study next. It gets more reliable the more they answer.' },
      { title: 'Everything for the course', body: 'Exams that are live, upcoming, done or missed, plus a score trend, announcements and polls.' },
    ],
    notes: 'A reason beside each mark means a student can see why before they come to the office. We have no figures on complaints, so do not promise a number.',
  },

  // ── Deciding ────────────────────────────────────────────
  running: {
    q: 14,
    asks: 'IT head',
    title: 'Where does our data go, and what does IT have to run?',
    answer: 'You choose: on our servers with nothing for IT to run, or on your own with us maintaining it.',
    hosting: [
      { title: 'On our servers', body: 'We host, update, back up and monitor it. A university can be running exams within days, with no servers to buy.' },
      { title: 'On yours', body: 'Installed on campus or in your private cloud, and we keep it updated there. Student records stay on your network.' },
    ],
    aiLabel: 'AI models',
    ai: 'Mark with the AI models included with Evolveus, or connect models your university already runs.',
    // Always paired with "data stays on your servers" (context doc §4.9).
    caveat: 'If no answer may leave campus, host it there with your own models, or turn AI marking off.',
    dataLabel: 'Data and accounts',
    data: [
      "Every institution's data is held separately",
      'Files are shared through temporary links, with permission checked on each',
      'Sign-in with two-factor codes or passkeys',
      'Each role sees only its own tools and data',
    ],
    notes: 'For the IT head. Where the data lives depends on where the AI models run, so say that plainly.',
  },

  compare: {
    q: 15,
    asks: 'Dean, registrar',
    title: 'Why not keep what we already have?',
    answer: 'Keep whatever does its job. These tools were built for other jobs, so an exam ends up spread across several of them.',
    // Rows and columns come from COMPARE_ROWS on the /compare page.
    key: { full: 'Built for this', part: 'Partly, or through add-ons', none: 'Not what it is for' },
    keep: {
      label: 'Keep what you have if',
      rows: [
        { title: 'You only collect answers', body: 'A practice quiz with no marks suits a free form.' },
        { title: 'You are hiring', body: 'For placement drives, use a hiring platform.' },
        { title: 'Your LMS carries the course', body: 'Leave it there, and bring in Evolveus for the exams.' },
      ],
    },
    foot: 'Compares kinds of tool by what they were built to do. Confirm specifics with each vendor.',
    notes: 'Ask which of these they use today. Nothing here says a named vendor lacks a feature, so do not say that aloud either.',
  },

  limits: {
    q: 16,
    asks: 'Everyone',
    title: 'What should we not expect from it?',
    answer: 'Six things, so that nobody finds them out after signing.',
    head: ['It does not', 'So you'],
    rows: [
      { no: 'Read handwritten scripts', so: 'Need a machine for each student, since answers are given on screen.' },
      { no: 'Proctor live, or use a webcam', so: 'Keep an invigilator in the room, and review replays afterwards.' },
      { no: 'Export NAAC or NBA formats', so: 'Get generic Excel exports, which your team puts into the required format.' },
      { no: 'Replace your LMS', so: 'Keep course material and assignments where they are.' },
      { no: 'Publish marks without faculty, by default', so: 'Keep time for faculty to review the marks before publishing.' },
      { no: 'Decide who cheated', so: 'Treat a violation as a flag for faculty to look into.' },
    ],
    notes: 'Say these before they are asked. It is the slide that makes the other sixteen believable.',
  },

  proof: {
    q: 17,
    asks: 'Dean, registrar',
    title: 'Who uses it, and who stands behind it?',
    answer: 'About 500 students sit an exam on Evolveus most weekdays, and the team that built it supports every installation.',
    figures: [
      { n: '1,500+', l: 'students' },
      { n: '2,000+', l: 'exams' },
      { n: '200,000+', l: 'answers evaluated' },
    ],
    // §1 of the context doc: adopted, never "developed at" or "built for".
    // An independent startup (confirmed by the team, 2026-10-11).
    who: {
      label: 'Who we are',
      text: 'Evolveus is an independent startup. It began as a small student project, and the whole School of AI took it up as demand from its faculty grew.',
    },
    // Confirmed 2026-10-05. Its middle sentence ("What used to take three
    // days now takes thirty minutes") is left out: it gives a second,
    // different time from the 50 hours to 14 minutes on question 7.
    quote: {
      text: 'Evolveus replaced our existing system overnight, and the difference is stark. Students can actually reflect on their performance while it still matters.',
      by: 'Faculty member, School of AI, Amrita Vishwa Vidyapeetham',
    },
    notes: 'Nobody mandated it: faculty asked for it. If they raise the risk of a young vendor, point to the on-campus install in question 14 and offer a conversation with Amrita faculty only if the team has agreed it.',
  },

  close: {
    headline: 'Send us a paper.',
    body: 'The lowest-risk way to answer all of this is one real exam, with one class of yours.',
    steps: [
      { title: 'You send a paper', body: 'One you have already set, with whatever question types it has.' },
      { title: 'We set it up', body: 'Questions, rubrics and the lab, with your faculty.' },
      { title: 'A class sits it', body: 'In your lab, as a normal exam.' },
      { title: 'We read the results together', body: 'The marks, their reasons and the reports.' },
    ],
    qr: '/flyer/qr-evolveus.svg',
    notes: 'Agree on the paper and the class before leaving the room. Pricing is not in this deck: billing is not settled, so take that conversation to the team.',
  },
};
