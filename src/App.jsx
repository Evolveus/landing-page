import { useEffect, useRef, useState } from "react";
import "./index.css";
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
import Design1 from "./landing/designs/Design1";
import Design2 from "./landing/designs/Design2";
import Design3 from "./landing/designs/Design3";
import Design4 from "./landing/designs/Design4";
import Design5 from "./landing/designs/Design5";
import Design6 from "./landing/designs/Design6";
import Design7 from "./landing/designs/Design7";
import PresentationPage from "./presentation/PresentationPage";
import FlyerPage from "./flyer/FlyerPage";
import FlyerV1 from "./flyer/FlyerV1";
import FlyerV2 from "./flyer/FlyerV2";
import FlyerV3 from "./flyer/FlyerV3";
import FlyerV4 from "./flyer/FlyerV4";

export default function App() {
  const brochureRef = useRef(null);
  const [exporting, setExporting] = useState(false);
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    if (path === "/brochure") return "brochure";
    if (path === "/1") return "design-1";
    if (path === "/2") return "design-2";
    if (path === "/3") return "design-3";
    if (path === "/4") return "design-4";
    if (path === "/5") return "design-5";
    if (path === "/6") return "design-6";
    if (path === "/7") return "design-7";
    if (path === "/ppt" || path === "/presentation") return "presentation";
    if (path === "/flyer/v1") return "flyer-v1";
    if (path === "/flyer/v2") return "flyer-v2";
    if (path === "/flyer/v3") return "flyer-v3";
    if (path === "/flyer/v4") return "flyer-v4";
    if (path === "/flyer") return "flyer";
    return "landing";
  });

  useEffect(() => {
    const paths = {
      brochure: "/brochure",
      "design-1": "/1",
      "design-2": "/2",
      "design-3": "/3",
      "design-4": "/4",
      "design-5": "/5",
      "design-6": "/6",
      "design-7": "/7",
      landing: "/",
      presentation: "/ppt",
      flyer: "/flyer",
      "flyer-v1": "/flyer/v1",
      "flyer-v2": "/flyer/v2",
      "flyer-v3": "/flyer/v3",
      "flyer-v4": "/flyer/v4",
    };
    window.history.replaceState({}, "", paths[view] ?? "/");
  }, [view]);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const pages = brochureRef.current.querySelectorAll(".page");
      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: null,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.98);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

        const pageRect = page.getBoundingClientRect();
        page.querySelectorAll("[data-pdf-link]").forEach((el) => {
          const elRect = el.getBoundingClientRect();
          const x = ((elRect.left - pageRect.left) / pageRect.width) * 210;
          const y = ((elRect.top - pageRect.top) / pageRect.height) * 297;
          const w = (elRect.width / pageRect.width) * 210;
          const h = (elRect.height / pageRect.height) * 297;
          pdf.link(x, y, w, h, { url: el.dataset.pdfLink });
        });
      }
      pdf.save("evolveus-brochure.pdf");
    } finally {
      setExporting(false);
    }
  };

  if (view === "presentation") {
    return <PresentationPage onHome={() => setView("landing")} />;
  }

  if (view === "flyer") {
    return <FlyerPage onHome={() => setView("landing")} />;
  }

  if (view === "flyer-v1") {
    return <FlyerV1 onHome={() => setView("landing")} />;
  }

  if (view === "flyer-v2") {
    return <FlyerV2 onHome={() => setView("landing")} />;
  }

  if (view === "flyer-v3") {
    return <FlyerV3 onHome={() => setView("landing")} />;
  }

  if (view === "flyer-v4") {
    return <FlyerV4 onHome={() => setView("landing")} />;
  }

  if (view === "landing") {
    return (
      <div className="landing-shell">
        <LandingPage onNavigate={(n) => setView(`design-${n}`)} />
      </div>
    );
  }

  if (view.startsWith("design-")) {
    const n = Number(view.slice("design-".length));
    const onNavigate = (k) => setView(`design-${k}`);
    const designs = { 1: Design1, 2: Design2, 3: Design3, 4: Design4, 5: Design5, 6: Design6, 7: Design7 };
    const Design = designs[n] ?? Design1;
    return (
      <div className="landing-shell">
        <Design active={n} onNavigate={onNavigate} />
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
