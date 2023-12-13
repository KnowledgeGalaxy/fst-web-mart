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
  const [feedback, setFeedback] = useState('');

 

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
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Handle the feedback submission, e.g., send it to a server
    console.log('Feedback submitted:', feedback);
    // Close the modal after submitting feedback
    closeModal();
  };
  const whatsappNumber = '7810888468'; // Replace with the actual WhatsApp number

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  };
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
  style={{
    content: {
      maxWidth: '600px',
      margin: 'auto',
      borderRadius: '8px',
      padding: '20px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  }}
>
  <div className="product-description">
    <h2 style={{ marginBottom: '10px' }}>{selectedProduct && selectedProduct.name}</h2>
    <p style={{ marginBottom: '20px' }}>Description: {selectedProduct && selectedProduct.description}</p>
    {/* Add more details, reviews, comments, and contact details as needed */}
    <div className="reviews" style={{ marginBottom: '20px' }}>
      <h3>Reviews:</h3>
      <p>Great product! ⭐⭐⭐⭐⭐</p>
      <p>Awesome quality. ⭐⭐⭐⭐</p>
    </div>
    <div className="contact" style={{ marginBottom: '20px' }}>
      <h3>Contact:</h3>
      <p>
        <span
          role="img"
          aria-label="whatsapp"
          style={{ cursor: 'pointer' }}
          onClick={openWhatsApp}
        >
          📱
        </span>{' '}
        WhatsApp: {selectedProduct && '7810888468'}
      </p>
    </div>
    <div className="feedback" style={{ marginBottom: '20px' }}>
      <h3>Give Feedback:</h3>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Type your feedback here..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
        }}
      />
      <button
        onClick={handleSubmitFeedback}
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit Feedback
      </button>
    </div>
    <button
      onClick={closeModal}
      style={{
        padding: '10px',
        backgroundColor: '#d9534f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Close
    </button>
  </div>
</Modal>
    </div>
  );
};

export default Home;
