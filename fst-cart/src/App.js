import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart';
import Admin from './Component/Admin';
import AddProduct from './Component/AddProduct'
import AllOrders from './Component/AllOrders';
import ManageProduct from './Component/ManageProduct'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/admin/add-product" element={<AddProduct/>}></Route>
        <Route path="/admin/manage-product" element={<ManageProduct/>}></Route>
        <Route path="/admin/all-orders" element={<AllOrders/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
