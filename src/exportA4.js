import { useState } from "react";

const A4 = { w: 210, h: 297 }; // mm

/* Saves A4-proportioned elements as an A4 PDF, one element per page.
   Any [data-pdf-link] inside a page becomes a clickable link over the
   same spot in the PDF. The PDF libraries load only when this runs. */
async function exportA4Pdf(pages, filename, { scale = 2, backgroundColor = null } = {}) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const canvas = await html2canvas(page, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor,
    });
    if (i > 0) pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, A4.w, A4.h);

    const pageRect = page.getBoundingClientRect();
    page.querySelectorAll("[data-pdf-link]").forEach((el) => {
      const r = el.getBoundingClientRect();
      pdf.link(
        ((r.left - pageRect.left) / pageRect.width) * A4.w,
        ((r.top - pageRect.top) / pageRect.height) * A4.h,
        (r.width / pageRect.width) * A4.w,
        (r.height / pageRect.height) * A4.h,
        { url: el.dataset.pdfLink },
      );
    });
  }
  pdf.save(filename);
}

/* [exporting, run]: `run` exports the elements `getPages()` returns;
   `exporting` is true while it works. */
export function useA4Export(getPages, filename, options) {
  const [exporting, setExporting] = useState(false);
  const run = async () => {
    setExporting(true);
    try {
      await exportA4Pdf(getPages(), filename, options);
    } finally {
      setExporting(false);
    }
  };
  return [exporting, run];
}
