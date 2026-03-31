'use client';

import { useState, useCallback } from 'react';
import type { ChartStyle } from '@/types';
import { DEFAULT_CHART_STYLE } from '@/utils/defaults';
import { getPaletteColors } from '@/constants';

export function useChartStyle() {
  const [style, setStyle] = useState<ChartStyle>(DEFAULT_CHART_STYLE);

  const setPalette = useCallback((paletteId: string) => {
    setStyle((prev) => ({
      ...prev,
      palette: paletteId,
      customColors: [],
    }));
  }, []);

  const update = useCallback((partial: Partial<ChartStyle>) => {
    setStyle((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setStyle(DEFAULT_CHART_STYLE);
  }, []);

  const activeColors =
    style.customColors.length > 0 ? style.customColors : getPaletteColors(style.palette);

  return { style, activeColors, setPalette, update, reset };
}
