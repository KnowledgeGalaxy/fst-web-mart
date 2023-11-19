import React, { useState } from 'react';
import '../css/Login.css'; // Import the CSS file

const Login = () => {
  // State for form fields
  const [loginData, setLoginData] = useState({ customer_id: '', password: '' });
  const [signupData, setSignupData] = useState({ customer_id: '', name: '', age: '', password: '' });
  const [showSignup, setShowSignup] = useState(false);

  // Handler for sign-in form
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle sign-in with loginData
    console.log('Signing in with:', loginData);
  };

  // Handler for sign-up form
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle sign-up with signupData
    console.log('Signing up with:', signupData);
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
            Customer ID:
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
            Customer ID:
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
