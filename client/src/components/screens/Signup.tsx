// src/components/screens/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/codezilla.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../graphql/mutations";

const avatarList = [
  "/avatars/carmen.png",
  "/avatars/jacquilyn.png",
  "/avatars/trevor.png",
  "/avatars/michael.png",
  "/avatars/shawna.png",
];

const SignUp: React.FC = () => {
  useBodyClass('signup-background');
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // create a function to handle the mutation
  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!username.trim() || !selectedAvatar) {
      alert("Please enter a username and select an avatar before proceeding.");
      return;
    }

    localStorage.setItem('selectedAvatar', selectedAvatar);
    localStorage.setItem('username', username);


    // localStorage.setItem('selectedAvatar', selectedAvatar);
    // localStorage.setItem('username', username);

    console.log({ username, password, selectedAvatar });

    try {
      const response = await addUser({
        variables: {
          input: {
            password: password,
            selectedAvatar: selectedAvatar,
            username: username,
          },
        },
      });

      const token = response.data.addUser.token;

      localStorage.setItem("token", token);

      console.log(response);
      navigate('/map');
    } catch (err) {
      console.error("Signup failed", err);
      alert("Signup failed");
    }
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
        <p>Select Your Avatar</p>
        <div className="avatar-grid">
          <div className="avatar-row">
            {avatarList.slice(0, 3).map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index}`}
                className={`avatar-option ${
                  selectedAvatar === avatar ? "selected" : ""
                }`}
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
                className={`avatar-option ${
                  selectedAvatar === avatar ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(avatar)}
              />
            ))}
          </div>
        </div>

        <button className="signup-button" type="submit">
          Enter the Game
        </button>
      </form>
    </div>
  );
};

export default SignUp;
