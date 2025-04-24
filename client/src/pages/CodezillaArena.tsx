import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CodezillaArena = () => {
  const [showModal, setShowModal] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [dialogText, setDialogText] = useState("Take a 7-minute break to recover from that disaster."); // dynamic text

  useEffect(() => {
    if (showModal) {
      const fetchVoice = async () => {
        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: dialogText,
              character: "Dr. Dan" // You can swap this dynamically later
            })
          });

          if (!res.ok) throw new Error("TTS API failed");

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setAudioSrc(url);

          const audio = new Audio(url);
          audio.play();
        } catch (err) {
          console.error("TTS Error:", err);

          // Optional: fallback audio if TTS fails
          const fallback = new Audio("/audio/drdan_fallback.mp3");
          fallback.play();
        }
      };

      fetchVoice();
    }
  }, [showModal, dialogText]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-4">Codezilla Arena (Prototype Mode)</h2>

      <button
        onClick={() => {
          setDialogText("Take a 7-minute break to recover from that disaster."); // example future: random line picker
          setShowModal(true);
        }}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Modal
      </button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🧠 Dr. Dan Speaks</DialogTitle>
          </DialogHeader>
          <p>{dialogText}</p>
          {audioSrc && <audio src={audioSrc} autoPlay className="hidden" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodezillaArena;
