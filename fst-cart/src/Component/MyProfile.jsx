// MyProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Reset local storage or perform any logout actions as needed
    localStorage.clear();
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="my-profile">
      <h2>My Profile</h2>
      {/* Add profile information or other content here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MyProfile;
