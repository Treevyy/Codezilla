import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CodezillaArena = () => {
  const [showModal, setShowModal] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [dialogText, setDialogText] = useState(
    "Take a 7-minute break to recover from that disaster."
  );

  useEffect(() => {
    if (showModal) {
      const fetchVoice = async () => {
        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: dialogText,
              character: "Dr. Dan", // Make sure backend maps this to "shimmer"
            }),
          });

          if (!res.ok) throw new Error("TTS API failed");

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setAudioSrc(url);

          const audio = new Audio(url);
          audio.play();
        } catch (err) {
          console.error("TTS Error:", err);
          const fallback = new Audio("/audio/drdan_fallback.mp3");
          fallback.play();
        }
      };

      fetchVoice();
    }
  }, [showModal, dialogText]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-zinc-800">
          🧠 Codezilla Arena (Prototype Mode)
        </h2>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setDialogText("Take a 7-minute break to recover from that disaster.");
                setShowModal(true);
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded shadow"
            >
              Test Dr. Dan
            </button>
          </DialogTrigger>

          <DialogContent aria-describedby="drdan-desc">
            <DialogHeader>
              <DialogTitle>🧬 Dr. Dan Speaks</DialogTitle>
            </DialogHeader>
            <p id="drdan-desc" className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {dialogText}
            </p>
            {audioSrc && <audio src={audioSrc} autoPlay className="hidden" />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CodezillaArena;
