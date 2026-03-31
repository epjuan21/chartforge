'use client';

import Link from 'next/link';
import { BarChart3, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import styles from './page.module.css';

export default function LandingHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <BarChart3 size={22} />
        <span>ChartForge</span>
      </div>
      <nav className={styles.headerNav}>
        <Link href="/editor" className={styles.navLink}>
          Editor
        </Link>
        <ThemeToggle />
      </nav>
      <Link href="/editor" className={styles.headerCta}>
        Crear gráfico
        <ArrowRight size={15} />
      </Link>
    </header>
  );
}
