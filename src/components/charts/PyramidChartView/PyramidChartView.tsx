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
 * Los labels siempre muestran el valor absoluto.
 */
function PyramidChartView({ data, config, style, colors }: BaseChartProps) {
  // Construir datos para Recharts: la primera serie usa valores negativos
  const chartData = useMemo(() => {
    const leftSeries = data.series[0];
    const rightSeries = data.series[1];

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
  }, [data]);

  // Calcular el dominio simétrico del eje X
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

  const leftSeries = data.series[0];
  const rightSeries = data.series[1];
  const leftColor = leftSeries?.color ?? colors[0];
  const rightColor = rightSeries?.color ?? colors[1 % colors.length];

  // Formateador para el eje X: muestra valores absolutos con sufijo %
  const formatTick = useCallback((value: number) => {
    const abs = Math.abs(value);
    return abs % 1 === 0 ? `${abs}%` : `${abs.toFixed(1)}%`;
  }, []);

  // Formateador del tooltip: muestra valores absolutos
  const formatTooltipValue = useCallback((value: number | string | undefined) => {
    const num = typeof value === 'number' ? value : Number(value ?? 0);
    return `${Math.abs(num).toFixed(1)}%`;
  }, []);

  // Label personalizado que muestra el valor absoluto
  const renderLabel = useCallback(
    (props: Record<string, unknown>) => {
      const { x, y, width, height, value } = props as {
        x: number;
        y: number;
        width: number;
        height: number;
        value: number;
      };
      const abs = Math.abs(value);
      if (abs === 0) return null;
      const isLeft = value < 0;
      const labelX = isLeft ? x - 4 : x + width + 4;
      return (
        <text
          x={labelX}
          y={y + height / 2}
          textAnchor={isLeft ? 'end' : 'start'}
          dominantBaseline="central"
          fill={style.labelColor}
          fontSize={style.labelFontSize - 1}
          fontFamily={style.fontFamily}
        >
          {abs % 1 === 0 ? `${abs}%` : `${abs.toFixed(1)}%`}
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
        margin={{ top: 20, right: 40, bottom: 20, left: 10 }}
        barCategoryGap="12%"
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
            formatter={formatTooltipValue}
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
            radius={[style.borderRadius, 0, 0, style.borderRadius]}
            isAnimationActive={config.animationEnabled}
            maxBarSize={28}
          >
            {style.showDataLabels && (
              <LabelList content={renderLabel} />
            )}
          </Bar>
        )}
        {rightSeries && (
          <Bar
            dataKey={rightSeries.name}
            fill={rightColor}
            radius={[0, style.borderRadius, style.borderRadius, 0]}
            isAnimationActive={config.animationEnabled}
            maxBarSize={28}
          >
            {style.showDataLabels && (
              <LabelList content={renderLabel} />
            )}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default memo(PyramidChartView);
