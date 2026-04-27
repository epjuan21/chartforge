'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, ChevronLeft, RefreshCw } from 'lucide-react';
import { useEditorStateListener } from '@/hooks';
import { ChartRenderer } from '@/components/charts';
import { ThemeToggle } from '@/components/ui';
import type { EditorState } from '@/hooks';
import {
  DEFAULT_CHART_CONFIG,
  DEFAULT_CHART_STYLE,
  DEFAULT_CHART_DATA,
  DEFAULT_TABLE_DATA,
} from '@/utils/defaults';
import { getPaletteColors } from '@/constants';
import styles from './preview.module.css';

const FALLBACK: EditorState = {
  data: DEFAULT_CHART_DATA['bar'],
  config: DEFAULT_CHART_CONFIG,
  style: DEFAULT_CHART_STYLE,
  colors: getPaletteColors('vibrant'),
  tableData: DEFAULT_TABLE_DATA,
};

export default function PreviewClient() {
  const [state, setState] = useState<EditorState>(FALLBACK);

  useEditorStateListener((newState) => setState(newState));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/editor" className={styles.backBtn}>
          <ChevronLeft size={16} />
          Volver al editor
        </Link>
        <div className={styles.headerLogo}>
          <BarChart3 size={16} />
          <span>ChartForge — Vista Previa</span>
        </div>
        <span className={styles.syncBadge}>
          <RefreshCw size={11} />
          Sincronizado en vivo
        </span>
        <ThemeToggle compact />
      </header>

      <main className={styles.canvas}>
        <div className={styles.chartWrapper}>
          <ChartRenderer
            data={state.data}
            config={state.config}
            style={state.style}
            colors={state.colors}
            tableData={state.tableData}
          />
        </div>
      </main>
    </div>
  );
}
