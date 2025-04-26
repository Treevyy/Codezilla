import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
// import fs from 'fs';
// import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { authenticateToken } from './utils/auth';

dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public')); // serve generated mp3 files
  app.use(authenticateToken);

  // TTS Route for Dr. Dan
  app.post('/api/tts', async (req: Request, res: Response) => {
    const { text } = req.body;

    try {
      const speech = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'onyx',
        input: text,
      });

      const buffer = Buffer.from(await speech.arrayBuffer());
      res.set({ 'Content-Type': 'audio/mpeg' });
      res.send(buffer);
    } catch (err) {
      console.error('❌ TTS error:', err);
      res.status(500).send('TTS failed');
    }
  });

  // Root route
  app.get('/', (req: Request, res: Response) => {
    res.send('🎙️ Codezilla server is up!');
  });

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: Request }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`✅ GraphQL endpoint is available at http://localhost:${PORT}/graphql`);
  });
};

startServer();