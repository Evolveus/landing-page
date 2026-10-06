# Evolveus: product and marketing context

The single list of what Evolveus is, who it's for, and everything we can
say about it. The website, flyer, brochure and slide deck all draw from
here. How things look lives in `DESIGN.md`.

Sources: the team's founding notes, the product repo (`../evalify`, its
user docs in `content/docs/` and its commit history), the staging
database, and Q&As with the team on 2026-10-02 and 2026-10-05. Product
checked at commit `41025cf2` (2026-10-03).

Keep it current. When a fact changes, change it here first, then in
`src/landing/content.js` and the print pieces.

---

## 1. What Evolveus is

An exam platform for universities: setting papers, running the exam,
marking, and reporting, in one system. It was formerly called Evalify;
don't mention the old name in public copy. The brand is written
**Evolveus** (not "EvolveUs").

### Where it came from (corrected by the team, 2026-10-05)

Evolveus was not commissioned or started by Amrita. It began as a small
project by two students, Nandhu and Aksay, and grew as they kept working on
it. As demand built up, the whole School of AI at Amrita Vishwa
Vidyapeetham, Coimbatore ended up adopting it. Amrita does not pay for it
or compensate the team in any way; the team maintains it. Amrita's name
and logo may be used.

So in copy:

- Say Evolveus is **used at** / **in use at** Amrita, or that the School of
  AI **adopted** it.
- Don't say it was "developed at", "built for", "grew out of" or
  "commissioned by" Amrita or the department, and don't imply the
  department asked for it.
- Don't name the founders in public copy (decided 2026-10-05). Say "we",
  "the team", or that it was started and is developed by students.
- Don't say in public copy that Amrita uses it free or does not pay for it
  (decided 2026-10-06): we are selling the platform. The fact above is for
  our own reference only.

The long-term idea is a learning platform for students and staff, not just
a place to write exams.

### The team's own motivation (from the founding notes)

1. We like helping students.
2. We enjoy building it.
3. We need a job.

## 2. Who we sell to

- **Buyer:** Indian universities and private or autonomous colleges. The
  immediate goal is to convince a university.
- **Decision maker:** dean, registrar, or exam controller.
- **Can veto:** the IT head (data residency, hosting, AI data handling).
- **Daily users:** faculty (setting, marking, results) and students.
- **How they arrive:** mostly through a link or a printed piece we hand
  over, often after a conversation. Every piece should still work for
  someone who has never heard of us.

## 3. Numbers we can state

| Fact | Value | Source / note |
|---|---|---|
| Students on the platform | 1,500+ | 1,590 real student accounts in the staging clone (test accounts excluded) |
| Exams conducted | 2,000+ | Team; includes pre-V2 history not in the current DB |
| Answers evaluated | 200,000+ | Team; includes pre-V2 history |
| Daily load | A handful of batches write exams most weekdays, about 500 students a day | Team. Do NOT say "1,500 a day" |
| Marking time | Usually within about 10 minutes of the exam closing | Team. Depends on AI marking load; a scaling question, not a hard limit |
| Question types | 8: MCQ, multiple select, true/false, fill in the blank, matching, descriptive, file upload, coding | Product docs |
| Coding languages | 7: Java, Python, C, C++, JavaScript, Octave, Scala | Product docs |
| Question tags | Topic, difficulty, Bloom's level, course outcome CO1 to CO8, marks | Product docs |
| Violation kinds logged | 10 (the site says "ten kinds") | Product; list in §4.3 |
| Questions from one PDF | Up to 50 per run, PDF up to 25 MB | Product docs |
| One mid-term's marking | 420 written papers: about 50 hours by hand, 14 minutes on Evolveus | Team, confirmed 2026-10-05. Used on the brochure cover |

A faculty quote, confirmed by the team on 2026-10-05, may be used
attributed to "Faculty member, School of AI, Amrita Vishwa Vidyapeetham":
"Evolveus replaced our existing system overnight, and the difference is
stark. What used to take three days now takes thirty minutes, and students
can actually reflect on their performance while it still matters."
Don't print its middle sentence next to the 50 hours to 14 minutes figure:
two different times for the same job confuse the reader (the brochure
drops it).

Not confirmed, so not for use: 93% faculty agreement with AI grades, 0.8s
per response (both from the old brochure).

## 4. What we can sell

Everything below is live and confirmed claimable (AI items and session
replay confirmed by the team on 2026-10-05). **AI** marks a feature that
uses an AI model. Each item: what it does, then why a buyer cares.

### 4.1 What sets Evolveus apart

Ranked by how strongly each one separates us from what a university
already uses (see /compare for the alternatives: form tools, LMS quizzes,
coding-test services, proctoring suites).

