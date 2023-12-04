// reducers/orderReducer.js

// Initial State
const initialState = {
    orderData: [],
  };
  
  // Reducer Function
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ORDER_DATA':
        return {
          ...state,
          orderData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  