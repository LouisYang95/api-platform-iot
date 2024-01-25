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

    const [timeRemaining, setTimeRemaining] = useState(30);
    const [timerStarted, setTimerStarted] = useState(false);

    const onStartQuiz = () => {
        setTimerStarted(true);
        setQuizStart(true);
        setTimeRemaining(5);
    };

    const isRedText = timeRemaining < 10;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (timerStarted && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTime) =>
                    prevTime > 0 ? prevTime - 1 : 0
                );
            }, 1000);
        }

        if (timeRemaining == 0) {
            setShowAnswer(true);
        }

        return () => clearInterval(intervalId);
    }, [timerStarted, timeRemaining]);

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
                                                    <div
                                                        key={index}
                                                        className={`answer${
                                                            index + 1
                                                        }`}
                                                    >
                                                        <p>{option}</p>
                                                    </div>
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
