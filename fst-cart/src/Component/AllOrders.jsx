import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import '../css/AllOrders.css'; // Import your CSS file

const OrderDetailsModal = ({ show, handleClose, orderDetails, productDetails, addressData }) => {
  if (!orderDetails || !productDetails || !addressData) {
    // Display a loading spinner while waiting for data
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Spinner animation="border" variant="primary" />
        </Modal.Body>
      </Modal>
    );
  }

  // Once data is available, display the modal with the content
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor: 'lightgray'}}>
        <strong>Customer ID:</strong> {orderDetails.customer_id}<br />
        <strong>Quantity:</strong> {orderDetails.quantity}<br />
        <strong>Product Name:</strong> {productDetails.name}<br />
        <strong>Price:</strong> {productDetails.price}<br />
        <strong>Total Price:</strong> {orderDetails.quantity * productDetails.price}<br />
        <p>
      <strong>Address Type:</strong> {addressData.address_type}<br />
      <strong>Street:</strong> {addressData.street}<br />
      <strong>City:</strong> {addressData.city}<br />
      <strong>State:</strong> {addressData.state}<br />
      <strong>Zip Code:</strong> {addressData.zip_code}<br />
      <strong>Contact Number:</strong> {addressData.contact_number}<br />
    </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchDate, setSearchDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://fst-cart-production.up.railway.app/api/confirm-orders/')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetails(null);
    setProductDetails(null);

    // Fetch order details from the API
    fetch(`https://fst-cart-production.up.railway.app/api/ordered-items/1`)
      .then(response => response.json())
      .then(data => setOrderDetails(data))
      .catch(error => console.error('Error fetching order details:', error));

    // Fetch product details from the API
    fetch(`https://fst-cart-production.up.railway.app/api/products/1`)
      .then(response => response.json())
      .then(data => setProductDetails(data))
      .catch(error => console.error('Error fetching product details:', error));

            // Fetch product details from the API
            fetch(`https://fst-cart-production.up.railway.app/api/addresses/2`)
            .then(response => response.json())
            .then(data => setAddress(data))
            .catch(error => console.error('Error fetching product details:', error));
  };

  const handleDeleteOrder = (orderId) => {
    // Implement logic for deleting order
    console.log(`Delete Order ID: ${orderId}`);
  
    // Send a DELETE request to the API
    fetch(`https://fst-cart-production.up.railway.app/api/confirm-orders/${orderId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    })
      .then(response => {
        if (response.ok) {
          alert(`Order ID ${orderId} deleted successfully.`);
          // Implement any additional logic after successful deletion
        } else {
          alert(`Failed to delete Order ID ${orderId}.`);
        }
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
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
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Customer ID:</strong> {order.customer_id}<br />
              <strong>Address:</strong> {order.address}<br />
              <strong>Contact Number:</strong> {order.contact_number}<br />
              <strong>Created At:</strong> {formatDate(order.created_at)}<br />
              <strong>Updated At:</strong> {formatDate(order.updated_at)}<br />
            </div>

            <div className="order-actions">
              <button onClick={() => handleViewDetails(order)}>View Details</button>
              <button onClick={() => handleDeleteOrder(order.id)}>
                <Trash size={20} />
              </button>
            </div>

            <hr />
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          show={!!orderDetails && !!productDetails}
          handleClose={() => setSelectedOrder(null)}
          orderDetails={orderDetails}
          productDetails={productDetails}
          addressData={address}
        />
      )}
    </div>
  );
};

export default AllOrders;
