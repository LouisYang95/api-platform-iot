import React, { useState } from 'react';
import { Wrapper, PlayerWrapper } from './styled';

interface PlayersScoreProps {
    playerName: string;
    remote64: any;
}

const PlayersScore: React.FC<PlayersScoreProps> = ({ playerName, remote64 }) => {
    const [score, setScore] = useState(0);

    const increaseScore = () => {
        setScore(prevScore => prevScore + 1);
    }

    return (
        <Wrapper>
            <PlayerWrapper>
                <h2>{playerName}</h2>
                <p>Score :<span> {score}</span></p>
                <button onClick={increaseScore}> + </button>
            </PlayerWrapper>
        </Wrapper>
    );
};

export default PlayersScore;
