// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart';
import Admin from './Component/Admin';
import AddProduct from './Component/AddProduct'
import AllOrders from './Component/AllOrders';
import ManageProduct from './Component/ManageProduct'
import Header from './Component/Header';
import Category from './Component/Category';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/manage-product" element={<ManageProduct />} />
          <Route path="/admin/all-orders" element={<AllOrders />} />
          <Route path="/admin/category" element={<Category />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
