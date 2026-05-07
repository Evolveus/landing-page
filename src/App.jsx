import { useRef, useState } from "react";
import "./index.css";
import "./styles/shared.css";

import CoverPage from "./components/pages/CoverPage";
import ProblemSolutionPage from "./components/pages/ProblemSolutionPage";
import SystemFlowPage from "./components/pages/SystemFlowPage";
import CapabilitiesPage from "./components/pages/CapabilitiesPage";
import AdvancedPage from "./components/pages/AdvancedPage";
import RolesPage from "./components/pages/RolesPage";
import ImpactPage from "./components/pages/ImpactPage";
import {
  BoldMinimal,
  EditorialInstitutional,
  ModernAcademic,
  StructuredEnterprise,
} from "./components/concepts/ConceptBrochures";

const DESIGNS = [
  { id: "original", label: "Original", filename: "evolveus-original-brochure" },
  {
    id: "editorial",
    label: "Editorial Institutional",
    filename: "evolveus-editorial-institutional",
  },
  {
    id: "enterprise",
    label: "Structured Enterprise",
    filename: "evolveus-structured-enterprise",
  },
  {
    id: "academic",
    label: "Modern Academic",
    filename: "evolveus-modern-academic",
  },
  { id: "bold", label: "Bold Minimal", filename: "evolveus-bold-minimal" },
];

function OriginalBrochure() {
  return (
    <>
      <CoverPage />
      <ProblemSolutionPage />
      <SystemFlowPage />
      <CapabilitiesPage />
      <AdvancedPage />
      <RolesPage />
      <ImpactPage />
    </>
  );
}

function SelectedDesign({ id }) {
  if (id === "editorial") return <EditorialInstitutional />;
  if (id === "enterprise") return <StructuredEnterprise />;
  if (id === "academic") return <ModernAcademic />;
  if (id === "bold") return <BoldMinimal />;
  return <OriginalBrochure />;
}

export default function App() {
  const brochureRef = useRef(null);
  const [selectedDesign, setSelectedDesign] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const designId = params.get("design");
    return DESIGNS.find((design) => design.id === designId) || DESIGNS[0];
  });
  const [exporting, setExporting] = useState(false);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const pages = brochureRef.current.querySelectorAll(
        ".page, .concept-page",
      );
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

      pdf.save(`${selectedDesign.filename}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const selectDesign = (design) => {
    setSelectedDesign(design);
    const url = new URL(window.location.href);
    if (design.id === "original") {
      url.searchParams.delete("design");
    } else {
      url.searchParams.set("design", design.id);
    }
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="export-controls">
        <div className="design-switcher" aria-label="Brochure design selector">
          {DESIGNS.map((design) => (
            <button
              key={design.id}
              type="button"
              className={design.id === selectedDesign.id ? "is-active" : ""}
              onClick={() => selectDesign(design)}
            >
              {design.label}
            </button>
          ))}
        </div>

        <button
          onClick={exportPDF}
          disabled={exporting}
          className="export-button"
        >
          {exporting ? (
            <>Exporting...</>
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

      <div ref={brochureRef} className="brochure-view" key={selectedDesign.id}>
        <SelectedDesign id={selectedDesign.id} />
      </div>
    </>
  );
}
