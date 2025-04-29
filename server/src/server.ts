import express, { type Request, type Response } from 'express';

import dotenv from 'dotenv';
import { OpenAI } from 'openai';

import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { authenticateToken } from './utils/auth';


// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with the appropriate type for your user object
    }
  }
}

dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 3001;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    // Create a new instance of an Apollo server with the GraphQL schema
    const startApolloServer = async () => {
      const server = new ApolloServer({
        typeDefs,
        resolvers,
      });

      const startApolloServer = async () => {
        await server.start();
        await db;

      app.use(express.static('public')); // serve generated mp3 file
      app.use(express.urlencoded({ extended: false }));
      app.use(express.json());
      
      app.use('/graphql', expressMiddleware(server as any,
        {
          context: authenticateToken as any
        }
      ));
      // if we're in production, serve client/build as static assets
      if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
      
        app.get('*', (_req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
      }

      // Start the server
      app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
        console.log(`✅ GraphQL endpoint is available at http://localhost:${PORT}/graphql`);
      });
    };

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

startApolloServer();