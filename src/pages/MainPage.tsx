import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { MusicService } from '../services/MusicService';
import './MainPage.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { isFavoriteKey, addFavoriteKey, removeFavoriteKey, favoriteKeys } = useFavorites();

  const handleNoteClick = (note: string) => {
    localStorage.removeItem('selectedDegrees');
    navigate(`/scales/${note}`);
  };

  const handleFavoriteClick = (note: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavoriteKey(note)) {
      removeFavoriteKey(note);
    } else {
      addFavoriteKey(note);
    }
  };

  const notes = MusicService.getAllNotes();

  return (
    <div className="main-page">
      <div className="page-header">
        <h1>Perfect Sound</h1>
        <p>Selecciona una tonalidad para explorar sus escalas</p>
        {favoriteKeys.length > 0 && (
          <div className="favorites-counter">
            <i className="ri-star-fill"></i>
            <span>{favoriteKeys.length} favorito{favoriteKeys.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note} className="note-card">
            <button
              className="note-button"
              onClick={() => handleNoteClick(note)}
            >
              {note}
            </button>
            <button
              className={`favorite-btn ${isFavoriteKey(note) ? 'active' : ''}`}
              onClick={(e) => handleFavoriteClick(note, e)}
              title={isFavoriteKey(note) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <i className={`ri-star-${isFavoriteKey(note) ? 'fill' : 'line'}`}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;