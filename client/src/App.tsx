import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/screens/Login';
import GameMap from './components/screens/GameMap';
// import GameOver from './components/screens/GameOver';
// import Victory from './components/screens/Victory';
import Signup from './components/screens/Signup';

import './styles/codezilla.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<GameMap />} />
        {/* <Route path="/gameover" element={<GameOver />} /> */}
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/victory" element={<Victory />} /> */}


      </Routes>
    </Router>
  );
};

export default App;