1. **The whole paper is marked, not just the MCQs.** Objective, written
   and coding questions sit in the same paper and all come back marked:
   objective by key, written answers by AI against the faculty's rubric,
   code by test cases plus an AI method check. No alternative category
   on /compare does all three.
2. **AI at every step, and faculty sign off.** AI helps set the paper,
   marks it, and answers questions about the class afterwards. Nothing
   reaches students until faculty publish; any mark can be changed;
   a whole question can be re-graded.
3. **Session replay, without video.** Faculty can replay a student's
   attempt in the real exam screen: every answer, navigation, violation
   and code run. No webcam, no screen recording.
4. **Built around the academic year.** Departments, batches, semesters,
   course outcomes and Bloom's levels come first; reports roll up by topic
   and outcome across sections and semesters.
5. **Your campus, your AI models.** Hosted by us or installed on campus,
   and the university can plug in its own AI models.
6. **In daily use.** 2,000+ exams and 200,000+ answers at Amrita, about
   500 students most weekdays.
7. **Adopted, not mandated.** It started as a small student project and the
   whole School of AI took it up as demand grew. The people who built it
   maintain it. (Don't mention that Amrita doesn't pay; see §1.)

### 4.2 AI features

| Feature | What it does | Why it matters |
|---|---|---|
| **Written-answer marking** (AI) | Grades each descriptive answer against the faculty's model answer, keywords and word limits, plus an optional quiz-wide marking instruction (how strict, what to reward, the tone of feedback). Returns a mark and a short written reason | Scripts no longer carried between faculty; the same standard for the first answer and the last |
| **Rubric drafting** (AI) | Drafts the grading guidelines and marks breakdown for a descriptive question from the question and its expected answer. Faculty edit freely | Faculty start from a working rubric instead of a blank box |
| **Questions from your notes** (AI) | Upload a PDF; choose question types, counts and difficulty; AI drafts up to 50 questions about the concepts it teaches (never "according to the passage"), spread across the document. Faculty keep, edit or discard each. Drafts held for a week | Building a bank stops being a semester-long chore |
| **Coding method check** (AI) | For a coding answer that passes its tests, checks it against requirements faculty write in plain language ("must use recursion", "no hardcoded outputs", "must use dynamic programming") and reduces the score if they aren't met. It never adds marks | Catches the shortcut that passes the tests; tests still decide the marks |
| **Automatic topic tagging** (AI) | Suggests topics for each question and matches them against a shared topic map, so "DBMS" and "Database Management Systems" become one topic. Faculty confirm | Topic mastery and the student knowledge profile work without hand-tagging every question |
| **Faculty assistant** (AI) | Ask in plain language: how a class is doing, which topics are weakest, one student's marks, whether grading has finished. It can draft a quiz, update or publish one, start grading, post an announcement or create a poll. Every change waits for a confirmation. It does not write questions | A faculty member gets an answer without building a report |
| **Choice of AI model** | Use the platform's models (some free, others metered in AI credits) or the university's own models, which use no Evolveus credits | IT keeps control of where answers go and what it costs |

Safeguards that go with the AI (say these; they answer the first
objection):

- Students see nothing until faculty publish results (results can also be
  set to show on submission; that is the faculty's choice per quiz).
- Faculty can change any mark; a hand-set mark always wins and is shown as
  "Evaluated manually".
- Fix a rubric or answer key and re-grade that one question for the whole
  class.
- A running evaluation can be stopped, and its grades rolled back to the
  previous state.
- Faculty are warned when results are out of date after a settings change,
  and notified when an evaluation finishes.

### 4.3 Setting the paper

- Question banks by course and topic, shared with colleagues under access
  control.
- Eight question types in one paper, in sections (Part A, Part B).
- Every question tagged by topic, difficulty, Bloom's level, course
  outcome and marks.
- Bulk MCQ upload from a spreadsheet template.
- Rich editor: formatting, images, code blocks, LaTeX maths with
  live preview.
- Scoring options: negative marking (MCQ, multiple select, true/false,
  matching), partial marks (multiple select, matching; always on for fill
  in the blank and coding), weighting individual blanks or test cases.
- Who can take it: by course, batch, individual student, or lab.
- A calendar of scheduled quizzes.

### 4.4 During the exam

- Password to start.
- Full-screen enforcement: leaving full screen is logged and blocks the
  exam until the student returns.
- Kiosk mode: the exam starts only from the approved exam environment
  (Safe Exam Browser); copy, paste and drag-in are locked there.
- Lab restriction by IP subnet: the exam opens only on the lab network.
- Violation log, ten kinds: tab switch, focus loss, leaving full screen,
  window resize, copy/paste/cut, right-click, developer tools, print/save,
  screenshot and other restricted shortcuts. Shown to faculty, hidden from
  students. Faculty can mark a violation with a reason and act on several
  students at once.
- Question and option order shuffled per student; optional linear flow
  (no going back); auto-submit at time-up; built-in calculator.
- Answers save as the student goes, with a local backup; a refresh brings
  them back. Large file uploads and non-English file names work.
- **Session replay** afterwards (see §4.1). Records actions, not mouse
  movement or video.

### 4.5 Marking

- Objective questions marked by key, instantly.
- Written answers marked by AI with a reason per mark (§4.2).
- Code: in-browser editor, run against visible and hidden test cases,
  part marks per passed case, time and memory limits, seven languages,
  plus the AI method check.
- File-upload answers marked by faculty.
- Usually all done within about ten minutes of the exam closing.

### 4.6 Results and reports

- Per-attempt standing: score, class average, rank, marks by Bloom's level.
- Class view: score histogram, mean and median, and "students to follow
  up" with the reason (well below average, answers left blank, finished
  unusually fast).
