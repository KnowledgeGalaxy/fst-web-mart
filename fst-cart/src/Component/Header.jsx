// Header.js
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import Nav from './Nav';

const Header = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (cart.length > 0) {
      navigate('/cart');
    }
  };

  const naviGateHome=()=>{
    navigate('/')
  }
  return (
    <>
    <div className="header">
      <div className="title" onClick={naviGateHome}>FSTMART.IN</div>
      <div className="cart-icon" onClick={handleCartClick}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {cart.length > 0 && (
          <span className="cart-count">{`${cart.length}`}</span>
        )}
      </div>
    </div>
    <Nav/>
    </>
  );
};

export default Header;
