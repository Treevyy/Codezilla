import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connections.js';
import { authenticateToken } from './utils/auth.js';

dotenv.config();

const app: Application = express(); 
const PORT = process.env.PORT || 3001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apollo Server v4 middleware with correct typing
  app.use(
    '/graphql',
    expressMiddleware(server) as unknown as express.RequestHandler, // TypeScript workaround
    {
      context: async ({ req }: { req: Request }) => {
        const user = await authenticateToken(_req);
        return { user };
      },
    }
  );

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // POST /api/tts - OpenAI text-to-speech
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
  app.get('/', (_req: Request, res: Response) => {
    res.send('🎙️ Codezilla server is up!');
  });

  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`✅ GraphQL endpoint is available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
