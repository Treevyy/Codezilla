// src/components/BackgroundMusic.tsx
import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  volume?: number;
}

let globalAudio: HTMLAudioElement | null = null;

const BackgroundMusic: React.FC<Props> = ({ src, volume = 0.03 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio(src);
      globalAudio.loop = true;
      globalAudio.volume = volume;
      globalAudio.play().catch((err) => {
        console.warn('🎵 Autoplay blocked or failed:', err);
      });
    }
    audioRef.current = globalAudio;

    return () => {
      // DO NOT stop or recreate the audio on unmount
    };
  }, [src, volume]);

  return null;
};

export default BackgroundMusic;
