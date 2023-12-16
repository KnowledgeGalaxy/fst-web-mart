// Nav.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Nav.css'


const Nav = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedin');
  console.log(isLoggedIn);


  const navigateAboutUs = () => {
    navigate('/about-us');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateContactUs = () => {
    navigate('/contact-us');
  };

  const navigateMyProfile = () => {
    navigate('/myprofile');
  };

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="nav">
      <span onClick={navigateHome}>Home</span>
      <span onClick={navigateAboutUs}>About Us</span>
      
      <span onClick={navigateContactUs}>Contact Us</span>
      {isLoggedIn ? <span onClick={navigateMyProfile}>My Profile</span> : <span onClick={navigateLogin}>Login</span> }
      
      
    </div>
  );
};

export default Nav;
