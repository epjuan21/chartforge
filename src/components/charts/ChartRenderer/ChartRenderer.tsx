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
import ProgressChartView from '../ProgressChartView';
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
      case 'progress':
        return <ProgressChartView {...props} />;
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
      {(config.title || config.subtitle) && (
        <div className={styles.header}>
          {config.title && (
            <h2
              className={styles.title}
              style={{
                fontSize: style.titleFontSize,
                color: style.titleColor,
                fontFamily: style.fontFamily,
                textAlign: config.titleAlign,
              }}
            >
              {config.title}
            </h2>
          )}
          {config.subtitle && (
            <p
              className={styles.subtitle}
              style={{
                fontSize: style.subtitleFontSize,
                color: style.subtitleColor,
                fontFamily: style.fontFamily,
                fontWeight: style.subtitleBold ? 700 : 400,
                textAlign: config.subtitleAlign,
              }}
            >
              {config.subtitle}
            </p>
          )}
        </div>
      )}
      {renderChart()}
      {config.footerText && (
        <p
          className={styles.footer}
          style={{ color: style.labelColor, fontFamily: style.fontFamily }}
        >
          {config.footerText}
        </p>
      )}
    </div>
  );
}
