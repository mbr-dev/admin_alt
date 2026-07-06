import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const EXPORT_WIDTH_PX = 1200;
const EXPORT_CONTENT_MAX_WIDTH_PX = 1000;
const PDF_MARGIN_MM = 10;

interface IPdfCursor {
  y: number;
  pageIndex: number;
}

const ensureSpace = (pdf: jsPDF, cursor: IPdfCursor, heightMm: number) => {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const bottom = pageHeight - PDF_MARGIN_MM;

  if (cursor.y + heightMm <= bottom) return;

  if (cursor.pageIndex > 0 || cursor.y > PDF_MARGIN_MM + 1) {
    pdf.addPage();
  }

  cursor.y = PDF_MARGIN_MM;
  cursor.pageIndex += 1;
};

const forceNewPage = (pdf: jsPDF, cursor: IPdfCursor) => {
  if (cursor.pageIndex > 0 || cursor.y > PDF_MARGIN_MM + 1) {
    pdf.addPage();
    cursor.y = PDF_MARGIN_MM;
    cursor.pageIndex += 1;
  }
};

const inlineSvgStyles = (originalRoot: HTMLElement, clonedRoot: HTMLElement) => {
  const originalSvgs = originalRoot.querySelectorAll("svg");
  const clonedSvgs = clonedRoot.querySelectorAll("svg");

  originalSvgs.forEach((originalSvg, svgIndex) => {
    const clonedSvg = clonedSvgs[svgIndex];
    if (!clonedSvg) return;

    const originalNodes = originalSvg.querySelectorAll<SVGElement>("*");
    const clonedNodes = clonedSvg.querySelectorAll<SVGElement>("*");

    originalNodes.forEach((originalNode, nodeIndex) => {
      const clonedNode = clonedNodes[nodeIndex];
      if (!clonedNode) return;

      const computed = window.getComputedStyle(originalNode);

      if (computed.fill && computed.fill !== "none") {
        clonedNode.setAttribute("fill", computed.fill);
      }

      if (computed.stroke && computed.stroke !== "none") {
        clonedNode.setAttribute("stroke", computed.stroke);
      }

      if (computed.opacity && computed.opacity !== "1") {
        clonedNode.setAttribute("opacity", computed.opacity);
      }
    });
  });
};

const applyCenteredExportWidth = (element: HTMLElement) => {
  element.style.width = "100%";
  element.style.maxWidth = `${EXPORT_CONTENT_MAX_WIDTH_PX}px`;
  element.style.marginLeft = "auto";
  element.style.marginRight = "auto";
};

const fixPerformanceAccordionForExport = (clonedRoot: HTMLElement) => {
  clonedRoot.querySelectorAll<HTMLElement>("[data-export-performance]").forEach((card) => {
    card.style.overflow = "visible";

    card.querySelectorAll<HTMLElement>("h4, span").forEach((text) => {
      text.style.whiteSpace = "normal";
      text.style.wordBreak = "break-word";
      text.style.overflow = "visible";
      text.style.textOverflow = "unset";
      text.style.width = "100%";
      text.style.maxWidth = "100%";
    });
  });
};

const fixHighlightTextForExport = (clonedRoot: HTMLElement) => {
  clonedRoot.querySelectorAll<HTMLElement>("[data-export-highlight]").forEach((card) => {
    card.style.overflow = "visible";
    card.style.height = "auto";

    card.querySelectorAll<HTMLElement>("span").forEach((text) => {
      text.style.whiteSpace = "normal";
      text.style.wordBreak = "break-word";
      text.style.overflow = "visible";
      text.style.textOverflow = "unset";
    });
  });
};

const fixRechartsForExport = (originalRoot: HTMLElement, clonedRoot: HTMLElement) => {
  const originalContainers = originalRoot.querySelectorAll<HTMLElement>(".recharts-responsive-container");
  const clonedContainers = clonedRoot.querySelectorAll<HTMLElement>(".recharts-responsive-container");
  const originalSurfaces = originalRoot.querySelectorAll<SVGSVGElement>("svg.recharts-surface");
  const clonedSurfaces = clonedRoot.querySelectorAll<SVGSVGElement>("svg.recharts-surface");

  originalContainers.forEach((original, index) => {
    const cloned = clonedContainers[index];
    if (!cloned) return;

    const { width, height } = original.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;

    cloned.style.width = `${Math.round(width)}px`;
    cloned.style.height = `${Math.round(height)}px`;
    cloned.style.minHeight = `${Math.round(height)}px`;

    const originalParent = original.parentElement;
    const clonedParent = cloned.parentElement;
    if (!originalParent || !clonedParent) return;

    const parentRect = originalParent.getBoundingClientRect();
    if (parentRect.height > 0) {
      clonedParent.style.height = `${Math.round(parentRect.height)}px`;
      clonedParent.style.minHeight = `${Math.round(parentRect.height)}px`;
    }

    if (parentRect.width > 0) {
      clonedParent.style.width = `${Math.round(parentRect.width)}px`;
    }
  });

  originalSurfaces.forEach((originalSvg, index) => {
    const clonedSvg = clonedSurfaces[index];
    if (!clonedSvg) return;

    const width = originalSvg.getAttribute("width") ?? String(originalSvg.getBoundingClientRect().width);
    const height = originalSvg.getAttribute("height") ?? String(originalSvg.getBoundingClientRect().height);

    if (!width || !height) return;

    clonedSvg.setAttribute("width", width);
    clonedSvg.setAttribute("height", height);
    clonedSvg.style.width = width.includes("%") ? width : `${width}px`;
    clonedSvg.style.height = height.includes("%") ? height : `${height}px`;
  });
};

