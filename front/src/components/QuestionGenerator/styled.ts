import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .question-container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f8f8;
  }

  .question {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .timer, .answer {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .options {
    list-style-type: none;
    padding: 0;
  }

  .options li {
    margin-bottom: 5px;
  }
  }
`;

export const TimerWrapper = styled.div<{ isRedText: boolean }>`
    color: white;
    margin: 20px;
    text-align: center;

    h2 {
        font-size: 20px;
        font-weight: 600;
    }

    p {
        margin-top: -10px;
        font-size: 35px;
        font-weight: 600;

        ${(props) =>
          props.isRedText &&
          css`
            color: red;
          `}
    }
`

export const QuizWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    background: #3f4656;
    width: 500px;
    border-radius: 15px;
    color: white;

    h2 {
        padding: 10px;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
    }
`

export const AnswersWrapper = styled.div`
    margin-top: 0px;
    color: white;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px; /* Espace entre les réponses */

    div {
        height: 120px;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        border-radius: 10px;
    }

    .answer1 {
        background: red;
    }

    .answer2 {
        background: #0679D9;
    }

    .answer3 {
        background: #FFCB00;
    }

    .answer4 {
        background: #3DC02F;
    }
`;

export const GoodAnswerWrapper = styled.div`
    p {
        display: inline-block;
    }

`;

export const ButtonWrapper = styled.button`
    margin-top: 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #0074cc;
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 50px;

    &:hover {
        background-color: #0056b3;
    }
`

export const ButtonWrapper1 = styled.button`
    margin: 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #0074cc;
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 50px;

    &:hover {
        background-color: #0056b3;
    }
`
