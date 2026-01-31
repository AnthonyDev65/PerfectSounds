import React from 'react';
import { Scale } from '../models/Scale';
import { useMetronome } from '../context/MetronomeContext';

interface SelectedScalesGridProps {
  selectedScales: Scale[];
  gridSpan: number;
  onGridSpanChange: (span: number) => void;
  onRemoveScale: (index: number) => void;
}

const SelectedScalesGrid: React.FC<SelectedScalesGridProps> = ({ 
  selectedScales, 
  gridSpan, 
  onGridSpanChange,
  onRemoveScale
}) => {
  const { activeChord } = useMetronome();

  return (
    <div className="selected-scales-section">
      <div className="notes-header">
        <span className="notes-label">Notas:</span>
        <div className="organizers">
          <button 
            className={`organizer-btn ${gridSpan === 1 ? 'active' : ''}`}
            onClick={() => onGridSpanChange(1)}
            title="Lista vertical"
          >
            <i className="ri-list-check"></i>
          </button>
          <button 
            className={`organizer-btn ${gridSpan === 2 ? 'active' : ''}`}
            onClick={() => onGridSpanChange(2)}
            title="Cuadrícula 2x2"
          >
            <i className="ri-grid-fill"></i>
          </button>
          <button 
            className={`organizer-btn ${gridSpan === 0 ? 'active' : ''}`}
            onClick={() => onGridSpanChange(0)}
            title="Fila horizontal"
          >
            <i className="ri-layout-row-line"></i>
          </button>
        </div>
      </div>

      <div className="selected-scales-container">
        <div className={`selected-scales-grid ${gridSpan === 0 ? 'flex-mode' : `span-${gridSpan}`}`}>
          {selectedScales.map((scale, index) => (
            <div 
              key={`${scale.degrees}-${index}`}
              className={`selected-scale-item ${activeChord === scale.name ? 'pulse-active' : ''}`}
            >
              <button 
                className="remove-scale-btn"
                onClick={() => onRemoveScale(index)}
                title="Eliminar"
              >
                <i className="ri-close-line"></i>
              </button>
              <span className="selected-scale-name">{scale.name}</span>
              <span 
                className="selected-scale-degree"
                style={{ color: scale.degreesColor }}
              >
                {scale.degrees}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedScalesGrid;