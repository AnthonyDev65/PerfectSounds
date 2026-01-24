import React, { useState } from 'react';
import { useAdvancedSong } from '../context/AdvancedSongContext';
import { MusicService } from '../services/MusicService';
import { SECTION_PRESETS, SongSection } from '../models/AdvancedSong';
import './AdvancedEditor.css';

const AdvancedEditor: React.FC = () => {
  const {
    currentSong,
    closeSong,
    updateSong,
    addSection,
    updateSection,
    deleteSection,
    addChordToSection,
    updateChordInSection,
    removeChordFromSection,
    reorderChordsInSection,
    isPlaying,
    currentSectionIndex,
    currentChordIndex,
    play,
    pause,
    stop
  } = useAdvancedSong();

  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showChordPicker, setShowChordPicker] = useState<string | null>(null);
  const [draggedChord, setDraggedChord] = useState<{ sectionId: string; index: number } | null>(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(SECTION_PRESETS[0]);
  const [showKeySelector, setShowKeySelector] = useState(false);
  const [showBpmEditor, setShowBpmEditor] = useState(false);
  const [tempBpm, setTempBpm] = useState(currentSong?.bpm || 120);

  if (!currentSong) return null;

  const scales = MusicService.loadScales(currentSong.key);
  const allKeys = MusicService.getAllKeys();

  const handleBpmChange = (newBpm: number) => {
    const validBpm = Math.max(40, Math.min(240, newBpm));
    setTempBpm(validBpm);
  };

  const handleSaveBpm = () => {
    updateSong({ ...currentSong, bpm: tempBpm });
    setShowBpmEditor(false);
  };

  const handleTransposeKey = (newKey: string) => {
    if (newKey === currentSong.key) {
      setShowKeySelector(false);
      return;
    }

    // Transponer todas las secciones
    const transposedSections = currentSong.sections.map(section => ({
      ...section,
      chords: section.chords.map(chord => ({
        ...chord,
        name: MusicService.transposeChord(chord.name, currentSong.key, newKey)
      }))
    }));

    // Actualizar la canción con la nueva tonalidad y acordes transpuestos
    const updatedSong = {
      ...currentSong,
      key: newKey,
      sections: transposedSections,
      updatedAt: Date.now()
    };

    // Actualizar en el contexto
    const allSongs = JSON.parse(localStorage.getItem('advancedSongs') || '[]');
    const updatedSongs = allSongs.map((s: any) => 
      s.id === currentSong.id ? updatedSong : s
    );
    localStorage.setItem('advancedSongs', JSON.stringify(updatedSongs));

    // Actualizar el estado local usando el método del contexto
    updateSong(updatedSong);
    
    // Cerrar el modal
    setShowKeySelector(false);
  };

  const handleAddSection = () => {
    const name = newSectionName.trim() || selectedPreset.name;
    addSection(name, selectedPreset.color);
    setShowSectionModal(false);
    setNewSectionName('');
  };

  const handleAddChord = (sectionId: string, scale: any) => {
    addChordToSection(sectionId, {
      name: scale.name,
      degrees: scale.degrees,
      degreesColor: scale.degreesColor,
      beats: 4
    });
    setShowChordPicker(null);
  };

  const handleChordBeatsChange = (sectionId: string, chordId: string, beats: number) => {
    updateChordInSection(sectionId, chordId, { beats });
  };

  const handleDragStart = (sectionId: string, index: number) => {
    setDraggedChord({ sectionId, index });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (sectionId: string, targetIndex: number) => {
    if (draggedChord && draggedChord.sectionId === sectionId) {
      reorderChordsInSection(sectionId, draggedChord.index, targetIndex);
    }
    setDraggedChord(null);
  };

  const handleTouchStart = (sectionId: string, index: number) => {
    setDraggedChord({ sectionId, index });
  };

  const getTotalBeats = (section: SongSection) => {
    return section.chords.reduce((sum, chord) => sum + chord.beats, 0);
  };

  const getTotalDuration = (section: SongSection) => {
    const totalBeats = getTotalBeats(section);
    const secondsPerBeat = 60 / currentSong.bpm;
    const totalSeconds = totalBeats * secondsPerBeat * section.repeatCount;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="advanced-editor">
      {/* Header */}
      <div className="editor-header">
        <button className="back-btn" onClick={closeSong}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="song-info">
          <h1>{currentSong.name}</h1>
          <div className="song-meta">
            <button 
              className="key-badge clickable"
              onClick={() => setShowKeySelector(!showKeySelector)}
              title="Cambiar tonalidad"
            >
              {currentSong.key}
              <i className="ri-arrow-down-s-line"></i>
            </button>
            <button 
              className="bpm-badge clickable"
              onClick={() => {
                setTempBpm(currentSong.bpm);
                setShowBpmEditor(true);
              }}
              title="Cambiar BPM"
            >
              {currentSong.bpm} BPM
              <i className="ri-arrow-down-s-line"></i>
            </button>
          </div>
        </div>
        <div className="playback-controls">
          {isPlaying ? (
            <button className="control-btn" onClick={pause}>
              <i className="ri-pause-fill"></i>
            </button>
          ) : (
            <button className="control-btn play" onClick={play}>
              <i className="ri-play-fill"></i>
            </button>
          )}
          <button className="control-btn" onClick={stop}>
            <i className="ri-stop-fill"></i>
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="sections-container">
        {currentSong.sections.length === 0 ? (
          <div className="empty-sections">
            <i className="ri-layout-3-line"></i>
            <p>Agrega secciones para empezar</p>
          </div>
        ) : (
          currentSong.sections.map((section, sectionIdx) => (
            <div 
              key={section.id} 
              className="section-card"
              style={{ borderLeftColor: section.color }}
            >
              <div className="section-header">
                <div className="section-title">
                  <span 
                    className="section-color-dot" 
                    style={{ backgroundColor: section.color }}
                  />
                  <span className="section-name">{section.name}</span>
                  <span className="section-duration">{getTotalDuration(section)}</span>
                </div>
                <div className="section-controls">
                  <div className="repeat-control">
                    <button 
                      onClick={() => updateSection(section.id, { 
                        repeatCount: Math.max(1, section.repeatCount - 1) 
                      })}
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span>×{section.repeatCount}</span>
                    <button 
                      onClick={() => updateSection(section.id, { 
                        repeatCount: section.repeatCount + 1 
                      })}
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                  <button 
                    className="add-chord-header-btn"
                    onClick={() => setShowChordPicker(section.id)}
                    title="Agregar acorde"
                  >
                    <i className="ri-music-2-line"></i>
                  </button>
                  <button 
                    className="delete-section-btn"
                    onClick={() => deleteSection(section.id)}
                    title="Eliminar sección"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              {/* Chords Grid */}
              <div className="chords-grid">
                {section.chords.map((chord, chordIdx) => (
                  <div
                    key={chord.id}
                    className={`chord-item ${draggedChord?.sectionId === section.id && draggedChord?.index === chordIdx ? 'dragging' : ''} ${isPlaying && currentSectionIndex === sectionIdx && currentChordIndex === chordIdx ? 'playing' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(section.id, chordIdx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(section.id, chordIdx)}
                    onTouchStart={() => handleTouchStart(section.id, chordIdx)}
                  >
                    <div className="chord-name">{chord.name}</div>
                    <div 
                      className="chord-degree"
                      style={{ color: chord.degreesColor }}
                    >
                      {chord.degrees}
                    </div>
                    <div className="chord-beats">
                      <button 
                        onClick={() => handleChordBeatsChange(section.id, chord.id, Math.max(1, chord.beats - 1))}
                      >
                        -
                      </button>
                      <span>{chord.beats}</span>
                      <button 
                        onClick={() => handleChordBeatsChange(section.id, chord.id, chord.beats + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-chord-btn"
                      onClick={() => removeChordFromSection(section.id, chord.id)}
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Chord Picker */}
              {showChordPicker === section.id && (
                <div className="chord-picker">
                  <div className="chord-picker-header">
                    <span>Selecciona un acorde ({currentSong.key})</span>
                    <button onClick={() => setShowChordPicker(null)}>
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                  <div className="chord-picker-grid">
                    {scales.map(scale => (
                      <button
                        key={scale.degrees}
                        className="chord-picker-item"
                        onClick={() => handleAddChord(section.id, scale)}
                      >
                        <span className="picker-chord-name">{scale.name}</span>
                        <span 
                          className="picker-chord-degree"
                          style={{ color: scale.degreesColor }}
                        >
                          {scale.degrees}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Add Section Button */}
        <button 
          className="add-section-btn"
          onClick={() => setShowSectionModal(true)}
        >
          <i className="ri-add-line"></i>
          Agregar Sección
        </button>
      </div>

      {/* Section Modal */}
      {showSectionModal && (
        <div className="modal-backdrop" onClick={() => setShowSectionModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Nueva Sección</h2>
            
            <div className="presets-grid">
              {SECTION_PRESETS.map(preset => (
                <button
                  key={preset.name}
                  className={`preset-btn ${selectedPreset.name === preset.name ? 'active' : ''}`}
                  style={{ 
                    borderColor: selectedPreset.name === preset.name ? preset.color : 'transparent',
                    backgroundColor: selectedPreset.name === preset.name ? `${preset.color}20` : '#3A3A4A'
                  }}
                  onClick={() => setSelectedPreset(preset)}
                >
                  <span 
                    className="preset-dot" 
                    style={{ backgroundColor: preset.color }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>Nombre personalizado (opcional)</label>
              <input
                type="text"
                value={newSectionName}
                onChange={e => setNewSectionName(e.target.value)}
                placeholder={selectedPreset.name}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowSectionModal(false)}>
                Cancelar
              </button>
              <button className="btn-create" onClick={handleAddSection}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Selector Modal */}
      {showKeySelector && (
        <div className="modal-backdrop" onClick={() => setShowKeySelector(false)}>
          <div className="modal-content key-selector-modal" onClick={e => e.stopPropagation()}>
            <h2>Cambiar Tonalidad</h2>
            <p className="transpose-warning">
              <i className="ri-information-line"></i>
              Todos los acordes se transpondrán automáticamente
            </p>
            
            <div className="keys-grid">
              {allKeys.map(key => (
                <button
                  key={key}
                  className={`key-option ${key === currentSong.key ? 'current' : ''}`}
                  onClick={() => handleTransposeKey(key)}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowKeySelector(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BPM Editor Modal */}
      {showBpmEditor && (
        <div className="modal-backdrop" onClick={() => setShowBpmEditor(false)}>
          <div className="modal-content bpm-editor-modal" onClick={e => e.stopPropagation()}>
            <h2>Cambiar BPM</h2>
            
            <div className="bpm-editor">
              <button 
                className="bpm-btn"
                onClick={() => handleBpmChange(tempBpm - 5)}
              >
                <i className="ri-subtract-line"></i>
              </button>
              
              <div className="bpm-display">
                <input
                  type="number"
                  value={tempBpm}
                  onChange={(e) => handleBpmChange(parseInt(e.target.value) || 120)}
                  min="40"
                  max="240"
                />
                <span>BPM</span>
              </div>
              
              <button 
                className="bpm-btn"
                onClick={() => handleBpmChange(tempBpm + 5)}
              >
                <i className="ri-add-line"></i>
              </button>
            </div>

            <div className="bpm-presets">
              <button onClick={() => setTempBpm(60)}>Lento (60)</button>
              <button onClick={() => setTempBpm(90)}>Moderado (90)</button>
              <button onClick={() => setTempBpm(120)}>Normal (120)</button>
              <button onClick={() => setTempBpm(140)}>Rápido (140)</button>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowBpmEditor(false)}>
                Cancelar
              </button>
              <button className="btn-create" onClick={handleSaveBpm}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedEditor;
