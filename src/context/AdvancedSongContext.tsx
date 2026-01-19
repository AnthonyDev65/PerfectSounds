import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AdvancedSong, SongSection, ChordItem, SECTION_COLORS } from '../models/AdvancedSong';

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

const generateId = () => Math.random().toString(36).substr(2, 9);

export const AdvancedSongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [advancedSongs, setAdvancedSongs] = useState<AdvancedSong[]>([]);
  const [currentSong, setCurrentSong] = useState<AdvancedSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentRepeat, setCurrentRepeat] = useState(1);

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

  // Guardar en localStorage
  const saveSongs = (songs: AdvancedSong[]) => {
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
    return newSong;
  };

  const updateSong = (song: AdvancedSong) => {
    const updated = { ...song, updatedAt: Date.now() };
    const newSongs = advancedSongs.map(s => s.id === song.id ? updated : s);
    saveSongs(newSongs);
    if (currentSong?.id === song.id) {
      setCurrentSong(updated);
    }
  };

  const deleteSong = (id: string) => {
    saveSongs(advancedSongs.filter(s => s.id !== id));
    if (currentSong?.id === id) {
      setCurrentSong(null);
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
  const play = () => setIsPlaying(true);
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
