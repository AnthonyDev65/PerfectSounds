import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { CloudSyncService } from '../services/CloudSyncService';

interface FavoritesState {
  favoriteKeys: string[];
  favoriteProgressions: { name: string; keys: string[]; degrees: string[] }[];
  addFavoriteKey: (key: string) => void;
  removeFavoriteKey: (key: string) => void;
  isFavoriteKey: (key: string) => boolean;
  addFavoriteProgression: (name: string, keys: string[], degrees: string[]) => void;
  removeFavoriteProgression: (name: string) => void;
  clearFavorites: () => void;
  syncWithCloud: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesState | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);
  const [favoriteProgressions, setFavoriteProgressions] = useState<{ name: string; keys: string[]; degrees: string[] }[]>([]);
  const { user } = useAuth();

  // Cargar favoritos desde localStorage
  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem('favoriteKeys');
      const savedProgressions = localStorage.getItem('favoriteProgressions');
      
      if (savedKeys) {
        const parsed = JSON.parse(savedKeys);
        if (Array.isArray(parsed)) {
          setFavoriteKeys(parsed);
        }
      }
      
      if (savedProgressions) {
        const parsed = JSON.parse(savedProgressions);
        if (Array.isArray(parsed)) {
          setFavoriteProgressions(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
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
      const synced = await CloudSyncService.syncFavorites(user.id, favoriteKeys);
      setFavoriteKeys(synced);
      localStorage.setItem('favoriteKeys', JSON.stringify(synced));
    } catch (error) {
      console.error('Error syncing favorites with cloud:', error);
    }
  };

  const addFavoriteKey = async (key: string) => {
    if (!favoriteKeys.includes(key)) {
      const updated = [...favoriteKeys, key];
      setFavoriteKeys(updated);
      localStorage.setItem('favoriteKeys', JSON.stringify(updated));
      
      // Sincronizar con la nube si hay sesión
      if (user) {
        await CloudSyncService.saveFavorite(user.id, key);
      }
    }
  };

  const removeFavoriteKey = async (key: string) => {
    const updated = favoriteKeys.filter(k => k !== key);
    setFavoriteKeys(updated);
    localStorage.setItem('favoriteKeys', JSON.stringify(updated));
    
    // Eliminar de la nube si hay sesión
    if (user) {
      await CloudSyncService.deleteFavorite(user.id, key);
    }
  };

  const isFavoriteKey = (key: string) => {
    return favoriteKeys.includes(key);
  };

  const addFavoriteProgression = (name: string, keys: string[], degrees: string[]) => {
    const progression = { name, keys, degrees };
    const updated = [...favoriteProgressions, progression];
    setFavoriteProgressions(updated);
    localStorage.setItem('favoriteProgressions', JSON.stringify(updated));
  };

  const removeFavoriteProgression = (name: string) => {
    const updated = favoriteProgressions.filter(p => p.name !== name);
    setFavoriteProgressions(updated);
    localStorage.setItem('favoriteProgressions', JSON.stringify(updated));
  };

  const clearFavorites = () => {
    setFavoriteKeys([]);
    setFavoriteProgressions([]);
    localStorage.removeItem('favoriteKeys');
    localStorage.removeItem('favoriteProgressions');
  };

  const value: FavoritesState = {
    favoriteKeys,
    favoriteProgressions,
    addFavoriteKey,
    removeFavoriteKey,
    isFavoriteKey,
    addFavoriteProgression,
    removeFavoriteProgression,
    clearFavorites,
    syncWithCloud
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};