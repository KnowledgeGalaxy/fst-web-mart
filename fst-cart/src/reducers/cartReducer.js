// cartReducer.js

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

    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };

    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
