
import React from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = ({ name, number, description, email }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2 className="profile-card-name">Name: {name}</h2>
        <p className="profile-card-number">Email: {email}</p>
        <p className="profile-card-number">Number: {number}</p>
      </div>
      <div className="profile-card-description">{description}</div>
    </div>
  );
};

export default ProfileCard;
