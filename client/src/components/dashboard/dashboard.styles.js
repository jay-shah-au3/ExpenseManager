import styled from 'styled-components';

export const DashBoardContainer = styled.div`
    .react-daterange-picker__wrapper {
        padding:10px;
    }
    .react-daterange-picker__inputGroup {
        pointer-events: none;
        min-width:0px; 
    }
    .react-daterange-picker__clear-button {
        display : none;
    }    
`;

export const ButtonContainer = styled.div`
    margin-top : 30px;
    padding:0px;
    position:fixed;
    z-index:1;
    @media (max-width:1024px){
        position:static;
        text-align:center;
    }
`;

export const TransactionButton = styled.button`
    padding:0.7em;
    background:none;
    font-weight:bold;
    letter-spacing:2px;
    background-color: #6c24e0;
    float-left;
    color : white;
    border:none;
    cursor : pointer;
`;

export const RowContainer = styled.div`
    padding:0px;
    margin-top:10px;
    margin-bottom:30px;
    margin-left:0px;
    margin-right:0px;
`;

export const ColumnContainer = styled.div`
    padding:0px;
`;

export const ChartContainer = styled.div`
    div{
        margin-left:-30px;
    }
    div>div {
        margin-bottom:30px;
    }
    @media (max-width:767px){
        div{
            margin : 0 auto;
        }        
    }
`;