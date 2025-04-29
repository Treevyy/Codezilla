import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components/screens/Login';
import GameMap from './components/screens/GameMap';
import GameOver from './components/screens/GameOver';
import Victory from './components/screens/Victory';
import Signup from './components/screens/Signup';
import Questions from './components/screens/Questions';
import codezillaLogo from 'client/public/codezilla_logo.png';
import './styles/codezilla.css';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();        
    navigate('/signup'); 
  };   
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};
const App: React.FC = () => {
  return (
    <Router> 
    <div className="app-wrapper">
     <img
        src="/codezilla_logo.png"
        alt="Codezilla Logo"
        className="logo-background"
      />
      <LogoutButton />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<GameMap />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/victory" element={<Victory />} />
        <Route path="/question/:id" element={<Questions />} />
      
    </Routes>
    </div>
    </Router>
  );
};

export default App;
