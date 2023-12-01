import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const handleThankYou = () => {
    // You can perform any necessary actions here before navigating
    navigate('/thank-you');
  };

  return (
    <div>
      <h2>Confirm Order</h2>
      {/* Display order summary or confirmation details */}
      {/* Example: <p>Total Amount: ${orderData.totalAmount}</p> */}
      
      {/* Add a button to navigate to Thank You page */}
      <button onClick={handleThankYou}>Confirm Order</button>
    </div>
  );
};

export default ConfirmOrder;
