// src/components/NarrationModal.tsx

"use client";

import ModalBase from "@/components/ModalBase";

interface NarrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const NarrationModal = ({ isOpen, onClose, text }: NarrationModalProps) => {
  return (
    <ModalBase
      open={isOpen}
      onOpenChange={(open: boolean) => { if (!open) onClose(); }}
      title="Narration"
      description={text}
    >
      {/* Optional: You can add more children here later if needed */}
    </ModalBase>
  );
};

export default NarrationModal;

