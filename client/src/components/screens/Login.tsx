// src/components/screens/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBodyClass } from '../../Utils/useBodyClass';
import "../../styles/codezilla.css";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  useBodyClass('login-background');

  const handleLogin = () => {
    navigate('/signup');
  };

  return (
    <div className="login-wrapper">
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