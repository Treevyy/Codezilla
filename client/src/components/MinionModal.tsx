import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MinionModalProps {
  isOpen: boolean;
  onClose: () => void;
  minionName: string;
  minionQuote: string;
}

const MinionModal = ({ isOpen, onClose, minionName, minionQuote }: MinionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{minionName} Appears!</DialogTitle>
        </DialogHeader>
        <p>{minionQuote}</p>
      </DialogContent>
    </Dialog>
  );
};

export default MinionModal;
