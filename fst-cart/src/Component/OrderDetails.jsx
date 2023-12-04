// components/OrderDetails.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/OrderDetails.css';

const OrderDetails = () => {
  const orderDataList = useSelector((state) => state.order.orderData);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(orderDataList);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetailsArray = await Promise.all(
          orderDataList.map(async (orderItem) => {
            const response = await axios.get(`https://fst-cart-production.up.railway.app/api/products/${orderItem.product_id}`);
            return response.data;
          })
        );

        setProductDetails(productDetailsArray);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [orderDataList]);

  const calculateTotalPrice = () => {
    return productDetails.reduce((total, product, index) => {
      const quantity = orderDataList[index].quantity;
      const productPrice = parseFloat(product.price);
      return total + quantity * productPrice;
    }, 0);
  };

  const calculatePayableAmount = () => {
    return calculateTotalPrice();
  };

  const handlePlaceOrder = async () => {
    try {
      // Create an array of promises for each order item
      const orderPromises = orderDataList.map(async (orderItem) => {
        const confirmOrderData = {
          customer_id: orderItem.customer_id,
          address: selectedAddress.id,
          contact_number: selectedAddress.contact_number,
          order_id: orderItem.id, // Assuming 'id' is the order_id
        };
  
        const response = await axios.post('https://fst-cart-production.up.railway.app/api/confirm-orders/', confirmOrderData);
  
        if (response.status !== 201) {
          // Handle other response statuses or error scenarios
          console.error('Error placing order:', response.data);
        }
      });
  
      // Wait for all promises to resolve
      await Promise.all(orderPromises);
  
      // Navigate to /thank-you after all orders are placed
      navigate('/thank-you');
    } catch (error) {
      console.error('Error placing orders:', error.message);
    }
  };
  

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div>
          <div className="address-details">
            <h3>Delivery Address</h3>
            {selectedAddress ? (
              <div>
                <p>{selectedAddress.address_type} Address</p>
                <p>
                  {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zip_code}
                </p>
                <p>Contact Number: {selectedAddress.contact_number}</p>
              </div>
            ) : (
              <p>No address selected</p>
            )}
          </div>
          <div className="product-details">
            <h3>Product Details</h3>
            {productDetails.map((product, index) => (
              <div key={product.id} className="product-item">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-details">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">Price: ₹{product.price}</p>
                  <p>Quantity: {orderDataList[index].quantity}</p>
                </div>
                <hr />
              </div>
            ))}
            <div className="total-section">
              <p className="total-label">Payable Amount: ₹{calculatePayableAmount()}</p>
              <p className="total-label">Only Cash Delivery</p>
            </div>
          </div>
          <div className="confirm-order-section">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
