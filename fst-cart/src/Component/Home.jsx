import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import axios from 'axios';
import '../css/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch products
    axios.get('https://fst-cart-production.up.railway.app/api/products/')
      .then(response => {
        setProducts(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Fetch categories
    axios.get('https://fst-cart-production.up.railway.app/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    let quantity = 1;
    const existingCartItem = cart.find(item => item.id === product.id);
    if (existingCartItem) {
      alert('Item is already added to cart');
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const getRandomStars = () => {
    const minStars = 3;
    const maxStars = 5;
    const numStars = Math.random() * (maxStars - minStars) + minStars;
    const roundedStars = Math.round(numStars);

    const starsArray = Array.from({ length: roundedStars }, (_, index) => (
      <span key={index} role="img" aria-label="star">⭐</span>
    ));
    return starsArray;
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter(product => (
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || String(product.category) === selectedCategory)
  ));

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <div className="card">
              <img src={product.imageUrl} alt={product.name} className='img' />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Category: {getCategoryNameById(product.category)}</p>
              <div className="stars">
                {getRandomStars()}
              </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-description">
          <h2>{selectedProduct.name}</h2>
          <p>Description: {selectedProduct.description}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
