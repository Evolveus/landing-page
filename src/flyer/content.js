// ─── Flyer copy ───
// The flyer has copy of its own: it leads with the whole paper being
// marked, where the home page tells one exam start to finish. What it may
// claim, and where each claim belongs, is in docs/evolveus-context.md
// (§4, §6). The figures and contact details come from the site's content.
export const FLYER = {
  // Catchy is allowed on print (DESIGN.md §7); the second sentence is the
  // answer to the first worry about AI marking.
  headline: ['Exams marked by AI.', 'Approved by you.'],

  // One real answer from the product, redrawn as a compact card (the
  // capture is public/product/grading-remark.webp; the question is
  // shortened, the answer and remark are as marked). Pencil notes in the
  // margin say what each part is.
  answer: {
    head: 'Question 4 · Descriptive',
    mark: 2,
    of: 2,
    question: 'test.txt is in /home/student/Desktop/A/A1. Without changing the working directory, copy it to the Desktop.',
    answerLabel: "Student's answer",
    answer: 'cp /home/student/Desktop/A/A1/test.txt /home/student/Desktop',
    remarkLabel: 'Remark',
    remark: 'Your answer correctly uses the absolute path to identify the file and the destination directory. You also correctly followed the constraint of not changing the current working directory.',
    foot: 'Marked by AI against the rubric',
    edit: 'Edit mark',
    notes: {
      mark: 'marked against your rubric',
      remark: 'a reason, written for every answer',
      edit: 'faculty can change any mark',
    },
  },

  aiLabel: 'Also done with AI',
  ai: [
    { n: '01', title: 'Questions from your notes', body: 'Upload a PDF and get up to 50 draft questions to review.' },
    { n: '02', title: 'A rubric to start from', body: 'Drafted for each written question, for faculty to edit.' },
    { n: '03', title: 'Code checked for method', body: 'Passing the tests is not enough if the question asked for recursion.' },
    { n: '04', title: 'Ask the assistant', body: 'Ask how a class did or which topic is weakest, or have it set up a quiz. It checks with you before changing anything.' },
  ],
  replay: {
    label: 'Session replay',
    body: "Replay any student's exam afterwards, answer by answer.",
  },

  inUse: 'In use at',
  proof: '2,000+ exams · 200,000+ answers marked',
  hosting: 'Runs on our cloud or your campus, with your own AI models if you prefer.',

  cta: {
    kicker: 'Book a walkthrough',
    text: "Bring a paper you've set. We'll run it with your team as a real exam.",
  },
  qr: '/flyer/qr-evolveus.svg',
  // The page title while the flyer is open; print to PDF names the file after it.
  title: 'Evolveus flyer',
  titleDark: 'Evolveus flyer (dark)',
};
