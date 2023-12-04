// Action Types
export const SET_ORDER_DATA = 'SET_ORDER_DATA';

// Action Creators
export const setOrderData = (orderData) => ({
  type: SET_ORDER_DATA,
  payload: orderData,
});