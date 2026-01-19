import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface SavedSong {
  id: string;
  name: string;
  chords: string[];
  degrees: string[];
  key: string;
  createdAt: number;
}

interface SongsState {
  songs: SavedSong[];
  saveSong: (name: string, chords: string[], degrees: string[], key: string) => void;
  deleteSong: (id: string) => void;
  getSong: (id: string) => SavedSong | undefined;
}

const SongsContext = createContext<SongsState | undefined>(undefined);

export const useSongs = () => {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error('useSongs must be used within a SongsProvider');
  }
  return context;
};

interface SongsProviderProps {
  children: ReactNode;
}

export const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<SavedSong[]>([]);

  // Cargar canciones desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedSongs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSongs(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading songs from localStorage:', error);
    }
  }, []);

  const saveSong = (name: string, chords: string[], degrees: string[], key: string) => {
    const newSong: SavedSong = {
      id: Date.now().toString(),
      name,
      chords,
      degrees,
      key,
      createdAt: Date.now()
    };
    
    const updated = [...songs, newSong];
    setSongs(updated);
    localStorage.setItem('savedSongs', JSON.stringify(updated));
  };

  const deleteSong = (id: string) => {
    const updated = songs.filter(song => song.id !== id);
    setSongs(updated);
    localStorage.setItem('savedSongs', JSON.stringify(updated));
  };

  const getSong = (id: string) => {
    return songs.find(song => song.id === id);
  };

  const value: SongsState = {
    songs,
    saveSong,
    deleteSong,
    getSong
  };

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};