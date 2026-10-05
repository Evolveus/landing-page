import { BRAND, BRAND_LOGO } from "../landing/content";
import { BROCHURE } from "./content";

/* The pieces every brochure page is built from. */

const pad = (n) => String(n).padStart(2, "0");

/* The running head: the brand, and where in the booklet this page is. */
export function Head({ dark, where }) {
  return (
    <header className="br-head">
      <span className="br-brand">
        <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
        {BRAND.name}
      </span>
      {where && <span className="br-mono">{where}</span>}
    </header>
  );
}

export function Foot({ n, total }) {
  return (
    <footer className="br-foot br-mono">
      <a href={`https://${BRAND.domain}`}>{BRAND.domain}</a>
      <span>{pad(n)} / {pad(total)}</span>
    </footer>
  );
}

/* A chapter's opening: its Roman numeral drawn huge in outline, its name
   and title, and a short paragraph. The numeral is the booklet's
   equivalent of a question number in the margin of an answer sheet. */
export function Opener({ n, intro }) {
  const ch = BROCHURE.chapters.find((c) => c.n === n);
  return (
    <section className="br-opener">
      <span className="br-numeral" aria-hidden="true">{ch.n}</span>
      <div className="br-opener-text">
        <span className="br-mono br-chapter">Chapter {ch.n} · {ch.name}</span>
        <h2 className="br-h2">{ch.title}</h2>
        {intro && <p className="br-intro">{intro}</p>}
      </div>
    </section>
  );
}

/* Marks a feature that uses an AI model, as the context doc does. */
export const Ai = () => <span className="br-ai">AI</span>;

/* A handwritten note with an arrow pointing back the way it came. */
export function Note({ text, className = "" }) {
  return (
    <span className={`br-note ${className}`}>
      <svg viewBox="0 0 40 16" aria-hidden="true">
        <path d="M38 9 C 28 10, 16 9, 4 7" />
        <path d="M10 2 L 3 7 L 10 12" />
      </svg>
      {text}
    </span>
  );
}

/* Faint pencil doodles for empty corners. The flyer has the lightbulb
   and the A+; the booklet draws its own: an open book (setting a paper
   from your notes), a sketched chart (reading the results), a tick. */
const DOODLES = {
  book: ["M6 16 C 16 12, 26 12, 30 18 C 34 12, 44 12, 54 16 L 54 46 C 44 42, 34 42, 30 48 C 26 42, 16 42, 6 46 Z", "M30 18 L 30 48", "M12 23 L 24 22 M12 29 L 24 28 M12 35 L 20 34 M36 22 L 48 23 M36 28 L 48 29"],
  chart: ["M6 52 L 54 52", "M13 50 L 13 38 M24 50 L 24 30 M35 50 L 35 34 M46 50 L 46 20", "M10 30 C 20 22, 32 26, 48 10", "M41 9 L 49 9 L 49 17"],
  tick: ["M8 32 L 22 46 L 52 12"],
};

export function Doodle({ at, className = "" }) {
  return (
    <svg className={`br-dd br-dd--${at} ${className}`} viewBox="0 0 60 60" aria-hidden="true">
      {DOODLES[at].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
