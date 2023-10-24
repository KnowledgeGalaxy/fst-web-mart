import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Admin = () => {
  return (
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
        </ul>
      </nav>

      <div style={{ flex: '1', padding: '1rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
