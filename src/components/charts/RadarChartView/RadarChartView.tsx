'use client';

import { memo, useMemo } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { BaseChartProps } from '../shared';
import { toRechartsData, tooltipStyle } from '../shared';
import { hexWithOpacity } from '@/utils/colors';

function RadarChartView({ data, config, style, colors }: BaseChartProps) {
  const chartData = useMemo(() => toRechartsData(data), [data]);

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid stroke={style.gridColor} />
        {config.showXAxis && (
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: style.axisColor,
              fontSize: style.axisFontSize,
              fontFamily: style.fontFamily,
              fontWeight: style.axisBold ? 700 : 400,
            }}
          />
        )}
        {config.showYAxis && (
          <PolarRadiusAxis tick={{ fill: style.axisColor, fontSize: style.axisFontSize, fontWeight: style.axisBold ? 700 : 400 }} />
        )}
        {config.showTooltip && (
          <Tooltip contentStyle={tooltipStyle(style)} />
        )}
        {config.showLegend && (
          <Legend
            wrapperStyle={{
              fontFamily: style.fontFamily,
              fontSize: style.labelFontSize,
              color: style.labelColor,
              fontWeight: style.labelBold ? 700 : 400,
            }}
          />
        )}
        {data.series.map((serie, index) => {
          const color = colors[index % colors.length];
          return (
            <Radar
              key={serie.id}
              name={serie.name}
              dataKey={serie.name}
              stroke={color}
              fill={hexWithOpacity(color, style.opacity * 0.5)}
              strokeWidth={style.lineWidth}
              isAnimationActive={config.animationEnabled}
            />
          );
        })}
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default memo(RadarChartView);
