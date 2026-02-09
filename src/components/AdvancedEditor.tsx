import React, { useState } from 'react';
import { useAdvancedSong } from '../context/AdvancedSongContext';
import { MusicService } from '../services/MusicService';
import { SECTION_PRESETS, SongSection, ChordItem } from '../models/AdvancedSong';
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
  const [showBassNotePicker, setShowBassNotePicker] = useState<{ sectionId: string; chordId: string; chordName: string } | null>(null);
  const [draggedChord, setDraggedChord] = useState<{ sectionId: string; index: number } | null>(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(SECTION_PRESETS[0]);
  const [showKeySelector, setShowKeySelector] = useState(false);
  const [showBpmEditor, setShowBpmEditor] = useState(false);
  const [showCapoSelector, setShowCapoSelector] = useState(false);
  const [tempBpm, setTempBpm] = useState(currentSong?.bpm || 120);
  const [visualizerMode, setVisualizerMode] = useState(false);
  const [chordsPerRow, setChordsPerRow] = useState(4);
  const [showVisualizerSettings, setShowVisualizerSettings] = useState(false);
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

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

  const handleCapoChange = (capo: number) => {
    updateSong({ ...currentSong, capo });
    setShowCapoSelector(false);
  };

  const handleVisualizerButtonPress = () => {
    const timer = setTimeout(() => {
      setShowVisualizerSettings(true);
    }, 500); // 500ms para long press
    setLongPressTimer(timer);
  };

  const handleVisualizerButtonRelease = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleVisualizerClick = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    // En modo visualizador, siempre abre el modal
    if (visualizerMode) {
      setShowVisualizerSettings(true);
    } else {
      setVisualizerMode(!visualizerMode);
    }
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const newHidden = new Set(hiddenSections);
    if (newHidden.has(sectionId)) {
      newHidden.delete(sectionId);
    } else {
      newHidden.add(sectionId);
    }
    setHiddenSections(newHidden);
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
        name: MusicService.transposeChord(chord.name, currentSong.key, newKey),
        bassNote: chord.bassNote 
          ? MusicService.transposeNote(chord.bassNote, currentSong.key, newKey)
          : undefined
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
      beats: 4,
      bassNote: undefined,
      extension: undefined
    });
    setShowChordPicker(null);
  };

  const handleAddBassNote = (bassNote: string) => {
    if (!showBassNotePicker) return;
    updateChordInSection(showBassNotePicker.sectionId, showBassNotePicker.chordId, { bassNote });
    setShowBassNotePicker(null);
  };

  const handleAddChordExtension = (extension: string) => {
    if (!showBassNotePicker) return;
    updateChordInSection(showBassNotePicker.sectionId, showBassNotePicker.chordId, { extension });
    setShowBassNotePicker(null);
  };

  const handleRemoveBassNote = (sectionId: string, chordId: string) => {
    updateChordInSection(sectionId, chordId, { bassNote: undefined });
  };

  const handleRemoveExtension = (sectionId: string, chordId: string) => {
    updateChordInSection(sectionId, chordId, { extension: undefined });
  };

  const getChordDisplayName = (chord: ChordItem): string => {
    let displayName = chord.name;
    
    // Agregar extensión si existe
    if (chord.extension) {
      displayName += chord.extension;
    }
    
    // Agregar bajo si existe
    if (chord.bassNote) {
      displayName += `/${chord.bassNote}`;
    }
    
    return displayName;
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
    <div className={`advanced-editor ${visualizerMode ? 'fullscreen-visualizer' : ''}`}>
      {/* Floating Buttons (only in visualizer mode) */}
      {visualizerMode && (
        <div className="floating-buttons">
          <button 
            className="floating-btn exit-btn"
            onClick={() => setVisualizerMode(false)}
            title="Salir del visualizador"
          >
            <i className="ri-close-line"></i>
          </button>
          {isPlaying ? (
            <button 
              className="floating-btn pause-btn"
              onClick={pause}
              title="Pausar"
            >
              <i className="ri-pause-fill"></i>
            </button>
          ) : (
            <button 
              className="floating-btn play-btn"
              onClick={play}
              title="Reproducir"
            >
              <i className="ri-play-fill"></i>
            </button>
          )}
          <button 
            className="floating-btn settings-btn"
            onClick={() => setShowVisualizerSettings(true)}
            title="Configuración del visualizador"
          >
            <i className="ri-settings-3-line"></i>
          </button>
        </div>
      )}

      {/* Header */}
      {!visualizerMode && (
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
            <button 
              className="capo-badge clickable"
              onClick={() => setShowCapoSelector(true)}
              title="Cambiar capo"
            >
              Capo: {currentSong.capo || 0}
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
          <button 
            className={`control-btn ${visualizerMode ? 'active' : ''}`}
            onClick={handleVisualizerClick}
            onMouseDown={handleVisualizerButtonPress}
            onMouseUp={handleVisualizerButtonRelease}
            onMouseLeave={handleVisualizerButtonRelease}
            onTouchStart={handleVisualizerButtonPress}
            onTouchEnd={handleVisualizerButtonRelease}
            title="Modo visualizador (mantén presionado para opciones)"
          >
            <i className="ri-eye-line"></i>
          </button>
        </div>
      </div>
      )}

      {/* Visualizer Mode */}
      {visualizerMode && currentSong.sections.length > 0 && (
        <div className="visualizer-container">
          <div className="visualizer-chords">
            {currentSong.sections
              .filter(section => !hiddenSections.has(section.id))
              .map((section, sectionIdx) => {
                const actualSectionIdx = currentSong.sections.findIndex(s => s.id === section.id);
                return (
                  <div key={section.id} className="visualizer-section">
                    <div className="visualizer-section-header">
                      <span 
                        className="visualizer-section-dot" 
                        style={{ backgroundColor: section.color }}
                      />
                      <span className="visualizer-section-name">{section.name}</span>
                      {section.repeatCount > 1 && (
                        <span className="visualizer-repeat">×{section.repeatCount}</span>
                      )}
                    </div>
                    <div 
                      className="visualizer-chords-grid"
                      style={{ 
                        gridTemplateColumns: `repeat(${chordsPerRow}, 1fr)` 
                      }}
                    >
                      {section.chords.map((chord, chordIdx) => (
                        <div
                          key={chord.id}
                          className={`visualizer-chord ${isPlaying && currentSectionIndex === actualSectionIdx && currentChordIndex === chordIdx ? 'playing' : ''}`}
                        >
                          <div className="visualizer-chord-name">{getChordDisplayName(chord)}</div>
                          <div 
                            className="visualizer-chord-degree"
                            style={{ color: chord.degreesColor }}
                          >
                            {chord.degrees}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Sections */}
      {!visualizerMode && (
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
                    <div className="chord-name">{getChordDisplayName(chord)}</div>
                    <div 
                      className="chord-degree"
                      style={{ color: chord.degreesColor }}
                    >
                      {chord.degrees}
                    </div>
                    <div className="chord-actions">
                      <button 
                        className="bass-note-btn"
                        onClick={() => setShowBassNotePicker({ sectionId: section.id, chordId: chord.id, chordName: chord.name })}
                        title={chord.bassNote || chord.extension ? "Modificar acorde" : "Agregar extensión o bajo"}
                      >
                        <i className={chord.bassNote || chord.extension ? "ri-music-fill" : "ri-music-line"}></i>
                      </button>
                      {(chord.bassNote || chord.extension) && (
                        <button 
                          className="remove-bass-btn"
                          onClick={() => {
                            if (chord.extension) handleRemoveExtension(section.id, chord.id);
                            if (chord.bassNote) handleRemoveBassNote(section.id, chord.id);
                          }}
                          title="Quitar modificaciones"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                      )}
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
              {showChordPicker === section.id && !visualizerMode && (
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
      )}

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

      {/* Capo Selector Modal */}
      {showCapoSelector && (
        <div className="modal-backdrop" onClick={() => setShowCapoSelector(false)}>
          <div className="modal-content capo-selector-modal" onClick={e => e.stopPropagation()}>
            <h2>Seleccionar Capo</h2>
            <p className="modal-description">
              Elige el traste donde colocar el capo
            </p>
            
            <div className="capo-grid">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(capo => (
                <button
                  key={capo}
                  className={`capo-option ${(currentSong.capo || 0) === capo ? 'current' : ''}`}
                  onClick={() => handleCapoChange(capo)}
                >
                  {capo === 0 ? 'Sin capo' : `Traste ${capo}`}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowCapoSelector(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bass Note Picker Modal */}
      {showBassNotePicker && (
        <div className="modal-backdrop" onClick={() => setShowBassNotePicker(null)}>
          <div className="modal-content bass-note-picker-modal" onClick={e => e.stopPropagation()}>
            <h2>Modificar Acorde: {showBassNotePicker.chordName}</h2>
            <p className="modal-description">
              Agrega extensiones o elige una nota de bajo
            </p>
            
            <div className="chord-extensions-section">
              <h3>Extensiones</h3>
              <div className="chord-extensions-grid">
                <button
                  className="extension-option"
                  onClick={() => handleAddChordExtension('7')}
                >
                  7
                </button>
                <button
                  className="extension-option"
                  onClick={() => handleAddChordExtension('maj7')}
                >
                  maj7
                </button>
                <button
                  className="extension-option"
                  onClick={() => handleAddChordExtension('9')}
                >
                  9
                </button>
                <button
                  className="extension-option"
                  onClick={() => handleAddChordExtension('sus2')}
                >
                  sus2
                </button>
                <button
                  className="extension-option"
                  onClick={() => handleAddChordExtension('sus4')}
                >
                  sus4
                </button>
                <button
                  className="extension-option"
                  onClick={() => handleAddChordExtension('add9')}
                >
                  add9
                </button>
              </div>
            </div>

            <div className="bass-notes-section">
              <h3>Bajo (Slash Chord)</h3>
              <div className="bass-notes-grid">
                {MusicService.getAllNotes().map(note => (
                  <button
                    key={note}
                    className="bass-note-option"
                    onClick={() => handleAddBassNote(note)}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowBassNotePicker(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visualizer Settings Modal */}
      {showVisualizerSettings && (
        <div className="modal-backdrop" onClick={() => setShowVisualizerSettings(false)}>
          <div className="modal-content visualizer-settings-modal" onClick={e => e.stopPropagation()}>
            <h2>Configuración del Visualizador</h2>
            
            <div className="form-group">
              <label>Acordes por fila</label>
              <div className="chords-per-row-selector-modal">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    className={`row-btn-modal ${chordsPerRow === num ? 'active' : ''}`}
                    onClick={() => setChordsPerRow(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Secciones visibles</label>
              <div className="sections-visibility-list">
                {currentSong.sections.map(section => (
                  <button
                    key={section.id}
                    className={`section-visibility-item ${hiddenSections.has(section.id) ? 'hidden' : 'visible'}`}
                    onClick={() => toggleSectionVisibility(section.id)}
                  >
                    <span 
                      className="section-visibility-dot" 
                      style={{ backgroundColor: section.color }}
                    />
                    <span className="section-visibility-name">{section.name}</span>
                    <i className={`ri-eye-${hiddenSections.has(section.id) ? 'off' : ''}-line`}></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-create" onClick={() => setShowVisualizerSettings(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedEditor;
