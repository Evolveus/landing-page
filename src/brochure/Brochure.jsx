import Viewer from "../print/Viewer";
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

   Light for paper, dark for screens. Shown in the shared print viewer
   (src/print/Viewer.jsx): on screen it follows the site's theme, and
   Save as PDF asks which to save, through the browser's print to PDF, so
   the text stays text and the links work. */
const DOC_TITLE = { light: BROCHURE.title, dark: BROCHURE.titleDark };

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

export default function Brochure() {
  return (
    <Viewer title="Brochure" docTitle={DOC_TITLE}>
      {(dark) => PAGES.map(({ Page, panel, where }, i) => {
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
    </Viewer>
  );
}
