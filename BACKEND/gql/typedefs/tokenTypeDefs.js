import { gql } from "apollo-server-express";

const tokenTypeDefs = gql`
  type Token {
    _id: ID
    tokenColor: String
    tokenName: String
    tokenPrice: Int
    totalTokenQuntity: Int
    typeOfToken: Int
    tokenBuyerName: String
    tokenCreator: ID
    availableTokenQuntity: Int
  }
  input tokenInput {
    tokenColor: String
    tokenName: String
    tokenPrice: Int
    totalTokenQuntity: Int
    typeOfToken: Int
    tokenBuyerName: String
    tokenCreator: ID
    availableTokenQuntity: Int
  }
  type Query {
    getAllTokens: [Token]
    getSingleToken(id: ID!): Token
    filterTokens(typeOfToken: Int): [Token]
  }
  type Mutation {
    createToken(token: tokenInput!, adminPassword: String!): String
    updateToken(
      token: tokenInput
      adminId: ID!
      adminPassword: String!
      tokenId: ID!
    ): String
    deleteToken(adminId: ID!, adminPassword: String!, tokenId: ID!): String
  }
`;
export default tokenTypeDefs;
