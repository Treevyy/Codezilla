import express, { RequestHandler } from 'express';
import OpenAI from 'openai';
import { PromptBuilder, parseOpenAIResponse } from '../../utils/PromptBuilder';
import { fallbackQuestion } from '../../utils/fallbackQuestions';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// -----------------------------------------
// Route 1: POST /api/question
// Generate a coding question for the game
// -----------------------------------------
const questionHandler: RequestHandler = async (req, res) => {
  const { minion, level, track } = req.body;

  if (!minion || !level || !track) {
    res.status(400).json({ error: 'minion, level, and track are required in the request body.' });
    return;
  }

  const prompt = PromptBuilder.getPrompt(track, level);

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    const rawContent = chatCompletion.choices[0].message?.content || '';
    const structuredQuestion = parseOpenAIResponse(rawContent);

    res.json({ type: 'ai', question: structuredQuestion });
  } catch (error) {
    console.error('OpenAI API error:', error);

    const fallback = PromptBuilder.getFallbackQuestion(minion);
    if (!fallback) {
      res.status(500).json({ error: 'No fallback questions available for this minion.' });
      return;
    }

    res.json({ type: 'fallback', question: fallback });
  }
};

router.post('/question', questionHandler);

// -----------------------------------------
// Route 2: POST /api/tts
// Generate Dr. Dan's voice line for feedback
// -----------------------------------------
const ttsHandler: RequestHandler = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: "No text provided for TTS." });
    return;
  }

  try {
    const speechResponse = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'echo',
      input: text,
    });

    const buffer = Buffer.from(await speechResponse.arrayBuffer());
    const timestamp = Date.now();
    const fileName = `dr-dan-${timestamp}.mp3`;
    const filePath = path.join(__dirname, '../../public/audio', fileName);

    fs.writeFileSync(filePath, buffer);

    const audioUrl = `/audio/${fileName}`;
    res.json({ audioUrl });
  } catch (error) {
    console.error('TTS Generation Error:', error);
    res.status(500).json({ error: "Failed to generate Dr. Dan's voice line." });
  }
};

router.post('/tts', ttsHandler);

export default router;
