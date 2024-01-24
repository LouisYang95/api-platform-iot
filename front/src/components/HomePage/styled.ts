// styled.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #001f3f; /* Bleu marine-foncé */
  height: 100vh;

  h1, p, button {
    color: white;
  }

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
  }

  p {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  button {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #0074cc; /* Bleu marine-moyen pour le bouton */
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3; /* Changement de couleur au survol */
    }
  }
`;
