import { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('/80s-loop-5.wav'); // or '/background-music.mp3'
    audio.loop = true;
    audio.volume = 0.5;

    // Try autoplay inside a user interaction-friendly trigger
    const playAudio = () => {
      audio.play().catch((err) => {
        console.warn('Autoplay blocked by browser:', err);
      });
    };

    // Listen for first click
    document.body.addEventListener('click', playAudio, { once: true });

    return () => {
      audio.pause();
    };
  }, []);

  return null;
};

export default BackgroundMusic;
