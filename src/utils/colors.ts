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

// Convierte RGB (0-255) a HSL (h: 0-360, s/l: 0-100)
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

// Convierte HSL (h: 0-360, s/l: 0-100) a HEX
export function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const color = ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(color * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Convierte HEX a HSL
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// Genera una paleta monocromática a partir de un color base
// Crea `steps` variaciones distribuyendo la luminosidad en el rango [lMin, lMax]
export function generateMonochromePalette(
  baseHex: string,
  steps: number,
  lMin: number = 25,
  lMax: number = 80,
): string[] {
  const hsl = hexToHsl(baseHex);
  if (!hsl || steps < 1) return [];
  if (steps === 1) return [hslToHex(hsl.h, hsl.s, hsl.l)];
  const min = Math.max(0, Math.min(100, lMin));
  const max = Math.max(0, Math.min(100, lMax));
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const colors: string[] = [];
  // De más oscuro a más claro
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const l = lo + (hi - lo) * t;
    colors.push(hslToHex(hsl.h, hsl.s, l));
  }
  return colors;
}
