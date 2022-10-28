import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import PopUp from "../components/PopUp";
import { gql } from "@apollo/client";
import client from "../gql/clients";

const addtoken = () => {
  // initial check
  const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user?.typeOfUser === 1 || !user) {
      router.push("/");
    }
  }, []);

  // inits
  const [tokenData, setTokenData] = useState({
    tokenName: "",
    tokenPrice: "",
    tokenTotalQuantity: "",
    tokenAvailableQuantity: "",
    tokenType: "",
    tokenColor: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  // Handles the change data
  const formDataChangeHandler = (event) => {
    const { name, value } = event.target;
    setTokenData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // Handles the form submition
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setShowPopUp(true);
  };

  // close popup
  const closePopUpHandler = () => {
    setShowPopUp(false);
  };

  const CREATE_TOKEN_SCHEMA = gql`
    mutation ($token: tokenInput!, $adminPassword: String!) {
      createToken(token: $token, adminPassword: $adminPassword) {
        message
        status
      }
    }
  `;
  // calling api for create a token
  const createTokenHandler = async (password) => {
    const token = {
      availableTokenQuantity: +tokenData.tokenAvailableQuantity,
      tokenColor: tokenData.tokenColor,
      tokenCreator: user._id,
      tokenName: tokenData.tokenName,
      tokenPrice: +tokenData.tokenPrice,
      totalTokenQuantity: +tokenData.tokenTotalQuantity,
      typeOfToken: +tokenData.tokenType,
    };
    const { data } = await client.mutate({
      mutation: CREATE_TOKEN_SCHEMA,
      variables: {
        token: token,
        adminPassword: password,
      },
    });
    if (data.createToken.status) {
      router.push("/");
    }
  };
  // JSX code
  return (
    <div>
      <div>
        <form onSubmit={formSubmitHandler}>
          <div className="p-2 flex items-center">
            <label htmlFor="" className="mr-2">
              Token name
            </label>
            <input
              type="text"
              name="tokenName"
              className="border border-white border-solid rounded-md"
              onChange={formDataChangeHandler}
              value={tokenData.tokenName}
            />
          </div>
          <div className="p-2 flex items-center">
            <label htmlFor="" className="mr-2">
              Token pirce
            </label>
            <input
              type="number"
              name="tokenPrice"
              className="border border-white border-solid rounded-md"
              onChange={formDataChangeHandler}
              value={tokenData.tokenPrice}
            />
          </div>
          <div className="p-2 flex items-center">
            <label htmlFor="" className="mr-2">
              Token total quantity
            </label>
            <input
              type="number"
              name="tokenTotalQuantity"
              className="border border-white border-solid rounded-md"
              onChange={formDataChangeHandler}
              value={tokenData.tokenTotalQuantity}
            />
          </div>
          <div className="p-2 flex items-center">
            <label htmlFor="" className="mr-2">
              Token available quantity
            </label>
            <input
              type="number"
              name="tokenAvailableQuantity"
              className="border border-white border-solid rounded-md"
              onChange={formDataChangeHandler}
              value={tokenData.tokenAvailableQuantity}
            />
          </div>
          <div className="p-2 flex items-center">
            <label htmlFor="" className="mr-2">
              type of token
            </label>
            <select
              name="tokenType"
              id=""
              className="border border-white border-solid rounded-md"
              onChange={formDataChangeHandler}
            >
              <option value="0">Free</option>
              <option value="1">Paid</option>
            </select>
          </div>
          <div className="p-2 flex items-center">
            <label htmlFor="" className="mr-2">
              Color of token
            </label>
            <input
              type="color"
              name="tokenColor"
              className=""
              onChange={formDataChangeHandler}
              value={tokenData.tokenColor}
            />
          </div>
          <button className="bg-[blue] p-1 rounded-md ml-2" type="submit">
            Create token
          </button>
        </form>
        {showPopUp && (
          <PopUp
            closePopUpHandler={closePopUpHandler}
            confirmActionHandler={createTokenHandler}
          />
        )}
      </div>
    </div>
  );
};

export default addtoken;
