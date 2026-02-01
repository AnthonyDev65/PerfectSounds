import React from 'react';
import Tuner from '../components/Tuner';
import './TunerPage.css';

const TunerPage: React.FC = () => {
  return (
    <div className="tuner-page">
      <div className="tuner-page-header">
        <h1>Afinador</h1>
        <p>Afina tu instrumento con precisión</p>
      </div>
      
      <div className="tuner-page-content">
        <Tuner />
      </div>
    </div>
  );
};

export default TunerPage;
