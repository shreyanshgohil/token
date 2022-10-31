import React, { useEffect, useState, useContext } from "react";
import TokenPurchaseTable from "../components/TokenPurchaseTable";
import TokenDataTable from "../components/TokenDataTable";
import client from "../gql/clients";
import { gql } from "@apollo/client";
import { TOKEN_FRAGMENT } from "../gql/fragments";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Head from "next/head";

const HomePage = () => {
  // Inits
  const [tokensType, setTokenTypes] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [tokensDuplicate, setTokensDuplicate] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const { user, dispatch } = useContext(UserContext);

  // Creating duplicate array for the api calling
  const setDuplicateArray = (duplicateTokens) => {
    const newArray = duplicateTokens.map((token) => {
      return {
        quantity: 0,
        id: token._id,
        availableTokenQuantity: token.availableTokenQuantity,
        total: 0,
      };
    });
    setTokensDuplicate(newArray);
  };

  //   Handle the changes of the selectBox
  const filterTokensHandler = (event) => {
    setTokenTypes(+event.target.value);
  };

  // remove from duplicate
  const removeTokenHandler = (id) => {
    setTokens((prevState) => prevState.filter((token) => token._id !== id));
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
    setGrandTotal(0);
  };

  // change Quantity Handler
  const changeQuantityHandler = (index, quantity) => {
    const newState = [...tokensDuplicate];
    newState[index] = {
      ...newState[index],
      quantity,
      availableTokenQuantity: tokens[index].availableTokenQuantity - quantity,
      total: tokens[index].tokenPrice * quantity,
    };
    setTokensDuplicate(newState);
    let grandTotal = 0;
    newState.forEach((token) => (grandTotal += token.total));
    setGrandTotal(grandTotal);
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
    const { data } = await client.mutate({
      mutation: SUBMIT_TOKENS,
      variables: {
        userUpdatedData,
      },
    });
    await fetchDataHander();
  };

  // logout user
  const logoutHandler = () => {
    dispatch({ type: "REMOVE_USER" });
  };
  //   JSX code
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <div>
        <div className="p-10">
          <div className="top">
            <div className="filter mb-4 flex items-center justify-between">
              <select
                onChange={filterTokensHandler}
                className="border border-solid border-white px-2"
              >
                <option value="0">Free</option>
                <option value="1" selected={true}>
                  Paid
                </option>
              </select>
              <div className="flex items-center gap-2">
                {user ? (
                  <button onClick={logoutHandler}>Logout</button>
                ) : (
                  <Link href={"/login"}>Login</Link>
                )}
                {user?.typeOfUser === 1 && (
                  <>
                    <Link href={"/createadmin"}>createadmin</Link>
                    <Link href={"/addtoken"}>createtoken</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {tokens.length > 0 ? (
            <div>
              <div>
                {tokens.length > 0 && (
                  <div className="token-purchase">
                    <TokenPurchaseTable
                      tokens={tokens}
                      tokensDuplicate={tokensDuplicate}
                      changeQuantityHandler={changeQuantityHandler}
                      grandTotal={grandTotal}
                      removeTokenHandler={removeTokenHandler}
                    />
                  </div>
                )}
                <div className="flex items-center py-6 gap-4">
                  <button
                    type="button"
                    onClick={SubmitCangesHandler}
                    className="text-center flex-1 py-4 bg-[#ffa500] text-black font-semibold"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="text-center flex-1 py-4 bg-[#ddd] text-black font-semibold"
                    onClick={fetchDataHander}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="token-data">
                <TokenDataTable tokens={tokens} />
              </div>
            </div>
          ) : (
            <h3 className="text-center uppercase font-bold text-4xl p-8">
              No tokens available
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
