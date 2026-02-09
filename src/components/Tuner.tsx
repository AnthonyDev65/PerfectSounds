import React, { useState, useEffect, useRef } from 'react';
import './Tuner.css';

interface TunerProps {}

const Tuner: React.FC<TunerProps> = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentNote, setCurrentNote] = useState<string>('');
  const [currentFrequency, setCurrentFrequency] = useState<number>(0);
  const [cents, setCents] = useState<number>(0);
  const [tuningStatus, setTuningStatus] = useState<'in-tune' | 'flat' | 'sharp' | ''>('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Función para convertir frecuencia a nota
  const frequencyToNote = (frequency: number): { note: string; cents: number } => {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const noteIndex = Math.round(noteNum) + 69;
    const noteName = noteStrings[noteIndex % 12];
    const cents = Math.floor((noteNum - Math.round(noteNum)) * 100);
    
    return { note: noteName, cents };
  };

  // Función de autocorrelación para detectar pitch
  const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let best_offset = -1;
    let best_correlation = 0;
    let rms = 0;

    // Calcular RMS (Root Mean Square)
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    // No hay suficiente señal
    if (rms < 0.01) return -1;

    // Encontrar el mejor offset
    let lastCorrelation = 1;
    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;

      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset]);
      }

      correlation = 1 - correlation / MAX_SAMPLES;

      if (correlation > 0.9 && correlation > lastCorrelation) {
        const foundGoodCorrelation = correlation > best_correlation;
        if (foundGoodCorrelation) {
          best_correlation = correlation;
          best_offset = offset;
        }
      }

      lastCorrelation = correlation;
    }

    if (best_correlation > 0.01) {
      return sampleRate / best_offset;
    }

    return -1;
  };

  // Función para actualizar el pitch
  const updatePitch = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.fftSize;
    const buffer = new Float32Array(bufferLength);
    
    analyser.getFloatTimeDomainData(buffer);
    
    const frequency = autoCorrelate(buffer, audioContextRef.current!.sampleRate);

    if (frequency > 0 && frequency < 2000) {
      const { note, cents: detectedCents } = frequencyToNote(frequency);
      
      setCurrentNote(note);
      setCurrentFrequency(Math.round(frequency * 10) / 10);
      setCents(detectedCents);

      // Determinar estado de afinación
      if (Math.abs(detectedCents) <= 5) {
        setTuningStatus('in-tune');
      } else if (detectedCents < 0) {
        setTuningStatus('flat');
      } else {
        setTuningStatus('sharp');
      }
    }

    rafIdRef.current = requestAnimationFrame(updatePitch);
  };

  // Iniciar el afinador automáticamente
  const startTuner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      setIsActive(true);
      updatePitch();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  // Iniciar automáticamente al montar
  useEffect(() => {
    startTuner();

    // Limpiar al desmontar
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (microphoneRef.current) {
        microphoneRef.current.mediaStream.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Calcular el color del fondo basado en la afinación
  const getBackgroundColor = (): string => {
    if (!isActive || !currentNote) {
      return '#2A2A34';
    }

    if (tuningStatus === 'in-tune') {
      return '#9DD982';
    }

    // Calcular intensidad del color basado en qué tan cerca está de la afinación
    const maxCents = 50;
    const intensity = Math.min(Math.abs(cents) / maxCents, 1);
    
    if (tuningStatus === 'flat' || tuningStatus === 'sharp') {
      // Rojo para bemol o sostenido
      const r = Math.floor(235 * intensity);
      const g = Math.floor(126 * intensity);
      const b = Math.floor(122 * intensity);
      return `rgb(${r + (42 * (1 - intensity))}, ${g + (42 * (1 - intensity))}, ${b + (52 * (1 - intensity))})`;
    }

    return '#2A2A34';
  };

  // Calcular posición del indicador en el medidor
  const getIndicatorPosition = (): number => {
    const maxCents = 50;
    const clampedCents = Math.max(-maxCents, Math.min(maxCents, cents));
    return 50 + (clampedCents / maxCents) * 50;
  };

  return (
    <div 
      className="tuner-container"
      style={{ 
        backgroundColor: getBackgroundColor(),
        transition: 'background-color 0.3s ease'
      }}
    >
      {isActive ? (
        currentNote ? (
          <div className="tuner-display">
            <div className={`note-display ${tuningStatus}`}>
              {currentNote}
            </div>
            
            <div 
              className="frequency-display"
              style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : '#888' }}
            >
              {currentFrequency} Hz
            </div>

            <div className="tuning-meter">
              <div className="meter-marks">
                <span 
                  className="mark"
                  style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : '#666' }}
                >
                  ♭
                </span>
                <span 
                  className="mark center"
                  style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : '#9DD982' }}
                >
                  ●
                </span>
                <span 
                  className="mark"
                  style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : '#666' }}
                >
                  ♯
                </span>
              </div>
              
              <div className="meter-bar">
                <div 
                  className="meter-center"
                  style={{ backgroundColor: tuningStatus === 'in-tune' ? '#1E1E26' : '#9DD982' }}
                />
                <div 
                  className={`meter-indicator ${tuningStatus}`}
                  style={{ left: `${getIndicatorPosition()}%` }}
                />
              </div>
              
              <div 
                className="cents-display"
                style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : undefined }}
              >
                {cents !== 0 && (
                  <span className={tuningStatus}>
                    {cents > 0 ? '+' : ''}{cents} cents
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="tuner-instructions">
            <i 
              className="ri-music-2-line"
              style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : '#666' }}
            />
            <p style={{ color: tuningStatus === 'in-tune' ? '#1E1E26' : '#888' }}>
              Toca una nota en tu instrumento
            </p>
          </div>
        )
      ) : (
        <div className="tuner-instructions">
          <i className="ri-mic-line" />
          <p>Iniciando afinador...</p>
        </div>
      )}
    </div>
  );
};

export default Tuner;
