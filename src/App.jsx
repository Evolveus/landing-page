import { useRef, useState } from 'react';
import './index.css';
import './styles/shared.css';

import CoverPage from './components/pages/CoverPage';
import ProblemSolutionPage from './components/pages/ProblemSolutionPage';
import SystemFlowPage from './components/pages/SystemFlowPage';
import CapabilitiesPage from './components/pages/CapabilitiesPage';
import AdvancedPage from './components/pages/AdvancedPage';
import RolesPage from './components/pages/RolesPage';
import ImpactPage from './components/pages/ImpactPage';

export default function App() {
  const brochureRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const pages = brochureRef.current.querySelectorAll('.page');
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: null,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      pdf.save('evalify-brochure-2026.pdf');
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      {/* Export Button */}
      <div style={{
        position: 'fixed', top: 20, right: 20, zIndex: 9999,
        display: 'flex', gap: 10,
      }}>
        <button
          onClick={exportPDF}
          disabled={exporting}
          style={{
            background: exporting ? '#64748b' : '#4f46e5',
            color: '#fff', border: 'none',
            padding: '10px 22px', borderRadius: 8,
            fontFamily: 'var(--font-sans)', fontSize: 13,
            fontWeight: 700, cursor: exporting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(79,70,229,0.35)',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'background 0.2s',
          }}
        >
          {exporting ? (
            <>⏳ Exporting…</>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export PDF
            </>
          )}
        </button>
      </div>

      {/* Brochure */}
      <div ref={brochureRef}>
        <CoverPage />
        <ProblemSolutionPage />
        <SystemFlowPage />
        <CapabilitiesPage />
        <AdvancedPage />
        <RolesPage />
        <ImpactPage />
      </div>
    </>
  );
}
