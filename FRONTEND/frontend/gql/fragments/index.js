import { gql } from "@apollo/client";

export const TOKEN_FRAGMENT = gql`
  fragment tokenFields on Token {
    _id
    tokenColor
    tokenName
    tokenPrice
    totalTokenQuntity
    typeOfToken
    tokenBuyerName
    tokenCreator
    availableTokenQuntity
  }
`;
