export type ExportFormat = 'png' | 'svg' | 'pdf';
export type PdfOrientation = 'portrait' | 'landscape';
export type PngScale = 1 | 2 | 3;

export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  // PNG options
  scale: PngScale;
  transparent: boolean;
  // PDF options
  pdfOrientation: PdfOrientation;
  includeTitle: boolean;
}
