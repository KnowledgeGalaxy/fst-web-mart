// reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from '../reducers/authReducer'

const rootReducer = combineReducers({
  // Add other reducers if needed
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
