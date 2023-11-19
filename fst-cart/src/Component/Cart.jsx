import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeCartItem } from '../actions/cartActions';
// import { placeOrder } from '../actions/orderActions';  // Import the action for placing an order
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  console.log(cart);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handlePlaceOrder = () => {
    navigate('/login');
    // Dispatch an action to place the order (you need to implement this action)
    // dispatch(placeOrder(cart));
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
        Place Order
      </button>
    </div>
  );
};

export default Cart;
