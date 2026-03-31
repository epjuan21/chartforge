'use client';

import { useEffect, useRef } from 'react';

/**
 * Devuelve una versión debounced de `fn` con el delay indicado.
 * El callback siempre usa la referencia más reciente de `fn` (no stale).
 */
export function useDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const fnRef = useRef(fn);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mantener referencia actualizada sin re-crear el debounced
  useEffect(() => {
    fnRef.current = fn;
  });

  return (...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fnRef.current(...args);
    }, delay);
  };
}
