import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles/shared.css";

import CoverPage from "./components/pages/CoverPage";
import ProblemSolutionPage from "./components/pages/ProblemSolutionPage";
import SystemFlowPage from "./components/pages/SystemFlowPage";
import CapabilitiesPage from "./components/pages/CapabilitiesPage";
import AdvancedPage from "./components/pages/AdvancedPage";
import CodingPage from "./components/pages/CodingPage";
import StudentPage from "./components/pages/StudentPage";
import RolesPage from "./components/pages/RolesPage";
import ImpactPage from "./components/pages/ImpactPage";
import LandingPage from "./landing/LandingPage";
import Compare from "./landing/brand/Compare";
import Register from "./landing/brand/Register";
import About from "./landing/brand/About";
import SignIn from "./landing/brand/SignIn";
import PresentationPage from "./presentation/PresentationPage";
import Flyer from "./flyer/Flyer";
import { useA4Export } from "./exportA4";
// Last, as it styles the brochure over its own stylesheets; see the file.
import "./styles/inherited.css";

/* Every view: its address, the page it renders, and whether it is a
   full-bleed site page (wrapped in .landing-shell; see the body class
   below) or one with a way back home (`home`). The first path is the
   one written back to the address bar. Unknown paths show "landing". */
const ROUTES = [
  { view: "landing", paths: ["/"], Page: LandingPage, shell: true },
  { view: "brochure", paths: ["/brochure"] },
  { view: "compare", paths: ["/compare"], Page: Compare, shell: true },
  { view: "product", paths: ["/product"], Page: Register, shell: true },
  { view: "about", paths: ["/about"], Page: About, shell: true },
  { view: "signin", paths: ["/signin"], Page: SignIn, shell: true },
  { view: "presentation", paths: ["/ppt", "/presentation"], Page: PresentationPage, home: true },
  { view: "flyer", paths: ["/flyer", "/flyer/v1"], Page: Flyer, home: true },
];

const routeFor = (view) => ROUTES.find((r) => r.view === view) ?? ROUTES[0];

export default function App() {
  const brochureRef = useRef(null);
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    return ROUTES.find((r) => r.paths.includes(path))?.view ?? "landing";
  });
  const route = routeFor(view);

  useEffect(() => {
    const { hash } = window.location;
    window.history.replaceState({}, "", route.paths[0] + hash);
    // The browser's own jump to #section happens before React has drawn
    // the section, so jump once it exists.
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      });
    }
  }, [route]);

  // index.css styles <body> as the brochure's centred, padded, gapped column.
  // The landing views render full-bleed, so they mark the body explicitly
  // rather than leaving the reset to a :has() selector.
  useLayoutEffect(() => {
    document.body.classList.toggle("is-landing", !!route.shell);
    return () => document.body.classList.remove("is-landing");
  }, [route]);

  const [exporting, exportPDF] = useA4Export(
    () => brochureRef.current.querySelectorAll(".page"),
    "evolveus-brochure.pdf",
  );

  if (route.Page) {
    const { Page } = route;
    if (route.home) return <Page onHome={() => setView("landing")} />;
    return (
      <div className="landing-shell">
        <Page />
      </div>
    );
  }

  return (
    <>
      <div className="export-controls">
        <button
          onClick={() => setView("landing")}
          className="export-button"
          style={{ marginRight: 8 }}
        >
          ← Home
        </button>
        <button
          onClick={exportPDF}
          disabled={exporting}
          className="export-button"
        >
          {exporting ? (
            "Exporting..."
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export PDF
            </>
          )}
        </button>
      </div>
      <div ref={brochureRef} className="brochure-view">
        <CoverPage />
        <ProblemSolutionPage />
        <SystemFlowPage />
        <CapabilitiesPage />
        <AdvancedPage />
        <CodingPage />
        <StudentPage />
        <RolesPage />
        <ImpactPage />
      </div>
    </>
  );
}
