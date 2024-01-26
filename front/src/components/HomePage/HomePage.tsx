import React, { useEffect } from 'react';
import { Wrapper } from './styled';
import { Link } from 'react-router-dom';
import mqtt from 'mqtt';

// playerXbeeQuizz
interface GamePageProps {
}
const client = mqtt.connect('wss://c5af997b76494b6dbb05fa0f4423e801.s2.eu.hivemq.cloud/mqtt', {
    port: 8884,
    username: 'CodingFactory',
    password: 'CodingFactory95',
});

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

