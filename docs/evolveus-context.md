# Evolveus: product and marketing context

Reference for anyone (person or agent) writing copy or designing pages for
Evolveus. Collected on 2026-10-02 from the team's own notes, a review of the
product repo (`../evalify`), the staging database, and a Q&A with the team.

Keep it current. When a fact changes, change it here first, then in
`src/landing/content.js`.

---

## 1. What Evolveus is

An exam platform for universities: setting papers, running the exam,
marking, and reporting, in one system. It was formerly called Evalify; don't
mention the old name in public copy. The brand is written **Evolveus**
(not "EvolveUs").

It grew out of the School of AI, Amrita Vishwa Vidyapeetham, Coimbatore,
where the Dean pushed for regular assessments and no existing tool fit the
department's mix of question types. Amrita uses it free of charge, and the
team maintains it. Amrita's name and logo may be used on the site.

The long-term idea is a learning platform for students and staff, not just a
place to write exams.

### The team's own motivation (from the founding notes)

1. We like helping students.
2. We enjoy building it.
3. We need a job.

## 2. Who we sell to

- **Buyer:** Indian universities and private or autonomous colleges. The
  immediate goal is to convince a university.
- **Decision maker:** dean, registrar, or exam controller.
- **Can veto:** the IT head (data residency, hosting).
- **Daily users:** faculty (setting, marking, results) and students.
- **How they arrive:** mostly through a link we send, often after a
  conversation. The page should still work for a cold visitor.

## 3. Facts we can state

| Fact | Value | Source / note |
|---|---|---|
| Students on the platform | 1,500+ | 1,590 real student accounts in the staging clone (test accounts excluded) |
| Exams conducted | 2,000+ | Team; includes pre-V2 history not in the current DB |
| Answers evaluated | 200,000+ | Team; includes pre-V2 history |
| Daily load | A handful of batches write exams most weekdays, about 500 students a day | Team. Do NOT say "1,500 a day" |
| Marking time | Usually within about 10 minutes of the exam closing | Team. Depends on AI marking load; a scaling question, not a hard limit |
| Question types | MCQ, multiple-correct MCQ, true/false, fill in the blank, matching, descriptive, file upload, coding | Product |
| Coding languages | 7 (Java, Python, C++, JavaScript, C, Octave, Scala) | Product |
| Question tags | Difficulty, Bloom's level, course outcome CO1 to CO8 | Product |

## 4. Features: what is real, what to avoid

**Live and safe to claim**

- Question banks by course and topic, shared with access control, bulk MCQ
  upload from spreadsheets.
- Drafting questions from an uploaded PDF (`ai-question-gen`).
- Kiosk / Safe Exam Browser mode, full-screen enforcement, lab restriction
  by IP subnet, password-gated start.
- Violation log: tab switches, focus loss, leaving full screen, resizing,
  copy/paste/cut, right-click, dev tools, print/save, screenshot and other
  restricted shortcuts. Shown to faculty, hidden from students.
- AI marking of descriptive answers against faculty rubrics, with a written
  remark per answer. Faculty approve, can edit any mark, can re-evaluate a
  whole question.
- Coding: in-browser editor, visible and hidden test cases, partial marks,
  time and memory limits, plus an AI check that the student used the approach
  the question asks for (e.g. dynamic programming) even if all tests pass.
- Per-question attempt analytics: time spent, clicks, views. A rough
  confidence signal, not reliable on its own. Say so.
- Results hidden from students until faculty publish them.
- Reports: per-attempt standing (score, class average, rank, Bloom's
  breakdown), class histogram, "students to follow up" (below average, left
  blanks, finished unusually fast), course analytics, student insights across
  courses, topic mastery. Excel export.
- AI assistant for faculty: answers questions about classes, can set up
  quizzes. Every write pauses for a confirmation card.
- Cloud hosting by us, or install on campus.

**Treat as true for the website, though still in progress**

- Comparison across batches, sections, and semesters.

**Do not claim**

- Live proctoring / live supervision (planned, not built).
- NAAC or NBA export. The product exports generic Excel only.
- "Student data never leaves your servers" without the caveat: complete
  isolation needs self-hosted AI models, or AI marking switched off.

**Planned (roadmap, not for the site yet)**

- Personalised, knowledge-graph based quizzes.
- Proctoring as an add-on.
- Billing and access tiers.

## 5. Copy and design decisions

- Hero headline: "Set the paper, run the exam, mark it, see the results.
  One place." Specifics go in the sub-line and body, not the headline. A
  stat-led hero ("Most weekdays, around 500 students...") was rejected as too
  specific.
- No single lead feature. The page follows one exam from start to finish:
  setting the paper, during the exam, marking, reports. Each feature gets
  equal weight as a step in that day.
- Write without AI tells: no em dashes, no "not X, it's Y", no punchline
  headings, no stock words (seamless, robust, empower, unlock...). Run the
  humanizer skill on new copy.
- Human content is welcome, but not cheesy and not overly specific. A team
  backstory section was tried twice and dropped; the one fact kept is a line
  under the Amrita logo: "Developed at the School of AI, Amrita Vishwa
  Vidyapeetham, Coimbatore."
- Section titles are short plain sentences, not one word and not slogans.
- Visual system: the OMR answer sheet (bubbles, hairline rules, margin
  numbering). Use it to carry information, not as decoration. Without it the
  page reads as a generic SaaS site. Current uses: proof figures written as
  roll-number digit grids, screenshots on a specimen sheet with timing marks
  and figure labels, topic mastery as rows of shaded bubbles.
- Dark theme follows the system, with a nav toggle that is remembered. The
  header uses the app's dark logo in dark mode; the footer keeps its white
  mark. Every screenshot has a `-dark.webp` twin.
- Product screenshots: real screens from the staging clone, with names,
  emails, roll numbers and IPs replaced. Single cards sit on a tinted mat;
  whole screens get the browser frame.
- Topic mastery has no real data yet, so it is drawn in HTML with sample
  numbers and labelled "Sample data".

## 6. Open items

- Work is on branch `landing-exam-day-rewrite` (not pushed). Pushing
  `staging` auto-deploys to evolveus-staging.vercel.app.
- The old design variants `/1` to `/7` and flyers v2 to v4 are deleted.
  `/brochure`, `/flyer` (the v1 flyer) and `/ppt` stay, linked from the
  footer's Resources column.
- /compare still says "colleges"; the home page says "universities".
- Multi-tenancy, CI/CD, pricing and a knowledge base were listed as gaps in
  the founding notes; the codebase now shows organisation and row-level
  security work, but check before claiming anything about it.

## 7. How the screenshots were made

1. Run the app locally from `../evalify` with `CAPTCHA_ENABLED=false`. Its
   `.env` points at the staging clone on the VM.
2. Log in with Playwright as an admin, a faculty member with real results,
   and a student (all accounts on the clone use the same test password).
3. Mask every real name, email, username, roll number and IP in the DOM
   before each capture, and check the page text for leftovers.
4. Crop a card by finding the smallest element containing given text, at a
   narrow viewport (820 to 1100px) so the text stays readable when shrunk.
   Wait for that text to appear: the local app can take ~20s to load data,
   and a stable loading screen looks "settled". Hide fixed-position elements
   (chat buttons) before the shot. Repeat with the app's dark theme
   (`data-theme="dark"`) for the `-dark.webp` versions.
5. Convert to WebP into `public/product/`.

Scripts used: `capture.cjs` and `crop.cjs` (kept outside the repo).
