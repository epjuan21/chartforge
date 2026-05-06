'use client';

import { memo, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BaseChartProps } from '../shared';
import { tooltipStyle } from '../shared';

interface PieEntry {
  name: string;
  value: number;
}

function PieChartView({ data, config, style, colors }: BaseChartProps) {
  // Para torta/anillo usamos la primera (y única) serie; cada categoría es un segmento
  const pieData: PieEntry[] = useMemo(
    () => data.categories.map((cat, ci) => ({ name: cat, value: data.values[0]?.[ci] ?? 0 })),
    [data],
  );

  const isDoughnut = config.type === 'doughnut';

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <PieChart>
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
              fontWeight: style.labelBold ? 700 : 400,
            }}
          />
        )}
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius="70%"
          innerRadius={isDoughnut ? '40%' : 0}
          dataKey="value"
          isAnimationActive={config.animationEnabled}
          label={
            style.showDataLabels
              ? ({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              : false
          }
          labelLine={style.showDataLabels}
        >
          {pieData.map((_, index) => (
            <Cell
              key={index}
              fill={colors[index % colors.length]}
              opacity={style.opacity}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default memo(PieChartView);
