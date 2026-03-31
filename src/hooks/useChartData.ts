'use client';

import { useState, useCallback } from 'react';
import type { ChartData, ChartType, DataSeries } from '@/types';
import { DEFAULT_CHART_DATA } from '@/utils/defaults';
import { randomHexColor } from '@/utils/colors';

export function useChartData(initialType: ChartType = 'bar') {
  const [data, setData] = useState<ChartData>(() => DEFAULT_CHART_DATA[initialType]);

  const loadExample = useCallback((type: ChartType) => {
    setData(DEFAULT_CHART_DATA[type]);
  }, []);

  const setCategory = useCallback((index: number, value: string) => {
    setData((prev) => {
      const categories = [...prev.categories];
      categories[index] = value;
      return { ...prev, categories };
    });
  }, []);

  const addCategory = useCallback(() => {
    setData((prev) => {
      const label = `Cat ${prev.categories.length + 1}`;
      const categories = [...prev.categories, label];
      const values = prev.values.map((row) => [...row, 0]);
      return { ...prev, categories, values };
    });
  }, []);

  const removeCategory = useCallback((index: number) => {
    setData((prev) => {
      if (prev.categories.length <= 1) return prev;
      const categories = prev.categories.filter((_, i) => i !== index);
      const values = prev.values.map((row) => row.filter((_, i) => i !== index));
      return { ...prev, categories, values };
    });
  }, []);

  const setSeries = useCallback((index: number, partial: Partial<DataSeries>) => {
    setData((prev) => {
      const series = prev.series.map((s, i) => (i === index ? { ...s, ...partial } : s));
      return { ...prev, series };
    });
  }, []);

  const addSeries = useCallback(() => {
    setData((prev) => {
      const id = `s${Date.now()}`;
      const newSeries: DataSeries = {
        id,
        name: `Serie ${prev.series.length + 1}`,
        color: randomHexColor(),
      };
      const values = [...prev.values, new Array(prev.categories.length).fill(0)];
      return { ...prev, series: [...prev.series, newSeries], values };
    });
  }, []);

  const removeSeries = useCallback((index: number) => {
    setData((prev) => {
      if (prev.series.length <= 1) return prev;
      const series = prev.series.filter((_, i) => i !== index);
      const values = prev.values.filter((_, i) => i !== index);
      return { ...prev, series, values };
    });
  }, []);

  const setValue = useCallback((serieIndex: number, categoryIndex: number, value: number) => {
    setData((prev) => {
      const values = prev.values.map((row, si) =>
        si === serieIndex ? row.map((v, ci) => (ci === categoryIndex ? value : v)) : row,
      );
      return { ...prev, values };
    });
  }, []);

  return {
    data,
    loadExample,
    setCategory,
    addCategory,
    removeCategory,
    setSeries,
    addSeries,
    removeSeries,
    setValue,
  };
}
