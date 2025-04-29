import React from 'react';

interface MinionProps {
  id: string;
  xPercent: number;
  yPercent: number;
  image: string;
  name: string;
  questionId: string;
  goToQuestion: (questionId: string) => void;
  size: number;
  selectedMinionId: string | null;
}

const Minion: React.FC<MinionProps> = ({ 
  id, 
  xPercent, 
  yPercent, 
  image, 
  name, 
  questionId, 
  goToQuestion,
  selectedMinionId,
 }) => {
  const isSelected = selectedMinionId === id;
  
  return (
    <div
      id={`minion-${id}`}
      className={`minion ${isSelected ? 'selected' : ''}`}
      
      style={{
        position: 'absolute',
        top: `${yPercent}%`,
        left: `${xPercent}%`,
        width: '120px',
        height: '120px',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 2,
      }}
      onClick={() => goToQuestion(questionId)}
      title={name}
    >
      <img
        src={image}
        alt={name}
        className='minion-image'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default Minion;