- Per-question view: how the class did, where it went wrong; fix a wrong
  key and re-score.
- Per-question attempt analytics: time spent, clicks, views. A rough
  signal, not reliable on its own; say so.
- Course analytics and student insights across courses.
- Topic mastery by topic and course outcome, compared across sections and
  semesters (comparison is still being finished; fine to claim).
- Excel export.

### 4.7 For students

- A dashboard of active, upcoming, completed and missed quizzes.
- Results with a per-question breakdown and the written feedback.
- **Knowledge profile:** strongest topic, the topic to work on next, and
  mastery per topic with a confidence measure that grows with the number
  of questions answered.
- Course announcements, polls and notifications.

### 4.8 Administration

- Departments, semesters (each with a semester manager), batches,
  courses (core, elective, micro-credential) and labs.
- Roles: company, admin, manager, faculty, student; each sees only their
  own tools and data.
- Bulk creation from spreadsheets, with duplicate checks.

### 4.9 Hosting, data and accounts

- Hosted by us (updates, backups, monitoring) or installed on the
  university's own servers or private cloud, maintained by us.
- Each institution's data kept separate from every other institution's.
- Files served through temporary, permission-checked links.
- Two-factor sign-in and passkeys.
- Complete isolation needs the AI models on campus too, or AI marking
  switched off. Always pair "data stays on your servers" with that.

### 4.10 Still in progress (fine to claim, phrase carefully)

- Comparison across batches, sections, and semesters.

## 5. Claim rules

**Do not claim**

- Live proctoring or live supervision (planned, not built). Session
  replay is after the fact; don't call it monitoring.
- NAAC or NBA export. The product exports generic Excel only.
  "Accreditation-ready" is out too.
- Uptime figures (99.9%, failover) or speed figures beyond "about ten
  minutes to mark". The one exception is the confirmed mid-term figure in
  §3 (50 hours by hand, 14 minutes on Evolveus).
- "Student data never leaves your servers" without the AI caveat.
- AI that marks without faculty: always say faculty approve.
- Pricing, credit costs or tiers (billing is on the roadmap).

**Phrase carefully**

- A violation is a flag, not a verdict.
- Attempt analytics are a rough confidence signal.
- The coding check only ever lowers a passing score.
- Results hidden until publish is the usual setup, not a lock.

**Planned (not for any material yet)**

- Personalised, knowledge-graph based quizzes.
- Proctoring as an add-on.
- Billing and access tiers.

## 6. What goes where (decided 2026-10-05)

Each piece has a different reader and a different amount of their time,
so each leads with something different. The core claims recur; the leads
don't.

| Piece | Reader and moment | Leads with | Ends with |
|---|---|---|---|
| Home | Cold visitor or a link we sent; about a minute | One exam, start to finish, with AI inside the steps | Walkthrough offer |
| /product | Someone already interested | Everything, in detail, with real screens | Walkthrough offer |
| /compare | "Why not what we have?" | The alternatives, honestly | Walkthrough offer |
| Flyer (1 page A4) | Handed over or emailed; a few seconds | The whole paper marked (MCQ, written, code), by AI, faculty approve | Offer + QR code |
| Brochure (8-page A4 booklet) | Dean takes it away, passes to HoDs and IT; ten minutes | The case: what it replaces, AI at each stage, safeguards, a page for IT | Offer |
| Deck | A room, presented in person; half an hour | The story told live: problem, demo flow, AI, trust, deployment | "Send us a paper" |

Flyer range line (added 2026-10-05): one mono line teasing high-value
features the flyer doesn't cover, "Plus: Class insights after each exam ·
Topic mastery by section · Locked lab exams · Bloom's and CO tags".

Brochure pages (8, decided 2026-10-05; the 4-page limit was dropped to
give it room for character): (1) cover, (2) the case, with contents, what
it replaces and the figures, (3) I Setting, (4) II Sitting, (5) III
Marking, (6) for students, (7) IV Reading, (8) V Running (for
IT), closing on the quote and the offer.

