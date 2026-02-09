export interface ChordItem {
  id: string;
  name: string;        // Nombre del acorde (C, Dm, etc.)
  degrees: string;     // Grado (I, II, etc.)
  degreesColor: string;
  beats: number;       // Tiempos que dura este acorde (default 4)
  bassNote?: string;   // Nota del bajo opcional para slash chords (C/F, G/B, etc.)
  extension?: string;  // Extensión del acorde (7, maj7, 9, sus2, sus4, add9, etc.)
}

export interface SongSection {
  id: string;
  name: string;        // Intro, Verso, Coro, Puente, Final, etc.
  chords: ChordItem[];
  repeatCount: number; // Número de veces que se repite esta sección
  color: string;       // Color identificador de la sección
}

export interface AdvancedSong {
  id: string;
  name: string;
  key: string;         // Tonalidad principal
  bpm: number;
  capo?: number;       // Traste donde va el capo (0 = sin capo)
  sections: SongSection[];
  createdAt: number;
  updatedAt: number;
}

// Colores predefinidos para secciones
export const SECTION_COLORS = {
  intro: '#9DD982',
  verse: '#79B4D3',
  chorus: '#B579D3',
  bridge: '#D3A279',
  outro: '#EB7E7A',
  custom: '#57566A'
};

// Nombres predefinidos de secciones
export const SECTION_PRESETS = [
  { name: 'Intro', color: SECTION_COLORS.intro },
  { name: 'Verso', color: SECTION_COLORS.verse },
  { name: 'Pre-Coro', color: SECTION_COLORS.bridge },
  { name: 'Coro', color: SECTION_COLORS.chorus },
  { name: 'Puente', color: SECTION_COLORS.bridge },
  { name: 'Solo', color: SECTION_COLORS.custom },
  { name: 'Outro', color: SECTION_COLORS.outro },
];
