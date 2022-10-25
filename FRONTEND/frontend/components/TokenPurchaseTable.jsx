import React from "react";
import SingleToken from "./SingleToken";
const TokenPurchaseTable = (props) => {
  // inits
  const { tokens, tokensDuplicate, changeQuantityHandler } = props;

  // JSX
  return (
    <div>
      <div>
        <table border="1px solid white" className="w-full text-center">
          <thead>
            <tr>
              <td>Color </td>
              <td> Price </td>
              <td> Available </td>
              <td> Quantity </td>
              <td> Amount </td>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => {
              return (
                <React.Fragment key={index}>
                  <SingleToken
                    token={token}
                    tokensDuplicate={tokensDuplicate[index]}
                    index={index}
                    changeQuantityHandler={changeQuantityHandler}
                  />
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenPurchaseTable;
