import React from "react";
import SingleToken from "./SingleToken";
const TokenPurchaseTable = (props) => {
  // inits
  const { tokens, tokensDuplicate, changeQuantityHandler, grandTotal } = props;
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
          <tfoot>
            <tr>
              <td colSpan={4}>Total Payment</td>
              <td>{grandTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TokenPurchaseTable;
