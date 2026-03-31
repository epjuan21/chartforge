import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
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
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
