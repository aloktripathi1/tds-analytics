import { createContext, useContext, useState, useMemo } from 'react';
import { getData } from '../data/loader.js';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const data = useMemo(() => getData(), []);
  const [selectedTerm, setSelectedTerm] = useState('2026-01');

  return (
    <DashboardContext.Provider value={{ data, selectedTerm, setSelectedTerm }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used inside DashboardProvider');
  return ctx;
}
