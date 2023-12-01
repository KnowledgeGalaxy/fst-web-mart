import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({ orderData }) => {
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    // You can pass any necessary data to the ConfirmOrder component using the state object
    navigate('/confirm-order', { state: { orderData } });
  };

  return (
    <div>
      <h2>Order Details</h2>
      {/* Display order details here using the orderData prop */}
      {/* Example: <p>Order ID: {orderData.orderId}</p> */}
      
      {/* Add a button to navigate to Confirm Order page */}
      <button onClick={handleConfirmOrder}>Continue Order</button>
    </div>
  );
};

export default OrderDetails;
