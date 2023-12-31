import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
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
  const [productsFeedback, setProductFeedback]=useState([]);
  const [userRating, setUserRating] = useState(0);
  const [websiteFeedback, setWebsiteFeedback] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const isLoggedIn = localStorage.getItem('isLoggedin');
  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProductFeedback = async () => {
      if (selectedProduct) {
        try {
          const response = await fetch(`https://fst-cart-production.up.railway.app/api/product-feedback/${selectedProduct.id}/`);
          
          if (response.ok) {
            const data = await response.json();
            setWebsiteFeedback(data);
            setProductFeedback(data);
          } else {
            console.error('Failed to fetch product feedback');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    };

    fetchProductFeedback();
  }, [selectedProduct]);

  useEffect(() => {
    const fetchCustomerNames = async () => {
      const names = {};
      for (const feedbackItem of websiteFeedback) {
        if (!names[feedbackItem.customer_id]) {
          const name = await getCustomerName(feedbackItem.customer_id);
          names[feedbackItem.customer_id] = name;
        }
      }
      setCustomerNames(names);
    };

    fetchCustomerNames();
  }, [websiteFeedback]);

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
  const getCustomerName = async (customerId) => {
    let name = 'Unknown';
    try {
      const response = await axios.get(`https://fst-cart-production.up.railway.app/api/customers/${customerId}`);

      if (response.status === 200) {
        name = response.data.name;
      } else {
        console.log('Failed to get customer name. Please try again.');
      }
    } catch (error) {
      console.error('Error getting customer name:', error);
      console.log('An error occurred while getting customer name. Please try again.');
    }
    return name;
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

  const handleSubmitFeedback = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post(`https://fst-cart-production.up.railway.app/api/product-feedback/${selectedProduct.id}/`, {
          feedback_text: feedback,
          product_id: selectedProduct.id,
          rating: userRating,
          customer_id: customerId,
        });

        if (response.status === 201) {
          setWebsiteFeedback([...websiteFeedback, response.data]);
          setFeedback('');
          setUserRating(0);
        } else {
          alert('Failed to submit feedback. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting feedback. Please try again.');
      }
    } else {
      alert('Please login to give your valuable feedback');
      navigate('/login');
    }
  };
  const whatsappNumber = '7810888468'; // Replace with the actual WhatsApp number

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderFeedbackList = () => {
    return websiteFeedback.length > 0 ? (
      <ul className="feedback-list">
      {websiteFeedback.map((feedbackItem, index) => (
        <React.Fragment key={index}>
          {feedbackItem.feedback_text && (
            <>
              <h4 style={{ color: 'green', textDecoration: 'underline' }}>
                {customerNames[feedbackItem.customer_id]}{' '}
                {feedbackItem.created_at &&
                  new Date(feedbackItem.created_at).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
              </h4>
              <li>{feedbackItem.feedback_text}</li>
            </>
          )}
        </React.Fragment>
      ))}
    </ul>
    ) : (
      <p>No website feedback available.</p>
    );
  };

  const calculateOverallRating = () => {
    if (websiteFeedback.length === 0) {
      return 0;
    }

    const totalRating = websiteFeedback.reduce((acc, feedbackItem) => acc + feedbackItem.rating, 0);
    const averageRating = totalRating / websiteFeedback.length;

    return averageRating;
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };
  const renderStarRating = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const starsArray = Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        color={index + 1 <= roundedRating ? '#ffc107' : '#e4e5e9'}
        onClick={() => handleStarClick(index + 1)}
        style={{ cursor: 'pointer' }}
      />
    ));

    return (
      <div className="star-rating">
        {starsArray}
        <span className="rating-text">{roundedRating.toFixed(2)} out of 5</span>
      </div>
    );
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
          <div key={product.id} className="product-card" >
            <div className="card">
              <img src={product.imageUrl} alt={product.name} className='img'  onClick={() => handleProductClick(product)}/>
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
            {/* Display product feedback (reviews) */}
            {productsFeedback.map((feedback) => (
              <p key={feedback.id}>{feedback.feedback_text} ⭐{feedback.rating}</p>
            ))}
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
      <div>{renderStarRating(calculateOverallRating())}</div>
      <div>{renderFeedbackList()}</div>
      <h3>Give Feedback:</h3>
      <div className="user-rating">
        <span>Give Your Rating: </span>
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            color={index + 1 <= userRating ? '#ffc107' : '#e4e5e9'}
            onClick={() => handleStarClick(index + 1)}
            style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
          />
        ))}
      </div>
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
