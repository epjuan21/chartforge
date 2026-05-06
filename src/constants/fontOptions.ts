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
    value: 'var(--font-inter), Inter, sans-serif',
    googleFont: 'Inter',
  },
  {
    id: 'roboto',
    label: 'Roboto',
    value: 'var(--font-roboto), Roboto, sans-serif',
    googleFont: 'Roboto',
  },
  {
    id: 'open-sans',
    label: 'Open Sans',
    value: 'var(--font-open-sans), "Open Sans", sans-serif',
    googleFont: 'Open Sans',
  },
  {
    id: 'montserrat',
    label: 'Montserrat',
    value: 'var(--font-montserrat), Montserrat, sans-serif',
    googleFont: 'Montserrat',
  },
  {
    id: 'poppins',
    label: 'Poppins',
    value: 'var(--font-poppins), Poppins, sans-serif',
    googleFont: 'Poppins',
  },
  {
    id: 'lato',
    label: 'Lato',
    value: 'var(--font-lato), Lato, sans-serif',
    googleFont: 'Lato',
  },
  {
    id: 'nunito',
    label: 'Nunito',
    value: 'var(--font-nunito), Nunito, sans-serif',
    googleFont: 'Nunito',
  },
  {
    id: 'dm-sans',
    label: 'DM Sans',
    value: 'var(--font-dm-sans), "DM Sans", sans-serif',
    googleFont: 'DM Sans',
  },
  {
    id: 'ibm-plex-sans',
    label: 'IBM Plex Sans',
    value: 'var(--font-ibm-plex-sans), "IBM Plex Sans", sans-serif',
    googleFont: 'IBM Plex Sans',
  },
  {
    id: 'source-sans-3',
    label: 'Source Sans 3',
    value: 'var(--font-source-sans-3), "Source Sans 3", sans-serif',
    googleFont: 'Source Sans 3',
  },
  {
    id: 'noto-sans',
    label: 'Noto Sans',
    value: 'var(--font-noto-sans), "Noto Sans", sans-serif',
    googleFont: 'Noto Sans',
  },
  {
    id: 'system',
    label: 'Sistema',
    value: 'system-ui, -apple-system, sans-serif',
  },
];
