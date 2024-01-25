import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #001f3f;
    height: 100vh;

    h1 {
        color: white;
    }
`

// export const TimerWrapper = styled.div<{ isRedText: boolean }>`
//     color: white;
//     margin: -20px;
//     text-align: center;

//     h2 {
//         font-size: 20px;
//         font-weight: 600;
//     }

//     p {
//         margin-top: -10px;
//         font-size: 35px;
//         font-weight: 600;

//         ${(props) =>
//           props.isRedText &&
//           css`
//             color: red;
//           `}
//     }
// `

// export const QuizWrapper = styled.div`
//     margin-top: 40px;
//     background: #3f4656;
//     width: 500px;
//     height: 500px;
//     border-radius: 15px;
//     color: white;

//     h2 {
//         font-size: 25px;
//         font-weight: 500;
//         text-align: center;
//     }
// `

// export const AnswersWrapper = styled.div`
//     color: white;
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 10px; /* Espace entre les réponses */

//     div {
//         height: 100px; /* Couvre toute la hauteur de la cellule */
//         width: 100px; /* Couvre toute la largeur de la cellule */
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         border-radius: 10px; /* Coins arrondis, si nécessaire */
//         font-size: 18px;
//     }

//   .answer1 {
//     p {
//       background: red;
//     }
//   }

//   .answer2 {
//     p {
//         background: #0679D9;
//     }
//   }

//   .answer3 {
//     p {
//         background: #FFCB00;
//     }
//   }

//   .answer4 {
//     p {
//         background: #3DC02F;
//     }
//   }
// `

// export const ButtonWrapper = styled.button`
//     margin-top: 20px;
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1rem;
//     padding: 10px 20px;
//     background-color: #0074cc;
//     border: none;
//     color: white;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//     border-radius: 50px;

//     &:hover {
//         background-color: #0056b3;
//     }
//     }

