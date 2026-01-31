import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Scale } from '../models/Scale';

interface ScaleSelectionState {
  currentNote: string;
  scales: Scale[];
  selectedScales: Scale[]; // Cambiar a array para permitir repeticiones
  setCurrentNote: (note: string) => void;
  setScales: (scales: Scale[]) => void;
  setSelectedScales: (scales: Scale[]) => void;
  addScale: (scale: Scale) => void;
  removeScaleAt: (index: number) => void;
  reset: () => void;
}

const ScaleSelectionContext = createContext<ScaleSelectionState | undefined>(undefined);

export const useScaleSelection = () => {
  const context = useContext(ScaleSelectionContext);
  if (!context) {
    throw new Error('useScaleSelection must be used within a ScaleSelectionProvider');
  }
  return context;
};

interface ScaleSelectionProviderProps {
  children: ReactNode;
}

export const ScaleSelectionProvider: React.FC<ScaleSelectionProviderProps> = ({ children }) => {
  const [currentNote, setCurrentNote] = useState<string>('C');
  const [scales, setScales] = useState<Scale[]>([]);
  const [selectedScales, setSelectedScales] = useState<Scale[]>([]);

  const addScale = (scale: Scale) => {
    const updated = [...selectedScales, scale];
    setSelectedScales(updated);
    localStorage.setItem('selectedScales', JSON.stringify(updated));
  };

  const removeScaleAt = (index: number) => {
    const updated = selectedScales.filter((_, i) => i !== index);
    setSelectedScales(updated);
    localStorage.setItem('selectedScales', JSON.stringify(updated));
  };

  const reset = () => {
    setSelectedScales([]);
    localStorage.removeItem('selectedScales');
  };

  // Cargar estado desde localStorage al inicializar
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedScales');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedScales(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      localStorage.removeItem('selectedScales');
    }
  }, []);

  const value: ScaleSelectionState = {
    currentNote,
    scales,
    selectedScales,
    setCurrentNote,
    setScales,
    setSelectedScales,
    addScale,
    removeScaleAt,
    reset
  };

  return (
    <ScaleSelectionContext.Provider value={value}>
      {children}
    </ScaleSelectionContext.Provider>
  );
};