import { gql } from "apollo-server-express";
const userTypeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
    typeOfUser: Int
  }
  input UserInput {
    userName: String
    email: String
    password: String
    typeOfUser: Int
  }
  type Query {
    getAllUsers: [User]
    getSingleUser(emailId: String!): User
  }
  type Mutation {
    createUser(user: UserInput): String
    updateUser(user: UserInput, emailId: String!, password: String!): String
    deleteUser(emailId: String!, password: String!): String
  }
`;

export default userTypeDefs;
