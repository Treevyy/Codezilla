import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
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

  // ✅ Start or stop audio based on modal open state
  useEffect(() => {
    if (isOpen) {
      setPlayAudio(true);
    } else {
      setPlayAudio(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="rounded-2xl shadow-xl text-center">
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? "Correct!" : "Wrong!"}
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {drDanQuote}
          </DialogDescription>
        </DialogHeader>

        {/* ✅ Use Howler to play full clip, then close modal */}
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
