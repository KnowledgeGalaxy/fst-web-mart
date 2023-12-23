import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Admin.css';
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
    <div className="admin-container">
      {!isAdmin ? (
        <div className="login-form">
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
        <div className="admin-panel">
          <nav className="side-nav">
            <ul>
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
              <li>
                <Link to="/customers">All Customers</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Admin;
