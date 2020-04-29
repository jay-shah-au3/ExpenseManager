import styled,{css} from 'styled-components'

const color_green = '#13AA52'; 

export const TransactionContainer = styled.div`
    margin-top:30px;
    margin-left:30px;
    @media (max-width:768px){
        text-align:center;
        text-align: -webkit-center;
    }
`;

export const InputBoxContainer = styled.div`
    margin-top:20px;
    border:1px solid grey;
    width:235px;
    border-radius:5px;
    text-align:center;
    .react-date-picker__wrapper {
        width:225px;
        padding:10px;
        border:none;
    }
    .react-date-picker__inputGroup {
        pointer-events: none;        
    }
    .react-date-picker__clear-button {
        display : none;
    }    
`;

export const InputTitleContainer = styled.p`
    text-align:center;
    color:grey;
`;

export const InputContainer = styled.input`
    border:none;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:0px;
    margin-left:0px;
    padding-right:0px;
    text-align:center;
`;

export const InputErrorContainer = styled.p`
    font-weight:bold;
    font-size:0.9em;
    color:tomato;
`;

export const InputTextBoxContainer = styled.div`
    margin-top:20px;
    border:1px solid grey;
    width:70%; 
    border-radius:5px;
`;

export const InputTextAreaContainer = styled.textarea`
    border:none;
    padding:10px;
    margin-left:10px;
    width:95%;
    resize:none;
`;


const ButtonStyles = css`
    padding:10px;
    margin-top:20px;
    margin-left:10px;
    border:none;
    color:white;
    cursor:pointer;
    letter-spacing:2px;
    font-size:1.3em;
    &:focus {
        outline:none;
    }    
    &:hover{
        background-color:#1FA2C2;
    }
`;

export const SaveTransactionButton = styled.button`
    background-color: ${color_green};
    ${ButtonStyles}
`;

export const Button = styled.button`
    ${ButtonStyles}
    background: rgb(99,35,163);
    background: linear-gradient(90deg, rgba(99,35,163,1) 36%, rgba(163,65,182,1) 78%);
    &:hover{
        background: ${props=> props.b_type==='update' ? '#51BCD1' : 'tomato'};
    }
`;