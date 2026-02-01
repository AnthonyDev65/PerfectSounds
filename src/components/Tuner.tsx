import React from 'react';
import './Tuner.css';

interface TunerProps {}

const Tuner: React.FC<TunerProps> = () => {
  return (
    <div className="tuner-container">
      <div className="tuner-header">
        <h3>Afinador</h3>
      </div>

      <div className="tuner-coming-soon">
        <i className="ri-time-line"></i>
        <h4>Próximamente</h4>
        <p>Estamos trabajando en esta función para ofrecerte la mejor experiencia de afinación.</p>
      </div>
    </div>
  );
};

export default Tuner;
