'use client';

import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  /** Variante compacta (solo ícono) o con label */
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeContext();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggleTheme}
      aria-label={isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
      title={isLight ? 'Tema oscuro' : 'Tema claro'}
    >
      <span className={styles.icon}>
        {isLight ? <Moon size={15} /> : <Sun size={15} />}
      </span>
      {!compact && (
        <span className={styles.label}>{isLight ? 'Oscuro' : 'Claro'}</span>
      )}
    </button>
  );
}
