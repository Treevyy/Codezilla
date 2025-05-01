// src/components/Login.tsx
import React from "react";
import "../../styles/codezilla.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations";
import { useState } from "react";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // create a function to handle the mutation
  const [login] = useMutation(LOGIN);

  const handleLogin = async (e:any) => {
   e.preventDefault();

   console.log(username)
   console.log(password)

  try {
    const response = await login({
      variables: {
        username: username,
        password: password,
      },
    });

    const token = response.data.login.token;


    localStorage.setItem('token', token);
    console.log(token)

    if(token) {
      navigate('/map');
    }
  } catch(err) {
    console.error("Login failed", err);
    alert("Login failed. Please check your username and password.");
  }

  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <form className="question-box" onSubmit={handleLogin}>
          <h1>Login</h1>
          
          <input 
            type="text" 
            placeholder="username" 
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>

          
          <p>Not a player yet?</p>
          <a href="/signup" className="signup-link">
            <button type="button" className="signup-button">Sign Up</button>
          </a>
        </form>
      </div>
    </div>
  );
};
