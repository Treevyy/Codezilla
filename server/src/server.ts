import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import openaiRoutes from './routes/api/openai';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index';
import db from './config/connections';
// import { authenticateToken } from './utils/auth.js';

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
  app.use('/api', openaiRoutes);
  app.use('/graphql', expressMiddleware(server));

  // Apollo Server v4 middleware with correct typing
  const authenticateToken = async ({ req }: { req: Request }) => {
    const token = (req.headers.authorization as string | undefined)?.split(' ')[1];
    let user = null;
  
    if (token) {
      try {
        const { verifyToken } = require('./utils/auth');
        user = verifyToken(token);
      } catch (err) {
        console.error('Token verification failed:', err);
      }
    }
  // Serve static files in production 
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
