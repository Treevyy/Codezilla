import User from '../models/User';
import Character from '../models/Characters';
import { signToken } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

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
    users: async () => {
      return await User.find();
    },
    user: async (_: any, { username }: { username: string }) => {
      return await User.findOne({ username });
    },
    characters: async () => {
      return await Character.find();
    },
    character: async (_: any, { id }: { id: string }) => {
      return await Character.findById(id);
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
