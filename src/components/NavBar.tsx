import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Error al entrar en pantalla completa:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <nav className="navbar">
      <button 
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
        onClick={() => handleNavClick('/')}
      >
        <i className="ri-home-4-line"></i>
        <span>Inicio</span>
      </button>
      
      <button 
        className={`nav-item ${isActive('/scales') ? 'active' : ''}`}
        onClick={() => handleNavClick('/scales')}
      >
        <i className="ri-music-2-line"></i>
        <span>Notas</span>
      </button>

      <button 
        className={`nav-item ${isActive('/advanced') ? 'active' : ''}`}
        onClick={() => handleNavClick('/advanced')}
      >
        <i className="ri-equalizer-line"></i>
        <span>Avanzado</span>
      </button>

      <button 
        className={`nav-item ${isActive('/songs') ? 'active' : ''}`}
        onClick={() => handleNavClick('/songs')}
      >
        <i className="ri-folder-music-line"></i>
        <span>Canciones</span>
      </button>

      <button 
        className="nav-item"
        onClick={handleFullscreen}
      >
        <i className="ri-fullscreen-line"></i>
        <span>Pantalla</span>
      </button>
    </nav>
  );
};

export default NavBar;