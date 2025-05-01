import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { OpenAI } from 'openai';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import openaiRoutes from './routes/api/openai';
import { typeDefs, resolvers } from './schemas/index';
import db from './config/connections';

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

  // ✅ Middlewares
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // ✅ Register routes
  app.use('/api', openaiRoutes);             // Your router (POST /api/question, /api/tts)
  app.use('/graphql', expressMiddleware(server));  // Apollo GraphQL

  // ✅ Optional root test route
  app.get('/', (_req: Request, res: Response) => {
    res.send('🎙️ Codezilla server is up!');
  });

  // ✅ Serve static files in production (if applicable)
  const clientDistPath = path.join(__dirname, '../../client/dist');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  } else {
    console.warn('⚠️  Static files not found. Ensure the client has been built.');
  }

  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`✅ GraphQL endpoint is available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();