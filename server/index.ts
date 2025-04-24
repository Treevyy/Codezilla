// ✅ TODO: Import required modules (express, dotenv, cors)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import openaiRoutes from './routes/openai';

// ✅ TODO: Initialize environment variables
dotenv.config();

// ✅ TODO: Create an instance of the Express application
const app = express();
// ✅ TODO: Set the port (from .env or default to 3001)
const PORT = process.env.PORT || 3001;
// ✅ TODO: Apply middleware (cors, express.json)
app.use(cors());
// ✅ TODO: Import your OpenAI route
app.use(express.json());
// ✅ TODO: Use the OpenAI route under `/api`
app.use('/api', openaiRoutes);
app.get('/', (req, res) => {
	res.send('✅ Codezilla server is alive!');
  });
// ✅ TODO: Start the server and listen on the specified port
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
})