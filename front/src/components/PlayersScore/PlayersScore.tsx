import React from 'react';
import { Wrapper, PlayerWrapper } from './styled';

interface PlayersScoreProps {
  playerName: string;
  playerScore: number;
}

const PlayersScore: React.FC<PlayersScoreProps> = ({ playerName, playerScore }) => {
  return (
    <Wrapper>
      <PlayerWrapper>
        <h2>{playerName}</h2>
        <p>Score :<span> {playerScore}</span></p>
      </PlayerWrapper>
    </Wrapper>
  );
};

export default PlayersScore;
