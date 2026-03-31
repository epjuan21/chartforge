'use client';

import styles from './NumberInput.module.css';

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
}: NumberInputProps) {
  function clamp(n: number) {
    if (min !== undefined && n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
  }

  function handleChange(raw: string) {
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) onChange(clamp(parsed));
  }

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => onChange(clamp(value - step))}
          disabled={disabled || (min !== undefined && value <= min)}
          aria-label="Decrementar"
        >
          −
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          className={styles.input}
        />
        <button
          type="button"
          className={styles.btn}
          onClick={() => onChange(clamp(value + step))}
          disabled={disabled || (max !== undefined && value >= max)}
          aria-label="Incrementar"
        >
          +
        </button>
      </div>
    </div>
  );
}
