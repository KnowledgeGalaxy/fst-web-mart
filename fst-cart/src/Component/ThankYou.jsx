import React from 'react';
import '../css/ThankYou.css'; // Import your ThankYou component styles

const ThankYou = ({ orderData }) => {
  return (
    <div className="thank-you-container">
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been placed successfully.</p>
      <p>You may contact us at <strong>760-220-1777</strong> for any assistance....</p>
      {/* Additional styling can be applied through ThankYou.css */}
    </div>
  );
};

export default ThankYou;