const prepareCloneForExport = (originalElement: HTMLElement, clonedElement: HTMLElement) => {
  clonedElement.style.width = `${EXPORT_WIDTH_PX}px`;
  clonedElement.style.maxWidth = `${EXPORT_WIDTH_PX}px`;
  clonedElement.style.margin = "0 auto";
  clonedElement.style.display = "flex";
  clonedElement.style.flexDirection = "column";
  clonedElement.style.alignItems = "center";
  clonedElement.style.boxSizing = "border-box";
  clonedElement.style.background = "#ffffff";

  clonedElement.querySelectorAll<HTMLElement>("[data-export-grid]").forEach((grid) => {
    grid.style.display = "flex";
    grid.style.flexDirection = "column";
    grid.style.alignItems = "center";
    grid.style.gap = "24px";
    applyCenteredExportWidth(grid);

    grid.querySelectorAll<HTMLElement>(":scope > *").forEach((child) => {
      child.style.width = "100%";
    });
  });

  Array.from(clonedElement.children).forEach((child) => {
    if (!(child instanceof HTMLElement)) return;
    if (child.hasAttribute("data-export-grid") || child.hasAttribute("data-export-ignore")) return;
    applyCenteredExportWidth(child);
  });

  clonedElement.querySelectorAll<HTMLElement>("[data-export-ignore]").forEach((element) => {
    element.remove();
  });

  clonedElement.querySelectorAll<HTMLElement>("[data-export-student-name]").forEach((name) => {
    name.style.whiteSpace = "normal";
    name.style.wordBreak = "break-word";
    name.style.overflow = "visible";
    name.style.textOverflow = "unset";
    name.style.paddingLeft = "24px";
    name.style.paddingRight = "24px";
    name.style.lineHeight = "1.5";
  });

  inlineSvgStyles(originalElement, clonedElement);
  fixHighlightTextForExport(clonedElement);
  fixPerformanceAccordionForExport(clonedElement);
  fixRechartsForExport(originalElement, clonedElement);
};

const captureSection = async (section: HTMLElement): Promise<HTMLCanvasElement> => {
  const canvas = await html2canvas(section, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    width: EXPORT_WIDTH_PX,
    windowWidth: EXPORT_WIDTH_PX,
    scrollX: 0,
    scrollY: 0,
    onclone: (_clonedDoc, clonedElement) => {
      prepareCloneForExport(section, clonedElement);
    },
  });

  return canvas;
};

const addCanvasToPdf = (pdf: jsPDF, canvas: HTMLCanvasElement, cursor: IPdfCursor) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PDF_MARGIN_MM * 2;
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentHeight = pageHeight - PDF_MARGIN_MM * 2;
  const sliceHeightPx = (contentHeight * canvas.width) / contentWidth;

  let sourceY = 0;

  while (sourceY < canvas.height) {
    const currentSliceHeight = Math.min(sliceHeightPx, canvas.height - sourceY);
    const imageHeightMm = (currentSliceHeight * contentWidth) / canvas.width;

    ensureSpace(pdf, cursor, imageHeightMm);

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = currentSliceHeight;

    const context = pageCanvas.getContext("2d");
    if (!context) break;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    context.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      currentSliceHeight,
      0,
      0,
      canvas.width,
      currentSliceHeight
    );

    const imageData = pageCanvas.toDataURL("image/png");
    pdf.addImage(imageData, "PNG", PDF_MARGIN_MM, cursor.y, contentWidth, imageHeightMm);

    cursor.y += imageHeightMm + 4;
    sourceY += currentSliceHeight;
  }
};

export const sanitizePdfFilename = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "aluno";

export async function exportDevelopmentReportPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const sections = Array.from(element.querySelectorAll<HTMLElement>("[data-export-section]"));

  if (sections.length <= 0) {
    const canvas = await captureSection(element);
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    addCanvasToPdf(pdf, canvas, { y: PDF_MARGIN_MM, pageIndex: 0 });
    pdf.save(filename);
    return;
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const cursor: IPdfCursor = { y: PDF_MARGIN_MM, pageIndex: 0 };

  for (const section of sections) {
    const needsPageBreak = section.hasAttribute("data-export-page-break-before");

    if (needsPageBreak) {
      forceNewPage(pdf, cursor);
    }

    const canvas = await captureSection(section);
    addCanvasToPdf(pdf, canvas, cursor);
  }

  pdf.save(filename);
}
