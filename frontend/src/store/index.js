import { createContext, useReducer } from "react";
import { postReducer, authReducer } from "./reducer";
import combineReducers from "react-combine-reducers";

function getAuth() {
  if (localStorage.getItem("user") === null) {
    return null;
  }

  return JSON.parse(localStorage.getItem("user"));
}


const initialAuth = {
  user: getAuth(),
};

const [combinedReducer, initialState] = combineReducers({
  auth: [authReducer, initialAuth],
});

export const Context = createContext(initialState);

function Store({ children }) {
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export default Store;
