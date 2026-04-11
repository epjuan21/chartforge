'use client';

import { memo, useMemo, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from 'recharts';
import type { BaseChartProps } from '../shared';
import { tooltipStyle } from '../shared';

/**
 * Pirámide poblacional: barras horizontales opuestas.
 * Serie 0 (ej. Hombre) se muestra hacia la izquierda (valores negativos internos).
 * Serie 1 (ej. Mujer) se muestra hacia la derecha (valores positivos).
 * Se usa barGap negativo para superponer ambas barras en la misma fila.
 */
function PyramidChartView({ data, config, style, colors }: BaseChartProps) {
  const leftSeries = data.series[0];
  const rightSeries = data.series[1];
  const leftColor = leftSeries?.color ?? colors[0];
  const rightColor = rightSeries?.color ?? colors[1 % colors.length];
  const barSize = style.barThickness ?? 20;

  // Construir datos: serie izquierda con valores negativos, derecha positivos
  const chartData = useMemo(() => {
    return data.categories.map((cat, ci) => {
      const point: Record<string, string | number> = { category: cat };
      if (leftSeries) {
        point[leftSeries.name] = -(data.values[0]?.[ci] ?? 0);
      }
      if (rightSeries) {
        point[rightSeries.name] = data.values[1]?.[ci] ?? 0;
      }
      return point;
    });
  }, [data, leftSeries, rightSeries]);

  // Dominio simétrico del eje X
  const maxValue = useMemo(() => {
    let max = 0;
    for (let si = 0; si < data.values.length; si++) {
      for (let ci = 0; ci < data.values[si].length; ci++) {
        if (data.values[si][ci] > max) max = data.values[si][ci];
      }
    }
    return Math.ceil(max * 1.15 * 10) / 10;
  }, [data.values]);

  const commonAxisStyle = {
    fill: style.axisColor,
    fontSize: style.axisFontSize,
    fontFamily: style.fontFamily,
  };

  // Eje X: valores absolutos sin sufijo %
  const formatTick = useCallback((value: number) => {
    const abs = Math.abs(value);
    return abs % 1 === 0 ? `${abs}` : `${abs.toFixed(1)}`;
  }, []);

  // Tooltip: valores absolutos
  const formatTooltipValue = useCallback(
    (value: unknown) => {
      const num = typeof value === 'number' ? value : Number(value ?? 0);
      return `${Math.abs(num)}`;
    },
    [],
  );

  // Label para la serie izquierda (valores negativos)
  const renderLeftLabel = useCallback(
    (props: { x?: number; y?: number; width?: number; height?: number; value?: number | string; [k: string]: unknown }) => {
      const x = Number(props.x ?? 0);
      const y = Number(props.y ?? 0);
      const width = Number(props.width ?? 0);
      const height = Number(props.height ?? 0);
      const value = Number(props.value ?? 0);
      const abs = Math.abs(value);
      if (abs === 0) return null;
      // Para barras negativas: x es el inicio (lado derecho en 0), width es negativo
      // La punta izquierda está en x + width
      const tipX = x + width - 4;
      return (
        <text
          x={tipX}
          y={y + height / 2}
          textAnchor="end"
          dominantBaseline="central"
          fill={style.labelColor}
          fontSize={style.labelFontSize - 1}
          fontFamily={style.fontFamily}
        >
          {abs % 1 === 0 ? abs : abs.toFixed(1)}
        </text>
      );
    },
    [style.labelColor, style.labelFontSize, style.fontFamily],
  );

  // Label para la serie derecha (valores positivos)
  const renderRightLabel = useCallback(
    (props: { x?: number; y?: number; width?: number; height?: number; value?: number | string; [k: string]: unknown }) => {
      const x = Number(props.x ?? 0);
      const y = Number(props.y ?? 0);
      const width = Number(props.width ?? 0);
      const height = Number(props.height ?? 0);
      const value = Number(props.value ?? 0);
      const abs = Math.abs(value);
      if (abs === 0) return null;
      const tipX = x + width + 4;
      return (
        <text
          x={tipX}
          y={y + height / 2}
          textAnchor="start"
          dominantBaseline="central"
          fill={style.labelColor}
          fontSize={style.labelFontSize - 1}
          fontFamily={style.fontFamily}
        >
          {abs % 1 === 0 ? abs : abs.toFixed(1)}
        </text>
      );
    },
    [style.labelColor, style.labelFontSize, style.fontFamily],
  );

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 50, bottom: 20, left: 10 }}
        barSize={barSize}
        barGap={-barSize}
        barCategoryGap="8%"
      >
        {config.showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={style.gridColor}
            horizontal={false}
          />
        )}
        <XAxis
          type="number"
          domain={[-maxValue, maxValue]}
          tick={commonAxisStyle}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatTick}
        />
        <YAxis
          type="category"
          dataKey="category"
          tick={commonAxisStyle}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <ReferenceLine x={0} stroke={style.axisColor} strokeWidth={1} />
        {config.showTooltip && (
          <Tooltip
            contentStyle={tooltipStyle(style)}
            cursor={{ fill: 'rgba(128,128,128,0.06)' }}
            formatter={formatTooltipValue as never}
          />
        )}
        {config.showLegend && (
          <Legend
            verticalAlign={
              config.legendPosition === 'top' || config.legendPosition === 'bottom'
                ? config.legendPosition
                : 'bottom'
            }
            align={
              config.legendPosition === 'left' || config.legendPosition === 'right'
                ? config.legendPosition
                : 'center'
            }
            wrapperStyle={{
              fontFamily: style.fontFamily,
              fontSize: style.labelFontSize,
              color: style.labelColor,
            }}
          />
        )}
        {leftSeries && (
          <Bar
            dataKey={leftSeries.name}
            fill={leftColor}
            radius={[0, style.borderRadius, style.borderRadius, 0]}
            isAnimationActive={config.animationEnabled}
          >
            {style.showDataLabels && (
              <LabelList content={renderLeftLabel as never} />
            )}
          </Bar>
        )}
        {rightSeries && (
          <Bar
            dataKey={rightSeries.name}
            fill={rightColor}
            radius={[0, style.borderRadius, style.borderRadius, 0]}
            isAnimationActive={config.animationEnabled}
          >
            {style.showDataLabels && (
              <LabelList content={renderRightLabel as never} />
            )}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default memo(PyramidChartView);
