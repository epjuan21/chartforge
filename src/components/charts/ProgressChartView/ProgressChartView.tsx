'use client';

import { memo } from 'react';
import type { BaseChartProps } from '../shared';
import { formatChartValue } from '../shared';
import styles from './ProgressChartView.module.css';

function ProgressChartView({ data, config, style, colors }: BaseChartProps) {
  const values = data.values[0] ?? [];
  const maxValue = Math.max(
    0,
    ...values.map((value) => (Number.isFinite(value) ? value : 0)),
  );

  return (
    <div
      className={styles.chart}
      style={{
        height: config.height,
        gap: style.progressRowGap,
      }}
    >
      {data.categories.map((category, index) => {
        const value = Math.max(0, values[index] ?? 0);
        const percentage = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;
        const fillColor = colors[index % colors.length] ?? data.series[0]?.color ?? style.labelColor;

        return (
          <div className={styles.row} key={`${category}-${index}`}>
            <div className={styles.rowHeader}>
              <span
                className={styles.label}
                style={{
                  color: style.labelColor,
                  fontFamily: style.fontFamily,
                  fontSize: style.labelFontSize,
                  fontWeight: style.labelBold ? 700 : 600,
                }}
              >
                {category}
              </span>
              <span
                className={styles.value}
                style={{
                  color: fillColor,
                  fontFamily: style.fontFamily,
                  fontSize: style.labelFontSize + 2,
                }}
              >
                {formatChartValue(value, style)}
              </span>
            </div>
            <div
              className={styles.track}
              style={{
                backgroundColor: style.progressTrackColor,
                borderRadius: style.progressBarHeight / 2,
                height: style.progressBarHeight,
              }}
            >
              <div
                className={styles.fill}
                style={{
                  backgroundColor: fillColor,
                  borderRadius: style.progressBarHeight / 2,
                  width: `${percentage}%`,
                  transitionDuration: config.animationEnabled ? '700ms' : '0ms',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ProgressChartView);