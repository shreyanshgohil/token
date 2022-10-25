import { createContext, useReducer } from "react";
import userReducers from "./UserResolvers";
const initialState = {
  user: null,
};
export const UserContext = createContext(initialState);

export const UserContextProduder = ({ children }) => {
  const [state, dispatch] = useReducer(userReducers, initialState);
  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
