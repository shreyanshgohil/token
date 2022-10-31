import React, { useContext, useState, useTransition } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import client from "../gql/clients";
import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../gql/fragments";

const MakeAdmin = (props) => {
  // Inits
  const { users } = props;
  const [isPending, startTransition] = useTransition();
  const { user: logedInUser } = useContext(UserContext);
  const router = useRouter();
  const [usersData, setUsersData] = useState({
    initialUser: users,
    finalSearchedUser: [],
    searchedText: "",
  });

  const SEARCH_USERSCHEMA = gql`
    query ($name: String!, $limit: Int!) {
      searchUsers(name: $name, limit: $limit) {
        _id
      }
    }
  `;
  const callApi = async () => {
    const {data} = await client.query({
      query: SEARCH_USERSCHEMA,
      variables: {
        name: usersData.searchedText,
        limit: 10,
      },
    });
  };
  const searchUserHandler = (event) => {
    setUsersData((prevState) => {
      return {
        ...prevState,
        searchedText: event.target.value,
      };
    });
    startTransition(() => callApi());
  };

  // handle form submition
  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  // JSX code
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <div className="flex justify-center p-2.5">
          <div className="mb-3 w-full">
            <div className="input-group relative flex  items-stretch w-full mb-4">
              <input
                type="search"
                className=" relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                onChange={searchUserHandler}
                value={usersData.searchedText}
              />
              <button
                className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                id="button-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-4 bg-inherit"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="p-3 leading-none bg-[blue] rounded-md"
            type="button"
          >
            save
          </button>
        </div>
      </div>
    </form>
  );
};

// Calling initial api server side
export async function getStaticProps() {
  const ALL_USERS = gql`
    ${USER_FRAGMENT}
    query {
      getAllUsers {
        ...userFields
      }
    }
  `;
  const { data } = await client.query({
    query: ALL_USERS,
  });
  return {
    props: {
      users: data.getAllUsers,
    },
  };
}

export default MakeAdmin;
