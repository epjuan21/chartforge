'use client';

import styles from './Toggle.module.css';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ label, checked, onChange, disabled = false }: ToggleProps) {
  return (
    <label className={[styles.wrapper, disabled ? styles.disabled : ''].join(' ')}>
      <span className={styles.label}>{label}</span>
      <div
        role="switch"
        aria-checked={checked}
        className={[styles.track, checked ? styles.active : ''].join(' ')}
        onClick={() => !disabled && onChange(!checked)}
      >
        <div className={styles.thumb} />
      </div>
    </label>
  );
}
