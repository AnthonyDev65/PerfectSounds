export const SCALE_COLORS = {
  MAJOR: '#9DD982',
  MINOR: '#B579D3',
  DIMINISHED: '#EB7E7A'
} as const;

export const DEGREES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const;

export type MusicalDegree = typeof DEGREES[number];
export type ScaleColor = typeof SCALE_COLORS[keyof typeof SCALE_COLORS];