'use client';

import { memo, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { BaseChartProps } from '../shared';
import { toRechartsData, tooltipStyle } from '../shared';

function LineChartView({ data, config, style, colors }: BaseChartProps) {
  const chartData = useMemo(() => toRechartsData(data), [data]);

  const commonAxisStyle = {
    fill: style.axisColor,
    fontSize: style.axisFontSize,
    fontFamily: style.fontFamily,
  };

  return (
    <ResponsiveContainer width="100%" height={config.height}>
      <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
        {config.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={style.gridColor} />
        )}
        <XAxis
          dataKey="category"
          tick={commonAxisStyle}
          axisLine={false}
          tickLine={false}
          hide={!config.showXAxis}
        />
        <YAxis
          tick={commonAxisStyle}
          axisLine={false}
          tickLine={false}
          hide={!config.showYAxis}
        />
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
        {data.series.map((serie, index) => (
          <Line
            key={serie.id}
            type="monotone"
            dataKey={serie.name}
            stroke={colors[index % colors.length]}
            strokeWidth={style.lineWidth}
            dot={{ r: style.dotSize, fill: colors[index % colors.length] }}
            activeDot={{ r: style.dotSize + 2 }}
            isAnimationActive={config.animationEnabled}
          >
            {style.showDataLabels && (
              <LabelList
                position="top"
                style={{ fill: style.labelColor, fontSize: style.labelFontSize, fontFamily: style.fontFamily }}
              />
            )}
          </Line>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default memo(LineChartView);
