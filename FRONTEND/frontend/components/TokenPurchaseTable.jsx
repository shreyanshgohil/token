import React, { useState } from "react";

const TokenPurchaseTable = (props) => {
  const { tokens } = props;

  const initialState = tokens.map((token, i) => {
    return { id: token._id, index: i, quntity: 0 };
  });
  const [quntity, setQuntity] = useState(initialState);
  const quntityIncrementHandler = (i) => {
    const newState = [...quntity];
    if (newState[i].quntity < tokens[i].availableTokenQuntity)
      newState[i] = {
        ...newState[i],
        quntity: newState[i].quntity + 1,
      };
    setQuntity(newState);
  };
  const inputChangeHandler = (event, i) => {
    const newState = [...quntity];
    const value = event.target.value;
    if (event.target.value >= 0 && value <= tokens[i].availableTokenQuntity) {
      newState[i] = {
        ...newState[i],
        quntity: value,
      };
      setQuntity(newState);
    }
  };
  const quntityDecrementHandler = (i) => {
    const newState = [...quntity];
    if (newState[i].quntity > 0) {
      newState[i] = {
        ...newState[i],
        quntity: newState[i].quntity - 1,
      };
      setQuntity(newState);
    }
  };
  return (
    <div>
      <div>
        <table border="1px solid white" className="w-full text-center">
          <thead>
            <tr>
              <td>Colour </td>
              <td> Price </td>
              <td> Available </td>
              <td> Quantity </td>
              <td> Amount </td>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, i) => {
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
                      <button onClick={() => quntityDecrementHandler(i)}>
                        -
                      </button>
                      <input
                        type="number"
                        className="focus:outline-none border-solid border border-white"
                        value={quntity[i].quntity}
                        onChange={(event) => inputChangeHandler(event, i)}
                      />
                      <button onClick={() => quntityIncrementHandler(i)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td> {token.tokenPrice * quntity[i].quntity} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenPurchaseTable;
