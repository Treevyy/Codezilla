import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  volume?: number;
}

const BackgroundMusicProvider: React.FC<Props> = ({ src, volume = 0.03 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;

      // 🔒 Play only after a click event
      const handleUserInteraction = () => {
        audio.play().catch((err) =>
          console.warn('Autoplay blocked or error playing:', err)
        );
        document.removeEventListener('click', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction, { once: true });
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [src, volume]);

  return null;
};

export default BackgroundMusicProvider;
