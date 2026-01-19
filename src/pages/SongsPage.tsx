import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSongs } from '../context/SongsContext';
import './SongsPage.css';

const SongsPage: React.FC = () => {
  const navigate = useNavigate();
  const { songs, deleteSong } = useSongs();

  const handleSongClick = (song: { chords: string[], degrees?: string[], key?: string }) => {
    if (song.degrees && song.degrees.length > 0 && song.key) {
      const degreesObj: { [key: string]: boolean } = {};
      song.degrees.forEach(degree => {
        degreesObj[degree] = true;
      });
      localStorage.setItem('selectedDegrees', JSON.stringify(degreesObj));
      localStorage.setItem('selectionOrder', JSON.stringify(song.degrees)); // Guardar el orden
      navigate(`/scales/${song.key}`);
    }
  };

  const handleDeleteSong = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSong(id);
  };

  return (
    <div className="songs-page">
      <div className="songs-page-header">
        <h1>Mis Canciones</h1>
        <p>{songs.length} canción{songs.length !== 1 ? 'es' : ''} guardada{songs.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="songs-page-content">
        {songs.length === 0 ? (
          <div className="songs-empty-state">
            <i className="ri-music-2-line"></i>
            <p>No tienes canciones guardadas</p>
            <span>Selecciona acordes en la sección de Notas y guárdalos como canción</span>
          </div>
        ) : (
          <div className="songs-page-list">
            {songs.map((song) => (
              <div 
                key={song.id} 
                className="songs-page-item"
                onClick={() => handleSongClick(song)}
              >
                <div className="songs-page-item-info">
                  <span className="songs-page-item-name">{song.name}</span>
                  <span className="songs-page-item-chords">{song.chords.join(' → ')}</span>
                </div>
                <button 
                  className="songs-page-delete-btn"
                  onClick={(e) => handleDeleteSong(song.id, e)}
                  title="Eliminar"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongsPage;