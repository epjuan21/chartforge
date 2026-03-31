'use client';

import type { BaseChartProps } from '../shared';
import BarChartView from '../BarChartView';
import LineChartView from '../LineChartView';
import AreaChartView from '../AreaChartView';
import PieChartView from '../PieChartView';
import RadarChartView from '../RadarChartView';
import ComposedChartView from '../ComposedChartView';
import styles from './ChartRenderer.module.css';

interface ChartRendererProps extends BaseChartProps {
  chartRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ChartRenderer({ data, config, style, colors, chartRef }: ChartRendererProps) {
  function renderChart() {
    const props = { data, config, style, colors };
    switch (config.type) {
      case 'bar':
      case 'bar-horizontal':
      case 'bar-stacked':
      case 'bar-grouped':
        return <BarChartView {...props} />;
      case 'line':
        return <LineChartView {...props} />;
      case 'area':
        return <AreaChartView {...props} />;
      case 'pie':
      case 'doughnut':
        return <PieChartView {...props} />;
      case 'radar':
        return <RadarChartView {...props} />;
      case 'composed':
        return <ComposedChartView {...props} />;
    }
  }

  return (
    <div
      ref={chartRef}
      className={styles.container}
      style={{
        background: style.backgroundColor,
        fontFamily: style.fontFamily,
        width: '100%',
      }}
    >
      {config.title && (
        <div className={styles.header}>
          <h2
            className={styles.title}
            style={{
              fontSize: style.titleFontSize,
              color: style.titleColor,
              fontFamily: style.fontFamily,
            }}
          >
            {config.title}
          </h2>
          {config.subtitle && (
            <p
              className={styles.subtitle}
              style={{
                fontSize: style.labelFontSize,
                color: style.labelColor,
                fontFamily: style.fontFamily,
              }}
            >
              {config.subtitle}
            </p>
          )}
        </div>
      )}
      {renderChart()}
    </div>
  );
}
