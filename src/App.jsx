import { useEffect, useLayoutEffect, useState } from "react";

import LandingPage from "./landing/LandingPage";
import Compare from "./landing/brand/Compare";
import Register from "./landing/brand/Register";
import About from "./landing/brand/About";
import SignIn from "./landing/brand/SignIn";
import PresentationPage from "./presentation/PresentationPage";
import Flyer from "./flyer/Flyer";
import Brochure from "./brochure/Brochure";

/* Every view: its address, the page it renders, and whether it is a
   full-bleed site page (wrapped in .landing-shell; see the body class
   below) or one with a way back home (`home`). The first path is the
   one written back to the address bar. Unknown paths show "landing". */
const ROUTES = [
  { view: "landing", paths: ["/"], Page: LandingPage, shell: true },
  { view: "brochure", paths: ["/brochure"], Page: Brochure, home: true },
  { view: "compare", paths: ["/compare"], Page: Compare, shell: true },
  { view: "product", paths: ["/product"], Page: Register, shell: true },
  { view: "about", paths: ["/about"], Page: About, shell: true },
  { view: "signin", paths: ["/signin"], Page: SignIn, shell: true },
  { view: "presentation", paths: ["/ppt", "/presentation"], Page: PresentationPage, home: true },
  { view: "flyer", paths: ["/flyer", "/flyer/v1"], Page: Flyer, home: true },
];

const routeFor = (view) => ROUTES.find((r) => r.view === view) ?? ROUTES[0];

export default function App() {
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

  // index.css styles <body> as a centred, padded column for the print
  // pieces and the deck.
  // The landing views render full-bleed, so they mark the body explicitly
  // rather than leaving the reset to a :has() selector.
  useLayoutEffect(() => {
    document.body.classList.toggle("is-landing", !!route.shell);
    return () => document.body.classList.remove("is-landing");
  }, [route]);

  const { Page } = route;
  if (route.home) return <Page onHome={() => setView("landing")} />;
  return (
    <div className="landing-shell">
      <Page />
    </div>
  );
}
