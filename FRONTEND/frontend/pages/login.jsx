import { gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { USER_FRAGMENT } from "../gql/fragments";
import client from "../gql/clients";
import { useRouter } from "next/router";
import Link from "next/link";
const login = () => {
  // Inits
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { dispatch } = useContext(UserContext);
  const router = useRouter();
  // Login gql schema
  const LOGIN_SCHEMA = gql`
    ${USER_FRAGMENT}
    query ($emailId: String!, $password: String!) {
      loginUser(emailId: $emailId, password: $password) {
        message
        success
        user {
          ...userFields
        }
      }
    }
  `;

  // function which call login api
  const loginHandler = async () => {
    const { data } = await client.query({
      query: LOGIN_SCHEMA,
      variables: {
        emailId: formData.email,
        password: formData.password,
      },
    });

    if (data.loginUser.success) {
      dispatch({ type: "ADD_USER", payload: data.loginUser.user });
      router.push("/token");
    }
  };

  // function for handler the form
  const formHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  // function for handle the change in inputs
  const formChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // JSX
  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={formHandler}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  name="email"
                  onChange={formChangeHandler}
                  value={formData.email}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  name="password"
                  onChange={formChangeHandler}
                  value={formData.password}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    className="!text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    href="/register"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default login;
