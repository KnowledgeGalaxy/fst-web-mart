import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Customer.css'; // Import your CSS file

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://fst-cart-production.up.railway.app/api/customers/');
        if (response.status === 200) {
          setCustomers(response.data);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customer-container">
      <h2>Customers</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.name}</td>
              <td>{customer.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
