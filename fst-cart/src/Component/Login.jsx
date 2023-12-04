import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Import the CSS file
import { useDispatch} from 'react-redux';
import { setLoggedIn } from '../actions/authAction';
import { setLoginDataStore, setSignupDataStore } from '../actions/authAction.js';

const Login = () => {
  // State for form fields
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ customer_id: '', password: '' });
  const [signupData, setSignupData] = useState({ customer_id: '', name: '', age: '', password: '', confirm_password: '' });
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();
  // Handler for sign-in form
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
        dispatch(setLoggedIn(true)); // Set the user as logged in
        dispatch(setLoginDataStore(data.customer_id));
        navigate('/cart');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Handler for sign-up form
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

      if (response.status===201) {
        const data = await response.json();
        alert("Register Successfully please login");
        dispatch(setSignupDataStore(data.customer));
        setShowSignup(false)
        
        navigate('/login');
      } else {
        alert('Sign up failed. Please check your details.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="login-container">
      <h2>{showSignup ? 'Sign Up' : 'Login'}</h2>
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
        </form>
      )}
    </div>
  );
};

export default Login;
