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
    selectedDegrees,
    setSelectedDegrees,
    selectionOrder,
    setSelectionOrder,
    toggleDegreeSelection 
  } = useScaleSelection();
  const { isFavoriteKey, addFavoriteKey, removeFavoriteKey } = useFavorites();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [subMenuOptions, setSubMenuOptions] = useState<NoteOption[]>([]);
  const [selectedScales, setSelectedScales] = useState<Scale[]>([]);
  const [gridSpan, setGridSpan] = useState(1);
  const [showMetronome, setShowMetronome] = useState(false);
  const [showSongsModal, setShowSongsModal] = useState(false);

  const loadScales = useCallback((noteKey: string) => {
    setCurrentNote(noteKey);
    const loadedScales = MusicService.loadScales(noteKey);
    
    // Leer directamente del localStorage para asegurar que tenemos los datos más recientes
    let degreesToApply = selectedDegrees;
    try {
      const saved = localStorage.getItem('selectedDegrees');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          degreesToApply = parsed;
        }
      }
    } catch (error) {
      console.error('Error reading selectedDegrees:', error);
    }
    
    const scalesWithSelection = MusicService.applySelectedDegrees(loadedScales, degreesToApply);
    setScales(scalesWithSelection);
  }, [setCurrentNote, setScales, selectedDegrees]);

  useEffect(() => {
    if (note) {
      loadScales(note);
    }
  }, [note, loadScales]);

  // Ordenar las escalas seleccionadas según el orden de selección
  useEffect(() => {
    const selected = scales.filter(scale => scale.isSelected);
    
    // Ordenar según selectionOrder
    const orderedSelected = selected.sort((a, b) => {
      const indexA = selectionOrder.indexOf(a.degrees);
      const indexB = selectionOrder.indexOf(b.degrees);
      
      // Si no está en el orden, ponerlo al final
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });
    
    setSelectedScales(orderedSelected);
  }, [scales, selectionOrder]);

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
    const newIsSelected = !scale.isSelected;
    toggleDegreeSelection(scale.degrees, newIsSelected);
    
    const updatedScales = scales.map(s => 
      s.degrees === scale.degrees ? { ...s, isSelected: newIsSelected } : s
    );
    setScales(updatedScales);
  };

  const handleBackButton = () => {
    // Reiniciar la selección al volver atrás
    setSelectedDegrees({});
    setSelectionOrder([]);
    localStorage.removeItem('selectedDegrees');
    localStorage.removeItem('selectionOrder');
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

  // Función para cargar una canción guardada por grados
  const handleLoadSongByDegrees = (degrees: string[]) => {
    // Crear objeto con todos los grados seleccionados
    const newSelectedDegrees: { [key: string]: boolean } = {};
    degrees.forEach(degree => {
      newSelectedDegrees[degree] = true;
    });
    
    // Actualizar el estado de una sola vez
    setSelectedDegrees(newSelectedDegrees);
    setSelectionOrder(degrees); // Mantener el orden guardado
    localStorage.setItem('selectedDegrees', JSON.stringify(newSelectedDegrees));
    localStorage.setItem('selectionOrder', JSON.stringify(degrees));

    // Actualizar las escalas con las nuevas selecciones
    const updatedScales = scales.map(scale => ({
      ...scale,
      isSelected: degrees.includes(scale.degrees)
    }));
    setScales(updatedScales);
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
          currentKey={currentNote}
          onLoadSong={handleLoadSongByDegrees}
        />
      </div>
    </MetronomeProvider>
  );
};

export default ScalesPage;