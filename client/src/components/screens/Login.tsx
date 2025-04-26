// src/components/Login.tsx
import React from 'react';
import "../../styles/codezilla.css";
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signup');
  };

  return (
    <div className="login-wrapper">
      <img
  src="/background/codezilla_bkgd.png"
  alt="rainy cityscape"
        className="background-image"
      />

      <div className="login-content">
        <div className="question-box">
          <h1>Login</h1>
          <input type="text" placeholder="username" className="login-input" />
          <input type="password" placeholder="password" className="login-input" />
          <p>Not a player yet?</p>
          <button className="signup-button" onClick={handleLogin}>Sign Up!</button>
        </div>
      </div>
    </div>
  );
};
