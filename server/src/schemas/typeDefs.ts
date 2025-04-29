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

<<<<<<< HEAD
=======
  type Character {
    _id: ID!
    name: String!
    picture: String!
    voice: String!
  }

>>>>>>> d7567a5c20d729e2d5c004a2d70be9176db8ea33
  type Auth {
    token: ID!
    user: User
  }

  type Question {
    question: String!
    choices: [String!]!
    answer: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
<<<<<<< HEAD
    generateQuestion(track: String!, level: String!, minion: String!): Question
=======
    updateStats(isCorrect: Boolean!): User
    characters: [Character]
    character(id: ID!): Character
>>>>>>> d7567a5c20d729e2d5c004a2d70be9176db8ea33
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createCharacter(name: String!, picture: String!, voice: String!): Character
    deleteCharacter(id: ID!): Character
  }
`;

export default typeDefs;
