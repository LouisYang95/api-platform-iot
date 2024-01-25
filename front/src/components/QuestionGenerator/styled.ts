import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #001f3f;
  height: 100vh;
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

  .next-button {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #0074cc;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;