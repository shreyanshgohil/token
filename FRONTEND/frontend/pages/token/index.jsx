import React, { useEffect, useState } from "react";
import TokenPurchaseTable from "../../components/TokenPurchaseTable";
import TokenDataTable from "../../components/TokenDataTable";
import client from "../../gql/clients";
import { gql } from "@apollo/client";
import { TOKEN_FRAGMENT } from "../../gql/fragments";

const index = () => {
  // Inits
  const [tokensType, setTokenTypes] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [tokensDuplicate, setTokensDuplicate] = useState([]);

  // Creating duplicate array for the api calling
  const setDuplicateArray = (duplicateTokens) => {
    const newArray = duplicateTokens.map((token) => {
      return {
        quantity: 0,
        id: token._id,
        availableTokenQuantity: token.availableTokenQuantity,
      };
    });
    setTokensDuplicate(newArray);
  };

  //   Handle the changes of the selectBox
  const filterTokensHandler = (event) => {
    setTokenTypes(+event.target.value);
  };

  //   GQL Query for token data
  const MY_QUERY = gql`
    ${TOKEN_FRAGMENT}
    query ($tokenType: Int) {
      filterTokens(typeOfToken: $tokenType) {
        ...tokenFields
      }
    }
  `;

  // GQL for submit the data on Submit button click
  const SUBMIT_TOKENS = gql`
    mutation ($userUpdatedData: [updateQuantity]) {
      updateQuantity(updateData: $userUpdatedData)
    }
  `;

  //   Function which calls an api for fetch token based on free or paid
  const fetchDataHander = async () => {
    const { data: listOfTokens } = await client.query({
      query: MY_QUERY,
      fetchPolicy: "no-cache",
      variables: {
        tokenType: tokensType,
      },
    });
    setTokens(listOfTokens.filterTokens);
    setDuplicateArray(listOfTokens.filterTokens);
  };

  // change Quantity Handler
  const changeQuantityHandler = (index, quantity) => {
    const newState = [...tokensDuplicate];
    newState[index] = {
      ...newState[index],
      quantity,
      availableTokenQuantity: tokens[index].availableTokenQuantity - quantity,
    };
    setTokensDuplicate(newState);
  };

  //   calling the api function based in every change on filter
  useEffect(() => {
    fetchDataHander();
  }, [tokensType]);

  // send the changes to backend
  const SubmitCangesHandler = async () => {
    const userUpdatedData = tokensDuplicate.map((updatedTokenData) => {
      return {
        _id: updatedTokenData.id,
        availableTokenQuantity: updatedTokenData.availableTokenQuantity,
      };
    });
    await client.mutate({
      mutation: SUBMIT_TOKENS,
      variables: {
        userUpdatedData,
      },
    });
    await fetchDataHander();
  };

  //   JSX codeFFF
  return (
    <div>
      <div>
        <div className="top">
          <div className="filter">
            <select onChange={filterTokensHandler}>
              <option value="0">Free</option>
              <option value="1" selected={true}>
                Paid
              </option>
            </select>
          </div>
        </div>
        <div>
          {tokens.length > 0 && (
            <div className="token-purchase">
              <TokenPurchaseTable
                tokens={tokens}
                tokensDuplicate={tokensDuplicate}
                changeQuantityHandler={changeQuantityHandler}
              />
            </div>
          )}

          <button type="button" onClick={SubmitCangesHandler}>
            Submit
          </button>
          <button type="button" onClick={fetchDataHander}>
            Reset
          </button>
        </div>
        <div className="token-data">
          <TokenDataTable tokens={tokens} />
        </div>
      </div>
    </div>
  );
};

export default index;
