import { gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import client from "../gql/clients";
import PopUp from "./PopUp";
const SingleToken = (props) => {
  // Inits
  const {
    token,
    tokensDuplicate,
    changeQuantityHandler,
    index,
    removeTokenHandler,
  } = props;
  const { user } = useContext(UserContext);
  const [showPopUp, setShowPopUp] = useState(false);

  // Decrement the quantity
  const decrementQuantityHandler = () => {
    if (tokensDuplicate.quantity > 0) {
      changeQuantityHandler(index, tokensDuplicate.quantity - 1);
    }
  };

  // Handle the change of input
  const tokenChangeQuantityHandler = (event) => {
    const value = event.target.value;
    if (value <= token.availableTokenQuantity && value >= 0) {
      changeQuantityHandler(index, +value);
    }
  };

  // increment the quantity of input
  const incrementQuantityHandler = () => {
    if (tokensDuplicate.availableTokenQuantity > 0) {
      changeQuantityHandler(index, tokensDuplicate.quantity + 1);
    }
  };

  // GQL mutation for delete the token

  const DELETE_TOKEN = gql`
    mutation ($adminId: ID!, $adminPassword: String!, $tokenId: ID!) {
      deleteToken(
        adminId: $adminId
        adminPassword: $adminPassword
        tokenId: $tokenId
      ) {
        message
        status
      }
    }
  `;
  // Handles the token delete process
  const deleteTokenHandler = async (password) => {
    const { data } = await client.mutate({
      mutation: DELETE_TOKEN,
      variables: {
        adminId: user._id,
        tokenId: token._id,
        adminPassword: password,
      },
    });
    setShowPopUp(false);
    if (data.deleteToken.status === 200) {
      removeTokenHandler(token._id);
    }
  };

  // For update the token
  const updaeTokenHandler = () => {
    console.log("update function is called");
  };

  // popup close handler
  const closePopUpHandler = () => {
    setShowPopUp(false);
  };
  // JSX
  return (
    <>
      <tr>
        <td>
          <span
            style={{ background: `${token.tokenColor}` }}
            className="h-7 w-7 rounded-full block mx-auto"
          ></span>
        </td>
        <td>
          <p>{token.tokenPrice}</p>
        </td>
        <td>
          <p>{tokensDuplicate.availableTokenQuantity}</p>
        </td>
        <td className="w-[209px]">
          <div className="w-[209px] flex">
            <button onClick={decrementQuantityHandler}>-</button>
            <input
              type="number"
              className="focus:outline-none text-center max-w-[190px]"
              value={tokensDuplicate.quantity}
              onChange={tokenChangeQuantityHandler}
            />
            <button onClick={incrementQuantityHandler}>+</button>
          </div>
        </td>
        <td> {tokensDuplicate.total} </td>
        {user?.typeOfUser === 1 && (
          <td>
            <div className="flex items-center justify-center gap-3">
              <button
                className="bg-[blue] p-1 rounded-md"
                onClick={updaeTokenHandler}
              >
                update
              </button>
              <button
                className="bg-[red] p-1 rounded-md"
                onClick={() => setShowPopUp(true)}
              >
                Delete
              </button>
            </div>
          </td>
        )}
      </tr>
      {showPopUp && (
        <PopUp
          closePopUpHandler={closePopUpHandler}
          confirmActionHandler={deleteTokenHandler}
        />
      )}
    </>
  );
};

export default SingleToken;
