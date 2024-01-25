import React, { useState, useEffect } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import PlayersScore from './PlayersScore';
import mqtt from 'mqtt';

const PlayersScoreContainer: React.FC = () => {
    const [players, setPlayers] = useState<Array<{ playerName: string; playerScore: number }>>([]);
    const numberOfPlayers = 4
    const mqttServerUrl = 'mqtt://c5af997b76494b6dbb05fa0f4423e801.s2.eu.hivemq.cloud';
    const topic = 'playerXbeeQuizz';

    useEffect(() => {

        const client = mqtt.connect('wss://c5af997b76494b6dbb05fa0f4423e801.s2.eu.hivemq.cloud/mqtt', {
            port: 8884,
            username: 'CodingFactory',
            password: 'CodingFactory95',
        });

        client.on('connect', () => {
            console.log('Connected to MQTT broker');

            client.subscribe(topic, (err) => {
                if (!err) {
                  console.log('Subscribed to topic');
                }
            });

            const message = "test";
            client.publish(topic, message);
        });

        client.on('error', (err) => {
            console.error('MQTT Connection Error:', err);
        });

        const playerData = Array.from({ length: numberOfPlayers }, (_, index) => ({
          playerName: `Player ${index + 1}`,
          playerScore: 0,
        }));

        setPlayers(playerData);
    }, [mqttServerUrl, numberOfPlayers]);

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
