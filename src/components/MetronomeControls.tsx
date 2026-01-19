import React from 'react';
import { useMetronome } from '../context/MetronomeContext';
import './MetronomeControls.css';

const MetronomeControls: React.FC = () => {
  const { 
    isPlaying, 
    bpm, 
    beatsPerChord, 
    currentBeat, 
    currentChordIndex,
    start, 
    stop, 
    setBpm, 
    setBeatsPerChord, 
    reset 
  } = useMetronome();

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value);
    if (newBpm >= 60 && newBpm <= 200) {
      setBpm(newBpm);
    }
  };

  const handleBeatsChange = (beats: number) => {
    setBeatsPerChord(beats);
  };

  return (
    <div className="metronome-controls">
      <div className="metronome-header">
        <div className="metronome-info">
          <span className="metronome-title">Metrónomo</span>
          {isPlaying && (
            <div className="beat-indicator">
              <span className="chord-info">Acorde {currentChordIndex + 1}</span>
              <div className="beat-dots">
                {Array.from({ length: beatsPerChord }, (_, i) => (
                  <div 
                    key={i} 
                    className={`beat-dot ${i + 1 === currentBeat ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={isPlaying ? stop : start}
        >
          <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill`}></i>
        </button>
      </div>

      <div className="metronome-settings">
        <div className="bpm-control">
          <label>BPM</label>
          <div className="bpm-input-group">
            <button 
              className="bpm-btn" 
              onClick={() => setBpm(Math.max(60, bpm - 5))}
            >
              -
            </button>
            <input
              type="number"
              value={bpm}
              onChange={handleBpmChange}
              min="60"
              max="200"
              className="bpm-input"
            />
            <button 
              className="bpm-btn" 
              onClick={() => setBpm(Math.min(200, bpm + 5))}
            >
              +
            </button>
          </div>
        </div>

        <div className="beats-control">
          <label>Beats por acorde</label>
          <div className="beats-buttons">
            <button
              className={`beats-btn ${beatsPerChord === 8 ? 'active' : ''}`}
              onClick={() => handleBeatsChange(8)}
            >
              8
            </button>
            <button
              className={`beats-btn ${beatsPerChord === 4 ? 'active' : ''}`}
              onClick={() => handleBeatsChange(4)}
            >
              4
            </button>
            <button
              className={`beats-btn ${beatsPerChord === 2 ? 'active' : ''}`}
              onClick={() => handleBeatsChange(2)}
            >
              2
            </button>
          </div>
        </div>
      </div>

      {isPlaying && (
        <button className="reset-btn" onClick={reset}>
          <i className="ri-refresh-line"></i>
          Reset
        </button>
      )}
    </div>
  );
};

export default MetronomeControls;