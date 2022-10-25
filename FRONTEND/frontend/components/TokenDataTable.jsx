import React from "react";

const TokenDataTable = (props) => {
  const { tokens } = props;
  console.log(tokens);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Color</td>
            <td>Total</td>
            <td>Current</td>
            <td>Used</td>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => {
            return (
              <tr>
                <td>{token.tokenName}</td>
                <td>{token.totalTokenQuantity}</td>
                <td>{token.availableTokenQuantity}</td>
                <td>
                  {token.totalTokenQuantity - token.availableTokenQuantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TokenDataTable;
