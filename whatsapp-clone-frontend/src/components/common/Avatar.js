import React from 'react';
import './Avatar.css';

const Avatar = () => {
  return (
    <div className="avatar-container">
      <svg viewBox="0 0 50 50" width="40" height="40">
        <path fill="#FFF" d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25s25-11.2,25-25S38.8,0,25,0z M25,7.7 c4.8,0,8.7,3.9,8.7,8.7s-3.9,8.7-8.7,8.7s-8.7-3.9-8.7-8.7S20.2,7.7,25,7.7z M25,43.3c-6.3,0-12-3.2-15.2-8.1 c0.2-5,10.2-7.8,15.2-7.8s15,2.7,15.2,7.8C37,40.1,31.3,43.3,25,43.3z"></path>
      </svg>
    </div>
  );
};

export default Avatar;