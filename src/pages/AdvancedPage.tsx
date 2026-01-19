import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdvancedSong } from '../context/AdvancedSongContext';
import { SECTION_PRESETS } from '../models/AdvancedSong';
import AdvancedEditor from '../components/AdvancedEditor';
import './AdvancedPage.css';

const AdvancedPage: React.FC = () => {
  const navigate = useNavigate();
  const { advancedSongs, currentSong, createSong, loadSong, deleteSong } = useAdvancedSong();
  const [showNewSongModal, setShowNewSongModal] = useState(false);
  const [newSongName, setNewSongName] = useState('');
  const [newSongKey, setNewSongKey] = useState('C');
  const [newSongBpm, setNewSongBpm] = useState(120);

  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const handleCreateSong = () => {
    if (newSongName.trim()) {
      createSong(newSongName.trim(), newSongKey, newSongBpm);
      setShowNewSongModal(false);
      setNewSongName('');
      setNewSongKey('C');
      setNewSongBpm(120);
    }
  };

  const handleDeleteSong = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar esta canción avanzada?')) {
      deleteSong(id);
    }
  };

  // Si hay una canción abierta, mostrar el editor
  if (currentSong) {
    return <AdvancedEditor />;
  }

  return (
    <div className="advanced-page">
      <div className="advanced-header">
        <h1>Notas Avanzadas</h1>
        <p>Crea canciones con secciones personalizadas</p>
      </div>

      <button 
        className="create-song-btn"
        onClick={() => setShowNewSongModal(true)}
      >
        <i className="ri-add-line"></i>
        Nueva Canción
      </button>

      <div className="advanced-songs-list">
        {advancedSongs.length === 0 ? (
          <div className="empty-state">
            <i className="ri-music-2-line"></i>
            <p>No tienes canciones avanzadas</p>
            <span>Crea una nueva para empezar</span>
          </div>
        ) : (
          advancedSongs.map(song => (
            <div 
              key={song.id} 
              className="advanced-song-card"
              onClick={() => loadSong(song.id)}
            >
              <div className="song-card-info">
                <span className="song-card-name">{song.name}</span>
                <div className="song-card-meta">
                  <span className="song-card-key">{song.key}</span>
                  <span className="song-card-bpm">{song.bpm} BPM</span>
                  <span className="song-card-sections">
                    {song.sections.length} sección{song.sections.length !== 1 ? 'es' : ''}
                  </span>
                </div>
                <div className="song-card-sections-preview">
                  {song.sections.slice(0, 5).map(section => (
                    <span 
                      key={section.id} 
                      className="section-tag"
                      style={{ backgroundColor: section.color }}
                    >
                      {section.name}
                    </span>
                  ))}
                  {song.sections.length > 5 && (
                    <span className="section-tag more">+{song.sections.length - 5}</span>
                  )}
                </div>
              </div>
              <button 
                className="delete-song-btn"
                onClick={(e) => handleDeleteSong(song.id, e)}
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal Nueva Canción */}
      {showNewSongModal && (
        <div className="modal-backdrop" onClick={() => setShowNewSongModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Nueva Canción Avanzada</h2>
            
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={newSongName}
                onChange={e => setNewSongName(e.target.value)}
                placeholder="Nombre de la canción"
                autoFocus
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tonalidad</label>
                <select value={newSongKey} onChange={e => setNewSongKey(e.target.value)}>
                  {keys.map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>BPM</label>
                <input
                  type="number"
                  value={newSongBpm}
                  onChange={e => setNewSongBpm(Number(e.target.value))}
                  min={40}
                  max={240}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowNewSongModal(false)}>
                Cancelar
              </button>
              <button 
                className="btn-create" 
                onClick={handleCreateSong}
                disabled={!newSongName.trim()}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedPage;
