// reducers/cartReducer.js
const initialState = {
    cart: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      // Add other cases if needed
      default:
        return state;
    }
  };
  
  export default cartReducer;
  