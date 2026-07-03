import { useRef, useState } from "react";

// ─── Shared flyer content (single source of truth for all versions) ───
export const FLYER = {
  brand: "Evolveus",
  brandSub: "Assessment Platform",
  edition: ["Complete assessment", "for higher education", "Edition 2026"],
  eyebrow: "One platform, end to end",
  headline: {
    pre: "Examinations,",
    em: "reimagined",
    post: "for the digital classroom.",
  },
  lede: "From academic setup and question banks to secure exam delivery, AI-assisted grading and performance analytics — Evolveus runs the entire assessment lifecycle in one place.",
  pillars: [
    {
      n: "01",
      icon: "code",
      title: "Coding Assessment",
      body: "Sandboxed execution with visible and hidden test cases, partial marking, and time & memory limits across seven languages.",
    },
    {
      n: "02",
      icon: "database",
      title: "Question Bank",
      body: "Reusable banks organised by topic, tagged with Bloom's taxonomy and course outcomes. Bulk upload via spreadsheet.",
    },
    {
      n: "03",
      icon: "shieldCheck",
      title: "Secure Examination",
      body: "Twelve violation signals tracked live — tab-switch detection, kiosk mode, IP restriction, and per-submission audit logs.",
    },
    {
      n: "04",
      icon: "brain",
      title: "AI Evaluation",
      body: "LLM-assisted grading for descriptive and fill-in-blank answers. Bring your own key, any provider — faculty always in control.",
    },
    {
      n: "05",
      icon: "chart",
      title: "Analytics & Reporting",
      body: "Per-student, per-question and class-wide breakdowns with CO attainment tracking. Accreditation-ready exports.",
    },
    {
      n: "06",
      icon: "building",
      title: "Institution Management",
      body: "Departments, semesters, batches, courses and labs centralised, with role-based access for every user type.",
    },
  ],
  aiEval: {
    icon: "brain",
    title: "AI evaluation, on your terms",
    body: "Descriptive answers and fill-in-the-blanks graded by the model you choose — OpenAI, Anthropic, Google, Azure, or any OpenAI-compatible endpoint.",
    bullets: [
      "Bring your own key — responses never leave your evaluation call",
      "Rubric-based scoring returned with transparent reasoning",
      "Semantic matching accepts synonyms and equivalent phrasing",
      "Faculty reviews and can override every AI score",
    ],
  },
  performance: {
    icon: "bolt",
    title: "Built for scale & uptime",
    body: "Engineered to stay fast and online through peak exam load, on infrastructure you can trust.",
    bullets: [
      "99.9% availability with zero-touch failover",
      "Low-latency editor and sub-second answer sync",
      "Continuous autosave — network drops never lose progress",
      "Isolated sandboxes and tenant-level data separation",
    ],
  },
  deploy: [
    {
      icon: "globe",
      name: "Managed Cloud",
      tag: "We host, operate and maintain everything. Go live in days with backups, monitoring and SLA-backed support.",
    },
    {
      icon: "lock",
      name: "Self-Hosted",
      tag: "Your servers, your data. On-premise or private cloud with full data sovereignty — we maintain it for you.",
    },
  ],
  contact: { site: "evolveus.in", email: "aksay@evolveus.in" },
};

// ─── Shared A4 → PDF export hook ───
export function useA4Export(filename, backgroundColor) {
  const ref = useRef(null);
  const [exporting, setExporting] = useState(false);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(ref.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: backgroundColor ?? null,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      pdf.save(filename);
    } finally {
      setExporting(false);
    }
  };

  return { ref, exporting, exportPDF };
}
