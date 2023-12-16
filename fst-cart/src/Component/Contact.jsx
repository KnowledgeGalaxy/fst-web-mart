// Contact.jsx
import React from 'react';
//import '../css/Contact.css'; // Import your CSS file

const Contact = () => {
  const openWhatsApp = () => {
    // Implement the logic to open WhatsApp link
     window.open('https://wa.me/7810888468', '_blank');
    alert('Open WhatsApp link here'); // Replace this with the actual logic
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <h3>WhatsApp:</h3>
        <p>
          <span
            role="img"
            aria-label="whatsapp"
            style={{ cursor: 'pointer' }}
            onClick={openWhatsApp}
          >
            📱
          </span>{' '}
          WhatsApp: 7810888468 {/* Replace with the actual WhatsApp number */}
        </p>
        {/* Add more contact details as needed */}
      </div>
    </div>
  );
};

export default Contact;
