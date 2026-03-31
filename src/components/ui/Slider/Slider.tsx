'use client';

import styles from './Slider.module.css';

interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  unit?: string;
}

export default function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  unit = '',
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.wrapper}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && (
            <span className={styles.value}>
              {value}
              {unit}
            </span>
          )}
        </div>
      )}
      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.range}
        />
      </div>
    </div>
  );
}
