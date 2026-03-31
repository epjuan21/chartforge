'use client';

import { useState, useCallback } from 'react';
import type { ChartConfig, ChartType } from '@/types';
import { DEFAULT_CHART_CONFIG } from '@/utils/defaults';

export function useChartConfig() {
  const [config, setConfig] = useState<ChartConfig>(DEFAULT_CHART_CONFIG);

  const setType = useCallback((type: ChartType) => {
    setConfig((prev) => ({ ...prev, type }));
  }, []);

  const update = useCallback((partial: Partial<ChartConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setConfig(DEFAULT_CHART_CONFIG);
  }, []);

  return { config, setType, update, reset };
}
