import React from 'react';
import { Wrapper, PlayerWrapper } from './styled';
import PlayersScore from "../PlayersScore";
interface GamePageProps {

}

const GamePage: React.FC<GamePageProps> = ({

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

export default GamePage;
