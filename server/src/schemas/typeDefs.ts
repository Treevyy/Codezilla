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

  type Character {
    _id: ID!
    name: String!
    picture: String!
    voice: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    updateStats(isCorrect: Boolean!): User
    characters: [Character]
    character(id: ID!): Character
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createCharacter(name: String!, picture: String!, voice: String!): Character
    deleteCharacter(id: ID!): Character
  }
`;

export default typeDefs;
