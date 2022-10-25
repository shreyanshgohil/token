import React from "react";

const SingleToken = (props) => {
  // Inits
  const { token, tokensDuplicate, changeQuantityHandler, index } = props;

  // Decrement the quantity
  const decrementQuantityHandler = () => {
    if (tokensDuplicate.quantity > 0) {
      changeQuantityHandler(index, tokensDuplicate.quantity - 1);
    }
  };

  // Handle the change of input
  const tokenChangeQuantityHandler = (event) => {
    const value = event.target.value;
    if (tokensDuplicate.availableTokenQuantity > 0 && value >= 0) {
      changeQuantityHandler(index, +value);
    }
  };

  // increment the quantity of input
  const incrementQuantityHandler = () => {
    if (tokensDuplicate.availableTokenQuantity > 0) {
      changeQuantityHandler(index, tokensDuplicate.quantity + 1);
    }
  };

  // JSX
  return (
    <tr key={token._id}>
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
        <div className="w-[209px] flex gap-4">
          <button onClick={decrementQuantityHandler}>-</button>
          <input
            type="number"
            className="focus:outline-none border-solid border border-white"
            value={tokensDuplicate.quantity}
            onChange={tokenChangeQuantityHandler}
          />
          <button onClick={incrementQuantityHandler}>+</button>
        </div>
      </td>
      <td> {token.tokenPrice * tokensDuplicate.quantity} </td>
    </tr>
  );
};

export default SingleToken;
