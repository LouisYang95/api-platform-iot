import React from 'react';
import { Wrapper } from './styled';
import { Link } from 'react-router-dom';



interface GamePageProps {
}

const HomePage: React.FC<GamePageProps> = () => {

  return (
    <Wrapper>
      <h1>Bienvenue au Jeu du XBEEQUIZ</h1>
      <p>Prêt à tester vos connaissances?</p>

      <a href="/quiz">Lancer un Quiz</a>

    </Wrapper>
  );
};

export default HomePage;

