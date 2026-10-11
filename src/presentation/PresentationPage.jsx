import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../landing/_shared/Icon";
import { useTheme } from "../landing/brand/pageMotion";
import { BRAND, BRAND_LOGO } from "../landing/content";
import { DECK } from "./content";
import {
  Assistant, Close, Control, Cover, Frame, Marking, Paper, Problem, Proof, Reading, Replay, Running, Setting, Sitting,
} from "./slides";
import "../landing/brand/register.css";
import "./deck.css";

/* The deck, presented in a room (docs/evolveus-context.md §6). Slides
   are drawn on a fixed 1440×810 canvas and scaled to the window, so a
   layout reads the same on a laptop and on a projector.

   A scroll or a click moves a slide (a click on the left third goes
   back). Keys: arrows, space and Page Up/Down move; Home and End jump; F goes
   full screen; N shows the speaker notes; T switches Light/Dark. The
   slide number lives in the address (#4), so a reload keeps your place.

   It follows the site's theme (the nav's Light/Dark). Save as PDF prints
   every slide, one per page, in the theme on screen. */
/* The deck in order. `step` puts a slide in the exam's five steps;
   `panel` draws it on the forest panel; `label` heads the rest. */
const SLIDES = [
  { id: "title", name: "Title", Slide: Cover, notes: DECK.cover.notes },
  { id: "today", name: "Today", Slide: Problem, label: DECK.problem.label, notes: DECK.problem.notes },
  { id: "paper", name: "The whole paper", Slide: Paper, label: DECK.paper.label, notes: DECK.paper.notes },
  { id: "setting", name: "Questions from notes", Slide: Setting, step: "01", notes: DECK.setting.notes },
  { id: "lab", name: "The lab", Slide: Sitting, step: "02", notes: DECK.sitting.notes },
  { id: "replay", name: "Session replay", Slide: Replay, step: "02", notes: DECK.replay.notes },
  { id: "marking", name: "Marking", Slide: Marking, step: "03", notes: DECK.marking.notes },
  { id: "faculty", name: "Faculty decide", Slide: Control, step: "03", panel: true, notes: DECK.control.notes },
  { id: "results", name: "Results", Slide: Reading, step: "04", notes: DECK.reading.notes },
  { id: "assistant", name: "Assistant", Slide: Assistant, step: "04", notes: DECK.assistant.notes },
  { id: "running", name: "Running it", Slide: Running, step: "05", notes: DECK.running.notes },
  { id: "proof", name: "In use", Slide: Proof, label: DECK.proof.label, notes: DECK.proof.notes },
  { id: "close", name: "Send us a paper", Slide: Close, panel: true, notes: DECK.close.notes },
];

const W = 1440;
const H = 810;
const BAR = 56; // the control bar under the canvas

const total = SLIDES.length;
const fromHash = () => {
  const n = parseInt(window.location.hash.slice(1), 10);
  return n >= 1 && n <= total ? n - 1 : 0;
};

