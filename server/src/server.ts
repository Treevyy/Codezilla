import express from 'express';
import { Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve generated mp3 files

// TTS Route for Dr. Dan
app.post('/api/tts', async (req: Request, res: Response) => {
  const { text } = req.body;

  try {
    const speech = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'onyx', 
      input: text
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    res.set({ "Content-Type": "audio/mpeg"})
    res.send(buffer);
    
  } catch (err) {
    console.error('❌ TTS error:', err);
    res.status(500).send('TTS failed');
  }
});



app.get('/', (req: Request, res: Response) => {
  res.send('🎙️ Codezilla server is up!');
});


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
