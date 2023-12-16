import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
// import '../css/About.css'; // Import your CSS file

const About = () => {
  const [feedback, setFeedback] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [websiteFeedback, setWebsiteFeedback] = useState([]);

  useEffect(() => {
    // Fetch all website feedback on component mount
    const fetchWebsiteFeedback = async () => {
      try {
        const response = await axios.get('https://fst-cart-production.up.railway.app/api/website-feedback/');
        if (response.status === 200) {
          setWebsiteFeedback(response.data);
        } else {
          console.error('Failed to fetch website feedback');
        }
      } catch (error) {
        console.error('Error fetching website feedback:', error);
      }
    };

    fetchWebsiteFeedback();
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post('https://fst-cart-production.up.railway.app/api/website-feedback/', {
        feedback_text: feedback,
        rating: userRating,
      });

      if (response.status === 201) {
        // Update the list with the new feedback
        setWebsiteFeedback([...websiteFeedback, response.data]);
        setFeedback('');
        setUserRating(0); // Reset user rating after submission
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback. Please try again.');
    }
  };

  // Calculate overall rating
  const calculateOverallRating = () => {
    if (websiteFeedback.length === 0) {
      return 0;
    }

    const totalRating = websiteFeedback.reduce((acc, feedbackItem) => acc + feedbackItem.rating, 0);
    const averageRating = totalRating / websiteFeedback.length;

    return averageRating;
  };

  const renderStarRating = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    const starsArray = Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        color={index + 1 <= roundedRating ? '#ffc107' : '#e4e5e9'}
        onClick={() => handleStarClick(index + 1)}
        style={{ cursor: 'pointer' }}
      />
    ));

    return (
      <div>
        {starsArray}
        <span style={{ marginLeft: '0.5rem' }}>{roundedRating.toFixed(2)} out of 5</span>
      </div>
    );
  };

  return (
    <div className="about">
      <h2>About Us</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dolor vel quam tincidunt
        facilisis at ut ligula. Nulla facilisi.
      </p>
      <h3>Website Feedback</h3>
      {renderStarRating(calculateOverallRating())}
      {websiteFeedback.length > 0 ? (
        <ul>
          {websiteFeedback.map((feedbackItem) => (
            <li key={feedbackItem.id}>{feedbackItem.feedback_text}</li>
          ))}
        </ul>
      ) : (
        <p>No website feedback available.</p>
      )}
      <div>
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
        className="feedback-textarea"
      />
      <button onClick={handleSubmitFeedback} className="submit-button">
        Submit Feedback
      </button>
    </div>
  );
};

export default About;
 