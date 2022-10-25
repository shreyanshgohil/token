import { gql } from "@apollo/client";

export const TOKEN_FRAGMENT = gql`
  fragment tokenFields on Token {
    _id
    tokenColor
    tokenName
    tokenPrice
    totalTokenQuantity
    typeOfToken
    tokenCreator
    availableTokenQuantity
  }
`;
export const USER_FRAGMENT = gql`
  fragment userFields on User {
    userName
    email
    typeOfUser
  }
`;
