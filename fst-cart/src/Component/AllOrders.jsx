import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/AllOrders.css'; // Import your CSS file

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchDate, setSearchDate] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://fst-cart-production.up.railway.app/api/confirm-orders/')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleViewDetails = (orderId) => {
    // Implement logic for viewing order details
    console.log(`View details for Order ID: ${orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    // Implement logic for deleting order
    console.log(`Delete Order ID: ${orderId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = () => {
    // Filter orders based on the search date
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      const searchDateFormatted = searchDate ? searchDate.toISOString().split('T')[0] : null;
      return searchDateFormatted ? orderDate === searchDateFormatted : true;
    });
  
    // Update the orders state with the filtered orders
    setOrders(filteredOrders);
  };

  return (
    <div className="all-orders-container">
      <h2>All Orders</h2>
      <div>
        <label htmlFor="searchDate">Search by Date:</label>
        <DatePicker
          id="searchDate"
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="orders-container">
        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-details">
              <strong>Order ID:</strong> {order.order_id}<br />
              <strong>Customer ID:</strong> {order.customer_id}<br />
              <strong>Address:</strong> {order.address}<br />
              <strong>Contact Number:</strong> {order.contact_number}<br />
              <strong>Created At:</strong> {formatDate(order.created_at)}<br />
              <strong>Updated At:</strong> {formatDate(order.updated_at)}<br />
            </div>

            <div className="order-actions">
              <button onClick={() => handleViewDetails(order.order_id)}>View Details</button>
              <button onClick={() => handleDeleteOrder(order.order_id)}>Delete Order</button>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
