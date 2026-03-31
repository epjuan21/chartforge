'use client';

import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  presets?: string[];
}

export default function ColorPicker({ color, onChange, label, presets = [] }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        <div className={styles.swatch} style={{ background: color }} />
        <span className={styles.hex}>{color}</span>
      </div>
      {open && (
        <div className={styles.popover}>
          <HexColorPicker color={color} onChange={onChange} />
          {presets.length > 0 && (
            <div className={styles.presets}>
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={[styles.preset, p === color ? styles.presetActive : ''].join(' ')}
                  style={{ background: p }}
                  onClick={() => onChange(p)}
                  title={p}
                />
              ))}
            </div>
          )}
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className={styles.hexInput}
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
