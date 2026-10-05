import Viewer from "../print/Viewer";
import { BRAND, BRAND_LOGO, TRUST } from "../landing/content";
import { FLYER } from "./content";
import "./flyer.css";

/* The one-page A4 flyer. It leads with the whole paper being marked: a
   real marked answer, drawn as a card, with pencil notes in its margin
   saying what each part of it is. See DESIGN.md §8 for the print rules.

   Two themes: light for paper, dark for screens (email, chat, a
   projector). On screen it follows the site's theme; Save as PDF asks
   which to save.

   It is shown in the shared print viewer (src/print/Viewer.jsx), which
   saves through the browser's own print to PDF: the text stays text,
   the links work, and the type and pencil come out as drawn. */
const DOC_TITLE = { light: FLYER.title, dark: FLYER.titleDark };

export default function Flyer() {
  const site = `https://${BRAND.domain}`;

  return (
    <Viewer title="Flyer" docTitle={DOC_TITLE}>
      {(dark) => (
        <article className={`fl-sheet${dark ? " fl-sheet--dark" : ""}`}>
          <Doodle at="aplus" />

          <header className="fl-mast">
            <span className="fl-brand">
              <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
              {BRAND.name}
            </span>
            <a className="fl-mono" href={site}>{BRAND.domain}</a>
          </header>

          <section className="fl-hero">
            <h1 className="fl-h1">
              {FLYER.headline.map((line) => <span key={line}>{line}</span>)}
            </h1>
          </section>

          <MarkedAnswer />

          <section className="fl-ai">
            <Doodle at="bulb" />
            <span className="fl-mono">{FLYER.aiLabel}</span>
            <div className="fl-ai-grid">
              {FLYER.ai.map((a) => (
                <div className="fl-ai-item" key={a.n}>
                  <span className="fl-ai-n">{a.n}</span>
                  <h3 className="fl-h3">{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              ))}
              <div className="fl-replay">
                <span className="fl-mono">{FLYER.replay.label}</span>
                <p>{FLYER.replay.body}</p>
              </div>
            </div>
          </section>

          <p className="fl-also">
            <span className="fl-mono">{FLYER.alsoLabel}</span>
            {FLYER.also.map((a) => <span key={a}>{a}</span>)}
          </p>

          <section className="fl-proof">
            <span className="fl-org">
              {FLYER.inUse}
              <img src={TRUST.logo} alt={TRUST.org} />
            </span>
            <span className="fl-proof-n">{FLYER.proof}</span>
          </section>
          <p className="fl-hosting">{FLYER.hosting}</p>

          <footer className="fl-cta">
            <div className="fl-cta-text">
              <span className="fl-mono fl-cta-k">{FLYER.cta.kicker}</span>
              <p>{FLYER.cta.text}</p>
            </div>
            <div className="fl-contact">
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              <a href={site}>{BRAND.domain}</a>
            </div>
            <a className="fl-qr" href={site}><img src={FLYER.qr} alt={`QR code for ${BRAND.domain}`} /></a>
          </footer>
        </article>
      )}
    </Viewer>
  );
}

/* A real marked answer, drawn as a small card, with pencil notes in the
   margin beside the part each one names. Each note hangs off its own row
   of the card, so the arrows stay on their targets whatever the text
   wraps to. */
function MarkedAnswer() {
  const a = FLYER.answer;
  return (
    <figure className="fl-ans">
      <div className="fl-card">
        <div className="fl-card-head">
          <span className="fl-mono">{a.head}</span>
          <span className="fl-mark">
            {a.mark}<small> / {a.of}</small>
            <svg className="fl-ring" viewBox="0 0 80 46" aria-hidden="true">
              <path d="M44 3 C 66 2, 78 13, 76 24 C 74 37, 54 44, 34 43 C 15 42, 3 34, 4 22 C 5 11, 20 3, 48 5" />
            </svg>
          </span>
          <Note text={a.notes.mark} />
        </div>
        <p className="fl-q">{a.question}</p>
        <span className="fl-mono fl-card-label">{a.answerLabel}</span>
        <code className="fl-code">{a.answer}</code>
        <div className="fl-remark">
          <span className="fl-mono fl-card-label">{a.remarkLabel}</span>
          <p>{a.remark}</p>
          <Note text={a.notes.remark} />
        </div>
        <div className="fl-card-foot">
          <span>{a.foot}</span>
          <span className="fl-edit">{a.edit}</span>
          <Note text={a.notes.edit} />
        </div>
      </div>
    </figure>
  );
}

/* A handwritten note in the card's margin, with an arrow back to its row. */
function Note({ text }) {
  return (
    <span className="fl-note">
      <svg viewBox="0 0 40 16" aria-hidden="true">
        <path d="M38 9 C 28 10, 16 9, 4 7" />
        <path d="M10 2 L 3 7 L 10 12" />
      </svg>
      {text}
    </span>
  );
}

/* A few loose pencil doodles in the sheet's empty corners, as in the
   site's footer (FOOT_DOODLES in footMural.jsx): a lightbulb and an A+. Faint, so they never compete with the text. */
const DOODLES = [
  { at: "bulb", strokes: ["M22 36 C 14 30, 14 14, 30 12 C 46 14, 46 30, 38 36 L 37 42 L 23 42 Z", "M24 46 L 36 46 M26 50 L 34 50", "M30 3 L 30 7 M11 11 L 14 14 M49 11 L 46 14"] },
  { at: "aplus", strokes: ["M8 50 L 22 12 L 36 50 M14 36 L 30 36", "M46 22 L 46 38 M38 30 L 54 30"] },
];

function Doodle({ at }) {
  const { strokes } = DOODLES.find((d) => d.at === at);
  return (
    <svg className={`fl-dd fl-dd--${at}`} viewBox="0 0 60 60" aria-hidden="true">
      {strokes.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
