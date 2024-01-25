import React from 'react';

import { Wrapper } from './styled';
import PlayersScore from "../PlayersScore";
import QuestionGenerator from '../QuestionGenerator/QuestionGenerator';

interface QuizPageProps {

}

const QuizPage: React.FC<QuizPageProps> = ({

}) => {
  return (
    <Wrapper>
          <h1>Quiz</h1>
          <PlayersScore></PlayersScore>
            <QuestionGenerator></QuestionGenerator>

    </Wrapper>
  );
};

export default QuizPage;
