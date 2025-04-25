import express from 'express';
import type { Request, Response } from 'express';
import { OpenAI } from 'openai';
import { PromptBuilder } from '../src/utils/PromptBuilder';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** Existing route: generate a coding question */
router.post('/generate-question', async (req: Request, res: Response) : Promise<void> => {
  try {
    const { track, level } = req.body;
    if (!track || !level) {
    res.status(400).json({ error: 'Missing track or level' });
	return;
    }

    const prompt = PromptBuilder.getPrompt(track, level);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 250,
    });

    const question = completion.choices[0].message.content;
    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate a question' });
  }
});

type Character = 'Dr. Dan' | 'Nullbyte' | 'Pie-thon' | "D'Bug" | 'Codezilla';
/** New route: generate speech for character */
router.post('/tts', async (req: Request, res: Response): Promise<void> => {
  const { text, character } = req.body;

  if (!text) {
     res.status(400).json({ error: "Missing 'text'" });
	 return;
  }

  try {
    const voiceMap = {
      "Dr. Dan": "echo",
      "Codezilla": "echo",
      "Nullbyte": "nova",
	  "D'Bug": "shimmer"
    };

    const voice = voiceMap[character as keyof typeof voiceMap] || "echo";

    const speech = await openai.audio.speech.create({
      model: 'tts-1',
      voice,
      input: text
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    res.set({ "Content-Type": "audio/mpeg" });
    res.send(buffer);
  } catch (err) {
    console.error("TTS route error:", err);
    res.status(500).json({ error: "Failed to generate speech." });
  }
});

export default router;