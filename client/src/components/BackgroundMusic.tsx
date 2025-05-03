import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  volume?: number;
}

const BackgroundMusic: React.FC<Props> = ({ src, volume = 0.03 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;

    // Play the audio
    audio.play().catch((err) => {
      console.warn('⚠️ Autoplay blocked:', err);
    });

    // Stop the audio when component unmounts (e.g., on Play Again)
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [src, volume]);

  return null;
};

export default BackgroundMusic;