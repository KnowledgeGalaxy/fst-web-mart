import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import axios from 'axios';
import Modal from 'react-modal';
import '../css/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Fetch products
    axios.get('https://fst-cart-production.up.railway.app/api/products/')
      .then(response => {
        setProducts(response.data);
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    openModal();
  };

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

      {/* Product Modal */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Product Modal"
  className="modal"
  overlayClassName="overlay"
>
  <div className="product-description">
    <h2>{selectedProduct && selectedProduct.name}</h2>
    <p>Description: {selectedProduct && selectedProduct.description}</p>
    {/* Add more details, reviews, comments, and contact details as needed */}
    <div className="reviews">
      <h3>Reviews:</h3>
      <p>Great product! ⭐⭐⭐⭐⭐</p>
      <p>Awesome quality. ⭐⭐⭐⭐</p>
    </div>
    <div className="contact">
      <h3>Contact:</h3>
      <p>
        <span role="img" aria-label="mail">📧</span> Email: {selectedProduct && 'fstmart@gmail.com'}
      </p>
      <p>
        <span role="img" aria-label="whatsapp">📱</span> WhatsApp: {selectedProduct && '7810888468'}
      </p>
    </div>
    <button onClick={closeModal}>Close</button>
  </div>
</Modal>
    </div>
  );
};

export default Home;
