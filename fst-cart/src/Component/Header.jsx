// Header.js
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css'; // Import your CSS file

const Header = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="header">
      <div className="title">FSTMART.COM</div>
      <div className="cart-icon">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cart.length > 0 && (
          <span className="cart-count">{`${cart.length}`}</span>
        )}
      </div>
    </div>
  );
};

export default Header;
