// components/Address.js

// import React, { useState, useEffect } from 'react';
// import '../css/Address.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setSelectedAdd } from '../actions/addressActions';

// const Address = () => {
//   const navigate = useNavigate();
//   const [addressData, setAddressData] = useState({
//     address_type: 'home',
//     street: '',
//     city: '',
//     state: '',
//     zip_code: '',
//     contact_number: '',
//     customer_id: '8585858585', // Replace with the actual customer ID
//   });

//   const [existingAddresses, setExistingAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null); // Updated state to store the entire address
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const loginData = useSelector((state) => state.auth.loginData);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await fetch(`https://fst-cart-production.up.railway.app/api/customers/${loginData}/addresses/`);

//         if (response.ok) {
//           const data = await response.json();
//           setExistingAddresses(data);
//         }
//       } catch (error) {
//         console.error('Error fetching addresses:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAddresses();
//   }, [loginData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddressData({ ...addressData, [name]: value });
//   };

//   const handleCheckboxChange = (address) => {
//     // Set the selected address
//     setSelectedAddress(address);
//     dispatch(setSelectedAdd(address));

//     // Rest of your logic...
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const customerId = loginData; // Replace with the actual customer ID

//     if (!selectedAddress) {
//       // User submitted a new address, handle the submission logic as before
//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...addressData,
//         }),
//       };

//       try {
//         const response = await fetch(`https://fst-cart-production.up.railway.app/api/customers/${customerId}/addresses/`, requestOptions);

//         if (response.ok) {
//           const data = await response.json();
//           // Dispatch the new address to the store
//           dispatch(setSelectedAdd(data));
//         }
//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error.message);
//       }
//     }

//     navigate('/order-details');
//   };

//   const handleAddAddressClick = () => {
//     setIsFormOpen((prev) => !prev);
//   };

//   return (
//     <div className="address-container">
//       <h2>Add Address</h2>
//       <button onClick={handleAddAddressClick}>Add Address</button>
//       {isFormOpen && (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Address Type:
//             <select name="address_type" value={addressData.address_type} onChange={handleInputChange}>
//               <option value="home">Home</option>
//               <option value="work">Work</option>
//               <option value="other">Other</option>
//             </select>
//           </label>
//           <label>
//             Street:
//             <input type="text" name="street" value={addressData.street} onChange={handleInputChange} />
//           </label>
//           <label>
//             City:
//             <input type="text" name="city" value={addressData.city} onChange={handleInputChange} />
//           </label>
//           <label>
//             State:
//             <input type="text" name="state" value={addressData.state} onChange={handleInputChange} />
//           </label>
//           <label>
//             Zip Code:
//             <input type="text" name="zip_code" value={addressData.zip_code} onChange={handleInputChange} />
//           </label>
//           <label>
//             Contact Number:
//             <input
//               type="text"
//               name="contact_number"
//               value={addressData.contact_number}
//               onChange={handleInputChange}
//             />
//           </label>
//           <button type="submit">Save Address</button>
//         </form>
//       )}
//       <div>
//         <h3>Existing Addresses:</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="address-table">
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>Address Type</th>
//                 <th>Street</th>
//                 <th>City</th>
//                 <th>State</th>
//                 <th>Zip Code</th>
//               </tr>
//             </thead>
//             <tbody>
//               {existingAddresses.map((address) => (
//                 <tr key={address.id}>
//                   <td>
//                     <label className="radio-label">
//                       <input
//                         type="radio"
//                         name="selectedAddress"
//                         checked={selectedAddress && selectedAddress.id === address.id}
//                         onChange={() => handleCheckboxChange(address)}
//                       />
//                     </label>
//                   </td>
//                   <td>{address.address_type}</td>
//                   <td>{address.street}</td>
//                   <td>{address.city}</td>
//                   <td>{address.state}</td>
//                   <td>{address.zip_code}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {selectedAddress ? (
//           <button onClick={() => navigate('/order-details')}>Continue</button>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default Address;


import React, { useState, useEffect } from 'react';
import '../css/Address.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedAdd } from '../actions/addressActions';

