import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  volume?: number;
}

const BackgroundMusic: React.FC<Props> = ({ src, volume = 0.03 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;
    audio.play().catch((err) => {
      console.warn('⚠️ Autoplay blocked:', err);
    });

    return () => {
      // Do not pause or destroy the audio here to preserve continuity
    };
  }, [src, volume]);

  return null;
};

export default BackgroundMusic;
