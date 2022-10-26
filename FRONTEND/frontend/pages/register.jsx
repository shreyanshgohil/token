import React, { useState } from "react";
import Link from "next/link";
import client from "../gql/clients";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

const register = () => {
  // inits
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const router = useRouter();

  // Handler the form data change
  const userDataChangeHandler = () => {
    const { name, value } = event.target;
    setData((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };

  // Query for create a user
  const CREATE_USER = gql`
    mutation ($user: UserInput) {
      createUser(user: $user)
    }
  `;

  // create the user
  const createUserHandler = async () => {
    const bodyDataObject = {
      email: data.email,
      password: data.password,
      userName: data.userName,
    };
    await client.mutate({
      mutation: CREATE_USER,
      variables: {
        user: bodyDataObject,
      },
    });
    setData(initialState);
    router.push("/login");
  };

  // Handle the form submition
  const formSubmitHandler = (event) => {
    event.preventDefault();
    createUserHandler();
  };

  // Jsx code
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formSubmitHandler}
              >
                <div>
                  <label
                    htmlFor="user"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="user"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="shreyansh"
                    required={true}
                    onChange={userDataChangeHandler}
                    value={data.userName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="shreyanshgohil2510@gmail.com"
                    required={true}
                    onChange={userDataChangeHandler}
                    value={data.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={userDataChangeHandler}
                    value={data.password}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default register;
