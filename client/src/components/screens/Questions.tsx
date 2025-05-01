import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnswerResultModal from '../AnswerResultModal';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Question {
  snippet?: string;
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
    q1: 'NullByte',
    q2: 'Dbug',
    q3: 'Typerrorasaurus',
    q4: 'PieThon',
    q5: 'Codezilla',
  };

  const difficultyMap: Record<string, string> = {
    NullByte: 'easy',
    Dbug: 'medium',
    Typerrorasaurus: 'medium-hard',
    PieThon: 'hard',
    Codezilla: 'boss',
  };

  useEffect(() => {
    if (!id) return;
    let didCancel = false;

    const fetchQuestion = async () => {
      const minion = minionMap[id] || 'NullByte';
      const level = difficultyMap[minion] || 'easy';
      const track = minion === 'PieThon' ? 'Python' : 'JavaScript';
      const payload = { minion, level, track };

      try {
        const res = await fetch('/api/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const text = await res.text();
        if (didCancel) return;

        const data = JSON.parse(text);
        if (!data?.question) return;

        const raw = data.question;
        const parsedChoices = raw.choices.map((choice: string, index: number) => ({
          label: String.fromCharCode(65 + index),
          value: choice.replace(/^[A-Da-d]\)\s*/, ''),
        }));

        const correctFromLetter =
          raw.answer?.length === 1
            ? raw.choices[raw.answer.charCodeAt(0) - 65]?.replace(/^[A-Da-d]\)\s*/, '')
            : raw.answer;

        const correctFromIndex =
          typeof raw.correctIndex === 'number'
            ? raw.choices[raw.correctIndex]
            : null;

        setQuestion({
          snippet: raw.snippet,
          question: raw.question,
          choices: parsedChoices,
          correctAnswer: correctFromLetter || correctFromIndex || '',
        });
      } catch (err) {
        console.error('❌ Error:', err);
      }
    };

    fetchQuestion();
    return () => {
      didCancel = true;
    };
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
    <div className="question-screen max-h-screen overflow-y-auto p-6 max-w-xl mx-auto text-center">
      <h1 className="text-xl font-semibold mb-2">
        Question {id?.replace('q', '') || ''}
      </h1>

      {!question ? (
        <p>Loading question...</p>
      ) : (
        <>
          <div className="mb-4 text-white text-base text-left whitespace-pre-wrap">
            {question.snippet?.trim() ? (
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  border: '2px solid red',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  paddingRight: '1rem',
                  fontSize: '0.75rem',
                }}
              >
                {question.snippet}
              </SyntaxHighlighter>
            ) : null}

            <ReactMarkdown
              components={{
                code({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) {
                  return inline ? (
                    <code className="bg-gray-700 px-1 rounded text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-800 p-4 rounded-md text-sm font-mono shadow-lg mb-4">
                      <code {...props}>{children}</code>
                    </pre>
                  );
                },
              }}
            >
              {question.question}
            </ReactMarkdown>
          </div>

          <form onSubmit={handleSubmit} className="text-left flex flex-col items-start gap-2">
            {question.choices.map((choice, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={choice.value}
                  checked={selectedAnswer === choice.value}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                <span>{choice.label}: {choice.value}</span>
              </label>
            ))}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={!selectedAnswer}
                className={`mt-4 px-4 py-2 rounded text-white ${
                  selectedAnswer ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </div>
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
