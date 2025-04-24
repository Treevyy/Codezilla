// ✅ TODO: Import express, dotenv, and OpenAI from openai package
import express from 'express';
import type { Request, Response } from 'express';
import { OpenAI } from 'openai';
import { PromptBuilder } from '../src/utils/PromptBuilder';
import dotenv from 'dotenv';
// ✅ TODO: Initialize dotenv to use .env variables
dotenv.config();
// ✅ TODO: Create an Express router
const router = express.Router();
// ✅ TODO: Initialize an OpenAI instance using the API key from .env
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// ✅ TODO: Set up a POST route at `/generate-question`
const generateQuestionHandler = async (req: Request, res: Response): Promise<void> => {
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
  };
  
  // Attach to router
  router.post('/generate-question', generateQuestionHandler);
  

// ✅ TODO: Export the router
	export default router;







