import React, { useState, useEffect } from 'react';
import { Wrapper } from './styled';
import PlayersScore from './PlayersScore';
import mqtt from 'mqtt';

const PlayersScoreContainer: React.FC = () => {
    const [players, setPlayers] = useState<Array<{ name: string; remote64: String;}>>([]);
    /*const [players, setPlayers] = useState([{
        name: '',
        remote64: '',
        score: 0
    }])*/
    let listOfPlayers : any[] = []
    const numberOfPlayers = 4
    const mqttServerUrl = 'c9bb0502a71f464dadb7246274f124e0.s1.eu.hivemq.cloud';
    const topics = ["partieXbeeQuizz", "timerXbeeQuizz", "participationXbeeQuizz", "playerXbeeQuizz"]

    useEffect(() => {

        const client = mqtt.connect('wss://c9bb0502a71f464dadb7246274f124e0.s1.eu.hivemq.cloud/mqtt', {
            port: 8884,
            username: 'CodingFactory',
            password: 'CodingFactory95',
        });

        client.on('connect', () => {
            client.subscribe(topics, (err) => {
                if (!err) {
                  console.log('Subscribed to topic');
                }
            });

        });

        client.on('error', (err) => {
            console.error('MQTT Connection Error:', err);
        });

        client.on("message", function(topic, message){
            if (topic === "playerXbeeQuizz") {
                let player = JSON.parse(message.toString());

                const existingPlayerIndex = listOfPlayers.findIndex((p) => p.remote64 === player.remote64);

                if (existingPlayerIndex !== -1) {
                    listOfPlayers[existingPlayerIndex] = {
                        ...listOfPlayers[existingPlayerIndex],
                        name: player.name,
                        score: player.score !== undefined ? player.score : listOfPlayers[existingPlayerIndex].score
                    };
                } else {
                    listOfPlayers.push({
                        ...player,
                        score: player.score !== undefined ? player.score : 0
                    });
                }

                setPlayers([...listOfPlayers]);
                localStorage.setItem('players', JSON.stringify([...listOfPlayers]));
            }
        });

    }, [mqttServerUrl, numberOfPlayers]);

  return (
    <Wrapper>
      {players.map((player, index) => (
        <PlayersScore
            key={index}
          playerName={player.name}
          remote64={player.remote64}
        />
      ))}
    </Wrapper>
  );
};

export default PlayersScoreContainer;
