import React from 'react';
import { Wrapper, PlayerWrapper } from './styled';

interface PlayersScoreProps {
  playerName: string;
  remote64: any;
}

const PlayersScore: React.FC<PlayersScoreProps> = ({ playerName, remote64 }) => {
    let playerScore = 0;
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
