// src/hooks/useDashboardData.js
import { useMemo } from 'react';
import { buildDashboardData } from '../data/loader.js';

export function useDashboardData() {
  const data = useMemo(() => buildDashboardData(), []);
  return { data, isLoading: false, error: null };
}