export default function PresentationPage({ onHome }) {
  const [current, setCurrent] = useState(fromHash);
  const [dir, setDir] = useState("next");
  const [scale, setScale] = useState(1);
  const [notes, setNotes] = useState(false);
  const [idle, setIdle] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const dark = theme === "dark";
  const idleTimer = useRef(0);
  const touch = useRef(null);
  const wheel = useRef({ sum: 0, locked: false, timer: 0 });

  // The site's <body> is a centred, padded column; the deck is full-bleed.
  useLayoutEffect(() => {
    document.body.classList.add("is-deck");
    return () => document.body.classList.remove("is-deck");
  }, []);

  // Save as PDF prints 16:9 pages. Every stylesheet loads on every route,
  // and the print viewer's A4 @page would win, so this one is added last
  // and only while the deck is open.
  useEffect(() => {
    const page = document.createElement("style");
    page.textContent = `@page{ size: ${W}px ${H}px; margin: 0; }`;
    document.head.appendChild(page);
    return () => page.remove();
  }, []);

  // The pencil's handwriting is loaded up front: the print copy is hidden
  // until printing starts, too late for the browser to fetch it then.
  useEffect(() => {
    document.fonts?.load("600 20px Caveat");
  }, []);

  const savePdf = async () => {
    await document.fonts?.ready;
    window.print();
  };

  useEffect(() => {
    const was = document.title;
    document.title = DECK.title;
    return () => { document.title = was; };
  }, []);

  const goTo = useCallback((i) => {
    const next = Math.max(0, Math.min(total - 1, i));
    if (next === current) return;
    setDir(next > current ? "next" : "prev");
    setCurrent(next);
  }, [current]);

  useEffect(() => {
    window.history.replaceState({}, "", `#${current + 1}`);
  }, [current]);

  // Fit the canvas to the window, leaving room for the control bar.
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, (window.innerHeight - BAR) / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const fullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  }, []);

  // One listener for the life of the deck, reading the latest state
  // through a ref. Re-adding it on every render would drop a key: the
  // first press after the controls fade wakes them, React re-renders in
  // that same event, and a listener removed mid-dispatch never runs.
  const keys = useRef(null);
  const onKey = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(k)) goTo(current + 1);
    else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) goTo(current - 1);
    else if (k === "Home") goTo(0);
    else if (k === "End") goTo(total - 1);
    else if (k === "f" || k === "F") fullscreen();
    else if (k === "n" || k === "N") setNotes((v) => !v);
    else if (k === "t" || k === "T") toggleTheme();
    else return;
    e.preventDefault();
  };
  useLayoutEffect(() => {
    keys.current = onKey;
  });
  useEffect(() => {
    const press = (e) => keys.current?.(e);
    window.addEventListener("keydown", press);
    return () => window.removeEventListener("keydown", press);
  }, []);

  // The controls fade when the pointer rests, so the room sees only the slide.
  useEffect(() => {
    const wake = () => {
      setIdle(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIdle(true), 2500);
    };
    wake();
    window.addEventListener("pointermove", wake);
    window.addEventListener("keydown", wake);
    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
    };
  }, []);

  // A swipe on a touch screen moves a slide.
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  // A scroll moves one slide per gesture. A trackpad keeps sending wheel
  // events as its swipe coasts to a stop, so after a move the wheel is
  // ignored until it has been quiet for a moment.
  const onWheel = (e) => {
    const w = wheel.current;
    clearTimeout(w.timer);
    w.timer = setTimeout(() => { w.locked = false; w.sum = 0; }, 220);
    if (w.locked) return;
    w.sum += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(w.sum) < 40) return;
    goTo(current + (w.sum > 0 ? 1 : -1));
    w.locked = true;
    w.sum = 0;
  };

  // A click on the slide goes forward; on its left third, back. Links on
  // a slide (the email, the QR code) keep working as links.
  const onClick = (e) => {
    if (e.target.closest("a, button") || window.getSelection()?.toString()) return;
    goTo(current + (e.clientX < window.innerWidth / 3 ? -1 : 1));
  };

  // Drop the slide number from the address on the way out.
  const leave = () => {
    window.history.replaceState({}, "", window.location.pathname);
    onHome?.();
  };

  const s = SLIDES[current];
  const deckClass = `dk${dark ? " dk--dark" : ""}`;

  const slide = (x, i) => (
    <Frame n={i + 1} total={total} dark={dark} step={x.step} label={x.label} panel={x.panel} className={`dk-slide--${x.id}`}>
      <x.Slide dark={dark} />
    </Frame>
  );

  return (
    <>
      <div
        className={`${deckClass} dk-screen${idle && !notes ? " is-idle" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <main
          className="dk-stage"
          style={{ height: `calc(100vh - ${BAR}px)` }}
          aria-roledescription="slide deck"
          onWheel={onWheel}
          onClick={onClick}
        >
          <div className="dk-canvas" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
            <div key={current} className="dk-enter" data-dir={dir} aria-live="polite">
              {slide(s, current)}
            </div>
          </div>
        </main>

        {notes && (
          <aside className="dk-notes" aria-label="Speaker notes">
            <span className="dk-mono">Notes · {s.name}</span>
            <p>{s.notes}</p>
          </aside>
        )}

        <nav className="dk-bar" aria-label="Deck controls">
          <button className="dk-exit" onClick={leave} aria-label="Leave the deck for the website">
            <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
            <span>{BRAND.name}</span>
          </button>

          {/* One bubble per slide, the current one shaded. */}
          <ol className="dk-bubbles">
            {SLIDES.map((x, i) => (
              <li key={x.id}>
                <button
                  className={i === current ? "on" : i < current ? "past" : ""}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}: ${x.name}`}
                  aria-current={i === current ? "true" : undefined}
                  title={`${i + 1} · ${x.name}`}
                />
              </li>
            ))}
          </ol>

          <div className="dk-tools">
            <button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide">
              <Icon name="arrowRight" size={15} style={{ transform: "rotate(180deg)" }} />
            </button>
            <span className="dk-count">{current + 1} / {total}</span>
            <button onClick={() => goTo(current + 1)} disabled={current === total - 1} aria-label="Next slide">
              <Icon name="arrowRight" size={15} />
            </button>
            <span className="dk-sep" />
            <button className={notes ? "on" : ""} onClick={() => setNotes((v) => !v)} aria-pressed={notes} title="Speaker notes (N)">
              <span className="dk-key">N</span>
            </button>
            <button onClick={toggleTheme} aria-label={dark ? "Switch to light" : "Switch to dark"} title="Light or dark (T)">
              <Icon name={dark ? "sun" : "moon"} size={15} />
            </button>
            <button onClick={fullscreen} aria-label="Full screen" title="Full screen (F)">
              <span className="dk-key">F</span>
            </button>
            <button onClick={savePdf} aria-label="Save as PDF" title="Save as PDF">
              <Icon name="download" size={15} />
            </button>
          </div>
        </nav>
      </div>

      {/* Every slide, for Save as PDF: one per page, nothing animated. */}
      <div className={`${deckClass} dk-print`} aria-hidden="true">
        {SLIDES.map((x, i) => (
          <div className="dk-page" key={x.id}>{slide(x, i)}</div>
        ))}
      </div>
    </>
  );
}
