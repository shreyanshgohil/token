import { gql } from "apollo-server-express";

const tokenTypeDefs = gql`
  type Token {
    _id: ID
    tokenColor: String
    tokenName: String
    freeTokenquantity: Int
    paidTokenquantity: Int
    paidTokenPrice: Int
    tokenBuyerName: String
    tokenCreator: ID
  }
  input tokenInput {
    tokenColor: String
    tokenName: String
    freeTokenquantity: Int
    paidTokenquantity: Int
    paidTokenPrice: Int
    tokenBuyerName: String
    tokenCreator: ID
  }
  type Query {
    getAllTokens: [Token]
    getSingleToken(id: ID!): Token
  }
  type Mutation {
    createToken(token: tokenInput, adminId: ID!, adminPassword: String!): String
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
