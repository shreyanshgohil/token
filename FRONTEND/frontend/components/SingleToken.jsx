import React, { useState } from "react";

const SingleToken = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { token, index } = props;
  const decrementQuantityHandler = () => {
    if (quantity > 0) {
      setQuantity((prevState) => prevState - 1);
    }
  };
  const changeQuantityHandler = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value <= token.availableTokenQuntity && value >= 0) {
      setQuantity(value);
    }
  };
  const incrementQuantityHandler = () => {
    if (quantity < token.availableTokenQuntity) {
      setQuantity((prevState) => prevState + 1);
    }
  };
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
        <p>{token.availableTokenQuntity}</p>
      </td>
      <td className="w-[209px]">
        <div className="w-[209px] flex gap-4">
          <button onClick={decrementQuantityHandler}>-</button>
          <input
            type="number"
            className="focus:outline-none border-solid border border-white"
            value={quantity}
            onChange={changeQuantityHandler}
          />
          <button onClick={incrementQuantityHandler}>+</button>
        </div>
      </td>
      <td> {token.tokenPrice * quantity} </td>
    </tr>
  );
};

export default SingleToken;
