import { USER_LOGIN, USER_LOGOUT } from "./actions";


const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("user")),
      };
    case USER_LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export { authReducer };