const Address = () => {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState({
    address_type: 'home',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    contact_number: '',
    customer_id: '8585858585', // Replace with the actual customer ID
  });

  const [existingAddresses, setExistingAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Updated state to store the entire address
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const loginData = useSelector((state) => state.auth.loginData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`https://fst-cart-production.up.railway.app/api/customers/${loginData}/addresses/`);

        if (response.ok) {
          const data = await response.json();
          setExistingAddresses(data);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [loginData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
    // Clear the corresponding validation error
    setErrors({ ...errors, [name]: '' });
  };

  const handleCheckboxChange = (address) => {
    // Set the selected address
    setSelectedAddress(address);
    dispatch(setSelectedAdd(address));

    // Rest of your logic...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const customerId = loginData; // Replace with the actual customer ID

    if (!selectedAddress) {
      // User submitted a new address, handle the submission logic as before
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...addressData,
        }),
      };

      try {
        const response = await fetch(`https://fst-cart-production.up.railway.app/api/customers/${customerId}/addresses/`, requestOptions);

        if (response.ok) {
          const data = await response.json();
          // Dispatch the new address to the store
          dispatch(setSelectedAdd(data));
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
      }
    }

    navigate('/order-details');
  };

  // Validate the form fields
  const validateForm = () => {
    const errors = {};

    if (!addressData.street.trim()) {
      errors.street = 'Street is required';
    }

    if (!addressData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!addressData.state.trim()) {
      errors.state = 'State is required';
    }

    if (!addressData.zip_code.trim()) {
      errors.zip_code = 'Zip Code is required';
    } else if (!/^\d{6}$/.test(addressData.zip_code.trim())) {
      errors.zip_code = 'Zip Code should be 6 digits';
    }

    if (!addressData.contact_number.trim()) {
      errors.contact_number = 'Contact Number is required';
    } else if (!/^\d{10}$/.test(addressData.contact_number.trim())) {
      errors.contact_number = 'Contact Number should be 10 digits';
    }

    return errors;
  };
  const handleAddAddressClick = () => {
    setIsFormOpen((prev) => !prev);
  };
  return (
    <div className="address-container">
      <h2>Add Address</h2>
      <button onClick={handleAddAddressClick}>Add Address</button>
      {isFormOpen && (
        <form onSubmit={handleSubmit}>
          <label>
            Address Type:
            <select name="address_type" value={addressData.address_type} onChange={handleInputChange}>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Street:
            <input type="text" name="street" value={addressData.street} onChange={handleInputChange} />
            {errors.street && <span className="error">{errors.street}</span>}
          </label>
          <label>
            City:
            <input type="text" name="city" value={addressData.city} onChange={handleInputChange} />
            {errors.city && <span className="error">{errors.city}</span>}
          </label>
          <label>
            State:
            <input type="text" name="state" value={addressData.state} onChange={handleInputChange} />
            {errors.state && <span className="error">{errors.state}</span>}
          </label>
          <label>
            Zip Code:
            <input type="text" name="zip_code" value={addressData.zip_code} onChange={handleInputChange} />
            {errors.zip_code && <span className="error">{errors.zip_code}</span>}
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contact_number"
              value={addressData.contact_number}
              onChange={handleInputChange}
            />
            {errors.contact_number && <span className="error">{errors.contact_number}</span>}
          </label>
          <button type="submit">Save Address</button>
        </form>
      )}
      <div>
        <h3>Existing Addresses:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="address-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Address Type</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {existingAddresses.map((address) => (
                <tr key={address.id}>
                  <td>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress && selectedAddress.id === address.id}
                        onChange={() => handleCheckboxChange(address)}
                      />
                    </label>
                  </td>
                  <td>{address.address_type}</td>
                  <td>{address.street}</td>
                  <td>{address.city}</td>
                  <td>{address.state}</td>
                  <td>{address.zip_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedAddress ? (
          <button onClick={() => navigate('/order-details')}>Continue</button>
        ) : null}
      </div>
    </div>
  );
};

export default Address;
