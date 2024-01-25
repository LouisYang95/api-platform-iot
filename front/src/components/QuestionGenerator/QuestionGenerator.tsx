import React, { useEffect, useState } from 'react';
import questionsData from './questions.json';
import { Wrapper} from './styled';

interface Question {
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuestionGenerator: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(10);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    const randomQuestion = questionsData[randomIndex];
    setCurrentQuestion(randomQuestion);
    setShowAnswer(false);
    setTimer(10);

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timerTimeout = setTimeout(() => {
      setShowAnswer(true);
      clearInterval(interval);
    }, 10000);
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const handleNextQuestion = () => {
    getRandomQuestion();
  };

  return (
    <Wrapper>
    <div>
      {currentQuestion && (
        <>
          <p>{currentQuestion.question}</p>
          {!showAnswer && <p>Temps restant : {timer} secondes</p>}
          {showAnswer && <p>La réponse est : {currentQuestion.correctAnswer}</p>}
          {!showAnswer && (
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          )}
          <button onClick={handleNextQuestion}>Question suivante</button>
        </>
      )}
    </div>
    </Wrapper>
  );
};

export default QuestionGenerator;
