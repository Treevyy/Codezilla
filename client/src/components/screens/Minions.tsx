// src/components/Minion.tsx

import React from 'react';

interface MinionProps {
  id: string;
  x: number;
  y: number;
  image: string;
  name: string;
  questionId: string;
  goToQuestion: (questionId: string) => void;
}

const Minion: React.FC<MinionProps> = ({ id, x, y, image, name, questionId, goToQuestion }) => {
  return (
    <div
      id={`minion-${id}`} // ✅ Corrected here
      style={{ position: 'absolute', top: y, left: x, cursor: 'pointer' }}
      onClick={() => goToQuestion(questionId)}
    >
      <img src={image} alt={name} style={{ width: '80px', height: '80px' }} />
    </div>
  );
};

export default Minion;
