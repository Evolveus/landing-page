# Evolveus design

The rules every Evolveus surface follows: the website, the flyer, the
brochure and the slide deck. The website is the reference; when this file
and the site disagree, the site is right and this file needs fixing.

For what we can and can't say, read `docs/evolveus-context.md` (§3 facts,
§4 what to claim, §5 copy decisions). This file covers how things look.

Sources in code:

- Tokens, type, nav, buttons, footer, figures: `src/landing/brand/register.css`
- The scroll story, the pencil, depth: `src/landing/brand/journey.css`
- Shared figure components: `src/landing/brand/figures.jsx`
- Copy: `src/landing/content.js`

---

## 1. The idea

**The answer sheet, digitised.** Every visual decision comes from one
object: the OMR exam sheet. Ruled hairlines, margin numbering, shaded
bubbles, timing marks, specimen framing. Deep forest ink on warm paper.

Each motif must carry information. A bubble that is shaded means a value;
a numbered row is a step; a figure label names a real screen. When the
motif is used as wallpaper, or dropped, the page looks like any other SaaS
site.

## 2. Never

- Gradients, glassmorphism, glow, blurred blobs.
- Drop shadows on content. The one exception: paper lying on the desk in
  the scroll story casts a short contact shadow.
- Pill badges, emoji, decorative arrows and ornaments (`▹`, `//`, `→` as
  bullets).
- 3D or tilt for its own sake. Depth only where it says something: a
  question lifting off the bank, results rising out of the sheet.
- Invented people, testimonials, logos or numbers.

## 3. Colour

Light theme (the default for anything printed):

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fcfcfa` | Page background |
| `--paper-2` | `#f4f6f2` | Inset areas, the mat under a screenshot |
| `--card` | `#ffffff` | Cards, digit boxes |
| `--ink` | `#0d1f17` | Headlines, body on paper |
| `--ink-70` | `#3f564a` | Body copy, ledes |
| `--ink-45` | `#6d8378` | Captions, labels, mono metadata |
| `--ink-25` | `#a3b3aa` | Empty bubbles, disabled |
| `--rule` | `rgba(13,31,23,.14)` | 1px structure lines |
| `--rule-soft` | `rgba(13,31,23,.07)` | Secondary lines |
| `--brand` | `#0f6b45` | The one accent: shaded bubbles, figure numbers, links |
| `--brand-deep` | `#08231a` | Dark panels |
| `--brand-lift` | `#1fa36a` | Highlights on dark, bar tops |
| `--brand-pale` | `#dcede3` | Selection, light fills |
| `--brand-wash` | `#f0f6f2` | The second of two equal panels |
| `--flag` | `#a8551b` | Warnings, "follow up" marks. Sparingly |

Dark theme values live in `register.css` under DARK THEME. Screens follow
the system setting; print never does.

Green is the only accent. One colour does the highlighting; everything else
is ink at different strengths.

## 4. Type

- **Archivo** (variable, with the width axis) for everything set in words.
  Headlines go wide and tight: weight 700, `font-stretch` 108 to 112%,
  letter-spacing about -0.03em, line-height near 1.
- **DM Mono** for labels, figure numbers, step numbers, metadata: 500
  weight, uppercase, letter-spacing 0.15em, small (10.5 to 11.5px on
  screen).
- Ligatures off. Balanced wrapping on headlines.

Scale on the web (for reference when sizing other media):

| Role | Size | Notes |
|---|---|---|
| Display | very large, line-height 0.94 | One per page at most |
| H2 | 31 to 50px | Short plain sentence |
| H3 | 19px, weight 600 | |
| Lede | 16.5 to 19px, `--ink-70` | max 60ch |
| Body | 16.5px, line-height 1.6 | |
| Mono label | 11.5px | uppercase, tracked |

## 5. Motifs

Use these, and only where they carry something.

- **The bubble.** An 11px ring in `--brand`, filled when "marked". The
  brand's atom. Use it as a list marker only when the list is a set of
  choices or values; never as decoration.
- **Rules.** Structure is drawn with 1px lines, the way a printed booklet
  is. Not boxes with shadows, not cards floating on colour.
- **Margin numbering.** Steps and sections numbered `01`, `02` in mono, in
  the margin or at the head of a row, like question numbers on a sheet.
- **Digit-grid figures** (`OmrNumber` in `figures.jsx`). A proof number is
  written the way a roll number is filled in: one box per digit, a column
  of 0 to 9 bubbles under it, the matching one shaded. Used for the usage
  figures (1,500+ students, 2,000+ exams, 200,000+ answers). Short labels
  under them; the grid carries the number.
- **The specimen mat** (`Exhibit`). A real product screenshot sits on a
  card drawn like a specimen sheet: timing marks down the left edge, a
  registration square bottom right, a mono head with `Fig. N` in green and a
  label. Whole screens get a browser bar (`ShotBar`) instead.
