'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Database,
  Palette,
  Download,
  Maximize2,
  BarChart2,
  BarChart4,
  LineChart,
  AreaChart,
  PieChart,
  CircleDot,
  Radar,
  Combine,
  Triangle,
} from 'lucide-react';
import { useChartData, useChartConfig, useChartStyle, saveEditorState, useExport } from '@/hooks';
import { ChartRenderer } from '@/components/charts';
import { DataInput, StyleConfig, ExportPanel } from '@/components/panels';
import { Tabs, ThemeToggle } from '@/components/ui';
import { CHART_TYPES } from '@/constants';
import type { ChartType, ExportOptions } from '@/types';
import styles from './editor.module.css';

const PANEL_TABS = [
  { id: 'data', label: 'Datos', icon: <Database size={14} /> },
  { id: 'style', label: 'Estilo', icon: <Palette size={14} /> },
  { id: 'export', label: 'Exportar', icon: <Download size={14} /> },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  bar: <BarChart3 size={15} />,
  'bar-horizontal': <BarChart3 size={15} style={{ transform: 'rotate(90deg)' }} />,
  'bar-stacked': <BarChart4 size={15} />,
  'bar-grouped': <BarChart2 size={15} />,
  line: <LineChart size={15} />,
  area: <AreaChart size={15} />,
  pie: <PieChart size={15} />,
  doughnut: <CircleDot size={15} />,
  radar: <Radar size={15} />,
  composed: <Combine size={15} />,
  pyramid: <Triangle size={15} />,
};

export default function EditorClient() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [panelTab, setPanelTab] = useState('data');

  const {
    data,
    loadExample,
    setCategory,
    addCategory,
    removeCategory,
    setSeries,
    addSeries,
    removeSeries,
    setValue,
  } = useChartData('bar');
  const { config, setType, update: updateConfig } = useChartConfig();
  const { style, activeColors, setPalette, update: updateStyle } = useChartStyle();
  const { isExporting, isCopying, error: exportError, runExport, runCopy } = useExport(chartRef);

  // Sincroniza estado con localStorage para que /preview lo pueda leer
  useEffect(() => {
    saveEditorState({ data, config, style, colors: activeColors });
  }, [data, config, style, activeColors]);

  function handleTypeChange(type: ChartType) {
    setType(type);
    loadExample(type);
  }

  function handleExport(options: ExportOptions) {
    runExport(options, config.title);
  }

  function handleQuickExport() {
    setPanelTab('export');
  }

  const activeType = CHART_TYPES.find((t) => t.id === config.type);

  return (
    <div className={styles.layout}>
      {/* ── Sidebar izquierdo: selector de tipo ── */}
      <aside className={styles.typeSidebar}>
        <Link href="/" className={styles.logo}>
          <BarChart3 size={18} />
          <span>ChartForge</span>
        </Link>
        <nav className={styles.typeList} aria-label="Tipo de gráfico">
          {CHART_TYPES.map((ct) => (
            <button
              key={ct.id}
              type="button"
              role="radio"
              aria-checked={config.type === ct.id}
              className={[styles.typeBtn, config.type === ct.id ? styles.typeBtnActive : ''].join(
                ' ',
              )}
              onClick={() => handleTypeChange(ct.id)}
              title={ct.description}
            >
              <span className={styles.typeBtnIcon}>{TYPE_ICONS[ct.id]}</span>
              <span className={styles.typeLabel}>{ct.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Canvas central ── */}
      <main className={styles.canvas}>
        {/* Barra superior del canvas */}
        <div className={styles.canvasHeader}>
          <span className={styles.canvasInfo}>
            {activeType?.label} · {config.width} × {config.height}px
          </span>
          <div className={styles.canvasActions}>
            <ThemeToggle />
            <Link
              href="/preview"
              className={styles.canvasBtn}
              title="Pantalla completa"
              target="_blank"
            >
              <Maximize2 size={15} />
              <span>Pantalla completa</span>
            </Link>
            <button
              type="button"
              className={styles.canvasBtnPrimary}
              title="Exportar gráfico"
              onClick={handleQuickExport}
            >
              <Download size={15} />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Área del gráfico */}
        <div className={styles.canvasBody}>
          <div className={styles.canvasInner}>
            <ChartRenderer
              data={data}
              config={config}
              style={style}
              colors={activeColors}
              chartRef={chartRef}
            />
          </div>
        </div>
      </main>

      {/* ── Panel derecho: configuración ── */}
      <aside className={styles.configPanel}>
        <div className={styles.configTabs}>
          <Tabs tabs={PANEL_TABS} activeTab={panelTab} onChange={setPanelTab} />
        </div>
        <div className={styles.panelContent}>
          {panelTab === 'data' && (
            <DataInput
              data={data}
              chartType={config.type}
              onSetCategory={setCategory}
              onAddCategory={addCategory}
              onRemoveCategory={removeCategory}
              onSetSeries={setSeries}
              onAddSeries={addSeries}
              onRemoveSeries={removeSeries}
              onSetValue={setValue}
              onLoadExample={loadExample}
            />
          )}
          {panelTab === 'style' && (
            <StyleConfig
              config={config}
              style={style}
              onUpdateConfig={updateConfig}
              onUpdateStyle={updateStyle}
              onSetPalette={setPalette}
            />
          )}
          {panelTab === 'export' && (
            <ExportPanel
              isExporting={isExporting}
              isCopying={isCopying}
              error={exportError}
              onExport={handleExport}
              onCopy={runCopy}
            />
          )}
        </div>
      </aside>
    </div>
  );
}
