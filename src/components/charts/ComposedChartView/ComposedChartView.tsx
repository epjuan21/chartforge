'use client';

import { memo, useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { BaseChartProps } from '../shared';
import { toRechartsData, tooltipStyle } from '../shared';

function ComposedChartView({ data, config, style, colors }: BaseChartProps) {
  const chartData = useMemo(() => toRechartsData(data), [data]);

  const commonAxisStyle = {
    fill: style.axisColor,
    fontSize: style.axisFontSize,
    fontFamily: style.fontFamily,
  };

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
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
        {/* Primera serie: barras; resto: líneas */}
        {data.series.map((serie, index) => {
          const color = colors[index % colors.length];
          if (index === 0) {
            return (
              <Bar
                key={serie.id}
                dataKey={serie.name}
                fill={color}
                radius={[style.borderRadius, style.borderRadius, 0, 0]}
                isAnimationActive={config.animationEnabled}
                maxBarSize={60}
              />
            );
          }
          return (
            <Line
              key={serie.id}
              type="monotone"
              dataKey={serie.name}
              stroke={color}
              strokeWidth={style.lineWidth}
              dot={{ r: style.dotSize, fill: color }}
              isAnimationActive={config.animationEnabled}
            />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default memo(ComposedChartView);
