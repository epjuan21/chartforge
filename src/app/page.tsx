import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Radar,
  Download,
  Palette,
  Zap,
} from 'lucide-react';
import LandingHeader from './LandingHeader';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <LandingHeader />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <Zap size={13} />
          Sin registro · Sin límites · 100% gratuito
        </div>
        <h1 className={styles.heroTitle}>
          Crea gráficos
          <br />
          <span className={styles.heroAccent}>profesionales</span>
          <br />
          en segundos
        </h1>
        <p className={styles.heroSub}>
          Barras, líneas, tortas, radares y más. Personaliza colores, fuentes y estilos.
          Exporta como PNG, SVG o PDF listo para usar.
        </p>
        <div className={styles.heroActions}>
          <Link href="/editor" className={styles.btnPrimary}>
            <Zap size={16} />
            Comenzar a crear
          </Link>
        </div>
        <div className={styles.heroGlow} />
      </section>

      {/* ── Gallery ── */}
      <section className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {GALLERY_ITEMS.map((item) => (
            <div key={item.label} className={styles.galleryCard}>
              <div className={styles.galleryIcon}>{item.icon}</div>
              <span className={styles.galleryLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>Todo lo que necesitas</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>¿Listo para crear tu primer gráfico?</h2>
        <Link href="/editor" className={styles.btnPrimary}>
          <Zap size={16} />
          Abrir el editor
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <BarChart3 size={16} />
          <span>ChartForge</span>
        </div>
        <p className={styles.footerText}>Generador de gráficos estadísticos profesionales</p>
      </footer>
    </div>
  );
}

const GALLERY_ITEMS = [
  { label: 'Barras', icon: <BarChart3 size={32} /> },
  { label: 'Líneas', icon: <TrendingUp size={32} /> },
  { label: 'Torta', icon: <PieChart size={32} /> },
  { label: 'Radar', icon: <Radar size={32} /> },
];

const FEATURES = [
  {
    icon: <BarChart3 size={24} />,
    title: '10+ tipos de gráfico',
    desc: 'Barras, líneas, área, torta, anillo, radar, mixto y más. Cada tipo optimizado para sus datos.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Personalización total',
    desc: 'Paletas prediseñadas o colores propios. Fuentes, tamaños, bordes y opacidad a tu medida.',
  },
  {
    icon: <Download size={24} />,
    title: 'Exporta sin límites',
    desc: 'Descarga en PNG de alta resolución, SVG vectorial o PDF listo para presentaciones.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Vista previa en vivo',
    desc: 'Cada cambio se refleja al instante. Sin recargas, sin demoras, sin fricción.',
  },
];
