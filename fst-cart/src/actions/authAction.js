export const setLoginDataStore = (data) => ({
    type: 'SET_LOGIN_DATA',
    payload: data,
  });
  
  export const setSignupDataStore = (data) => ({
    type: 'SET_SIGNUP_DATA',
    payload: data,
  });

  export const setLoggedIn = (isLoggedIn) => ({
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  });