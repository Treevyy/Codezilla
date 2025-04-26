// src/components/SignUp.tsx
/*CREATE IMPORTS */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/codezilla.css";

const avatarList = [
  '/avatars/carmen.png',
  '/avatars/jacquilyn.png',
  '/avatars/trevor.png',
  '/avatars/michael.png',
  '/avatars/shawna.png',
];

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password, selectedAvatar });
    navigate('/map');
  };

  return (
    <div className="login-wrapper">
       <img
        src="/background/codezilla_bkgd.png"
        alt="Background"
        className="background-image"
      />
      <form className="question-box" onSubmit={handleSubmit}>
        <h2>Create Your Codezilla Account</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p>Select Your Avatar</p>
        <div className="avatar-grid">
          {avatarList.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index}`}
              className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </div>

        <button className="signup-button" type="submit">Enter the Game</button>
      </form>
    </div>
  );
};

export default SignUp;
