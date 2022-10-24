import React, { useEffect, useState } from "react";
import TokenPurchaseTable from "../../components/TokenPurchaseTable";
import TokenDataTable from "../../components/TokenDataTable";
import client from "../../gql/clients";
import { gql } from "@apollo/client";
import { TOKEN_FRAGMENT } from "../../gql/fragments";

const index = () => {
  // Inits
  const [tokensType, setTokenTypes] = useState(1);
  const [tokens, setTokens] = useState([]);

  //   Handle the changes of the selectBox
  const filterTokensHandler = (event) => {
    setTokenTypes(+event.target.value);
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

  //   Function which calls an api for fetch token based on free or paid
  const fetchDataHander = async () => {
    const { data: listOfTokens } = await client.query({
      query: MY_QUERY,
      variables: {
        tokenType: tokensType,
      },
    });
    setTokens(listOfTokens.filterTokens);
  };

  //   calling the api function based in every change on filter
  useEffect(() => {
    fetchDataHander();
  }, [tokensType]);

  //   JSX code
  return (
    <div>
      <div>
        <div className="top">
          <div className="filter">
            <select onChange={filterTokensHandler}>
              <option value="0">Free</option>
              <option value="1" selected={true}>
                Paid
              </option>
            </select>
          </div>
        </div>
        {tokens.length > 0 && (
          <div className="token-purchase">
            <TokenPurchaseTable tokens={tokens} />
          </div>
        )}
        <div className="token-data">
          <TokenDataTable />
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps() {}
export default index;
