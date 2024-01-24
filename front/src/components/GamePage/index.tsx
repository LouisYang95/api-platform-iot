import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GamePage from './GamePage';

const GamePageContainer: React.FC = () => {
    const [players, setPlayers] = useState<Array<{ playerName: string; playerScore: number }>>([]);
    const numberOfPlayers = 0

    useEffect(() => {

        const playerData = Array.from({ length: numberOfPlayers }, (_, index) => ({
          playerName: `Player ${index + 1}`,
          playerScore: 0,
        }));

        setPlayers(playerData);
      }, [numberOfPlayers]);

  return (
    <GamePage
    
    />
  );
};

export default GamePageContainer;
