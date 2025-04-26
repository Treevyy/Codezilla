// src/components/screens/GameMap.tsx

// IMPORT LIBRARIES
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Minion from './Minions'; 
import "../../styles/codezilla.css";

const GameMap: React.FC = () => {
  const navigate = useNavigate();

  const minions = [
    {
      id: '1',
      x: 100,
      y: 150,
      image: '/minions/nullbyte3a.png',
      name: 'Nullbyte',
      questionId: 'q1',
    },
    {
      id: '2',
      x: 250,
      y: 200,
      image: '/minions/dbug2a.png',
      name: 'Dbug',
      questionId: 'q2',
    },
    {
      id: '3',
      x: 400,
      y: 250,
      image: '/minions/typerrorus.png',
      name: 'Typerrorasaurus',
      questionId: 'q3',
    },
    {
      id: '4',
      x: 550,
      y: 300,
      image: '/minions/monster-left.png',
      name: 'Pie-Thon',
      questionId: 'q4',
    },
    {
      id: '5',
      x: 700,
      y: 350,
      image: '/minions/codezilla2.png',
      name: 'Codezilla',
      questionId: 'q5',
    },
  ];

  const goToQuestion = (questionId: string) => {
    console.log('Go to question', questionId);
    navigate(`/question/${questionId}`);
  };

  return (
    <div className="game-map">
      {/* Background image */}
      <img
        src="/background/codezilla_bkgd.png"
        alt="rainy cityscape"
        className="background-image"
      />

      {/* Minions */}
      {minions.map((minion) => (
        <Minion
          key={minion.id}
          id={minion.id}
          x={minion.x}
          y={minion.y}
          image={minion.image}
          name={minion.name}
          questionId={minion.questionId}
          goToQuestion={goToQuestion}
        />
      ))}
    </div>
  );
};

export default GameMap;
