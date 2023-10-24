import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="title">FSTMART.COM</div>
      <div className="cart-icon">
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
  );
};

export default Header;
