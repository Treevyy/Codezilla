import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CodezillaArena = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-4">Codezilla Arena (Prototype Mode)</h2>
      
      <button
        onClick={() => setShowModal(true)}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Modal
      </button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🧠 Dr. Dan Speaks</DialogTitle>
          </DialogHeader>
          <p>You triggered this modal manually. Tailwind & Radix are synced up.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodezillaArena;

