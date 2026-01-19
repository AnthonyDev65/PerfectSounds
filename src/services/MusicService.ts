import { Scale } from '../models/Scale';

export class MusicService {
  // Definición de todas las tonalidades y sus acordes diatónicos
  private static readonly scaleData: { [key: string]: Scale[] } = {
    // Tonalidades Mayores
    'C': [
      { name: 'C', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Dm', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Em', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'F', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'G', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Am', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bdim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'C#': [
      { name: 'C#', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'D#m', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Fm', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'F#', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'G#', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'A#m', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Cdim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'D': [
      { name: 'D', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Em', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'F#m', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'G', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'A', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Bm', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'C#dim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'D#': [
      { name: 'D#', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Fm', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Gm', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'G#', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'A#', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Cm', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Ddim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'E': [
      { name: 'E', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'F#m', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'G#m', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'A', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'B', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'C#m', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'D#dim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'F': [
      { name: 'F', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Gm', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Am', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bb', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'C', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Dm', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Edim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'F#': [
      { name: 'F#', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'G#m', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'A#m', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'B', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'C#', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'D#m', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Fdim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'G': [
      { name: 'G', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Am', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bm', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'C', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'D', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Em', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'F#dim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'G#': [
      { name: 'G#', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'A#m', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Cm', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'C#', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'D#', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Fm', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Gdim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'A': [
      { name: 'A', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Bm', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'C#m', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'D', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'E', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'F#m', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'G#dim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'A#': [
      { name: 'A#', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'Cm', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'Dm', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'D#', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'F', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'Gm', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'Adim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],
    'B': [
      { name: 'B', degrees: 'I', degreesColor: '#9DD982', isSelected: false },
      { name: 'C#m', degrees: 'II', degreesColor: '#B579D3', isSelected: false },
      { name: 'D#m', degrees: 'III', degreesColor: '#B579D3', isSelected: false },
      { name: 'E', degrees: 'IV', degreesColor: '#9DD982', isSelected: false },
      { name: 'F#', degrees: 'V', degreesColor: '#9DD982', isSelected: false },
      { name: 'G#m', degrees: 'VI', degreesColor: '#B579D3', isSelected: false },
      { name: 'A#dim', degrees: 'VII', degreesColor: '#EB7E7A', isSelected: false }
    ],

    // Tonalidades Menores
    'Cm': [
      { name: 'Cm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Ddim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'Eb', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Fm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Gm', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'Ab', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'Bb', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'C#m': [
      { name: 'C#m', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'D#dim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'E', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'F#m', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'G#m', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'A', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'B', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Dm': [
      { name: 'Dm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Edim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'F', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Gm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Am', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bb', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'C', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Ebm': [
      { name: 'Ebm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Fdim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'Gb', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Abm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bbm', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'B', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'Db', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Em': [
      { name: 'Em', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'F#dim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'G', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Am', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bm', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'C', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'D', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Fm': [
      { name: 'Fm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Gdim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'Ab', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Bbm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Cm', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'Db', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'Eb', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'F#m': [
      { name: 'F#m', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'G#dim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'A', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Bm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'C#m', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'D', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'E', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Gm': [
      { name: 'Gm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Adim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'Bb', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Cm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Dm', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'Eb', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'F', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'G#m': [
      { name: 'G#m', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'A#dim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'B', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'C#m', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'D#m', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'E', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'F#', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Am': [
      { name: 'Am', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Bdim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'C', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Dm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Em', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'F', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'G', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Bbm': [
      { name: 'Bbm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'Cdim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'Db', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Ebm', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'Fm', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'Gb', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'Ab', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ],
    'Bm': [
      { name: 'Bm', degrees: 'I', degreesColor: '#B579D3', isSelected: false },
      { name: 'C#dim', degrees: 'II', degreesColor: '#EB7E7A', isSelected: false },
      { name: 'D', degrees: 'III', degreesColor: '#9DD982', isSelected: false },
      { name: 'Em', degrees: 'IV', degreesColor: '#B579D3', isSelected: false },
      { name: 'F#m', degrees: 'V', degreesColor: '#B579D3', isSelected: false },
      { name: 'G', degrees: 'VI', degreesColor: '#9DD982', isSelected: false },
      { name: 'A', degrees: 'VII', degreesColor: '#9DD982', isSelected: false }
    ]
  };

  static loadScales(note: string): Scale[] {
    if (!note || typeof note !== 'string') {
      throw new Error('Invalid note: must be a non-empty string');
    }
    
    const scales = this.scaleData[note];
    if (!scales) {
      console.warn(`No scales found for note: ${note}`);
      return [];
    }
    
    // Retornar una copia profunda para evitar mutaciones
    return scales.map(scale => ({ ...scale }));
  }

  static getAllNotes(): string[] {
    return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  }

  static applySelectedDegrees(scales: Scale[], selectedDegrees: { [degree: string]: boolean }): Scale[] {
    if (!Array.isArray(scales)) {
      throw new Error('Invalid scales: must be an array');
    }
    
    if (!selectedDegrees || typeof selectedDegrees !== 'object') {
      return scales.map(scale => ({ ...scale, isSelected: false }));
    }
    
    return scales.map(scale => ({
      ...scale,
      isSelected: selectedDegrees[scale.degrees] || false
    }));
  }

  static isValidNote(note: string): boolean {
    return this.scaleData.hasOwnProperty(note);
  }

  static getAvailableKeys(): string[] {
    return Object.keys(this.scaleData);
  }

  // Transponer acordes de una tonalidad a otra
  static transposeChord(chordName: string, fromKey: string, toKey: string): string {
    // Obtener las escalas de ambas tonalidades
    const fromScales = this.loadScales(fromKey);
    const toScales = this.loadScales(toKey);
    
    // Encontrar el acorde en la tonalidad original
    const chordIndex = fromScales.findIndex(scale => scale.name === chordName);
    
    // Si no se encuentra, devolver el acorde original
    if (chordIndex === -1) return chordName;
    
    // Devolver el acorde correspondiente en la nueva tonalidad
    return toScales[chordIndex].name;
  }

  // Transponer una lista de acordes
  static transposeChords(chordNames: string[], fromKey: string, toKey: string): string[] {
    return chordNames.map(chord => this.transposeChord(chord, fromKey, toKey));
  }

  // Obtener todas las tonalidades disponibles
  static getAllKeys(): string[] {
    return Object.keys(this.scaleData);
  }
}
