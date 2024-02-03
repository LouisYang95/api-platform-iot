import styled from 'styled-components';


export const Wrapper = styled.div`
    display: flex;
    gap: 8px;
`

export const PlayerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background: #3f4656;
    text-align: center;
    padding: 10px;

    h2 {
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 5px;
    }

    p, h2 {
        color: white;
    }

    span {
        color: red;
    }

    button {
        background: #282c34;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        font-size: 16px;
        &:hover {
            background: #afe5e5;
        }
    }
`
