// actions/cartActions.js
export const addToCart = (product) => {
    return {
      type: 'ADD_TO_CART',
      payload: product,
    };
  };
  
  // Add other actions if needed
  export const updateCartItemQuantity = (productId, newQuantity) => {
    return {
      type: 'UPDATE_CART_ITEM_QUANTITY',
      payload: {
        productId,
        newQuantity,
      },
    };
  };
  
  export const removeCartItem = (productId) => {
    return {
      type: 'REMOVE_CART_ITEM',
      payload: productId,
    };
  };