import React from 'react';
import './avatar.css';

const Avatar = ({ imageUrl, text }) => {
  return (
    <div className="avatar-container">
      <div className="avatar-cont">
        <img src={imageUrl} alt="Avatar" />
      </div>
      <div className="avatar-text">{text}</div>
    </div>
  );
};

export default Avatar;
