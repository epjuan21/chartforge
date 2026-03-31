export interface ColorPalette {
  id: string;
  label: string;
  colors: string[];
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'vibrant',
    label: 'Vibrante',
    colors: ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894', '#e17055', '#74b9ff', '#a29bfe'],
  },
  {
    id: 'corporate',
    label: 'Corporativa',
    colors: ['#0984e3', '#00b894', '#fdcb6e', '#e17055', '#6c5ce7', '#2d3436', '#636e72', '#b2bec3'],
  },
  {
    id: 'pastel',
    label: 'Pastel',
    colors: ['#a29bfe', '#74b9ff', '#fd79a8', '#ffeaa7', '#55efc4', '#dfe6e9', '#fab1a0', '#81ecec'],
  },
  {
    id: 'dark',
    label: 'Oscura',
    colors: ['#6c5ce7', '#00cec9', '#ff7675', '#fdcb6e', '#55efc4', '#fd79a8', '#74b9ff', '#e17055'],
  },
  {
    id: 'ocean',
    label: 'Océano',
    colors: ['#0066cc', '#0099ff', '#00ccff', '#33ddff', '#66eeff', '#99f5ff', '#003366', '#004d99'],
  },
  {
    id: 'forest',
    label: 'Bosque',
    colors: ['#1a5c2a', '#2d8a42', '#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#0d3318', '#3e7d44'],
  },
  {
    id: 'sunset',
    label: 'Atardecer',
    colors: ['#ff6b35', '#f7931e', '#ffd23f', '#ff4757', '#c44569', '#9b59b6', '#ff7f50', '#ffa07a'],
  },
  {
    id: 'monochrome',
    label: 'Monocromático',
    colors: ['#1a1a2e', '#2d2d44', '#4a4a6a', '#6b6b90', '#8c8cb0', '#adadcc', '#cecee8', '#f0f0f5'],
  },
];

// Función helper para obtener colores de una paleta por ID
export function getPaletteColors(paletteId: string): string[] {
  return COLOR_PALETTES.find((p) => p.id === paletteId)?.colors ?? COLOR_PALETTES[0].colors;
}
