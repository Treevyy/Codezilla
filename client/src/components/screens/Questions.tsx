// client/src/components/screens/Questions.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Questions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/map');
  };

  return (
    <div className="question-screen">
      <h1>Question {id}</h1>
      <p>This is where the question {id} will go!</p>
      <button onClick={handleBack}>Back to Map</button>
    </div>
  );
};

export default Questions;
