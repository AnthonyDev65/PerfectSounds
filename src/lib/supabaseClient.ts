import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Crear cliente solo si las variables están configuradas
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Flag para saber si Supabase está habilitado
export const isSupabaseEnabled = !!(supabaseUrl && supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CloudSong {
  id: string;
  user_id: string;
  name: string;
  chords: string[];
  degrees: string[];
  key: string;
  created_at: string;
  updated_at: string;
}

export interface CloudAdvancedSong {
  id: string;
  user_id: string;
  name: string;
  key: string;
  bpm: number;
  sections: any;
  created_at: string;
  updated_at: string;
}
