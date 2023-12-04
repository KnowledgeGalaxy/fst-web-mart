// reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from '../reducers/authReducer'
import orderReducer from './orderReducer';
import addressReducer from './addressReducer';

const rootReducer = combineReducers({
  // Add other reducers if needed
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  address: addressReducer,
});

export default rootReducer;
