import React from 'react';
import { Scale } from '../models/Scale';
import { useMetronome } from '../context/MetronomeContext';

interface SelectedScalesGridProps {
  selectedScales: Scale[];
  gridSpan: number;
  onGridSpanChange: (span: number) => void;
}

const SelectedScalesGrid: React.FC<SelectedScalesGridProps> = ({ 
  selectedScales, 
  gridSpan, 
  onGridSpanChange 
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
          >
            <i className="ri-list-check"></i>
          </button>
          <button 
            className={`organizer-btn ${gridSpan === 2 ? 'active' : ''}`}
            onClick={() => onGridSpanChange(2)}
          >
            <i className="ri-grid-fill"></i>
          </button>
        </div>
      </div>

      <div className="selected-scales-container">
        <div className={`selected-scales-grid span-${gridSpan}`}>
          {selectedScales.map((scale) => (
            <div 
              key={scale.degrees} 
              className={`selected-scale-item ${activeChord === scale.name ? 'pulse-active' : ''}`}
            >
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