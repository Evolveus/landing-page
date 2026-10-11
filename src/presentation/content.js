// ─── Deck copy ───
// The 16:9 deck, presented in person to a room: dean, registrar, exam
// controller, heads of department and the IT head, in about half an hour.
// What it carries is decided in docs/evolveus-context.md §6; every claim
// is from §3 and §4 there. The copy is the deck's own: it doesn't repeat
// the home page's steps or the brochure's chapter titles.
//
// Anything drawn as a card (a PDF's drafts, the violation log, a replay,
// the assistant) is sample data, made up to show the feature, and says
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

  cover: {
    kicker: 'Exam software for universities',
    // Catchy is allowed on the deck's title (DESIGN.md §7). True because
    // marking usually finishes within about ten minutes of the exam
    // closing (context doc §3); the sub-line says "usually".
    headline: ['Marked before the class', 'leaves the lab.'],
    sub: 'MCQs, written answers and code in one paper, usually all marked within ten minutes of the exam closing. Faculty check the marks before students see them.',
    inUse: 'In use at',
    // §1 of the context doc: adopted, never "developed at" or "built for".
    origin: 'Students started it as a small project. Demand grew, and the whole School of AI adopted it.',
    notes: 'Who we are in one line. The rest of the deck follows a single exam from the question paper to the report.',
  },

  problem: {
    label: 'Today',
    title: 'What universities run exams on now.',
    // Categories, never a claim about a named product (see COMPARE in
    // src/landing/content.js).
    rows: [
      { tool: 'Form tools', eg: 'Google Forms, Microsoft Forms', gap: 'Good for quick MCQs. Long answers still come back to faculty to mark by hand.' },
      { tool: 'LMS quizzes', eg: 'Moodle, Google Classroom', gap: 'Made to run a course. Coding questions, lab rules and CO reports usually mean plugins or spreadsheets.' },
      { tool: 'Coding-test services', eg: 'HackerRank, HackerEarth', gap: 'Made for hiring, and good at that job. A semester paper also has MCQs and written answers.' },
      { tool: 'Pen and paper', eg: 'Scripts and mark sheets', gap: "Days of marking for each paper, and the reason behind a mark stays in the examiner's head." },
    ],
    notes: 'Ask the room what they use now. It is often more than one of these.',
  },

  paper: {
    label: 'The whole paper',
    title: 'Every kind of answer comes back marked.',
    sub: 'One paper can hold MCQs, written answers and code, and each part is marked in its own way.',
    parts: [
      { part: 'Part A', kind: 'Objective', how: 'By the answer key, the moment the exam ends' },
      { part: 'Part B', kind: 'Written', how: 'By AI, against the model answer and rubric you set', ai: true },
      { part: 'Part C', kind: 'Code', how: 'By test cases, then an AI check that it used the method you named', ai: true },
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
        q: 'Sum the digits of n, using recursion.',
        marks: '4 / 8',
        tests: '6 of 6 tests passed',
        check: 'Uses a loop, though recursion was required.',
      },
      total: '17 / 23',
    },
    notes: 'This is the claim the rest of the deck backs up. No other kind of tool on the previous slide marks all three.',
  },

  setting: {
    step: '01',
    title: 'Draft questions from the notes you teach from.',
    // Drawn as cards. Sample data: the file and questions are made up.
    pdf: {
      label: 'Questions from a PDF',
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
      note: 'nothing goes in until faculty keep it',
    },
    rubric: {
      label: 'Rubric, drafted',
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
    tags: "Every question carries its topic, difficulty, Bloom's level, course outcome and marks. AI suggests the topics and faculty confirm them.",
    notes: 'Demo: upload a PDF of lecture notes and keep two of the drafts. Then open the rubric for a written question.',
  },

  sitting: {
    step: '02',
    title: 'The exam can be locked to your lab.',
    controls: [
      { title: 'Lab network only', body: "Tie the paper to the lab's IP range. Add Safe Exam Browser to block copy and paste as well." },
      { title: 'Full screen enforced', body: 'Step out of full screen and the exam pauses until the student returns. The exit goes in the log.' },
      { title: 'Own order for each student', body: 'Everyone gets the questions, and the options inside them, in a different order.' },
      { title: 'Nothing lost on a refresh', body: 'Answers save while the student works, a reload brings them back, and time-up hands the paper in.' },
    ],
    // Sample data, with students as numbers, never names.
    log: {
      label: 'Violation log',
      sub: "Ten kinds, logged against the attempt. Faculty see it, students don't.",
      rows: [
        { t: '09:42:10', who: 'Student 07', kind: 'Tab switch' },
        { t: '09:48:33', who: 'Student 22', kind: 'Window resized' },
        { t: '09:51:02', who: 'Student 22', kind: 'Right-click' },
        { t: '10:05:47', who: 'Student 40', kind: 'Print or save' },
      ],
      note: 'a flag for faculty to check',
    },
    notes: 'Present a violation as something to look into. Faculty decide what it means, and can record a reason against it.',
  },

  replay: {
    step: '02',
    title: 'Replay any attempt afterwards.',
    body: 'Pick any student and play their attempt back on the same screen they wrote it on. You see every answer they typed, where they went between questions, what was flagged and when they ran their code.',
    plain: 'It records what happened in the exam screen. There is no webcam and no screen recording.',
    // A drawn timeline of one attempt. Sample data.
    track: {
      head: 'Student 22 · CS2203 Mid-term',
      steps: [
        { at: 0, t: '09:30', l: 'Started' },
        { at: 13, t: '09:36', l: 'Q1 to Q4' },
        { at: 27, t: '09:42', l: 'Q5' },
        { at: 40, t: '09:48', l: 'Window resized', flag: true },
        { at: 53, t: '09:51', l: 'Right-click', flag: true },
        { at: 68, t: '09:58', l: 'Q12 · ran code 4 times' },
        { at: 84, t: '10:14', l: 'Back to Q5' },
        { at: 100, t: '10:28', l: 'Submitted' },
      ],
      now: 3,
    },
    notes: 'Demo: open the replay for one attempt and scrub to a flagged moment. It is reviewed after the exam, so never call it live monitoring.',
  },

  marking: {
    step: '03',
    title: 'Each written mark comes with its reason.',
    shot: {
      fig: '1',
      label: 'A written answer, marked by AI',
      src: '/product/grading-remark.webp',
      srcDark: '/product/grading-remark-dark.webp',
      alt: 'A marked descriptive answer: the question, the student response, 2 of 2 marks, and the remark explaining the mark',
      notes: { mark: 'marked against your rubric', remark: 'why it got the mark, in plain words' },
    },
    code: {
      label: 'Code',
      title: 'The tests set the mark, and AI checks the method.',
      body: 'Each answer runs against test cases, some hidden from students, in any of seven languages. Faculty can also name a method, such as "must be recursive". When a passing answer ignores it, AI takes marks off. It never adds any.',
      // Drawn as a card. Sample data.
      card: {
        head: 'Q12 · Coding',
        lines: ['def digit_sum(n):', '    total = 0', '    while n:', '        total += n % 10', '        n //= 10', '    return total'],
        tests: '6 of 6 tests passed',
        mark: 4,
        of: 8,
        check: 'Passes every test, but loops where a recursive answer was required.',
      },
    },
    notes: 'Demo: mark a written question live and read out the reason. A quiz-wide instruction sets how strict the marking is.',
  },

  control: {
    step: '03',
    label: 'Faculty control',
    title: 'Faculty decide when students see their marks.',
    sub: 'Results are usually held until faculty publish them. A quiz can also release them on submission, if its owner prefers.',
    rows: [
      { title: 'Override a mark', body: 'A mark typed in by hand always wins, and is shown as "Evaluated manually".' },
      { title: 'Re-grade one question', body: 'Correct its rubric or key, and that one question is marked again across the class.' },
      { title: 'Halt a run', body: 'Stop an evaluation part way through, and its marks go back to how they were.' },
      { title: 'Know when marks are stale', body: 'Change a setting after marking, and Evolveus says the results are out of date.' },
    ],
    notes: 'Expect the question here: what if the AI gets it wrong?',
  },

  reading: {
    step: '04',
    title: 'See where a class went wrong, by question and by topic.',
    shot: {
      fig: '2',
      label: 'How the class performed',
      src: '/product/cohort-results.webp',
      srcDark: '/product/cohort-results-dark.webp',
      alt: 'Class results: mean, spread, range, students below average, and a histogram of scores in ten-point bands',
    },
    items: [
      { title: 'Students to follow up', body: 'Listed with why: far below the class average, blank answers, or an unusually quick finish.' },
      { title: 'Each question', body: 'How the class did on it. Fix a wrong key and the scores update.' },
      { title: 'Topic mastery', body: 'Per topic and per course outcome, with sections and semesters side by side.' },
      { title: 'Each student', body: "Every answer's mark and feedback, plus the topic they're strongest in and the topic to study next." },
    ],
    export: 'Everything exports to Excel.',
    notes: 'Results come back by course outcome because every question was tagged when the paper was set.',
  },

  assistant: {
    step: '04',
    label: 'Faculty assistant',
    title: 'Ask about a class in plain words.',
    // A drawn conversation. Sample data.
    chat: [
      { who: 'q', text: "How did CS-B do on last week's quiz, and which topics need work?" },
      { who: 'a', text: 'Average 61%. Deadlocks (44%) and paging (52%) were the lowest. Six students left question 7 blank.' },
      { who: 'q', text: 'Post an announcement about a revision class on Friday.' },
      { who: 'a', confirm: true, text: 'Announcement to CS-B: "Revision class on deadlocks and paging, Friday 2 pm."', actions: ['Post it', 'Cancel'] },
    ],
    note: 'nothing changes until you confirm',
    can: 'It can also draft a quiz, publish one, start marking or create a poll. Every change waits for a confirmation, and it never writes questions.',
    notes: 'Demo: ask it about a real class, live. Then ask it to post something and show the confirmation.',
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
    label: 'So far',
    title: 'In use at Amrita on most weekdays.',
    // Confirmed by the team, 2026-10-05.
    midterm: {
      label: 'One mid-term, 420 written papers',
      before: { n: '50', unit: 'hr', label: 'By hand' },
      after: { n: '14', unit: 'min', label: 'On Evolveus' },
    },
    daily: 'About 500 students sit an exam on a typical weekday.',
    // Confirmed 2026-10-05. Its middle sentence ("What used to take three
    // days now takes thirty minutes") is left out: it gives a second,
    // different time from the 50 hours to 14 minutes beside it.
    quote: {
      text: 'Evolveus replaced our existing system overnight, and the difference is stark. Students can actually reflect on their performance while it still matters.',
      by: 'Faculty member, School of AI, Amrita Vishwa Vidyapeetham',
    },
    notes: 'The 50 hours is the faculty time to hand-mark that mid-term. Ask how long their last one took.',
  },

  close: {
    kicker: 'Next step',
    headline: 'Send us a paper.',
    body: 'Choose a paper from last semester. We set it up, a class of yours sits it, and we go through the marks and the reports together.',
    qr: '/flyer/qr-evolveus.svg',
    notes: 'Agree on the paper and the class before leaving the room.',
  },
};
