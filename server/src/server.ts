import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { authenticateToken } from './utils/auth';

dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware
  app.use(cors());
  app.use(express.json());
 app.use(authenticateToken); 

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