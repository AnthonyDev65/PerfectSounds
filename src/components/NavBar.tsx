import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdvancedSong } from '../context/AdvancedSongContext';
import UserProfile from './UserProfile';
import HomeIcon from './icons/HomeIcon';
import MusicNoteIcon from './icons/MusicNoteIcon';
import AdvancedIcon from './icons/AdvancedIcon';
import FolderMusicIcon from './icons/FolderMusicIcon';
import TunerIcon from './icons/TunerIcon';
import './NavBar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { advancedSongs, loadSong } = useAdvancedSong();

  const isActive = (path: string) => {
    if (path === '/scales') {
      return location.pathname.startsWith('/scales');
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    if (path === '/scales') {
      if (!location.pathname.startsWith('/scales')) {
        navigate('/scales/C');
      }
    } else {
      navigate(path);
    }
  };

  const handleSongClick = (songId: string) => {
    loadSong(songId);
    navigate('/advanced');
  };

  return (
    <nav className="navbar">
      <button 
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
        onClick={() => handleNavClick('/')}
      >
        <HomeIcon className="nav-icon" />
        <span className="nav-text">Inicio</span>
      </button>
      
      <button 
        className={`nav-item ${isActive('/scales') ? 'active' : ''}`}
        onClick={() => handleNavClick('/scales')}
      >
        <MusicNoteIcon className="nav-icon" />
        <span className="nav-text">Notas</span>
      </button>

      <button 
        className={`nav-item ${isActive('/advanced') ? 'active' : ''}`}
        onClick={() => handleNavClick('/advanced')}
      >
        <AdvancedIcon className="nav-icon" />
        <span className="nav-text">Acordes</span>
      </button>

      <button 
        className={`nav-item ${isActive('/songs') ? 'active' : ''}`}
        onClick={() => handleNavClick('/songs')}
      >
        <FolderMusicIcon className="nav-icon" />
        <span className="nav-text">Canciones</span>
      </button>

      <button 
        className={`nav-item ${isActive('/tuner') ? 'active' : ''}`}
        onClick={() => handleNavClick('/tuner')}
      >
        <TunerIcon className="nav-icon" size={22} />
        <span className="nav-text">Afinador</span>
      </button>

      <div className="nav-spacer" />

      <div className="nav-user">
        <UserProfile />
      </div>

      {/* Acordes Section - Solo en Desktop */}
      <div className="nav-acordes-section">
        <div className="nav-acordes-header">
          <span className="nav-acordes-title">Acordes</span>
        </div>
        
        <div className="nav-acordes-list">
          {advancedSongs.length === 0 ? (
            <div className="nav-acordes-empty">
              <span>Sin canciones</span>
            </div>
          ) : (
            advancedSongs.slice(0, 5).map(song => (
              <button
                key={song.id}
                className="nav-acordes-item"
                onClick={() => handleSongClick(song.id)}
                title={song.name}
              >
                <span className="nav-acordes-name">{song.name}</span>
                <span className="nav-acordes-meta">{song.key} • {song.bpm} BPM</span>
              </button>
            ))
          )}
          
          {advancedSongs.length > 5 && (
            <button 
              className="nav-acordes-more"
              onClick={() => navigate('/advanced')}
            >
              Ver todas ({advancedSongs.length})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;