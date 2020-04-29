import styled from 'styled-components';

export const HomePageContainer = styled.div`
    height:90.6vh; 
    background: rgb(35,55,163);
    background: linear-gradient(90deg, rgba(35,55,163,1) 31%, rgba(65,181,182,1) 67%);
    // background: rgb(99,35,163);    
    // background: linear-gradient(90deg, rgba(99,35,163,1) 36%, rgba(163,65,182,1) 78%);    
    button {
        background-color:black !important;
        border-radius:5% !important;
        color:white !impprtant;
        position : absolute;
        top : 50%;
        left : 50%;
        transform : translate(-50%, -50%);
        -ms-transform : translate(-50%, -50%);
        width:200px;        
        div {
            background : none !important;
            font-size:2em;
        }
        span {
            font-family:monospace !important;
            font-size:2em;
            letter-spacing:3px;
            color:white !important;
        }
    }
`;

export const ImageContainer = styled.img`
    width: 100%;
    height: 90.5vh;
`;