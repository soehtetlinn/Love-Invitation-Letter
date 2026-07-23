import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

const DEFAULT_TRACK = {
  title: 'စိန်ပန်းပြာ',
  artist: 'အောင်မြင့်မြတ် & မေဆွိ',
  url: '/sein-pan-pya.mp3',
};

export const AudioPlayerWidget: React.FC<AudioPlayerProps> = ({ autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(DEFAULT_TRACK.url);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // Autoplay may be blocked until a user gesture
      setIsPlaying(false);
    }
  };

  const stopPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      void startPlayback();
    }
  };

  useEffect(() => {
    if (autoPlayTriggered && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      void startPlayback();
    }
  }, [autoPlayTriggered]);

  return (
    <div className="fixed bottom-4 left-4 sm:left-8 z-40 transition-all duration-300">
      <div className="relative flex items-center gap-3 bg-white/20 dark:bg-black/30 backdrop-blur-xl px-4 py-3 rounded-3xl border border-white/30 shadow-xl text-white">
        <div className="w-10 h-10 bg-white/30 rounded-2xl flex items-center justify-center text-white text-lg shadow-inner">
          🎵
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-white/10 transition-colors flex flex-col text-left"
          title={`${DEFAULT_TRACK.title} — ${DEFAULT_TRACK.artist}`}
        >
          <div className="h-1 w-20 bg-white/20 rounded-full mb-1 overflow-hidden">
            <div className={`h-1 bg-white rounded-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`} />
          </div>
          <p className="text-[10px] text-white/80 tracking-tight font-bold font-myanmar max-w-[9rem] truncate">
            {isPlaying ? DEFAULT_TRACK.title : 'Click to Play 🎵'}
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
            <span className="text-[10px] text-white/90 font-semibold flex items-center font-myanmar whitespace-nowrap">
              <Sparkles className="w-3 h-3 mr-0.5 text-amber-200" /> {DEFAULT_TRACK.artist}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
