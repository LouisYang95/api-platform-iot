import styled from 'styled-components';


export const Wrapper = styled.div`
    display: flex;
    gap: 8px;
`

export const PlayerWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background: #3f4656;
    text-align: center;

    h2 {
        font-weight: 500;
        font-size: 20px;
    }

    p, h2 {
        color: white;
    }

    span {
        color: red;
    }
`
