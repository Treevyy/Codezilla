import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface NarrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const NarrationModal = ({ isOpen, onClose, text }: NarrationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="rounded-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{text}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center mt-4">
          {/* Optional: you can add subtext, instructions, even a button here */}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default NarrationModal;
