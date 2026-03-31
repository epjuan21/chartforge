'use client';

import { memo, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { BaseChartProps } from '../shared';
import { toRechartsData, tooltipStyle } from '../shared';

function AreaChartView({ data, config, style, colors }: BaseChartProps) {
  const chartData = useMemo(() => toRechartsData(data), [data]);

  const commonAxisStyle = {
    fill: style.axisColor,
    fontSize: style.axisFontSize,
    fontFamily: style.fontFamily,
  };

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
        <defs>
          {data.series.map((serie, index) => {
            const color = colors[index % colors.length];
            return (
              <linearGradient key={serie.id} id={`grad-${serie.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={style.opacity} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            );
          })}
        </defs>
        {config.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={style.gridColor} />
        )}
        <XAxis dataKey="category" tick={commonAxisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={commonAxisStyle} axisLine={false} tickLine={false} />
        {config.showTooltip && (
          <Tooltip contentStyle={tooltipStyle(style)} />
        )}
        {config.showLegend && (
          <Legend
            verticalAlign={config.legendPosition === 'top' || config.legendPosition === 'bottom' ? config.legendPosition : 'bottom'}
            wrapperStyle={{
              fontFamily: style.fontFamily,
              fontSize: style.labelFontSize,
              color: style.labelColor,
            }}
          />
        )}
        {data.series.map((serie, index) => {
          const color = colors[index % colors.length];
          return (
            <Area
              key={serie.id}
              type="monotone"
              dataKey={serie.name}
              stroke={color}
              strokeWidth={style.lineWidth}
              fill={`url(#grad-${serie.id})`}
              isAnimationActive={config.animationEnabled}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default memo(AreaChartView);
