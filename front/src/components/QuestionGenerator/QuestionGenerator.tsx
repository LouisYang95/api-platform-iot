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
import { Client } from "mqtt/*";
import mqtt from "mqtt";
import { parse } from "path";

interface Question {
    category: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

const QuestionGenerator: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
        null
    );
    const [correctAnswerClass, setCorrectAnswerClass] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizStart, setQuizStart] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(10);
    const [timerStarted, setTimerStarted] = useState(false);

    const client = mqtt.connect('wss://c5af997b76494b6dbb05fa0f4423e801.s2.eu.hivemq.cloud/mqtt', {
        port: 8884,
        username: 'CodingFactory',
        password: 'CodingFactory95',
    });

    const isRedText = timeRemaining < 10;
    useEffect(() => {
        if (timeRemaining === 0){
            console.log('?')
            client.subscribe("timerXbeeQuizz", (err) => {
                if (!err) {
                    client.publish("timerXbeeQuizz", "NoMoreTime");
                }
            });
        }
    }, [timeRemaining]);

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

        if (timeRemaining == 0) {
            setShowAnswer(true);
        }

        return () => clearInterval(intervalId);
    }, [timerStarted, timeRemaining]);

    client.subscribe("participationXbeeQuizz", (err) => {
        if (!err){
            client.on("message", function(topic, message){
                if(topic === "participationXbeeQuizz"){
                    setTimerStarted(false);
                }
            })
        }
    })


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
        setTimeRemaining(10);

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
        setTimeRemaining(10);

        if (client) {
            client.subscribe("partieXbeeQuizz", (err) => {
                if (!err) {
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
                                                    <button>
                                                        <div
                                                        key={index}
                                                        className={`answer${
                                                            index + 1
                                                        }`}
                                                    >
                                                        <p>{option}</p>
                                                    </div>
                                                    </button>
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
