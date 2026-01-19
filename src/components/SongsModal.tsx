import React, { useState } from 'react';
import { useSongs, SavedSong } from '../context/SongsContext';
import './SongsModal.css';

interface SongsModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentChords: string[];
  currentDegrees: string[];
  currentKey: string;
  onLoadSong: (degrees: string[]) => void;
}

const SongsModal: React.FC<SongsModalProps> = ({ 
  isVisible, 
  onClose, 
  currentChords,
  currentDegrees,
  currentKey,
  onLoadSong 
}) => {
  const { songs, saveSong, deleteSong } = useSongs();
  const [songName, setSongName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  if (!isVisible) return null;

  const handleSave = () => {
    if (songName.trim() && currentChords.length > 0) {
      saveSong(songName.trim(), currentChords, currentDegrees, currentKey);
      setSongName('');
      setShowSaveForm(false);
    }
  };

  const handleLoad = (song: SavedSong) => {
    // Si la canción tiene degrees, usarlos; si no, es una canción antigua
    const degreesToLoad = song.degrees && song.degrees.length > 0 
      ? song.degrees 
      : [];
    
    if (degreesToLoad.length > 0) {
      onLoadSong(degreesToLoad);
    }
    onClose();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSong(id);
  };

  return (
    <div className="songs-modal-backdrop" onClick={onClose}>
      <div className="songs-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="songs-modal-header">
          <h3>Mis Canciones</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Botón para guardar nueva canción */}
        {!showSaveForm && (
          <button 
            className={`save-new-btn ${currentChords.length === 0 ? 'disabled' : ''}`}
            onClick={() => currentChords.length > 0 && setShowSaveForm(true)}
            disabled={currentChords.length === 0}
          >
            <i className="ri-add-line"></i>
            {currentChords.length > 0 
              ? 'Guardar acordes actuales' 
              : 'Selecciona acordes para guardar'}
          </button>
        )}

        {/* Formulario para guardar */}
        {showSaveForm && currentChords.length > 0 && (
          <div className="save-form">
            <div className="current-chords-preview">
              <span className="preview-label">Acordes:</span>
              <span className="preview-chords">{currentChords.join(' → ')}</span>
            </div>
            <input
              type="text"
              placeholder="Nombre de la canción..."
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="song-name-input"
              autoFocus
            />
            <div className="save-form-buttons">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowSaveForm(false);
                  setSongName('');
                }}
              >
                Cancelar
              </button>
              <button 
                className="confirm-save-btn"
                onClick={handleSave}
                disabled={!songName.trim()}
              >
                <i className="ri-save-line"></i>
                Guardar
              </button>
            </div>
          </div>
        )}

        {/* Lista de canciones guardadas */}
        <div className="songs-list">
          {songs.length === 0 ? (
            <div className="empty-state">
              <i className="ri-music-2-line"></i>
              <p>No tienes canciones guardadas</p>
            </div>
          ) : (
            songs.map((song) => (
              <div 
                key={song.id} 
                className="song-item"
                onClick={() => handleLoad(song)}
              >
                <div className="song-info">
                  <span className="song-name">{song.name}</span>
                  <span className="song-chords">{song.chords.join(' → ')}</span>
                </div>
                <button 
                  className="delete-song-btn"
                  onClick={(e) => handleDelete(song.id, e)}
                  title="Eliminar"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SongsModal;