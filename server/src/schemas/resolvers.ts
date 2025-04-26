import User from '../models/User';
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
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create(input) as { username: string; email: string; _id: string };
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email }) as { username: string; email: string; _id: string; isCorrectPassword: (password: string) => Promise<boolean> };

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
  },
};

export default resolvers;