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
  
    if (!username.trim() || !selectedAvatar) {
      alert('Please enter a username and select an avatar before proceeding.');
      return;
    }
  
    localStorage.setItem('selectedAvatar', selectedAvatar);
    localStorage.setItem('username', username);
  
    console.log({ username, password, selectedAvatar });
    navigate('/map');
  };
  
  

  return (
    <div className="login-wrapper">
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
  <div className="avatar-row">
    {avatarList.slice(0, 3).map((avatar, index) => (
      <img
        key={index}
        src={avatar}
        alt={`Avatar ${index}`}
        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
        onClick={() => setSelectedAvatar(avatar)}
      />
    ))}
  </div>
  <div className="avatar-row">
    {avatarList.slice(3).map((avatar, index) => (
      <img
        key={index + 3}
        src={avatar}
        alt={`Avatar ${index + 3}`}
        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
        onClick={() => setSelectedAvatar(avatar)}
      />
    ))}
  </div>
</div>


        <button className="signup-button" type="submit">Enter the Game</button>
      </form>
    </div>
  );
};

export default SignUp;
