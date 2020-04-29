import styled from 'styled-components';

const income_color = '#42DE90';
const expense_color = '#e72438';

export const CardContainer = styled.div`
`;

export const CardDate = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    padding-top:10px;
    padding-bottom:10px;
    margin-bottom:0px;
`

export const ListContainer = styled.div`
    padding-right:5%;
    margin-top : 5px;
    margin-bottom : 5px;
    &:hover {
        cursor:pointer;
    }
`;

export const TextContainer = styled.div`
    border-right: 5px solid ${props => props.type==='income' ? income_color : expense_color};
    border-top-right-radius:6px;
    border-bottom-right-radius:6px;
    box-shadow:0px 4px 2px -2px whitesmoke;
`

export const ListText = styled.p`
    padding-left:5px;    
    padding-top : 10px;
    padding-bottom:10px;
    margin-top:auto;
    margin-bottom:auto;
    font-weight:bold;
`

export const ListTextAmount = styled.span`
    padding-right:5%;
    font-weight:bold;    
    float:right;
`;