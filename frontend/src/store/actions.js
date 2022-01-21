export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";


export const loginUser = () => ({
  type: USER_LOGIN,
});

export const logoutUser = () => ({
  type: USER_LOGOUT,
});
