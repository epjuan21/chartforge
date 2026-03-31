export interface FontOption {
  id: string;
  label: string;
  value: string; // CSS font-family value
  googleFont?: string; // Nombre para importar de Google Fonts
}

export const CHART_FONTS: FontOption[] = [
  {
    id: 'inter',
    label: 'Inter',
    value: 'Inter, sans-serif',
    googleFont: 'Inter',
  },
  {
    id: 'roboto',
    label: 'Roboto',
    value: 'Roboto, sans-serif',
    googleFont: 'Roboto',
  },
  {
    id: 'open-sans',
    label: 'Open Sans',
    value: '"Open Sans", sans-serif',
    googleFont: 'Open Sans',
  },
  {
    id: 'montserrat',
    label: 'Montserrat',
    value: 'Montserrat, sans-serif',
    googleFont: 'Montserrat',
  },
  {
    id: 'poppins',
    label: 'Poppins',
    value: 'Poppins, sans-serif',
    googleFont: 'Poppins',
  },
  {
    id: 'lato',
    label: 'Lato',
    value: 'Lato, sans-serif',
    googleFont: 'Lato',
  },
  {
    id: 'nunito',
    label: 'Nunito',
    value: 'Nunito, sans-serif',
    googleFont: 'Nunito',
  },
  {
    id: 'system',
    label: 'Sistema',
    value: 'system-ui, -apple-system, sans-serif',
  },
];
