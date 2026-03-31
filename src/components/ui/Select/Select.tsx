'use client';

import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function Select({ label, options, value, onChange, disabled = false }: SelectProps) {
  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.selectWrapper}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={styles.select}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow}>▾</span>
      </div>
    </div>
  );
}
