// reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  // Add other reducers if needed
  cart: cartReducer,
});

export default rootReducer;
