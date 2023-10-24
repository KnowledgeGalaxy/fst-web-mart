import React, { useState } from 'react';
import {  Link } from 'react-router-dom';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Unauthorized. Please enter the correct password.');
    }
  };

  return (
    <>
      {!isAdmin ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <nav style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li>
                <Link to="/admin/add-product">Add Product</Link>
              </li>
              <li>
                <Link to="/admin/manage-product">Manage Product</Link>
              </li>
              <li>
                <Link to="/admin/all-orders">All Orders</Link>
              </li>
              <li>
                <Link to="/admin/category">Add Categories</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Admin;
