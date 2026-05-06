import type { Metadata } from 'next';
import {
  Inter,
  JetBrains_Mono,
  Roboto,
  Open_Sans,
  Montserrat,
  Poppins,
  Lato,
  Nunito,
  DM_Sans,
  IBM_Plex_Sans,
  Source_Sans_3,
  Noto_Sans,
} from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Fuentes disponibles para los gráficos (deben coincidir con CHART_FONTS)
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChartForge — Generador de Gráficos Estadísticos',
  description:
    'Crea gráficos estadísticos profesionales en segundos. Barras, líneas, tortas, anillos y más. Configura colores, fuentes, tamaños y exporta como PNG, SVG o PDF listo para presentaciones.',
  keywords: ['gráficos', 'estadísticas', 'charts', 'generador', 'barras', 'líneas', 'torta', 'anillo', 'radar'],
  authors: [{ name: 'ChartForge' }],
  openGraph: {
    title: 'ChartForge — Generador de Gráficos Estadísticos',
    description: 'Crea gráficos profesionales y exporta en segundos.',
    type: 'website',
    locale: 'es_ES',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={[
        inter.variable,
        jetbrainsMono.variable,
        roboto.variable,
        openSans.variable,
        montserrat.variable,
        poppins.variable,
        lato.variable,
        nunito.variable,
        dmSans.variable,
        ibmPlexSans.variable,
        sourceSans3.variable,
        notoSans.variable,
      ].join(' ')}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
