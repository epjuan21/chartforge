'use client';

import styles from './Input.module.css';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  id?: string;
}

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  id,
}: InputProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={[styles.input, error ? styles.inputError : ''].join(' ')}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
