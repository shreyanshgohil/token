import { gql } from "apollo-server-express";
const userTypeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
    typeOfUser: Int
  }
  type StatusMessage {
    success: Boolean
    message: String
    user: User
  }
  input UserInput {
    userName: String
    email: String
    password: String
  }
  type Query {
    getAllUsers: [User]
    getSingleUser(emailId: String!): User
    loginUser(emailId: String!, password: String!): StatusMessage
    searchUsers(name: String!, limit: Int!): [User]
  }
  type Mutation {
    createUser(user: UserInput): String
    updateUser(user: UserInput, emailId: String!, password: String!): String
    deleteUser(emailId: String!, password: String!): String
  }
`;

export default userTypeDefs;
