// Contact.jsx
import React from 'react';

const Contact = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/7810888468', '_blank');
  };

  const sendEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <div className="contact" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Contact Us</h2>
      <h2>7810888468</h2>
      <div className="contact-details" style={{ marginTop: '15px' }}>
        <h3>WhatsApp:</h3>
        <button
          onClick={openWhatsApp}
          style={{
            backgroundColor: '#25d366',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Chat on WhatsApp
        </button>
        <h3>Email:</h3>
        <h3>fastmart69@gmail.com</h3>
        <button
          onClick={() => sendEmail('fastmart69@gmail.com')}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default Contact;
