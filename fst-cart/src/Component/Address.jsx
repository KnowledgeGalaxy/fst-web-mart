import React, { useState } from 'react';
import '../css/Address.css'; // Import the CSS file
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Address = ({ onSubmit }) => {
 const  navigate=useNavigate();
  const [addressData, setAddressData] = useState({
    address_type: 'home',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    contact_number: '',
    customer_id: "8585858585"
  });

  const loginData = useSelector((state) => state.auth.loginData);
  const signupData = useSelector((state) => state.auth.signupData);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerId = loginData; // Replace with the actual customer ID

    const requestOptions = {
      method: 'POST', // Change the method if needed (e.g., 'PUT' for updating)
      headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers if required
        // For example, if you have a token in your login/signup data
        // 'Authorization': `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(addressData),
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/customers/${customerId}/addresses/`, requestOptions);

      if (response.ok) {
        navigate("/order-details")
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className="address-container">
      <h2>Add Address</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address Type:
          <select
            name="address_type"
            value={addressData.address_type}
            onChange={handleInputChange}
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={addressData.street}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={addressData.state}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zip_code"
            value={addressData.zip_code}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            name="contact_number"
            value={addressData.contact_number}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default Address;
