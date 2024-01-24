import React from 'react';

import { Wrapper, PlayerWrapper } from './styled';
import PlayersScore from "../PlayersScore";

interface QuizPageProps {

}

const QuizPage: React.FC<QuizPageProps> = ({

}) => {
  return (
    <Wrapper>
          <h1>Quiz</h1>
          <PlayerWrapper>
              <PlayersScore></PlayersScore>
          </PlayerWrapper>

    </Wrapper>
  );
};

export default QuizPage;
