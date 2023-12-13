import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeCartItem } from '../actions/cartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
import { setOrderData } from '../actions/orderActions';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const customerID = useSelector((state) => state.auth.loginData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const storedLoggedInState = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handlePlaceOrder = async () => {
    // Check if the user is logged in
    if (!isLoggedIn && !storedLoggedInState) {
      // If not logged in, redirect to the login page
      navigate('/login');
      return;
    }

    const orderData = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      customer_id: customerID, // Replace with your actual customer ID or fetch it from authentication
    }));

    try {
      const response = await axios.post('https://fst-cart-production.up.railway.app/api/ordered-items/', orderData);
      console.log('Order placed successfully:', response.data);
      dispatch(setOrderData(response.data));
      // You may want to dispatch an action to clear the cart or perform other actions here
      // dispatch(clearCart());

      navigate('/address');
    } catch (error) {
      console.error('Error placing order:', error.message);
      // Handle errors, you may want to show an error message to the user
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.imageUrl} alt={item.name} className="item-image" />
          <div className="item-details">
            <p className='name'>{item.name}</p>
            <p className='price'>Price: ₹{item.price}</p>
            <div className="quantity-controls">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      <div className="total-price-container">
        <p className="total-price">Total Price: ₹{totalPrice}</p>
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Continue Order
      </button>
    </div>
  );
};

export default Cart;
