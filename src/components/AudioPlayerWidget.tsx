import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

export const AudioPlayerWidget: React.FC<AudioPlayerProps> = ({ autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Romantic arpeggio notes (F frequency in Hz)
  const notes = [
    349.23, // F4
    440.00, // A4
    523.25, // C5
    659.25, // E5
    698.46, // F5
    523.25, // C5
    440.00, // A4
    392.00, // G4
  ];

  const startPianoSynth = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    let noteIdx = 0;

    const playNextNote = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine/triangle blend for piano tone
      osc.type = 'sine';
      const freq = notes[noteIdx % notes.length];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const currentVol = isMuted ? 0 : volume * 0.25;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.001, currentVol), ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);

      noteIdx++;
      timerRef.current = window.setTimeout(playNextNote, 600);
    };

    playNextNote();
  };

  const stopPianoSynth = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPianoSynth();
    } else {
      startPianoSynth();
    }
  };

  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      startPianoSynth();
    }
  }, [autoPlayTriggered]);

  useEffect(() => {
    return () => {
      stopPianoSynth();
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 sm:left-8 z-40 transition-all duration-300">
      <div className="relative flex items-center gap-3 bg-white/20 dark:bg-black/30 backdrop-blur-xl px-4 py-3 rounded-3xl border border-white/30 shadow-xl text-white">
        <div className="w-10 h-10 bg-white/30 rounded-2xl flex items-center justify-center text-white text-lg shadow-inner">
          🎵
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-white/10 transition-colors flex flex-col text-left"
          title="Romantic Music Player"
        >
          <div className="h-1 w-20 bg-white/20 rounded-full mb-1 overflow-hidden">
            <div className={`h-1 bg-white rounded-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`} />
          </div>
          <p className="text-[10px] text-white/80 uppercase tracking-tight font-bold">
            {isPlaying ? 'Romantic Piano Mix 🎶' : 'Click to Play 🎵'}
          </p>
        </button>

        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-[#faedcd] text-[#3d2314] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-[#3d2314]" /> : <Play className="w-4 h-4 ml-0.5 fill-[#3d2314]" />}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-white/60" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>

        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <span className="text-[10px] text-white/90 font-semibold flex items-center">
              <Sparkles className="w-3 h-3 mr-0.5 text-amber-200" /> Lullaby
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
