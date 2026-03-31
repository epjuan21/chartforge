'use client';

import { useEffect, useCallback } from 'react';
import type { ChartData, ChartConfig, ChartStyle } from '@/types';

const STORAGE_KEY = 'chartforge_editor_state';

export interface EditorState {
  data: ChartData;
  config: ChartConfig;
  style: ChartStyle;
  colors: string[];
}

export function saveEditorState(state: EditorState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispara evento para que la pestaña de preview lo detecte
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch {
    // localStorage no disponible (ej. SSR)
  }
}

export function loadEditorState(): EditorState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EditorState) : null;
  } catch {
    return null;
  }
}

/** Hook que escucha cambios en el storage y llama onUpdate cuando hay nuevos datos */
export function useEditorStateListener(onUpdate: (state: EditorState) => void) {
  const handleStorage = useCallback(() => {
    const state = loadEditorState();
    if (state) onUpdate(state);
  }, [onUpdate]);

  useEffect(() => {
    // Carga inicial
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);
}