- **Pencil marks.** Graphite strokes (underline, ring, tick) drawn once, on
  one phrase, where a person would mark it. The CTA underlines "half an
  hour". At most one per view.
- **Sample data** is labelled "Sample data". Real screens are real
  (anonymised) captures.

## 6. Layout

- Plenty of paper. One idea per section; section titles are short plain
  sentences.
- Two things of equal weight sit side by side, split by a rule; the second
  gets `--brand-wash`.
- Corners are small (3px on the mat, 6 to 8px on images). Nothing is
  rounded into a pill.
- The exam is told in order: before (setting the paper), during (security),
  after (marking), results (reports), across a course (mastery). Each step
  gets equal weight; there is no single lead feature.

## 7. Words

Full rules in `docs/evolveus-context.md` §5. The short version:

- Brand is **Evolveus**.
- On the site: plain headings, no punchlines, no slogans, no lists of
  verbs ending on a clever line.
- On print (flyer, brochure cover, deck title): the headline may be catchy,
  because it gets a few seconds. Catchy means short, bold and true only of
  us, like the flyer's "Exams marked by AI. Approved by you." Generic
  hype is still out: "AI-powered", "AI-driven", "next-gen",
  "reimagined".
- No em dashes, no "not X, but Y", no stock words (seamless, robust,
  empower, unlock, reimagined, next-generation).
- Specifics belong in the sub-line and body, not the headline.
- Run new copy through the humanizer skill.
- Copy that also appears on the site is imported from
  `src/landing/content.js`, not retyped.

---

## 8. Print (A4 flyer, brochure)

The web rules carry over with these changes.

- **Its own idea, not the site in A4.** A print piece shares the tokens,
  type and never-list, but not the site's sections or lines. The home
  page's opening, "In use at" band and digit-grid figures shrunk onto a
  page read as repetitive. Each piece leads with what
  `docs/evolveus-context.md` §6 gives it. The pencil (notes in the margin
  of a real screen, a few faint doodles) is the print pieces' signature
  more than the bubble.
- **Light for paper, dark for screens.** The light version is the one to
  print. A dark version (the site's dark tokens with solid lines) is for
  sending as a PDF or showing on a screen; the page has a Light/Dark
  switch. Either way the sheet sets its own tokens, so the reader's system
  theme never decides which one comes out. On dark, single-colour partner
  logos are drawn white and the QR code keeps a white tile.
- **Solid lines.** Office printers drop 7% and 14% alpha lines. On paper use
  solid colours: rule `#c4ccc7`, soft rule `#dfe4e0`, empty bubble
  `#a3b3aa`.
- **Sizes.** Body at least 9pt (about 12px on the 794px-wide A4 sheet),
  captions and mono labels at least 7pt.
- **Margins.** 14mm minimum on every side for office printing. Bleed
  (3mm) only if a print shop is involved.
- **Dark pages and bleeds on paper.** Office printers leave an uneven
  4 to 5mm unprinted strip, so a forest page is a panel inset 8mm with a
  white frame that looks meant, with its text 18mm from the edge. A real
  screen may run off one edge if only its outer margin is lost; text,
  logos, folios and the QR code always stay 14mm inside.
- **The booklet's own idea** (the brochure): pacing. Forest panel pages
  between paper ones, chapter numerals (I to V) drawn huge in outline,
  real screens printed large, and one pencil mark a page. The flyer's
  idea is one annotated card; the booklet doesn't repeat it.
- **Paper colour.** Use `#ffffff` for the page so the printer lays no tint;
  `--paper-2` stays for insets.
- **Export through the browser's print to PDF** (`window.print()` with
  `@page { size: A4; margin: 0 }` and a print rule that shows only the
  sheet; see `src/flyer/flyer.css`). That gives a vector PDF with real
  text and working links, drawn exactly as on screen. Don't go back to
  html2canvas (the old brochure's export, removed 2026-10-05): it drops
  negative letter-spacing, `font-stretch`, SVG transforms and some SVG
  images, so headlines widen, doodles vanish and the QR code turns into a
  black block. Scope a piece's print rules to its own view
  (`body:has(.fl-sheet)`): every stylesheet loads on every route.
- **Check the PDF itself, not the screen,** including once with the system
  in dark mode. Draw animated things (pencil strokes) in their final
  state.
- **A QR code** to the site sits beside the contact details on anything
  handed out.
- **Handwriting** (Caveat) for pencil notes is loaded at weight 600 by the
  piece itself; the site only loads a few letters of it at 500.

## 9. Slides (16:9 deck)

To be written when the deck is redone. Starting points: one idea per slide,
light theme by default, the exam steps as the spine of the deck, the
specimen mat for every screenshot.
