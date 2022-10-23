import { gql } from "apollo-server-express";
const userTypeDefs = gql`
  type User {
    userName: String
    email: String
    password: String
    typeOfUser: Int
  }
  input UserInput {
    userName: String
    email: String
    password: String
    typeOfUser: Int
  }
  type Query {
    getAllUsers: String
    getSingleUser(id: ID!): User
  }
  type Mutation {
    createUser(user: UserInput): String
    updateUser(
      user: UserInput
      id: ID!
      password: String
      newPassword: String
    ): String
    deleteUser(id: ID!, password: String!): String
  }
`;

export default userTypeDefs;
