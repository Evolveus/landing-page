import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../landing/_shared/Icon";
import { Nav } from "../landing/brand/chrome";
import { useSiteTheme } from "./theme";
import "../landing/brand/register.css";
import "./viewer.css";

const A4_WIDTH = 794; // px, 210mm at 96dpi

/* The screen around a print piece (the flyer, the brochure). On top, the
   site's own nav, so someone sent a link can reach the rest of the site;
   under it, a bar for the document: its name, the page in view, and Save
   as PDF. Then the A4 sheets on a plain desk, scaled down to fit narrow
   screens.

   The sheets follow the site's Light/Dark (the nav's button). Save as
   PDF asks which to save: light to print on paper, dark for screens.
   Printing shows the sheets alone, one per page, at full size.

   `children` is a function of `dark` that returns the sheets, one element
   per A4 page. `docTitle` is { light, dark }: print to PDF names the file
   after the page title. */
const SAVE_AS = [
  { theme: "light", label: "Light", hint: "for printing on paper", icon: "sun" },
  { theme: "dark", label: "Dark", hint: "for reading on screen", icon: "moon" },
];

export default function Viewer({ title, docTitle, children }) {
  const siteTheme = useSiteTheme();
  const [printing, setPrinting] = useState(null); // the theme being saved
  const dark = (printing ?? siteTheme) === "dark";
  const pagesRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [asking, setAsking] = useState(false);
  const askRef = useRef(null);

  // The site's <body> is a centred, padded column; the viewer is full-bleed.
  useLayoutEffect(() => {
    document.body.classList.add("is-viewer");
    return () => document.body.classList.remove("is-viewer");
  }, []);

  useEffect(() => {
    const was = document.title;
    document.title = dark ? docTitle.dark : docTitle.light;
    return () => { document.title = was; };
  }, [dark, docTitle]);

  // Shrink the sheets to fit a narrow window; never enlarge them.
  useEffect(() => {
    const fit = () => {
      const gutter = window.innerWidth < 640 ? 24 : 96;
      setZoom(Math.min(1, (window.innerWidth - gutter) / A4_WIDTH));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // The page in view: the sheet crossing the middle of the window.
  useEffect(() => {
    const sheets = [...pagesRef.current.children];
    setTotal(sheets.length);
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(sheets.indexOf(e.target) + 1);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sheets.forEach((s) => seen.observe(s));
    return () => seen.disconnect();
  }, []);

  // Close the Save as PDF choice on a click elsewhere or Escape.
  useEffect(() => {
    if (!asking) return;
    const away = (e) => { if (!askRef.current?.contains(e.target)) setAsking(false); };
    const esc = (e) => { if (e.key === "Escape") setAsking(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [asking]);

  // Once the chosen theme has drawn, open the print dialog; put the
  // site's theme back when it closes.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(null);
    window.addEventListener("afterprint", done, { once: true });
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("afterprint", done);
    };
  }, [printing]);

  const save = (theme) => {
    setAsking(false);
    setPrinting(theme);
  };

  return (
    <div className="rg pv">
      <Nav base="/" home="/" />
      <div className="pv-bar">
        <div className="pv-bar-l">
          <span className="pv-title">{title}</span>
          {total > 1 && (
            <span className="pv-count" aria-live="polite">
              Page {current} of {total}
            </span>
          )}
        </div>
        <div className="pv-save-wrap" ref={askRef}>
          <button
            className="rg-btn rg-btn--sm pv-save"
            aria-label="Save as PDF"
            aria-expanded={asking}
            aria-controls="pv-save-as"
            onClick={() => setAsking((a) => !a)}
          >
            <Icon name="download" size={14} strokeWidth={2} />
            <span className="pv-btn-text">Save as PDF</span>
          </button>
          {asking && (
            <div className="pv-ask" id="pv-save-as" role="group" aria-label="Save as PDF in">
              <span className="pv-ask-k">Save as PDF in</span>
              {SAVE_AS.map((o) => (
                <button key={o.theme} className="pv-ask-opt" onClick={() => save(o.theme)}>
                  <Icon name={o.icon} size={16} strokeWidth={2} />
                  <span>
                    <b>{o.label}</b>
                    <small>{o.hint}</small>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <main ref={pagesRef} className="pv-pages" style={{ zoom }}>
        {children(dark)}
      </main>
    </div>
  );
}
