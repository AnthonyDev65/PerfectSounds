import React, { createContext, useContext, useState, useRef, useCallback, ReactNode, useEffect } from 'react';

interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  beatsPerChord: number;
  currentChordIndex: number;
  currentBeat: number;
  activeChord: string | null;
  start: () => void;
  stop: () => void;
  setBpm: (bpm: number) => void;
  setBeatsPerChord: (beats: number) => void;
  reset: () => void;
}

const MetronomeContext = createContext<MetronomeState | undefined>(undefined);

export const useMetronome = () => {
  const context = useContext(MetronomeContext);
  if (!context) {
    throw new Error('useMetronome must be used within a MetronomeProvider');
  }
  return context;
};

interface MetronomeProviderProps {
  children: ReactNode;
  selectedChords: string[];
}

export const MetronomeProvider: React.FC<MetronomeProviderProps> = ({ children, selectedChords }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpmState] = useState(120);
  const [beatsPerChord, setBeatsPerChordState] = useState(4);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [activeChord, setActiveChord] = useState<string | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Refs para mantener valores actualizados en el intervalo
  const beatsPerChordRef = useRef(beatsPerChord);
  const selectedChordsRef = useRef(selectedChords);
  const bpmRef = useRef(bpm);

  // Función para crear sonido de metrónomo
  const playMetronomeSound = useCallback((isAccent: boolean = false) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Frecuencia más alta para el acento (primer beat)
      oscillator.frequency.value = isAccent ? 1200 : 800;
      oscillator.type = 'sine';

      // Volumen
      gainNode.gain.value = isAccent ? 0.3 : 0.15;

      const now = audioContext.currentTime;
      oscillator.start(now);
      
      // Fade out rápido
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      oscillator.stop(now + 0.05);
    } catch (error) {
      console.error('Error playing metronome sound:', error);
    }
  }, []);

  // Mantener refs sincronizados
  useEffect(() => {
    beatsPerChordRef.current = beatsPerChord;
  }, [beatsPerChord]);

  useEffect(() => {
    selectedChordsRef.current = selectedChords;
  }, [selectedChords]);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const triggerPulse = useCallback((chordName: string, isFirstBeat: boolean = false) => {
    setActiveChord(chordName);
    
    // Reproducir sonido
    playMetronomeSound(isFirstBeat);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveChord(null);
    }, 150);
  }, [playMetronomeSound]);

  const start = useCallback(() => {
    if (selectedChordsRef.current.length === 0) return;
    
    clearTimers();
    setIsPlaying(true);
    
    let chordIndex = 0;
    let beat = 1;
    
    setCurrentChordIndex(chordIndex);
    setCurrentBeat(beat);
    
    // Primer pulso inmediato (beat 1 del primer acorde) - con acento
    triggerPulse(selectedChordsRef.current[0], true);
    
    const tick = () => {
      const totalBeats = beatsPerChordRef.current;
      const chords = selectedChordsRef.current;
      
      beat++;
      
      if (beat > totalBeats) {
        // Cambiar al siguiente acorde y resetear beat
        chordIndex = (chordIndex + 1) % chords.length;
        beat = 1;
        
        // Actualizar estado
        setCurrentChordIndex(chordIndex);
        setCurrentBeat(beat);
        
        // Activar el pulso visual y sonido con acento en el beat 1 de cada acorde
        triggerPulse(chords[chordIndex], true);
      } else {
        // Solo actualizar el beat y reproducir sonido sin acento
        setCurrentBeat(beat);
        playMetronomeSound(false);
      }
    };
    
    // Configurar el intervalo - cada beat
    const beatInterval = (60 / bpmRef.current) * 1000;
    intervalRef.current = setInterval(tick, beatInterval);
  }, [clearTimers, triggerPulse, playMetronomeSound]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setActiveChord(null);
    clearTimers();
  }, [clearTimers]);

  const reset = useCallback(() => {
    stop();
    setCurrentChordIndex(0);
    setCurrentBeat(1);
  }, [stop]);

  const setBpm = useCallback((newBpm: number) => {
    setBpmState(newBpm);
  }, []);

  const setBeatsPerChord = useCallback((beats: number) => {
    setBeatsPerChordState(beats);
  }, []);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const value: MetronomeState = {
    isPlaying,
    bpm,
    beatsPerChord,
    currentChordIndex,
    currentBeat,
    activeChord,
    start,
    stop,
    setBpm,
    setBeatsPerChord,
    reset
  };

  return (
    <MetronomeContext.Provider value={value}>
      {children}
    </MetronomeContext.Provider>
  );
};