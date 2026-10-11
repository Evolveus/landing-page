// ─── Deck copy ───
// The 16:9 deck, presented in person to a room: dean, registrar, exam
// controller, heads of department and the IT head, in about half an hour.
// What it carries is decided in docs/evolveus-context.md §6; every claim
// is from §3 and §4 there. The copy is the deck's own: it doesn't repeat
// the home page's steps or the brochure's chapter titles.
//
// The pitch: one system instead of the four tools an exam runs across
// today, with AI doing named jobs at each step and faculty checking it.
// What that buys is marks with reasons, feedback while it still matters,
// and a department that can see which topics need time. Time saved is
// one proof among several, not the lead.
//
// Anything drawn as a card (a PDF's drafts, the violation log, a replay,
// topic mastery) is sample data, made up to show the feature, and says
// so on the slide. The real screens are real, anonymised captures.

// The exam, told in order. Each step slide shows where it sits.
export const STEPS = [
  { n: '01', name: 'Before' },
  { n: '02', name: 'During' },
  { n: '03', name: 'Marking' },
  { n: '04', name: 'Results' },
  { n: '05', name: 'Running it' },
];

export const DECK = {
  title: 'Evolveus deck',
  sample: 'Sample data',

  // No slogan: the name, what it is, and where it is in use.
  cover: {
    sub: 'One system for university exams, from the question paper to the results.',
    inUse: 'In use at',
    notes: 'Introduce the product in one line. The deck follows a single exam from setting the paper to reading the results.',
  },

  tools: {
    title: 'Today an exam is spread across tools, and marked by hand.',
    pain: 'One mid-term at Amrita produced 420 written papers. Marking them by hand takes about 50 hours.',
    // Categories, never a claim about a named product (see COMPARE in
    // src/landing/content.js). Each row says what the tool is used for.
    rows: [
      { tool: 'A form tool', eg: 'Google Forms, Microsoft Forms', job: 'the MCQs' },
      { tool: 'The LMS', eg: 'Moodle, Google Classroom', job: 'the course and its quizzes' },
      { tool: 'A coding-test service', eg: 'HackerRank, HackerEarth', job: 'the programming questions' },
      { tool: 'Paper and spreadsheets', eg: 'Scripts and mark sheets', job: 'hand-marked written answers and the mark sheet' },
    ],
    one: 'Evolveus',
    gets: [
      'One paper holds every question type',
      'One lab setup and one log cover the exam',
      'Each mark is stored with its reason',
      'Results add up by topic and outcome, semester after semester',
    ],
    notes: 'Ask the room which of these they use now. The rest of the deck shows the one system, step by step.',
  },

  paper: {
    title: 'Objective, written and code answers, marked in one paper.',
    sub: 'Students answer on screen in the lab, across eight question types. Three kinds are marked for you, each in its own way. File uploads go to faculty to mark.',
    parts: [
      { part: 'Part A', kind: 'Objective', how: 'MCQ, true or false, matching and fill in the blank, scored against the key when the exam ends' },
      { part: 'Part B', kind: 'Written', how: "AI marks them against the faculty's model answer and rubric, and gives a reason for each mark" },
      { part: 'Part C', kind: 'Code', how: 'Test cases run first, then AI checks the method the faculty asked for' },
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
    notes: 'This is the claim the rest of the deck backs up. None of the tools on the last slide marks all three kinds. Answers are typed on screen; handwritten papers are out of scope.',
  },

  ai: {
    title: 'Where AI does the work, and who checks it.',
    head: ['Step', 'You give it', 'It gives back', 'Who checks'],
    // Illustrative examples of each job (context doc §4.2).
    rows: [
      { step: 'Setting', in: 'Unit 4 lecture notes, as a PDF', out: 'Draft questions spread across the notes, up to 50 a run', check: 'Faculty keep, change or discard each draft' },
      { step: 'Setting', in: 'A written question and its model answer', out: 'A rubric with the marks split 2 + 2 + 1', check: 'Faculty edit it before use' },
      { step: 'Tagging', in: 'A bank of questions', out: 'Topics, with "DBMS" and "Database Management Systems" merged into one', check: 'Faculty confirm the tags' },
      { step: 'Marking', in: 'A written answer', out: '4 of 5, with a short written reason', check: 'Faculty publish, change any mark, or re-grade a question' },
      { step: 'Marking', in: 'Code that passes every test', out: 'Marks taken off for ignoring "must be recursive"', check: 'The check can only lower a mark' },
      { step: 'Results', in: '"Which topics did CS-B find hardest?"', out: 'Deadlocks at 44%, paging at 52%', check: 'Faculty confirm before it changes anything' },
    ],
    models: "It runs on the models that come with Evolveus, or on your university's own.",
    notes: "Each row is one of the next demos. The right-hand column answers 'who checks the AI?'",
  },

  setting: {
    step: '01',
    title: 'Draft questions from the notes you teach from.',
    // Drawn as cards. Sample data: the file and questions are made up.
    pdf: {
      label: 'Questions from a PDF · drafted by AI',
      file: 'unit-4-process-scheduling.pdf',
      size: '6.8 MB',
      ask: '12 MCQ · 3 descriptive · mixed difficulty',
      drafts: [
        { type: 'MCQ', q: 'Which scheduling algorithm can leave a long job waiting indefinitely?' },
        { type: 'MCQ', q: 'Round robin with a very large time quantum behaves like which algorithm?' },
        { type: 'Descriptive', q: 'Compare SJF and round robin for an interactive system.' },
      ],
      actions: ['Keep', 'Edit', 'Drop'],
      more: '+ 12 more drafts',
    },
    rubric: {
      label: 'Rubric · drafted by AI',
      lines: [
        { t: 'States one strength of each', m: 2 },
        { t: 'Explains response time for interactive users', m: 2 },
        { t: 'Ends on a justified choice', m: 1 },
      ],
      foot: 'Faculty edit it before use',
    },
    facts: [
      { n: '50', l: 'drafts per run, from a PDF as large as 25 MB' },
      { n: '8', l: 'question types, mixed in one paper' },
    ],
    tags: "Every question carries its topic, difficulty, Bloom's level, course outcome and marks. The results pages group marks by these tags.",
    notes: 'Demo: upload a PDF of lecture notes and keep two of the drafts. Then open the rubric for a written question.',
  },

  during: {
    step: '02',
    title: 'The exam stays in the lab, and any attempt can be replayed.',
    controls: [
      { title: 'Lab network only', body: "Opens only on the lab's IP range. Safe Exam Browser can be required too." },
      { title: 'Full screen enforced', body: 'Leaving it pauses the exam and goes in the log.' },
      { title: 'Own order for each student', body: 'Questions and options shuffled per student.' },
      { title: 'Nothing lost on a refresh', body: 'Answers save as they go; time-up hands the paper in.' },
    ],
    // Sample data, with students as numbers, never names.
    log: {
      label: 'Violation log · ten kinds, faculty only',
      rows: [
        { t: '09:42:10', who: 'Student 07', kind: 'Tab switch' },
        { t: '09:48:33', who: 'Student 22', kind: 'Window resized' },
        { t: '09:51:02', who: 'Student 22', kind: 'Right-click' },
      ],
    },
    replay: {
      head: 'Session replay · Student 22',
      plain: 'Replays what the student did in the exam screen. There is no webcam and no screen recording.',
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
    notes: 'A violation is something to look into, and faculty decide what it means. Demo: open a replay and scrub to the flagged moment. It is reviewed after the exam, so never call it live monitoring.',
  },

  marking: {
    step: '03',
    title: 'Written answers and code, marked against your rules.',
    shot: {
      label: 'A written answer, marked by AI. Real screen.',
      src: '/product/grading-remark.webp',
      srcDark: '/product/grading-remark-dark.webp',
      alt: 'A marked descriptive answer: the question, the student response, 2 of 2 marks, and the remark explaining the mark',
      note: 'the reason, in plain words',
    },
    written: 'Each written answer is checked against the model answer, keywords and rubric, and the mark arrives with a short explanation. One quiz-wide instruction sets how strict the marking is.',
    code: {
      label: 'Code',
      body: 'Each answer runs against test cases, some hidden from students, in any of seven languages. Faculty can also name a method, such as "must be recursive". When a passing answer ignores it, AI takes marks off. It never adds any.',
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
    notes: 'Demo: mark a written question live and read out the reason.',
  },

  control: {
    step: '03',
    title: 'Faculty decide when students see their marks.',
    sub: 'By default, marks stay hidden until faculty publish them. A quiz owner can release them on submission instead.',
    // A common, low-stakes correction, made up to show the flow.
    example: {
      label: 'For example',
      steps: [
        'AI gives 3 of 5 to an answer that says "mutex" where the rubric says "lock".',
        'The faculty member adds "mutex" to the rubric.',
        'They re-grade that one question, and every answer to it is marked again.',
      ],
    },
    rows: [
      { title: 'Override a mark', body: 'A mark typed in by hand always wins, and is shown as "Evaluated manually".' },
      { title: 'Re-grade one question', body: 'Correct its rubric or key, and that one question is marked again across the class.' },
      { title: 'Halt a run', body: 'Stop an evaluation part way through, and its marks go back to how they were.' },
      { title: 'Know when marks are stale', body: 'Change a setting after marking, and Evolveus says the results are out of date.' },
    ],
    notes: 'Expect the question here: what if the AI gets it wrong?',
  },

  results: {
    step: '04',
    title: 'Results show which topics each section needs to revisit.',
    shot: {
      label: 'How one class performed. Real screen.',
      src: '/product/cohort-results.webp',
      srcDark: '/product/cohort-results-dark.webp',
      alt: "A histogram of a class's scores in ten-point bands, with the class mean marked",
    },
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
      also: 'Also by course outcome, and against last semester.',
    },
    items: [
      { title: 'Students to follow up', body: 'Listed with why: far below the class average, blank answers, or an unusually quick finish.' },
      { title: 'Each question', body: 'How the class did on it. Fix a wrong key and the scores update.' },
    ],
    export: 'Everything exports to Excel.',
    notes: 'This works because every question was tagged when the paper was set. Demo: ask the assistant which topics a section found hardest.',
  },

  students: {
    step: '04',
    title: 'Students see the reason behind every mark.',
    shot: {
      label: "One student's standing. Real screen.",
      src: '/product/student-standing.webp',
      srcDark: '/product/student-standing-dark.webp',
      alt: "One student's standing: score, class average, rank, answers left blank, pacing, and marks by Bloom's level against the class",
    },
    items: [
      { title: 'Feedback on every answer', body: 'Each question shows their mark and why, once faculty publish.' },
      { title: 'Where they stand', body: "Their score next to the class average and their rank, plus how they did at each Bloom's level compared with the class." },
      { title: 'What to work on next', body: 'The topic they handle best and the one to study next. It gets more reliable the more they answer.' },
      { title: 'Everything for the course', body: 'Quizzes that are open, coming up, done or missed, plus announcements and polls.' },
    ],
    notes: 'The faculty quote on the proof slide is about exactly this.',
  },

  running: {
    step: '05',
    title: 'On our servers or on yours.',
    hosting: [
      { title: 'On our servers', body: 'We take care of updates, backups and monitoring.' },
      { title: 'On yours', body: 'Installed on campus or in your private cloud. We keep it updated there.' },
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

  proof: {
    title: 'About 500 students sit an exam on Evolveus most weekdays.',
    figures: [
      { n: '1,500+', l: 'students' },
      { n: '2,000+', l: 'exams' },
      { n: '200,000+', l: 'answers evaluated' },
    ],
    // §1 of the context doc: adopted, never "developed at" or "built for".
    // An independent startup (confirmed by the team, 2026-10-11).
    who: {
      label: 'Who we are',
      text: 'Evolveus is an independent startup. It began as a small student project, and the whole School of AI took it up as demand from its faculty grew. The team that built it supports every installation.',
    },
    // Confirmed by the team, 2026-10-05.
    midterm: 'Those 420 mid-term papers: about 50 hours to mark by hand, 14 minutes on Evolveus.',
    // Confirmed 2026-10-05. Its middle sentence ("What used to take three
    // days now takes thirty minutes") is left out: it gives a second,
    // different time from the 50 hours to 14 minutes beside it.
    quote: {
      text: 'Evolveus replaced our existing system overnight, and the difference is stark. Students can actually reflect on their performance while it still matters.',
      by: 'Faculty member, School of AI, Amrita Vishwa Vidyapeetham',
    },
    notes: 'Nobody mandated it: faculty asked for it. The 14 minutes is the marking; faculty review the marks before publishing.',
  },

  close: {
    headline: 'Send us a paper.',
    body: 'Run a real exam on Evolveus with a class of yours.',
    steps: [
      { title: 'You send a paper', body: 'One you have already set, with whatever question types it has.' },
      { title: 'We set it up', body: 'Questions, rubrics and the lab, with your faculty.' },
      { title: 'A class sits it', body: 'In your lab, as a normal exam.' },
      { title: 'We read the results together', body: 'The marks, their reasons and the reports.' },
    ],
    qr: '/flyer/qr-evolveus.svg',
    notes: 'Agree on the paper and the class before leaving the room.',
  },
};
