import React from 'react';
import { Scale } from '../models/Scale';

interface ScalesCarouselProps {
  scales: Scale[];
  onScaleClick: (scale: Scale) => void;
}

const ScalesCarousel: React.FC<ScalesCarouselProps> = ({ scales, onScaleClick }) => {
  return (
    <div className="scales-small-container">
      <div className="scales-small-grid">
        {scales.map((scale) => (
          <div
            key={scale.degrees}
            className={`scale-small-item ${scale.isSelected ? 'selected' : ''}`}
            onClick={() => onScaleClick(scale)}
          >
            <span className="scale-small-name">{scale.name}</span>
            <div 
              className="scale-small-dot" 
              style={{ backgroundColor: scale.degreesColor }}
            />
            <span 
              className="scale-small-degree"
              style={{ color: scale.degreesColor }}
            >
              {scale.degrees}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScalesCarousel;