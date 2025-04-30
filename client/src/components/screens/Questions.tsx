// src/components/screens/Questions.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnswerResultModal from '../AnswerResultModal';

interface Question {
  question: string;
  choices: { label: string; value: string }[];
  correctAnswer: string;
}

const Questions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userWasCorrect, setUserWasCorrect] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const minionMap: Record<string, string> = {
    q1: 'Nullbyte',
    q2: 'Dbug',
    q3: 'Typerrorasaurus',
    q4: 'Pie-Thon',
    q5: 'Codezilla',
  };

  const track = 'JavaScript';
  const level = 'easy';

  useEffect(() => {
    if (!id) return;

    fetch('/api/question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        minion: minionMap[id] || 'Nullbyte',
        level,
        track,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.question) {
          const raw = data.question;
          setQuestion({
            question: raw.question,
            choices: raw.choices.map((choice: string, index: number) => ({
              label: String.fromCharCode(65 + index),
              value: choice,
            })),
            correctAnswer: raw.answer,
          });
        }
      })
      .catch(err => {
        console.error('Failed to load question:', err);
      });
  }, [id]);

  const getRandomAudio = (isCorrect: boolean): string => {
    const correctClips = [
      '/audio/Dan_correct/Dan-correct-1.wav',
      '/audio/Dan_correct/Dan-correct-2.wav',
      '/audio/Dan_correct/Dan-correct-3.wav',
      '/audio/Dan_correct/correctStar.wav',
    ];
    const incorrectClips = [
      '/audio/Dan_incorrect/Dan-incorrect-1.wav',
      '/audio/Dan_incorrect/Dan-incorrect-2.wav',
      '/audio/Dan_incorrect/Dan-incorrect-3.wav',
      '/audio/Dan_incorrect/Dan-incorrect-4.wav',
      '/audio/Dan_incorrect/firstincorrect.wav',
    ];
    const pool = isCorrect ? correctClips : incorrectClips;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !selectedAnswer) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setUserWasCorrect(isCorrect);
    setAudioUrl(getRandomAudio(isCorrect));
    setShowResult(true);
  };

  const handleBack = () => navigate('/map');

  return (
    <div className="question-screen p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Question {id}</h1>
      {!question ? (
        <p>Loading question...</p>
      ) : (
        <>
          <p className="mb-6">{question.question}</p>
          <form onSubmit={handleSubmit}>
            {question.choices.map((choice) => (
              <label key={choice.value} className="block mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={choice.value}
                  checked={selectedAnswer === choice.value}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="mr-2"
                />
                {choice.label}: {choice.value}
              </label>
            ))}
            <button
              type="submit"
              disabled={!selectedAnswer}
              className={`mt-4 px-4 py-2 rounded text-white ${
                selectedAnswer ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          </form>
        </>
      )}

      <button onClick={handleBack} className="mt-6 text-blue-500 underline">
        Back to Map
      </button>

      <AnswerResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        isCorrect={userWasCorrect}
        drDanQuote={
          userWasCorrect ? "You're getting it, junior dev!" : "Nope — that ain't it!"
        }
        audioUrl={audioUrl}
      />
    </div>
  );
};

export default Questions;
