import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Import the CSS file
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../actions/authAction';
import { setLoginDataStore, setSignupDataStore } from '../actions/authAction.js';

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ customer_id: '', password: '' });
  const [signupData, setSignupData] = useState({ customer_id: '', name: '', age: '', password: '', confirm_password: '' });
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://fst-cart-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setLoggedIn(true));
        dispatch(setLoginDataStore(data.customer_id));
        navigate('/cart');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://fst-cart-production.up.railway.app/api/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (response.status === 201) {
        const data = await response.json();
        alert('Register Successfully please login');
        dispatch(setSignupDataStore(data.customer));
        setShowSignup(false);
        navigate('/login');
      } else {
        alert('Sign up failed. Please check your details.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      // Check if the user with the provided mobile number exists
      const checkUserResponse = await fetch(`https://fst-cart-production.up.railway.app/api/customers/${loginData.customer_id}`);
      
      if (!checkUserResponse.ok) {
        alert('Mobile number not registered. Please check and try again.');
        return;
      }
  
      // If the user exists, retrieve and display the password (example, replace with your actual logic)
      const userDataResponse = await fetch(`https://fst-cart-production.up.railway.app/api/customers/${loginData.customer_id}`);
      
      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        alert(`User's password: ${userData.password}`);
      } else {
        alert('Failed to retrieve password. Please try again.');
      }
    } catch (error) {
      console.error('Error during forgot password:', error);
    }
  };
  

  const toggleForm = () => {
    setShowSignup(false);
    setShowForgotPassword(false);
    setShowSignup(!showSignup);
  };

  const toggleForgotPassword = () => {
    setShowSignup(false);
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div className="login-container">
      <h2>{showSignup ? 'Sign Up' : showForgotPassword ? 'Forgot Password' : 'Login'}</h2>
      {showSignup ? (
        // Sign Up Form
        <form onSubmit={handleSignupSubmit}>
          <label>
            Mobile Number:
            <input
              type="text"
              value={signupData.customer_id}
              onChange={(e) => setSignupData({ ...signupData, customer_id: e.target.value })}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              value={signupData.age}
              onChange={(e) => setSignupData({ ...signupData, age: e.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={signupData.confirm_password}
              onChange={(e) => setSignupData({ ...signupData, confirm_password: e.target.value })}
            />
          </label>
          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{' '}
            <button type="button" onClick={toggleForm}>
              Login
            </button>
          </p>
        </form>
      ) : showForgotPassword ? (
        // Forgot Password Form
        <form>
          <label>
            Mobile Number:
            <input
              type="text"
              value={loginData.customer_id}
              onChange={(e) => setLoginData({ ...loginData, customer_id: e.target.value })}
            />
          </label>

          <button type="button" onClick={handleForgotPassword} style={{ color: 'blue', cursor: 'pointer' }}>
          Forgot Password
            </button>
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLoginSubmit}>
          <label>
            Mobile Number:
            <input
              type="text"
              value={loginData.customer_id}
              onChange={(e) => setLoginData({ ...loginData, customer_id: e.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </label>
          <button type="submit">Sign In</button>
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={toggleForm}>
              Sign Up
            </button>
          </p>
          <p>
            <span onClick={toggleForgotPassword} style={{ color: 'blue', cursor: 'pointer' }}>
              Forgot Password?
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
