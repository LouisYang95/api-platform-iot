import React, { useEffect, useState } from "react";
import questionsData from "./questions.json";
import {
    Wrapper,
    TimerWrapper,
    QuizWrapper,
    AnswersWrapper,
    GoodAnswerWrapper,
    ButtonWrapper,
    ButtonWrapper1,
} from "./styled";
import mqtt from "mqtt";

interface Question {
    category: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface PlayersScoreProps {
    client: mqtt.MqttClient;
}

const QuestionGenerator: React.FC<PlayersScoreProps> = ({client}) => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
        null
    );
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizStart, setQuizStart] = useState(false);
    const [isBuzzed, setIsBuzzed] = useState(false);
    const [userBuzzed, setUserBuzzed] = useState("");

    const [timeRemaining, setTimeRemaining] = useState(30);
    const [timerStarted, setTimerStarted] = useState(false);


    const isRedText = timeRemaining < 10;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (timerStarted && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTime) =>
                    prevTime > 0 ? prevTime - 1 : 0
                );
            }, 1000);
            console.log(timeRemaining);
        }

        if (timeRemaining === 0) {
            setShowAnswer(true);

            client.subscribe("timerXbeeQuizz", (err) => {
                if (!err) {
                    client.publish("timerXbeeQuizz", "NoMoreTime");
                }
            });
        }

        return () => clearInterval(intervalId);
    }, [timerStarted, timeRemaining]);

    client.subscribe("participationXbeeQuizz", (err) => {
        if (!err){
            client.on("message", function(topic, message){
                if(topic === "participationXbeeQuizz"){
                    console.log('participation')
                    setTimerStarted(false);
                    setIsBuzzed(true);
                    setUserBuzzed(findPlayerByRemote64(message.toString()));
                }
            })
        }
    })


    const findPlayerByRemote64 = (remote64 : any) => {
        const players = JSON.parse(localStorage.getItem('players') || '[]');
        return players.find((player: { remote64: any; }) => player.remote64 === remote64);
    };

    const handleAnswerClick = (answer: string) => {
        if (!isBuzzed) {
            console.log("Pas encore autorisé à répondre.");
            return;
        }
        if (answer === currentQuestion?.correctAnswer) {
            console.log("Bonne réponse !");

            alert("Bonne réponse !");
            handleNextQuestion();
        }
        console.log(`Réponse choisie: ${answer}`);

    };

    // const increasePlayerScore = (playerId: string) => {
    //     let players = JSON.parse(localStorage.getItem('players') || '[]');
    //     let playerIndex = players.findIndex((p: any) => p.remote64 === playerId);
    //
    //     if (playerIndex !== -1) {
    //         players[playerIndex].score += 1;
    //         localStorage.setItem('players', JSON.stringify(players));
    //     }
    //
    // };

    const getRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questionsData.length);
        const randomQuestion = questionsData[randomIndex];
        setCurrentQuestion(randomQuestion);
        setShowAnswer(false);
    };

    useEffect(() => {
        getRandomQuestion();
    }, []);

    const handleNextQuestion = () => {
        getRandomQuestion();
        setTimerStarted(true);
        setTimeRemaining(30);

        if (client) {
            client.subscribe("partieXbeeQuizz", (err) => {
                if (!err) {
                    client.publish("partieXbeeQuizz", "NextQuestion");
                }
            })
        }
    };

    const onStartQuiz = () => {
        setTimerStarted(true);
        setQuizStart(true);
        setTimeRemaining(30);

        if (client) {
            client.subscribe("partieXbeeQuizz", (err) => {
                if (!err) {
                    console.log('start')
                    client.publish("partieXbeeQuizz", "Start");
                }
            })
        }

        console.log("La partie a commencé !");
    };

    return (
        <Wrapper>
            <div>
                {currentQuestion && (
                    <>
                        {timerStarted && (
                            <TimerWrapper isRedText={isRedText}>
                                <h2>Temps restant :</h2>
                                <p>{timeRemaining}</p>
                            </TimerWrapper>
                        )}

                        {quizStart && (
                            <QuizWrapper>
                                <h2>{currentQuestion.question}</h2>

                                <AnswersWrapper>
                                    {!showAnswer && (
                                        <>
                                            {currentQuestion.options.map(
                                                (option, index) => (
                                                    <ButtonWrapper
                                                        key={index}
                                                        className={!isBuzzed ? "buttonDisabled" : ""}
                                                        onClick={() => handleAnswerClick(option)}
                                                    >
                                                        <div className={`answer${index + 1}`}>
                                                            <p>{option}</p>
                                                        </div>
                                                    </ButtonWrapper>
                                                )
                                            )}
                                        </>
                                    )}
                                </AnswersWrapper>
                                {showAnswer && (
                                        <GoodAnswerWrapper>
                                            <p> La bonne réponse est : {" "} {currentQuestion.correctAnswer}</p>

                                        </GoodAnswerWrapper>
                                    )}
                                {quizStart && (
                                    <ButtonWrapper1
                                        onClick={handleNextQuestion}
                                    >
                                        Question suivante
                                    </ButtonWrapper1>
                                )}
                            </QuizWrapper>
                        )}
                        {!quizStart && (
                            <ButtonWrapper onClick={onStartQuiz}>
                                Commencer le quiz
                            </ButtonWrapper>
                        )}
                    </>
                )}
            </div>
        </Wrapper>
    );
};

export default QuestionGenerator;
