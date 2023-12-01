// reducer.js

const initialState = {
    loginData: { customer_id: '', password: '' },
    signupData: { customer_id: '', name: '', age: '', password: '', confirm_password: '' },
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGIN_DATA':
        return { ...state, loginData: action.payload };
  
      case 'SET_SIGNUP_DATA':
        return { ...state, signupData: action.payload };
  
      default:
        return state;
    }
  };
  
  export default authReducer;