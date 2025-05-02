import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import SoundPlayer from './SoundPlayer';

interface AnswerResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  drDanQuote: string;
  audioUrl?: string;
}

const AnswerResultModal = ({
  isOpen,
  onClose,
  isCorrect,
  drDanQuote,
  audioUrl,
}: AnswerResultModalProps) => {
  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPlayAudio(true);
    } else {
      setPlayAudio(false);
    }
  }, [isOpen]);

  const drDanImage = isCorrect
    ? '/avatars/DrDanCorrect.png'
    : '/avatars/DrDanWrong.png';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="fixed bottom-6 right-6 bg-transparent border-none shadow-none z-[9999] w-fit p-0">
        <div className="flex flex-col items-center gap-2">
          <img
            src={drDanImage}
            alt="Dr. Dan"
            className="w-[140px] h-auto object-contain"
          />
          <p className="text-xs italic text-white text-center">{drDanQuote}</p>
        </div>

        {audioUrl && (
          <SoundPlayer
            src={audioUrl}
            playing={playAudio}
            onEnd={() => {
              setPlayAudio(false);
              onClose();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AnswerResultModal;
