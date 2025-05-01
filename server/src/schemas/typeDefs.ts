import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    correctAnswers: Int
    wrongAnswers: Int
    score: Int
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    generateQuestion(track: String!, level: String!, minion: String!): QuestionPayload!
  }

  type Mutation {
    addUser(input: AddUserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createCharacter(name: String!, picture: String!, voice: String!): Character!
    deleteCharacter(id: ID!): Character!
    updateStats(isCorrect: Boolean!): User!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Character {
    _id: ID!
    name: String!
    picture: String!
    voice: String!
  }

  type QuestionPayload {
    question: String!
    choices: [String!]!
    answer: String!
  }
`;

export default typeDefs;
