// import { useEffect, useState } from "react";
// import { preloadSounds } from "../Utils/preloadSounds";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { getRandomDanism, getSoundPath } from "../Utils/handleAnswer";
// import SoundPlayer from "@/components/SoundPlayer";

// const CodezillaArena = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [audioSrc, setAudioSrc] = useState<string | null>(null);
//   const [playing, setPlaying] = useState(false);
//   const [dialogText, setDialogText] = useState("");
//   const [fallbackAudio, setFallbackAudio] = useState<string | null>(null);

//   // 👉 PRELOAD ALL YOUR AUDIO FILES ONCE
//   useEffect(() => {
//     preloadSounds([
//       '/audio/Dan_correct/Dan-correct-1.wav',
//       '/audio/Dan_correct/Dan-correct-2.wav',
//       '/audio/Dan_correct/Dan-correct-3.wav',
//       '/audio/Dan_correct/Dan-correct-4.wav',
//       '/audio/Dan_incorrect/Dan-incorrect-1.wav',
//       '/audio/Dan_incorrect/Dan-incorrect-2.wav',
//       '/audio/Dan_incorrect/Dan-incorrect-3.wav',
//       '/audio/Dan_incorrect/Dan-incorrect-4.wav',
//       '/audio/drdan_fallback.mp3' // also preload fallback voice
//     ]);
//   }, []);

//   useEffect(() => {
//     if (showModal && dialogText) {
//       const fetchVoice = async () => {
//         try {
//           const res = await fetch("/api/tts", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               text: dialogText,
//               character: "Dr. Dan",
//             }),
//           });

//           if (!res.ok) throw new Error("TTS API failed");

//           const blob = await res.blob();
//           const url = URL.createObjectURL(blob);
//           setAudioSrc(url);
//           setPlaying(true);
//         } catch (err) {
//           console.error("TTS Error:", err);
//           setFallbackAudio("/audio/drdan_fallback.mp3");
//           setPlaying(true);
//         }
//       };

//       fetchVoice();
//     }
//   }, [showModal, dialogText]);

//   const handleAnswer = (isCorrect: boolean) => {
//     setDialogText(getRandomDanism(isCorrect));
//     setAudioSrc(getSoundPath(isCorrect)); // Play correct/wrong sound while TTS loads
//     setShowModal(true);
//     setPlaying(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="text-center space-y-6">
//         <h2 className="text-3xl font-bold text-zinc-800">
//           🧠 Codezilla Arena (Prototype Mode)
//         </h2>

//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => handleAnswer(true)}
//             className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
//           >
//             Correct Answer
//           </button>
//           <button
//             onClick={() => handleAnswer(false)}
//             className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow"
//           >
//             Wrong Answer
//           </button>
//         </div>

//         <Dialog open={showModal} onOpenChange={setShowModal}>
//           <DialogTrigger asChild>
//             <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded shadow">
//               Trigger Danism
//             </button>
//           </DialogTrigger>

//           <DialogContent aria-describedby="drdan-desc">
//             <DialogHeader>
//               <DialogTitle>🧬 Dr. Dan Speaks</DialogTitle>
//             </DialogHeader>
//             <p id="drdan-desc" className="text-sm text-gray-700 dark:text-gray-300 mt-2">
//               {dialogText}
//             </p>

//             {audioSrc && (
//               <SoundPlayer
//                 src={audioSrc}
//                 playing={playing}
//                 onEnd={() => setPlaying(false)}
//               />
//             )}
//             {fallbackAudio && !audioSrc && (
//               <SoundPlayer
//                 src={fallbackAudio}
//                 playing={playing}
//                 onEnd={() => setPlaying(false)}
//               />
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default CodezillaArena;
