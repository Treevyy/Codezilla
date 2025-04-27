import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Minion from './Minions';
import "../../styles/codezilla.css";

const GameMap: React.FC = () => {
  const navigate = useNavigate();
  const [completedPaths, setCompletedPaths] = useState<string[]>([]);

  const minions = [
    {
      id: '1',
      xPercent: 17,
      yPercent: 25,
      image: '/minions/nullbyte3a.png',
      name: 'Nullbyte',
      questionId: 'q1',
    },
    {
      id: '2',
      xPercent: 35,
      yPercent: 48,
      image: '/minions/dbug2a.png',
      name: 'Dbug',
      questionId: 'q2',
    },
    {
      id: '3',
      xPercent: 53,
      yPercent: 65,
      image: '/minions/typerrorus.png',
      name: 'Typerrorasaurus',
      questionId: 'q3',
    },
    {
      id: '4',
      xPercent: 72,
      yPercent: 50,
      image: '/minions/monster-left.png',
      name: 'Pie-Thon',
      questionId: 'q4',
    },
    {
      id: '5',
      xPercent: 87,
      yPercent: 27,
      image: '/minions/codezilla2.png',
      name: 'Codezilla',
      questionId: 'q5',
    },
  ];

  const nodes = [
    { id: 'node1', xPercent: 18, yPercent: 28 }, // START LEFT
    { id: 'node2', xPercent: 18, yPercent: 48 }, // SMALL DOWN
    { id: 'node3', xPercent: 35, yPercent: 48 }, // SMALL RIGHT
    { id: 'node4', xPercent: 35, yPercent: 68 }, // SMALL DOWN
    { id: 'node5', xPercent: 53, yPercent: 68 }, // SMALL RIGHT
    { id: 'node6', xPercent: 53, yPercent: 48 }, // SMALL UP
    { id: 'node7', xPercent: 70, yPercent: 48 }, // SMALL RIGHT
    { id: 'node8', xPercent: 70, yPercent: 28 }, // SMALL UP
    { id: 'node9', xPercent: 88, yPercent: 28 }, // CODEZILLA
  ];

  const goToQuestion = (questionId: string) => {
    console.log('Go to question', questionId);

    const currentIndex = minions.findIndex(m => m.questionId === questionId);

    if (currentIndex < nodes.length - 1) {
      const pathId = `${nodes[currentIndex].id}-${nodes[currentIndex + 1].id}`;
      setCompletedPaths(prev => [...prev, pathId]);
    }

    navigate(`/question/${questionId}`);
  };

  return (
    <div className="game-map">
      {/* BACKGROUND IMAGE */}
      <img
        src="/background/codezilla_bkgd.png"
        alt="rainy cityscape"
        className="background-image"
      />

      {/* SVG LINES AND CIRCLES */}
      <svg className="map-lines">
        {/* LINES BETWEEN NODES */}
        {nodes.map((node, index) => {
          const nextNode = nodes[index + 1];
          if (!nextNode) return null;

          return (
            <line
              key={`line-${node.id}-${nextNode.id}`}
              x1={`${node.xPercent}%`}
              y1={`${node.yPercent}%`}
              x2={`${nextNode.xPercent}%`}
              y2={`${nextNode.yPercent}%`}
              className={`map-line ${completedPaths.includes(`${node.id}-${nextNode.id}`) ? 'completed' : ''}`}
            />
          );
        })}

        {/* GLOWING OUTER CIRCLE + DARKER INNER CIRCLE */}
        {nodes.map((node, index) => {
          const isCompleted = index < completedPaths.length;

          return (
            <g key={`node-${node.id}`}>
              {/* OUTER GLOW CIRCLE */}
              <circle
                cx={`${node.xPercent}%`}
                cy={`${node.yPercent}%`}
                r="3.5%"
                className={`map-node-outer ${isCompleted ? 'completed' : ''}`}
              />
              {/* INNER DARKER CIRCLE */}
              <circle
                cx={`${node.xPercent}%`}
                cy={`${node.yPercent}%`}
                r="3%"
                className="map-node-inner"
              />
            </g>
          );
        })}
      </svg>

      {/* MINIONS */}
      {minions.map((minion) => (
        <Minion
          key={minion.id}
          id={minion.id}
          xPercent={minion.xPercent}
          yPercent={minion.yPercent}
          image={minion.image}
          name={minion.name}
          questionId={minion.questionId}
          goToQuestion={goToQuestion}
          size={minion.id === '5' || minion.name === 'Codezilla' ? 400 : 400} // ✅ DOUBLE SAFE
        />
      ))}
    </div>
  );
};

export default GameMap;
