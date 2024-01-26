import React, { useState, useEffect } from 'react';
import { Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
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
    const mqttServerUrl = 'mqtt://c5af997b76494b6dbb05fa0f4423e801.s2.eu.hivemq.cloud';
    const topic = 'playerXbeeQuiz';

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
        });

        client.on('error', (err) => {
            console.error('MQTT Connection Error:', err);
        });


        const playerData = Array.from({ length: numberOfPlayers }, (_, index) => ({
          playerName: `Player ${index + 1}`,
          playerScore: 0,
        }));


        client.subscribe("playerXbeeQuizz", (err) => {
            if (!err){
                client.on("message", function(topic, message){
                    if (topic === "playerXbeeQuizz") {
                        console.log(JSON.parse(message.toString()));
                        let player = JSON.parse(message.toString());

                        const existingPlayer = listOfPlayers.find((p) => p.remote64 === player.remote64);

                        if (existingPlayer) {
                            existingPlayer.name = player.name;
                            existingPlayer.score = player.score;
                        } else {
                            listOfPlayers.push(player);
                        }

                        setPlayers([...listOfPlayers]);
                    }
                })
            }
        })

    }, [mqttServerUrl, numberOfPlayers]);

  return (
    <Wrapper>
      {players.map((player, index) => (
        <PlayersScore
            key={index}
          playerName={player.name}
          remote64={player.remote64}
         // playerScore={player.score}
        />
      ))}
    </Wrapper>
  );
};

export default PlayersScoreContainer;
