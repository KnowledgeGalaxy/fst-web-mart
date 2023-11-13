import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('https://fst-cart-production.up.railway.app/api/products/') // Assuming json-server is running on port 5000
      .then(response => {
        setProducts(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    const existingCartItem = cart.find(item => item.id === product.id);
    if (existingCartItem) {
      alert('Item is already added to cart'); // You can replace this with your desired notification method
    } else {
      setCart([...cart, product]);
      alert('Item added to cart'); // You can replace this with your desired notification method
    }
  };
  const getRandomStars = () => {
    const minStars = 3;
    const maxStars = 5;
    const numStars = Math.random() * (maxStars - minStars) + minStars; // Generate a random number with decimals
    const roundedStars = Math.round(numStars); // Round to the nearest whole number
  
    const starsArray = Array.from({ length: roundedStars }, (_, index) => (
      <span key={index} role="img" aria-label="star">⭐</span>
    ));
    return starsArray;
  };
  
  return (
    <div className="home">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="card">
              <img src={product.imageUrl} alt={product.name} className='img' />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <div className="stars">
                {getRandomStars()}
              </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
