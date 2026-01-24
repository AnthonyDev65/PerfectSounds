import { supabase } from '../lib/supabaseClient';
import { AdvancedSong } from '../models/AdvancedSong';

export class CloudSyncService {
  // ========== Simple Songs ==========
  
  static async syncSimpleSongs(userId: string, localSongs: any[]) {
    try {
      // Get cloud songs
      const { data: cloudSongs, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Merge logic: cloud takes precedence for conflicts
      const merged = [...(cloudSongs || [])];
      
      // Add local songs that don't exist in cloud
      for (const localSong of localSongs) {
        const existsInCloud = cloudSongs?.some(cs => cs.id === localSong.id);
        if (!existsInCloud) {
          merged.push(localSong);
        }
      }

      return merged;
    } catch (error) {
      console.error('Error syncing simple songs:', error);
      return localSongs;
    }
  }

  static async saveSimpleSong(userId: string, song: any) {
    try {
      const { error } = await supabase
        .from('songs')
        .upsert({
          id: song.id,
          user_id: userId,
          name: song.name,
          chords: song.chords,
          degrees: song.degrees,
          key: song.key,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error saving simple song:', error);
      return { success: false, error };
    }
  }

  static async deleteSimpleSong(userId: string, songId: string) {
    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', songId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting simple song:', error);
      return { success: false, error };
    }
  }

  // ========== Advanced Songs ==========
  
  static async syncAdvancedSongs(userId: string, localSongs: AdvancedSong[]) {
    try {
      const { data: cloudSongs, error } = await supabase
        .from('advanced_songs')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Convert cloud songs to AdvancedSong format
      const cloudConverted: AdvancedSong[] = (cloudSongs || []).map(cs => ({
        id: cs.id,
        name: cs.name,
        key: cs.key,
        bpm: cs.bpm,
        sections: cs.sections,
        createdAt: new Date(cs.created_at).getTime(),
        updatedAt: new Date(cs.updated_at).getTime()
      }));

      // Merge: prefer most recently updated
      const merged: AdvancedSong[] = [];
      const allIds = Array.from(new Set([
        ...cloudConverted.map(s => s.id),
        ...localSongs.map(s => s.id)
      ]));

      for (const id of allIds) {
        const cloudSong = cloudConverted.find(s => s.id === id);
        const localSong = localSongs.find(s => s.id === id);

        if (cloudSong && localSong) {
          // Both exist, use most recent
          merged.push(cloudSong.updatedAt > localSong.updatedAt ? cloudSong : localSong);
        } else if (cloudSong) {
          merged.push(cloudSong);
        } else if (localSong) {
          merged.push(localSong);
        }
      }

      return merged;
    } catch (error) {
      console.error('Error syncing advanced songs:', error);
      return localSongs;
    }
  }

  static async saveAdvancedSong(userId: string, song: AdvancedSong) {
    try {
      const { error } = await supabase
        .from('advanced_songs')
        .upsert({
          id: song.id,
          user_id: userId,
          name: song.name,
          key: song.key,
          bpm: song.bpm,
          sections: song.sections,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error saving advanced song:', error);
      return { success: false, error };
    }
  }

  static async deleteAdvancedSong(userId: string, songId: string) {
    try {
      const { error } = await supabase
        .from('advanced_songs')
        .delete()
        .eq('id', songId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting advanced song:', error);
      return { success: false, error };
    }
  }

  // ========== Favorites ==========
  
  static async syncFavorites(userId: string, localFavorites: string[]) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('note')
        .eq('user_id', userId);

      if (error) throw error;

      const cloudFavorites = data?.map(f => f.note) || [];
      
      // Merge unique favorites
      return Array.from(new Set([...cloudFavorites, ...localFavorites]));
    } catch (error) {
      console.error('Error syncing favorites:', error);
      return localFavorites;
    }
  }

  static async saveFavorite(userId: string, note: string) {
    try {
      const { error } = await supabase
        .from('favorites')
        .upsert({
          user_id: userId,
          note: note
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error saving favorite:', error);
      return { success: false, error };
    }
  }

  static async deleteFavorite(userId: string, note: string) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('note', note);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting favorite:', error);
      return { success: false, error };
    }
  }
}
