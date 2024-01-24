import React, { useState, useEffect } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import PlayersScore from './PlayersScore';

const PlayersScoreContainer: React.FC = () => {
    const [players, setPlayers] = useState<Array<{ playerName: string; playerScore: number }>>([]);
    const numberOfPlayers = 4

    useEffect(() => {

        const playerData = Array.from({ length: numberOfPlayers }, (_, index) => ({
          playerName: `Player ${index + 1}`,
          playerScore: 0,
        }));

        setPlayers(playerData);
      }, [numberOfPlayers]);

  return (
      <Wrapper>
      {players.map((player, index) => (
        <PlayersScore
          key={index}
          playerName={player.playerName}
          playerScore={player.playerScore}
        />
      ))}
    </Wrapper>
  );
};

export default PlayersScoreContainer;
