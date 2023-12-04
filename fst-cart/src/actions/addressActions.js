// actions/addressActions.js
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';

export const setSelectedAdd = (selectedAddress) => ({
  type: SET_SELECTED_ADDRESS,
  payload: selectedAddress,
});
