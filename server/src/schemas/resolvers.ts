import User from '../models/User';
import Character from '../models/Characters';
import { signToken } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';
import { OpenAI } from 'openai';
import { PromptBuilder } from '../utils/PromptBuilder'; 
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    generateQuestion: async (_parent: any, args: { track: string; level: string; minion: string }) => {
      const { track, level, minion } = args;
      const prompt = PromptBuilder.getPrompt(track, level);

      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 250,
        });

        const raw = completion.choices[0].message.content ?? '';
        const [question, ...choicesAndAnswer] = raw.split('\n').filter(Boolean);
        const choices = choicesAndAnswer.slice(0, -1);
        const answer = choicesAndAnswer[choicesAndAnswer.length - 1];

        return { question, choices, answer };
      } catch (error) {
        console.error('OpenAI failed, falling back to hardcoded question:', error);
        const fallback = PromptBuilder.getFallbackQuestion(minion);

        return {
          question: fallback.question,
          choices: fallback.choices,
          answer: fallback.choices[fallback.correctIndex],
        };
      }
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create(input);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isPasswordCorrect = await user.isCorrectPassword(password);

      if (!isPasswordCorrect) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    createCharacter: async (_: any, { name, picture, voice }: { name: string, picture: string, voice: string }) => {
      const newCharacter = new Character({ name, picture, voice });
      return await newCharacter.save();
    },
    deleteCharacter: async (_: any, { id }: { id: string }) => {
      return await Character.findByIdAndDelete(id);
    },
  },
};

export default resolvers;
