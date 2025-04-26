import express from 'express';
import type { Request, Response } from 'express';
import { OpenAI } from 'openai';
import { PromptBuilder } from '../src/utils/PromptBuilder';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

/**
 * Parses the OpenAI response into a structured format.
 * @param rawResponse - The raw response content from OpenAI.
 * @returns A structured question object.
 */
function parseOpenAIResponse(rawResponse: string): GeneratedQuestion {
  // Example parsing logic (adjust as needed based on actual response format)
  const [question, ...choicesAndAnswer] = rawResponse.split('\n').filter(Boolean);
  const choices = choicesAndAnswer.slice(0, -1);
  const answer = choicesAndAnswer[choicesAndAnswer.length - 1];
  return { question, choices, answer };
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type GeneratedQuestion = {
  question: string;
  choices: string[];
  answer: string;
};

/** Generate a coding question via OpenAI, with fallback */
router.post(
  '/generate-question',
  async (req: Request, res: Response<GeneratedQuestion | { error: string }>) : Promise<void> => {
    const { track, level, minion } = req.body;
    if (!track || !level || !minion) {
      res.status(400).json({ error: 'Missing track, level, or minion' });
      return;
    }

    // Build the LLM prompt
    const prompt = PromptBuilder.getPrompt(track, level);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
      });

      // Parse the raw text into structured question/choices/answer
      const raw = completion.choices[0].message.content ?? '';
      const parsed = parseOpenAIResponse(raw);

      res.json(parsed);
    } catch (err) {
      console.error('OpenAI failed, falling back:', err);

      // Fallback: pick a hard-coded question
      const fb = PromptBuilder.getFallbackQuestion(minion);

      res.json({
        question: fb.question,
        choices: fb.choices,
        answer: fb.choices[fb.correctIndex],
      });
    }
  }
);

// ... your existing /tts route ...

export default router;
