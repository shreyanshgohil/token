import React, { useState } from "react";
import SingleToken from "./SingleToken";
const TokenPurchaseTable = (props) => {
  const { tokens } = props;

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
            {tokens.map((token, index) => {
              return (
                <React.Fragment key={index}>
                  <SingleToken token={token} index={index} />
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
