'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Moon, Sun } from 'lucide-react';
import type { ChartConfig, ChartStyle } from '@/types';
import Input from '@/components/ui/Input';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Toggle from '@/components/ui/Toggle';
import Slider from '@/components/ui/Slider';
import ColorPicker from '@/components/ui/ColorPicker';
import { COLOR_PALETTES, CHART_FONTS } from '@/constants';
import { LIGHT_CHART_STYLE, DARK_CHART_STYLE } from '@/utils/defaults';
import styles from './StyleConfig.module.css';

interface StyleConfigProps {
  config: ChartConfig;
  style: ChartStyle;
  onUpdateConfig: (partial: Partial<ChartConfig>) => void;
  onUpdateStyle: (partial: Partial<ChartStyle>) => void;
  onSetPalette: (id: string) => void;
}

const LEGEND_POSITIONS = [
  { value: 'top', label: 'Arriba' },
  { value: 'bottom', label: 'Abajo' },
  { value: 'left', label: 'Izquierda' },
  { value: 'right', label: 'Derecha' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.section}>
      <button type="button" className={styles.sectionToggle} onClick={() => setOpen((v) => !v)}>
        <span className={styles.sectionTitle}>{title}</span>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

export default function StyleConfig({
  config,
  style,
  onUpdateConfig,
  onUpdateStyle,
  onSetPalette,
}: StyleConfigProps) {
  return (
    <div className={styles.panel}>
      {/* General */}
      <Section title="General">
        <Input
          label="Título"
          value={config.title}
          onChange={(v) => onUpdateConfig({ title: v })}
          placeholder="Título del gráfico"
        />
        <Input
          label="Subtítulo"
          value={config.subtitle}
          onChange={(v) => onUpdateConfig({ subtitle: v })}
          placeholder="Subtítulo opcional"
        />
        <div className={styles.row}>
          <NumberInput
            label="Ancho (px)"
            value={config.width}
            onChange={(v) => onUpdateConfig({ width: v })}
            min={300}
            max={2000}
            step={50}
          />
          <NumberInput
            label="Alto (px)"
            value={config.height}
            onChange={(v) => onUpdateConfig({ height: v })}
            min={200}
            max={1500}
            step={50}
          />
        </div>
      </Section>

      {/* Paleta */}
      <Section title="Paleta de colores">
        <div className={styles.paletteGrid}>
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.id}
              type="button"
              className={[
                styles.paletteCard,
                style.palette === palette.id ? styles.paletteActive : '',
              ].join(' ')}
              onClick={() => onSetPalette(palette.id)}
            >
              <div className={styles.paletteSwatches}>
                {palette.colors.slice(0, 5).map((c, i) => (
                  <div key={i} className={styles.paletteSwatch} style={{ background: c }} />
                ))}
              </div>
              <span className={styles.paletteName}>{palette.label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Tipografía */}
      <Section title="Tipografía">
        <Select
          label="Fuente"
          options={CHART_FONTS.map((f) => ({ value: f.value, label: f.label }))}
          value={style.fontFamily}
          onChange={(v) => onUpdateStyle({ fontFamily: v })}
        />
        <Slider
          label="Tamaño título"
          value={style.titleFontSize}
          onChange={(v) => onUpdateStyle({ titleFontSize: v })}
          min={12}
          max={48}
          unit="px"
        />
        <Slider
          label="Tamaño labels"
          value={style.labelFontSize}
          onChange={(v) => onUpdateStyle({ labelFontSize: v })}
          min={8}
          max={24}
          unit="px"
        />
        <Slider
          label="Tamaño ejes"
          value={style.axisFontSize}
          onChange={(v) => onUpdateStyle({ axisFontSize: v })}
          min={8}
          max={20}
          unit="px"
        />
      </Section>

      {/* Colores */}
      <Section title="Colores">
        {/* Presets rápidos del gráfico */}
        <div className={styles.presetRow}>
          <button
            type="button"
            className={[
              styles.presetBtn,
              style.backgroundColor === '#1a1a2e' ? styles.presetActive : '',
            ].join(' ')}
            onClick={() => onUpdateStyle(DARK_CHART_STYLE)}
          >
            <Moon size={13} />
            <span>Oscuro</span>
          </button>
          <button
            type="button"
            className={[
              styles.presetBtn,
              style.backgroundColor === '#ffffff' ? styles.presetActive : '',
            ].join(' ')}
            onClick={() => onUpdateStyle(LIGHT_CHART_STYLE)}
          >
            <Sun size={13} />
            <span>Claro</span>
          </button>
        </div>
        <ColorPicker
          label="Fondo"
          color={style.backgroundColor}
          onChange={(c) => onUpdateStyle({ backgroundColor: c })}
        />
        <ColorPicker
          label="Color título"
          color={style.titleColor}
          onChange={(c) => onUpdateStyle({ titleColor: c })}
        />
        <ColorPicker
          label="Color labels"
          color={style.labelColor}
          onChange={(c) => onUpdateStyle({ labelColor: c })}
        />
        <ColorPicker
          label="Color ejes"
          color={style.axisColor}
          onChange={(c) => onUpdateStyle({ axisColor: c })}
        />
        <ColorPicker
          label="Color grilla"
          color={style.gridColor}
          onChange={(c) => onUpdateStyle({ gridColor: c })}
        />
      </Section>

      {/* Leyenda */}
      <Section title="Leyenda">
        <Toggle
          label="Mostrar leyenda"
          checked={config.showLegend}
          onChange={(v) => onUpdateConfig({ showLegend: v })}
        />
        {config.showLegend && (
          <Select
            label="Posición"
            options={LEGEND_POSITIONS}
            value={config.legendPosition}
            onChange={(v) => onUpdateConfig({ legendPosition: v as ChartConfig['legendPosition'] })}
          />
        )}
      </Section>

      {/* Opciones */}
      <Section title="Opciones">
        <Toggle
          label="Mostrar grilla"
          checked={config.showGrid}
          onChange={(v) => onUpdateConfig({ showGrid: v })}
        />
        <Toggle
          label="Mostrar tooltips"
          checked={config.showTooltip}
          onChange={(v) => onUpdateConfig({ showTooltip: v })}
        />
        <Toggle
          label="Animaciones"
          checked={config.animationEnabled}
          onChange={(v) => onUpdateConfig({ animationEnabled: v })}
        />
        <Toggle
          label="Mostrar valores"
          checked={style.showDataLabels}
          onChange={(v) => onUpdateStyle({ showDataLabels: v })}
        />
      </Section>

      {/* Forma */}
      <Section title="Forma">
        <Slider
          label="Radio de borde (barras)"
          value={style.borderRadius}
          onChange={(v) => onUpdateStyle({ borderRadius: v })}
          min={0}
          max={20}
          unit="px"
        />
        <Slider
          label="Grosor de línea"
          value={style.lineWidth}
          onChange={(v) => onUpdateStyle({ lineWidth: v })}
          min={1}
          max={8}
          unit="px"
        />
        <Slider
          label="Tamaño de puntos"
          value={style.dotSize}
          onChange={(v) => onUpdateStyle({ dotSize: v })}
          min={0}
          max={12}
          unit="px"
        />
        <Slider
          label="Opacidad de relleno"
          value={Math.round(style.opacity * 100)}
          onChange={(v) => onUpdateStyle({ opacity: v / 100 })}
          min={10}
          max={100}
          unit="%"
        />
      </Section>
    </div>
  );
}
