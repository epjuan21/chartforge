'use client';

import { memo, useMemo } from 'react';
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
  Cell,
} from 'recharts';
import type { BaseChartProps } from '../shared';
import { toRechartsData, tooltipStyle } from '../shared';

function BarChartView({ data, config, style, colors }: BaseChartProps) {
  const chartData = useMemo(() => toRechartsData(data), [data]);
  const isHorizontal = config.type === 'bar-horizontal';
  const isStacked = config.type === 'bar-stacked';

  const commonAxisStyle = {
    fill: style.axisColor,
    fontSize: style.axisFontSize,
    fontFamily: style.fontFamily,
  };

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <BarChart
        data={chartData}
        layout={isHorizontal ? 'vertical' : 'horizontal'}
        margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
      >
        {config.showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={style.gridColor}
            vertical={!isHorizontal}
            horizontal={isHorizontal}
          />
        )}
        {isHorizontal ? (
          <>
            <XAxis type="number" tick={commonAxisStyle} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="category"
              tick={commonAxisStyle}
              axisLine={false}
              tickLine={false}
              width={90}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="category"
              tick={commonAxisStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={commonAxisStyle} axisLine={false} tickLine={false} />
          </>
        )}
        {config.showTooltip && (
          <Tooltip
            contentStyle={tooltipStyle(style)}
            cursor={{ fill: 'rgba(128,128,128,0.06)' }}
          />
        )}
        {config.showLegend && (
          <Legend
            verticalAlign={config.legendPosition === 'top' || config.legendPosition === 'bottom' ? config.legendPosition : 'bottom'}
            align={config.legendPosition === 'left' || config.legendPosition === 'right' ? config.legendPosition : 'center'}
            wrapperStyle={{
              fontFamily: style.fontFamily,
              fontSize: style.labelFontSize,
              color: style.labelColor,
            }}
          />
        )}
        {data.series.map((serie, index) => (
          <Bar
            key={serie.id}
            dataKey={serie.name}
            fill={colors[index % colors.length]}
            radius={isStacked ? 0 : [style.borderRadius, style.borderRadius, 0, 0]}
            stackId={isStacked ? 'stack' : undefined}
            isAnimationActive={config.animationEnabled}
            maxBarSize={60}
          >
            {style.showDataLabels && (
              <LabelList
                position={isHorizontal ? 'right' : 'top'}
                style={{ fill: style.labelColor, fontSize: style.labelFontSize, fontFamily: style.fontFamily }}
              />
            )}
            {/* Para pie-like single series con colores por celda */}
            {data.series.length === 1 &&
              chartData.map((_, ci) => (
                <Cell key={ci} fill={colors[ci % colors.length]} />
              ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default memo(BarChartView);
