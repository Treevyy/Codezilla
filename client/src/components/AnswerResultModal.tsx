import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AnswerResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  drDanQuote: string;
}

const AnswerResultModal = ({ isOpen, onClose, isCorrect, drDanQuote }: AnswerResultModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={isCorrect ? 'text-green-500' : 'text-red-500'}>
            {isCorrect ? "Correct!" : "Wrong!"}
          </DialogTitle>
        </DialogHeader>
        <p>{drDanQuote}</p>
      </DialogContent>
    </Dialog>
  );
};

export default AnswerResultModal;
