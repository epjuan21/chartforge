'use client';

import type { BaseChartProps } from '../shared';
import type { TableData } from '@/types';
import BarChartView from '../BarChartView';
import LineChartView from '../LineChartView';
import AreaChartView from '../AreaChartView';
import PieChartView from '../PieChartView';
import RadarChartView from '../RadarChartView';
import ComposedChartView from '../ComposedChartView';
import PyramidChartView from '../PyramidChartView';
import TableView from '../TableView';
import styles from './ChartRenderer.module.css';

interface ChartRendererProps extends BaseChartProps {
  chartRef?: React.RefObject<HTMLDivElement | null>;
  tableData?: TableData;
}

export default function ChartRenderer({
  data,
  config,
  style,
  colors,
  chartRef,
  tableData,
}: ChartRendererProps) {
  function renderChart() {
    if (config.type === 'table') {
      if (!tableData) return null;
      return <TableView tableData={tableData} style={style} />;
    }
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
      case 'pyramid':
        return <PyramidChartView {...props} />;
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
                fontSize: style.subtitleFontSize,
                color: style.labelColor,
                fontFamily: style.fontFamily,
                fontWeight: style.subtitleBold ? 700 : 400,
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
