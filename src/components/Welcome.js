import React from 'react';
import './Welcome.css';

const Welcome = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <h2>Welcome to Our Survey!</h2>
      <p>We appreciate your time and feedback.</p>
      <button className="start-btn" onClick={onStart}>
        Start Survey
      </button>
    </div>
  );
};

export default Welcome;