Faculty control (approve, change, re-mark) is said once on the cover's
case page and as one short row in chapter III. A whole page of it read as
defensive (decided 2026-10-05).

Placement. ● feature it, ○ one line, — leave out.

| Item (§4) | Home | Flyer | Brochure | Deck |
|---|---|---|---|---|
| Whole paper marked (MCQ + written + code) | ● step 03 | ● lead | ● | ● |
| Written answers marked with a reason | ● | ● | ● | ● demo |
| Faculty approve, override, re-grade | ○ | ○ | ● full | ● slide |
| Session replay | ● add to step 02 | ● standout | ● | ● demo |
| Questions from PDF notes | ○ | ○ | ● | ● demo |
| Rubric drafting | ○ add | ○ | ● | ○ |
| Coding method check | ○ add | ○ | ● | ● |
| Faculty assistant | ○ add to step 04 | ○ (added 2026-10-05) | ● | ● live demo |
| Automatic topic tagging | — | — | ● with reports | ○ |
| Lab security, violation log | ● step 02 | — | ● | ● |
| Bloom's, COs, academic structure | ● steps 01, 05 | — | ● | ○ |
| Reports, topic mastery | ● steps 04, 05 | — | ● | ● |
| Student knowledge profile | ○ role tour | — | ○ | ○ |
| Hosting, own AI models, data | ○ | ○ | ● IT page | ● slide |
| Proof figures | ● | ○ small | ● | ● |
| What it replaces (vs forms, LMS...) | — (/compare) | — | ● one page | ○ |
| Origin: student-built, adopted by School of AI | — (/about) | — | ○ | ○ opening |
| Scoring options, admin, editor | — (/product) | — | — | — |

Order of work: flyer, then brochure (moved ahead of the home page's AI
pass on 2026-10-05), then the home page's AI pass (one-line facts in the
existing steps, layout unchanged), then deck.

## 7. Copy decisions

- Write without AI tells: no em dashes, no "not X, it's Y", no punchline
  headings, no stock words (seamless, robust, empower, unlock,
  reimagined...). Run the humanizer skill on new copy.
- Headlines plain; specifics go in the sub-line and body. Rejected so far:
  "Set the paper, run the exam, mark it, see the results. One place." (as
  a headline), a stat-led hero, "The exam is the easy part", "Stop marking
  exams by hand", parallel-verb lists ending on a clever closer.
- Home opening: small "Online exams for universities", greeting
  "Meet Evolveus." (a placeholder; the wording is the owner's call), then
  "In use at [Amrita]".
- Section titles are short plain sentences, not one word and not slogans.
- Human content is welcome, but not cheesy. A team backstory section was
  tried twice and dropped. The origin gets one plain line at most, worded
  per §1 (the old line "Developed at the School of AI..." was wrong).
  /about's "Where it started" section was removed on 2026-10-06; the
  adoption by the School of AI is now one line in its "Today" section.
- Don't label students as weak or struggling (decided 2026-10-05). Talk
  about insights, follow-ups or topics that need work instead.
- Print pieces use copy of their own, not lines lifted from the home
  page.
- Print headlines may be catchy (decided 2026-10-05): short, bold, true
  only of us. Flyer: "Exams marked by AI. Approved by you." Still no
  "AI-powered", "AI-driven", "next-gen". Site headlines stay plain.
- Visual rules are in `DESIGN.md`.

## 8. Open items

- Work is on branch `ui-redesign-1` (not pushed). Pushing `staging`
  auto-deploys to evolveus-staging.vercel.app.
- `/brochure`, `/flyer` and `/ppt` stay, linked from the footer's
  Resources column.
- /compare says "colleges"; the home page says "universities".
- Flyer redo in progress (see §6 for order of work).

## 9. How the screenshots were made

1. Run the app locally from `../evalify` with `CAPTCHA_ENABLED=false`. Its
   `.env` points at the staging clone on the VM.
2. Log in with Playwright as an admin, a faculty member with real results,
   and a student (all accounts on the clone use the same test password).
3. Mask every real name, email, username, roll number and IP in the DOM
   before each capture, and check the page text for leftovers.
4. Crop a card by finding the smallest element containing given text, at a
   narrow viewport (820 to 1100px) so the text stays readable when shrunk.
   Wait for that text to appear: the local app can take ~20s to load data,
   and a stable loading screen looks "settled". Hide fixed-position
   elements (chat buttons) before the shot. Repeat with the app's dark
   theme (`data-theme="dark"`) for the `-dark.webp` versions.
5. Convert to WebP into `public/product/`.

Scripts used: `capture.cjs` and `crop.cjs` (kept outside the repo).

Screens not captured yet that the new material will want: session replay,
rubric drafting, questions from a PDF, the assistant, the student
knowledge profile.
