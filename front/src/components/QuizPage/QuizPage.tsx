import React from 'react';

import { Wrapper, TimerWrapper,QuizWrapper, AnswersWrapper, ButtonWrapper } from './styled';
import PlayersScore from "../PlayersScore";

interface QuizPageProps {
    isRedText: boolean;
    timerStarted: boolean;
    timeRemaining: number;
    onStartQuiz: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({
    timeRemaining,
    timerStarted,
    onStartQuiz,
    isRedText
}) => {
  return (
    <Wrapper>
          <h1>Quiz</h1>
          {timerStarted && (
            <TimerWrapper isRedText={isRedText}>
            <h2>Temps restant :</h2>
            <p>{timeRemaining}</p>
            </TimerWrapper>
          )}
          <PlayersScore></PlayersScore>

          <QuizWrapper>
            <h2>Voici la question ?</h2>

            <AnswersWrapper>
                <div className="answer1">
                <p>Réponse 1</p>
                </div>
                <div className="answer2">
                <p>Réponse 2</p>
                </div>
                <div className="answer3">
                <p>Réponse 3</p>
                </div>
                <div className="answer4">
                <p>Réponse 4</p>
                </div>
            </AnswersWrapper>
          </QuizWrapper>
          <ButtonWrapper onClick={onStartQuiz}>Commencer le quiz</ButtonWrapper>
    </Wrapper>
  );
};

export default QuizPage;
