import { useEffect, useState } from "react";
import { Icon } from "../landing/_shared/Icon";
import { BROCHURE } from "./content";
import { Foot, Head } from "./parts";
import { Case, Cover, Marking, Reading, Running, Setting, Sitting, Students } from "./pages";
import "./brochure.css";

/* The A4 brochure: an eight-page booklet in five chapters, between a
   cover, the case, a page for students and the offer. What goes on
   which page is in docs/evolveus-context.md §6; the print rules are
   DESIGN.md §8.

   Its character is pacing, where the flyer's is one annotated card:
   forest-panel pages against quiet paper ones, chapter numerals drawn
   huge, real screens printed large and running off the page edge, and
   a little pencil.

   Light for paper, dark for screens, remembered in this browser. It saves
   through the browser's print to PDF (brochure.css sets the pages), as
   the flyer does, so the text stays text and the links work. */
const THEME_KEY = "evolveus-brochure-theme";

/* The pages in order. `panel` pages sit on the forest panel; `where` is
   the running head's note of where the reader is. */
const PAGES = [
  { Page: Cover, panel: true },
  { Page: Case, where: "The case" },
  { Page: Setting, where: "Chapter I · Setting" },
  { Page: Sitting, where: "Chapter II · Sitting" },
  { Page: Marking, where: "Chapter III · Marking" },
  { Page: Students, panel: true },
  { Page: Reading, where: "Chapter IV · Reading" },
  { Page: Running, where: "Chapter V · Running" },
];

function savedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function Brochure({ onHome }) {
  const [theme, setTheme] = useState(savedTheme);
  const dark = theme === "dark";
  useEffect(() => {
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* private mode: not remembered */ }
  }, [theme]);

  // Print to PDF names the file after the page title.
  useEffect(() => {
    const was = document.title;
    document.title = dark ? BROCHURE.titleDark : BROCHURE.title;
    return () => { document.title = was; };
  }, [dark]);

  return (
    <div className="br-root">
      <div className="br-toolbar">
        {onHome && (
          <button className="br-btn br-btn--ghost" onClick={onHome}>
            Home
          </button>
        )}
        <div className="br-themes" role="group" aria-label="Theme">
          {["light", "dark"].map((t) => (
            <button
              key={t}
              className="br-btn br-btn--ghost"
              aria-pressed={theme === t}
              onClick={() => setTheme(t)}
            >
              <Icon name={t === "dark" ? "moon" : "sun"} size={14} strokeWidth={2} />
              {t === "dark" ? "Dark" : "Light"}
            </button>
          ))}
        </div>
        <button className="br-btn" onClick={() => window.print()}>
          <Icon name="download" size={14} strokeWidth={2} />
          Save as PDF
        </button>
      </div>

      <div className="br-doc">
        {PAGES.map(({ Page, panel, where }, i) => {
          const body = (
            <>
              <Head dark={dark || panel} where={where} />
              <Page dark={dark} />
              <Foot n={i + 1} total={PAGES.length} />
            </>
          );
          return (
            <article
              key={i}
              className={`br-sheet${dark ? " br-sheet--dark" : ""}${panel ? " br-sheet--panel" : ""}`}
            >
              {panel ? <div className="br-panel">{body}</div> : body}
            </article>
          );
        })}
      </div>
    </div>
  );
}
