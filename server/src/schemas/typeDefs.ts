import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    correctAnswers: Int
    wrongAnswers: Int
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Question {
    question: String!
    choices: [String!]!
    answer: String!
  }
  type Character {
    _id: ID
    name: String!
    picture: String!
    voice: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    generateQuestion(track: String!, level: String!, minion: String!): Question
    characters: [Character]!
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createCharacter(name: String!, picture: String!, voice: String!): Character
    deleteCharacter(id: ID!): Character
  }
`;

export default typeDefs;
