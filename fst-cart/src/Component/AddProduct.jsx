import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddProduct.css';

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    category: 0, // Assuming 2 is the ID for the category
    description: '',
    imageUrl: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from your API
    axios.get('https://fst-cart-production.up.railway.app/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setProductInfo({
      ...productInfo,
      [name]: value
    });
    console.log(name, value)
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
  
    // Convert category value to a number before setting in state
    const categoryValue = name === 'category' ? parseInt(value, 10) : value;
  
    setProductInfo({
      ...productInfo,
      [name]: categoryValue
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
        category: 0, // Reset to default category ID
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productInfo.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={productInfo.category}
            onChange={handleChange1}
            required
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productInfo.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={productInfo.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
