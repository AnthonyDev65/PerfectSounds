import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Scale } from '../models/Scale';

interface ScaleSelectionState {
  currentNote: string;
  scales: Scale[];
  selectedDegrees: { [degree: string]: boolean };
  selectionOrder: string[]; // Array para mantener el orden de selección
  setCurrentNote: (note: string) => void;
  setScales: (scales: Scale[]) => void;
  setSelectedDegrees: (degrees: { [degree: string]: boolean }) => void;
  setSelectionOrder: (order: string[]) => void;
  toggleDegreeSelection: (degree: string, isSelected: boolean) => void;
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
  const [selectedDegrees, setSelectedDegrees] = useState<{ [degree: string]: boolean }>({});
  const [selectionOrder, setSelectionOrder] = useState<string[]>([]);

  const toggleDegreeSelection = (degree: string, isSelected: boolean) => {
    const updatedDegrees = { ...selectedDegrees, [degree]: isSelected };
    setSelectedDegrees(updatedDegrees);
    
    // Actualizar el orden de selección
    let updatedOrder: string[];
    if (isSelected) {
      // Agregar al final si no existe
      updatedOrder = selectionOrder.includes(degree) 
        ? selectionOrder 
        : [...selectionOrder, degree];
    } else {
      // Remover del array
      updatedOrder = selectionOrder.filter(d => d !== degree);
    }
    setSelectionOrder(updatedOrder);
    
    // Persistir en localStorage
    localStorage.setItem('selectedDegrees', JSON.stringify(updatedDegrees));
    localStorage.setItem('selectionOrder', JSON.stringify(updatedOrder));
  };

  const reset = () => {
    setSelectedDegrees({});
    setSelectionOrder([]);
    localStorage.removeItem('selectedDegrees');
    localStorage.removeItem('selectionOrder');
  };

  // Cargar estado desde localStorage al inicializar
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedDegrees');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setSelectedDegrees(parsed);
        }
      }
      
      const savedOrder = localStorage.getItem('selectionOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        if (Array.isArray(parsedOrder)) {
          setSelectionOrder(parsedOrder);
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      localStorage.removeItem('selectedDegrees');
      localStorage.removeItem('selectionOrder');
    }
  }, []);

  const value: ScaleSelectionState = {
    currentNote,
    scales,
    selectedDegrees,
    selectionOrder,
    setCurrentNote,
    setScales,
    setSelectedDegrees,
    setSelectionOrder,
    toggleDegreeSelection,
    reset
  };

  return (
    <ScaleSelectionContext.Provider value={value}>
      {children}
    </ScaleSelectionContext.Provider>
  );
};