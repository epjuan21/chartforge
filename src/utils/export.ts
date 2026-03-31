import type { ExportOptions } from '@/types';

export async function exportToPng(
  element: HTMLElement,
  options: Pick<ExportOptions, 'filename' | 'scale' | 'transparent'>,
): Promise<void> {
  const { toPng } = await import('html-to-image');
  const computedBg = options.transparent
    ? undefined
    : (getComputedStyle(element).backgroundColor || undefined);
  const dataUrl = await toPng(element, {
    pixelRatio: options.scale,
    backgroundColor: computedBg,
    quality: 1.0,
    skipFonts: false,
  });
  triggerDownload(dataUrl, `${options.filename}.png`);
}

export async function exportToSvg(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const { toSvg } = await import('html-to-image');
  const dataUrl = await toSvg(element, { skipFonts: false });
  triggerDownload(dataUrl, `${filename}.svg`);
}

export async function exportToPdf(
  element: HTMLElement,
  options: Pick<ExportOptions, 'filename' | 'pdfOrientation' | 'includeTitle'>,
  title: string,
): Promise<void> {
  const { toPng } = await import('html-to-image');
  const { default: jsPDF } = await import('jspdf');

  const imgData = await toPng(element, { pixelRatio: 3, quality: 1.0 });

  const pdf = new jsPDF({
    orientation: options.pdfOrientation,
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 15;
  const titleHeight = options.includeTitle && title ? 18 : 0;
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2 - titleHeight;

  // Calcular dimensiones manteniendo el aspect ratio
  const img = new Image();
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.src = imgData;
  });

  const ratio = img.naturalWidth / img.naturalHeight;
  let imgWidth = availableWidth;
  let imgHeight = imgWidth / ratio;

  if (imgHeight > availableHeight) {
    imgHeight = availableHeight;
    imgWidth = imgHeight * ratio;
  }

  const x = margin + (availableWidth - imgWidth) / 2;
  const y = margin + titleHeight;

  if (options.includeTitle && title) {
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text(title, pageWidth / 2, margin + 10, { align: 'center' });
  }

  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  pdf.save(`${options.filename}.pdf`);
}

export async function copyToClipboard(
  element: HTMLElement,
  scale: number = 2,
): Promise<void> {
  if (!navigator.clipboard?.write) {
    throw new Error('Tu navegador no soporta copiar imágenes al portapapeles.');
  }

  const { toPng } = await import('html-to-image');
  const computedBg = getComputedStyle(element).backgroundColor || undefined;
  const dataUrl = await toPng(element, {
    pixelRatio: scale,
    backgroundColor: computedBg,
    quality: 1.0,
    skipFonts: false,
  });

  const res = await fetch(dataUrl);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
}

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
