import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScaleSelection } from '../context/ScaleSelectionContext';
import { useFavorites } from '../context/FavoritesContext';
import { MetronomeProvider } from '../context/MetronomeContext';
import { MusicService } from '../services/MusicService';
import { Scale } from '../models/Scale';
import { NoteOption } from '../models/NoteOption';
import DynamicIsland from '../components/DynamicIsland';
import ScalesCarousel from '../components/ScalesCarousel';
import SelectedScalesGrid from '../components/SelectedScalesGrid';
import MetronomeControls from '../components/MetronomeControls';
import NotesOverlay from '../components/NotesOverlay';
import SubMenu from '../components/SubMenu';
import SongsModal from '../components/SongsModal';
import MetronomeIcon from '../components/icons/MetronomeIcon';
import './ScalesPage.css';

const ScalesPage: React.FC = () => {
  const { note } = useParams<{ note: string }>();
  const navigate = useNavigate();
  const { 
    currentNote, 
    setCurrentNote, 
    scales, 
    setScales, 
    selectedScales,
    addScale,
    removeScaleAt,
    reset
  } = useScaleSelection();
  const { isFavoriteKey, addFavoriteKey, removeFavoriteKey } = useFavorites();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [subMenuOptions, setSubMenuOptions] = useState<NoteOption[]>([]);
  const [gridSpan, setGridSpan] = useState(1);
  const [showMetronome, setShowMetronome] = useState(false);
  const [showSongsModal, setShowSongsModal] = useState(false);

  const loadScales = useCallback((noteKey: string) => {
    setCurrentNote(noteKey);
    const loadedScales = MusicService.loadScales(noteKey);
    setScales(loadedScales);
  }, [setCurrentNote, setScales]);

  useEffect(() => {
    if (note) {
      loadScales(note);
    }
  }, [note, loadScales]);

  const handleIslandClick = () => {
    if (isSubMenuVisible) {
      setIsSubMenuVisible(false);
    }
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleRootNoteTapped = (root: string) => {
    const options: NoteOption[] = [
      { root, display: root },
      { root, display: root + 'm' }
    ];
    setSubMenuOptions(options);
    setIsSubMenuVisible(true);
  };

  const handleNoteOptionTapped = (option: NoteOption) => {
    setIsOverlayVisible(false);
    setIsSubMenuVisible(false);
    loadScales(option.display);
    navigate(`/scales/${option.display}`, { replace: true });
  };

  const handleScaleClick = (scale: Scale) => {
    // Siempre agregar la nota, permitiendo repeticiones
    addScale(scale);
  };

  const handleBackButton = () => {
    // Reiniciar la selección al volver atrás
    reset();
    navigate('/');
  };

  const handleFavoriteToggle = () => {
    if (isFavoriteKey(currentNote)) {
      removeFavoriteKey(currentNote);
    } else {
      addFavoriteKey(currentNote);
    }
  };

  const handleOverlayClose = () => {
    setIsOverlayVisible(false);
    setIsSubMenuVisible(false);
  };

  // Función para cargar una canción guardada
  const handleLoadSongByScales = (scales: Scale[]) => {
    // Cargar las escalas directamente
    reset(); // Limpiar primero
    scales.forEach(scale => addScale(scale));
  };

  const notes = MusicService.getAllNotes();

  // Obtener solo los nombres de las escalas seleccionadas para el metrónomo (en orden)
  const selectedChordNames = selectedScales.map(scale => scale.name);

  return (
    <MetronomeProvider selectedChords={selectedChordNames}>
      <div className="scales-page">
        <div className="header">
          <button className="header-btn back-btn" onClick={handleBackButton}>
            <i className="ri-arrow-left-line"></i>
          </button>
          
          <div className="header-center">
            <button 
              className={`header-btn metronome-btn ${showMetronome ? 'active' : ''}`}
              onClick={() => setShowMetronome(!showMetronome)}
              title={showMetronome ? 'Ocultar metrónomo' : 'Mostrar metrónomo'}
            >
              <MetronomeIcon size={20} />
            </button>
            
            <DynamicIsland 
              currentNote={currentNote} 
              onClick={handleIslandClick} 
            />

            <button 
              className={`header-btn songs-btn ${showSongsModal ? 'active' : ''}`}
              onClick={() => setShowSongsModal(true)}
              title="Mis canciones"
            >
              <i className="ri-music-2-line"></i>
            </button>
          </div>
          
          <div className="header-right">
            <button 
              className={`header-btn favorite-btn ${isFavoriteKey(currentNote) ? 'active' : ''}`}
              onClick={handleFavoriteToggle}
              title={isFavoriteKey(currentNote) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <i className={`ri-star-${isFavoriteKey(currentNote) ? 'fill' : 'line'}`}></i>
            </button>
          </div>
        </div>

        <ScalesCarousel 
          scales={scales} 
          onScaleClick={handleScaleClick} 
        />

        {showMetronome && (
          <MetronomeControls />
        )}

        <SelectedScalesGrid 
          selectedScales={selectedScales}
          gridSpan={gridSpan}
          onGridSpanChange={setGridSpan}
          onRemoveScale={removeScaleAt}
        />

        <NotesOverlay
          isVisible={isOverlayVisible}
          notes={notes}
          onNoteClick={handleRootNoteTapped}
          onClose={handleOverlayClose}
        />

        <SubMenu
          isVisible={isSubMenuVisible}
          options={subMenuOptions}
          onOptionClick={handleNoteOptionTapped}
          onClose={handleOverlayClose}
        />

        <SongsModal
          isVisible={showSongsModal}
          onClose={() => setShowSongsModal(false)}
          currentChords={selectedChordNames}
          currentDegrees={selectedScales.map(s => s.degrees)}
          currentScales={selectedScales}
          currentKey={currentNote}
          onLoadSong={handleLoadSongByScales}
        />
      </div>
    </MetronomeProvider>
  );
};

export default ScalesPage;