import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { CloudSyncService } from '../services/CloudSyncService';
import { Scale } from '../models/Scale';

export interface SavedSong {
  id: string;
  name: string;
  chords: string[];
  degrees: string[];
  scales: Scale[]; // Agregar escalas completas
  key: string;
  createdAt: number;
}

interface SongsState {
  songs: SavedSong[];
  saveSong: (name: string, chords: string[], degrees: string[], scales: Scale[], key: string) => void;
  deleteSong: (id: string) => void;
  getSong: (id: string) => SavedSong | undefined;
  syncWithCloud: () => Promise<void>;
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
  const { user } = useAuth();

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
      const synced = await CloudSyncService.syncSimpleSongs(user.id, songs);
      setSongs(synced);
      localStorage.setItem('savedSongs', JSON.stringify(synced));
    } catch (error) {
      console.error('Error syncing songs with cloud:', error);
    }
  };

  const saveSong = async (name: string, chords: string[], degrees: string[], scales: Scale[], key: string) => {
    const newSong: SavedSong = {
      id: Date.now().toString(),
      name,
      chords,
      degrees,
      scales,
      key,
      createdAt: Date.now()
    };
    
    const updated = [...songs, newSong];
    setSongs(updated);
    localStorage.setItem('savedSongs', JSON.stringify(updated));

    // Sincronizar con la nube si hay sesión
    if (user) {
      await CloudSyncService.saveSimpleSong(user.id, newSong);
    }
  };

  const deleteSong = async (id: string) => {
    const updated = songs.filter(song => song.id !== id);
    setSongs(updated);
    localStorage.setItem('savedSongs', JSON.stringify(updated));

    // Eliminar de la nube si hay sesión
    if (user) {
      await CloudSyncService.deleteSimpleSong(user.id, id);
    }
  };

  const getSong = (id: string) => {
    return songs.find(song => song.id === id);
  };

  const value: SongsState = {
    songs,
    saveSong,
    deleteSong,
    getSong,
    syncWithCloud
  };

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};