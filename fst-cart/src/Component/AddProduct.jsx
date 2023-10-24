import React, { useState } from 'react';
import '../css/AddProduct.css'; // Import CSS fileimport React, { useState } from 'react';
import axios from 'axios';


const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({
      ...productInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://fst-cart-production.up.railway.app/api/products/', productInfo);
      console.log('Product added:', response.data);
      // Reset the form after successful submission
      setProductInfo({
        name: '',
        price: '',
        category: '',
        description: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={productInfo.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productInfo.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productInfo.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={productInfo.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
