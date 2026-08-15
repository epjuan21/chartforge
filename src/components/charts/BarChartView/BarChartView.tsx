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
import type { YAxisTickContentProps } from 'recharts';
import type { BaseChartProps } from '../shared';
import type { ChartStyle } from '@/types';
import { toRechartsData, tooltipStyle, formatChartValue } from '../shared';

interface HorizontalAxisTickProps extends YAxisTickContentProps {
  axisWidth: number;
  align: ChartStyle['horizontalAxisLabelAlign'];
  axisStyle: React.CSSProperties;
}

function HorizontalAxisTick({
  x,
  y,
  payload,
  axisWidth,
  align,
  axisStyle,
}: HorizontalAxisTickProps) {
  const rightEdge = Number(x);
  const textX = align === 'left' ? rightEdge - axisWidth + 8 : rightEdge;

  return (
    <text
      x={textX}
      y={Number(y)}
      dy="0.355em"
      textAnchor={align === 'left' ? 'start' : 'end'}
      style={axisStyle}
    >
      {String(payload.value)}
    </text>
  );
}

function BarChartView({ data, config, style, colors }: BaseChartProps) {
  const chartData = useMemo(() => toRechartsData(data), [data]);
  const isHorizontal = config.type === 'bar-horizontal';
  const isStacked = config.type === 'bar-stacked';

  const commonAxisStyle = {
    fill: style.axisColor,
    fontSize: style.axisFontSize,
    fontFamily: style.fontFamily,
    fontWeight: style.axisBold ? 700 : 400,
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
            <XAxis
              type="number"
              tick={commonAxisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatChartValue(v as number, style)}
              hide={!config.showXAxis}
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={(props) => (
                <HorizontalAxisTick
                  {...props}
                  axisWidth={style.horizontalAxisLabelWidth}
                  align={style.horizontalAxisLabelAlign}
                  axisStyle={commonAxisStyle}
                />
              )}
              axisLine={false}
              tickLine={false}
              width={style.horizontalAxisLabelWidth}
              hide={!config.showYAxis}
            />
          </>
        ) : (
          <>
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
              tickFormatter={(v) => formatChartValue(v as number, style)}
              hide={!config.showYAxis}
            />
          </>
        )}
        {config.showTooltip && (
          <Tooltip
            contentStyle={tooltipStyle(style)}
            cursor={{ fill: 'rgba(128,128,128,0.06)' }}
            formatter={((value: number | string) => formatChartValue(value, style)) as never}
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
              fontWeight: style.labelBold ? 700 : 400,
            }}
          />
        )}
        {data.series.map((serie, index) => (
          <Bar
            key={serie.id}
            dataKey={serie.name}
            fill={colors[index % colors.length]}
            radius={
              isStacked
                ? 0
                : isHorizontal
                  ? [0, style.borderRadius, style.borderRadius, 0]
                  : [style.borderRadius, style.borderRadius, 0, 0]
            }
            stackId={isStacked ? 'stack' : undefined}
            isAnimationActive={config.animationEnabled}
            maxBarSize={
              config.type === 'bar' || config.type === 'bar-horizontal'
                ? style.standardBarThickness
                : 60
            }
          >
            {style.showDataLabels && (
              <LabelList
                position={isHorizontal ? 'right' : 'top'}
                formatter={(v) => formatChartValue(v as number, style)}
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
