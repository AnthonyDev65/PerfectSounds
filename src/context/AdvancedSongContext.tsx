import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AdvancedSong, SongSection, ChordItem, SECTION_COLORS } from '../models/AdvancedSong';
import { useAuth } from './AuthContext';
import { CloudSyncService } from '../services/CloudSyncService';

interface AdvancedSongContextState {
  advancedSongs: AdvancedSong[];
  currentSong: AdvancedSong | null;
  isPlaying: boolean;
  currentSectionIndex: number;
  currentChordIndex: number;
  currentRepeat: number;
  
  // CRUD Songs
  createSong: (name: string, key: string, bpm?: number) => AdvancedSong;
  updateSong: (song: AdvancedSong) => void;
  deleteSong: (id: string) => void;
  loadSong: (id: string) => void;
  closeSong: () => void;
  syncWithCloud: () => Promise<void>;
  
  // Sections
  addSection: (name: string, color?: string) => void;
  updateSection: (sectionId: string, updates: Partial<SongSection>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  
  // Chords in sections
  addChordToSection: (sectionId: string, chord: Omit<ChordItem, 'id'>) => void;
  updateChordInSection: (sectionId: string, chordId: string, updates: Partial<ChordItem>) => void;
  removeChordFromSection: (sectionId: string, chordId: string) => void;
  reorderChordsInSection: (sectionId: string, fromIndex: number, toIndex: number) => void;
  
  // Playback
  play: () => void;
  pause: () => void;
  stop: () => void;
}

const AdvancedSongContext = createContext<AdvancedSongContextState | undefined>(undefined);

export const useAdvancedSong = () => {
  const context = useContext(AdvancedSongContext);
  if (!context) {
    throw new Error('useAdvancedSong must be used within AdvancedSongProvider');
  }
  return context;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export const AdvancedSongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [advancedSongs, setAdvancedSongs] = useState<AdvancedSong[]>([]);
  const [currentSong, setCurrentSong] = useState<AdvancedSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentRepeat, setCurrentRepeat] = useState(1);
  const { user } = useAuth();

  // Función para reproducir sonido de metrónomo
  const playMetronomeSound = (isAccent: boolean = false) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = isAccent ? 1200 : 800;
      oscillator.type = 'sine';
      gainNode.gain.value = isAccent ? 0.3 : 0.15;

      const now = audioContext.currentTime;
      oscillator.start(now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      oscillator.stop(now + 0.05);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Efecto para manejar el playback
  useEffect(() => {
    if (!isPlaying || !currentSong || currentSong.sections.length === 0) {
      return;
    }

    const currentSection = currentSong.sections[currentSectionIndex];
    if (!currentSection || currentSection.chords.length === 0) {
      setIsPlaying(false);
      return;
    }

    const currentChord = currentSection.chords[currentChordIndex];
    if (!currentChord) {
      setIsPlaying(false);
      return;
    }

    // Reproducir sonido en el primer beat
    playMetronomeSound(true);

    // Calcular duración del acorde en milisegundos
    const beatDuration = (60 / currentSong.bpm) * 1000;
    const chordDuration = beatDuration * currentChord.beats;

    const timer = setTimeout(() => {
      // Avanzar al siguiente acorde
      if (currentChordIndex < currentSection.chords.length - 1) {
        setCurrentChordIndex(prev => prev + 1);
      } else {
        // Fin de la sección
        if (currentRepeat < currentSection.repeatCount) {
          // Repetir la sección
          setCurrentRepeat(prev => prev + 1);
          setCurrentChordIndex(0);
        } else {
          // Avanzar a la siguiente sección
          if (currentSectionIndex < currentSong.sections.length - 1) {
            setCurrentSectionIndex(prev => prev + 1);
            setCurrentChordIndex(0);
            setCurrentRepeat(1);
          } else {
            // Fin de la canción
            setIsPlaying(false);
            setCurrentSectionIndex(0);
            setCurrentChordIndex(0);
            setCurrentRepeat(1);
          }
        }
      }
    }, chordDuration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentSong, currentSectionIndex, currentChordIndex, currentRepeat]);

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('advancedSongs');
      if (saved) {
        setAdvancedSongs(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading advanced songs:', error);
    }
  }, []);

  // Sincronizar con Supabase cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      syncWithCloud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const syncWithCloud = async () => {
    if (!user) return;

    try {
      const synced = await CloudSyncService.syncAdvancedSongs(user.id, advancedSongs);
      setAdvancedSongs(synced);
      localStorage.setItem('advancedSongs', JSON.stringify(synced));
    } catch (error) {
      console.error('Error syncing advanced songs with cloud:', error);
    }
  };

  // Guardar en localStorage
  const saveSongs = async (songs: AdvancedSong[]) => {
    localStorage.setItem('advancedSongs', JSON.stringify(songs));
    setAdvancedSongs(songs);
  };

