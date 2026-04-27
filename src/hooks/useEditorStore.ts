'use client';

import { useEffect, useRef } from 'react';
import type { ChartData, ChartConfig, ChartStyle, TableData } from '@/types';

const STORAGE_KEY = 'chartforge_editor_state';

export interface EditorState {
  data: ChartData;
  config: ChartConfig;
  style: ChartStyle;
  colors: string[];
  tableData?: TableData;
}

export function saveEditorState(state: EditorState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  const callbackRef = useRef(onUpdate);

  useEffect(() => {
    callbackRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    function handleStorage(event?: StorageEvent) {
      // Filtra eventos de otras claves cuando vienen del navegador
      if (event && event.key !== null && event.key !== STORAGE_KEY) return;
      const state = loadEditorState();
      if (state) callbackRef.current(state);
    }

    // Carga inicial al montar
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
}
