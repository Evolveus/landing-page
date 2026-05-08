import { useEffect, useRef, useState } from "react";
import "./index.css";
import "./styles/shared.css";

import CoverPage from "./components/pages/CoverPage";
import ProblemSolutionPage from "./components/pages/ProblemSolutionPage";
import SystemFlowPage from "./components/pages/SystemFlowPage";
import CapabilitiesPage from "./components/pages/CapabilitiesPage";
import AdvancedPage from "./components/pages/AdvancedPage";
import CodingPage from "./components/pages/CodingPage";
import RolesPage from "./components/pages/RolesPage";
import ImpactPage from "./components/pages/ImpactPage";
import LandingPage from "./landing/LandingPage";
import ThemesPage from "./landing/ThemesPage";

export default function App() {
  const brochureRef = useRef(null);
  const [exporting, setExporting] = useState(false);
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    if (path === "/brochure") return "brochure";
    if (path === "/themes") return "themes";
    return "landing";
  });

  useEffect(() => {
    const paths = { brochure: "/brochure", themes: "/themes", landing: "/" };
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
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: null,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.98);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      }
      pdf.save("evolveus-brochure.pdf");
    } finally {
      setExporting(false);
    }
  };

  if (view === "landing") {
    return <LandingPage onBrochure={() => setView("brochure")} onThemes={() => setView("themes")} />;
  }

  if (view === "themes") {
    return (
      <ThemesPage
        onBrochure={() => setView("brochure")}
        onHome={() => setView("landing")}
      />
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
        <RolesPage />
        <ImpactPage />
      </div>
    </>
  );
}
