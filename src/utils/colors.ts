import { getPaletteColors } from '@/constants';

// Obtiene los colores efectivos a usar en un gráfico
// Si hay customColors definidos, los usa; de lo contrario usa la paleta activa
export function getEffectiveColors(palette: string, customColors: string[]): string[] {
  if (customColors.length > 0) return customColors;
  return getPaletteColors(palette);
}

// Genera una versión semitransparente de un color HEX
export function hexWithOpacity(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Genera un color aleatorio en formato HEX
export function randomHexColor(): string {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`;
}

// Verifica si un string es un color HEX válido
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

// Convierte HEX a RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Determina si un color es oscuro (para elegir texto blanco o negro encima)
export function isColorDark(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  // Fórmula de luminancia relativa
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.5;
}
