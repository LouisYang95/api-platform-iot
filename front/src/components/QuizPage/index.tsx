import React, { useState, useEffect } from 'react';
import QuizPage from './QuizPage';

const QuizPageContainer: React.FC = () => {
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [timerStarted, setTimerStarted] = useState(false);

    const handleStartQuiz = () => {
      setTimerStarted(true);
      setTimeRemaining(30);
    };

    const isRedText = timeRemaining < 10;

    useEffect(() => {
      let intervalId: NodeJS.Timeout;

      if (timerStarted && timeRemaining > 0) {
        intervalId = setInterval(() => {
          setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
      }

        if (timeRemaining == 0) {
            setTimerStarted(false);
        }

      return () => clearInterval(intervalId);
    }, [timerStarted, timeRemaining]);
  return (
      <QuizPage
        isRedText={isRedText}
        timerStarted={timerStarted}
        timeRemaining={timeRemaining}
        onStartQuiz={handleStartQuiz}
    />
  );
};

export default QuizPageContainer;
