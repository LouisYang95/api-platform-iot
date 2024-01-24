import React from 'react';
import { Wrapper } from './styled';

interface GamePageProps {}

const HomePage: React.FC<GamePageProps> = () => {
  return (
    <Wrapper>
      <h1>Bienvenue au Jeu du XBEEQUIZ</h1>
      <p>Prêt à tester vos connaissances?</p>
      <button>Commencer le Quiz</button>
    </Wrapper>
  );
};

export default HomePage;