  const createSong = (name: string, key: string, bpm = 120): AdvancedSong => {
    const newSong: AdvancedSong = {
      id: generateId(),
      name,
      key,
      bpm,
      sections: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    saveSongs([...advancedSongs, newSong]);
    setCurrentSong(newSong);
    
    // Sincronizar con la nube si hay sesión
    if (user) {
      CloudSyncService.saveAdvancedSong(user.id, newSong);
    }
    
    return newSong;
  };

  const updateSong = (song: AdvancedSong) => {
    const updated = { ...song, updatedAt: Date.now() };
    const newSongs = advancedSongs.map(s => s.id === song.id ? updated : s);
    saveSongs(newSongs);
    if (currentSong?.id === song.id) {
      setCurrentSong(updated);
    }
    
    // Sincronizar con la nube si hay sesión
    if (user) {
      CloudSyncService.saveAdvancedSong(user.id, updated);
    }
  };

  const deleteSong = async (id: string) => {
    saveSongs(advancedSongs.filter(s => s.id !== id));
    if (currentSong?.id === id) {
      setCurrentSong(null);
    }
    
    // Eliminar de la nube si hay sesión
    if (user) {
      await CloudSyncService.deleteAdvancedSong(user.id, id);
    }
  };

  const loadSong = (id: string) => {
    const song = advancedSongs.find(s => s.id === id);
    if (song) {
      setCurrentSong(song);
      stop();
    }
  };

  const closeSong = () => {
    setCurrentSong(null);
    stop();
  };

  // Sections
  const addSection = (name: string, color = SECTION_COLORS.custom) => {
    if (!currentSong) return;
    const newSection: SongSection = {
      id: generateId(),
      name,
      chords: [],
      repeatCount: 1,
      color
    };
    const updated = {
      ...currentSong,
      sections: [...currentSong.sections, newSection]
    };
    updateSong(updated);
  };

  const updateSection = (sectionId: string, updates: Partial<SongSection>) => {
    if (!currentSong) return;
    const updated = {
      ...currentSong,
      sections: currentSong.sections.map(s => 
        s.id === sectionId ? { ...s, ...updates } : s
      )
    };
    updateSong(updated);
  };

  const deleteSection = (sectionId: string) => {
    if (!currentSong) return;
    const updated = {
      ...currentSong,
      sections: currentSong.sections.filter(s => s.id !== sectionId)
    };
    updateSong(updated);
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    if (!currentSong) return;
    const sections = [...currentSong.sections];
    const [removed] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, removed);
    updateSong({ ...currentSong, sections });
  };

  // Chords
  const addChordToSection = (sectionId: string, chord: Omit<ChordItem, 'id'>) => {
    if (!currentSong) return;
    const newChord: ChordItem = { ...chord, id: generateId() };
    const updated = {
      ...currentSong,
      sections: currentSong.sections.map(s => 
        s.id === sectionId 
          ? { ...s, chords: [...s.chords, newChord] }
          : s
      )
    };
    updateSong(updated);
  };

  const updateChordInSection = (sectionId: string, chordId: string, updates: Partial<ChordItem>) => {
    if (!currentSong) return;
    const updated = {
      ...currentSong,
      sections: currentSong.sections.map(s => 
        s.id === sectionId 
          ? { ...s, chords: s.chords.map(c => c.id === chordId ? { ...c, ...updates } : c) }
          : s
      )
    };
    updateSong(updated);
  };

  const removeChordFromSection = (sectionId: string, chordId: string) => {
    if (!currentSong) return;
    const updated = {
      ...currentSong,
      sections: currentSong.sections.map(s => 
        s.id === sectionId 
          ? { ...s, chords: s.chords.filter(c => c.id !== chordId) }
          : s
      )
    };
    updateSong(updated);
  };

  const reorderChordsInSection = (sectionId: string, fromIndex: number, toIndex: number) => {
    if (!currentSong) return;
    const updated = {
      ...currentSong,
      sections: currentSong.sections.map(s => {
        if (s.id !== sectionId) return s;
        const chords = [...s.chords];
        const [removed] = chords.splice(fromIndex, 1);
        chords.splice(toIndex, 0, removed);
        return { ...s, chords };
      })
    };
    updateSong(updated);
  };

  // Playback
  const play = () => {
    if (!currentSong || currentSong.sections.length === 0) return;
    setIsPlaying(true);
  };
  
  const pause = () => setIsPlaying(false);
  
  const stop = () => {
    setIsPlaying(false);
    setCurrentSectionIndex(0);
    setCurrentChordIndex(0);
    setCurrentRepeat(1);
  };

  const value: AdvancedSongContextState = {
    advancedSongs,
    currentSong,
    isPlaying,
    currentSectionIndex,
    currentChordIndex,
    currentRepeat,
    createSong,
    updateSong,
    deleteSong,
    loadSong,
    closeSong,
    syncWithCloud,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    addChordToSection,
    updateChordInSection,
    removeChordFromSection,
    reorderChordsInSection,
    play,
    pause,
    stop
  };

  return (
    <AdvancedSongContext.Provider value={value}>
      {children}
    </AdvancedSongContext.Provider>
  );
};
