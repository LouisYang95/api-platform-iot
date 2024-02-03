import React from 'react';

import { Wrapper } from './styled';
import PlayersScore from "../PlayersScore";
import QuestionGenerator from '../QuestionGenerator/QuestionGenerator';
import mqtt from "mqtt";

interface QuizPageProps {

}

const QuizPage: React.FC<QuizPageProps> = ({

}) => {
    const client = mqtt.connect('wss://c9bb0502a71f464dadb7246274f124e0.s1.eu.hivemq.cloud/mqtt', {
        port: 8884,
        username: 'CodingFactory',
        password: 'CodingFactory95',
    });

    return (
    <Wrapper>
          <h1>Quiz</h1>
          <PlayersScore />
          <QuestionGenerator client={client} />
    </Wrapper>
  );
};

export default QuizPage;
