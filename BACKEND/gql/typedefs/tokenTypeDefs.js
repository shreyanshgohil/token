import { gql } from "apollo-server-express";

const tokenTypeDefs = gql`
  type Token {
    _id: ID
    tokenColor: String
    tokenName: String
    tokenPrice: Int
    totalTokenQuantity: Int
    typeOfToken: Int
    tokenCreator: ID
    availableTokenQuantity: Int
  }
  type Message {
    status: Int
    message: String
  }
  input tokenInput {
    tokenColor: String
    tokenName: String
    tokenPrice: Int
    totalTokenQuantity: Int
    typeOfToken: Int
    tokenCreator: ID
    availableTokenQuantity: Int
  }
  input updateQuantity {
    _id: ID
    availableTokenQuantity: Int
  }
  type Query {
    getAllTokens: [Token]
    getSingleToken(id: ID!): Token
    filterTokens(typeOfToken: Int): [Token]
  }
  type Mutation {
    createToken(token: tokenInput!, adminPassword: String!): Message
    updateToken(
      token: tokenInput
      adminId: ID!
      adminPassword: String!
      tokenId: ID!
    ): String
    deleteToken(adminId: ID!, adminPassword: String!, tokenId: ID!): Message
    updateQuantity(updateData: [updateQuantity]): String
  }
`;
export default tokenTypeDefs;
