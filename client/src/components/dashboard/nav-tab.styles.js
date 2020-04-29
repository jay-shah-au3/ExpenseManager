import styled from 'styled-components';

const color_green = '#13AA52';
const income_color = '#42DE90';
const expense_color = '#e72438';

export const AmountRowContainer = styled.div`
    text-align:center;
    margin: 0 auto;
    width:50%;
    font-weight:bold;
    @media (max-width:767px) {
        width:100%;
    }
`;

export const AmountContainer = styled.p`
    margin-bottom:2px;
    letter-spacing:0px;
`;

export const TitleContainer = styled.p`
    margin-bottom:2px;
`;

export const AmountColumnCardContainer = styled.div`
    box-shadow:0px 2px whitesmoke;
`;

export const AmountColumnCardContainer1 = styled.div`
    box-shadow:0px 2px whitesmoke;
    border-right:2px solid whitesmoke;    
`;

export const AmountTitleContainer = styled.div`
    letter-spacing:2px;
    font-size:1.2em;
    margin:0px;
    span{        
        font-size:1.2em;
        letter-spacing:0px;
        color : ${props=>props["data-type"] === 'balance' && props["amount"]!==undefined  
        ?
        props["amount"] >=0 ? 'green' : expense_color : props["data-type"] === 'income' ? income_color : expense_color
    }
`;

export const NavTab = styled.nav``;

export const NavTabTitle = styled.div`
    border:none !important;
    width:50%;
    margin: 0 auto;
    @media (max-width:767px) {
        width:100%;
    }    
`;

export const NavTabLink = styled.a`
    border:none !important;
    color : black !important;
    font-weight:bold;
    font-weight:monospace;
    letter-spacing:2px;
    margin: auto;
    &.active {
        color:grey !important;
        border-bottom:2px solid ${color_green} !important;
    }
`;

export const NavTabList = styled.div`
    overflow-y:auto;
    height:400px;
    width:50%;
    margin:0 auto;
    ::-webkit-scrollbar {
        width:6px;
        border-radius:20px;
    }

    ::-webkit-scrollbar-thumb {
        background-color:#24e7b0;
        border-radius:20px;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius:20px;
        background-color : #F5F5F5;
    }
    @media (max-width:767px) {
        width:95%;
        margin-left:10px;
        margin-right:10px;
    }    
`;

export const NavTabContent = styled.div`
    margin-bottom:50px;
`;


export const DatePicker = styled.div`
    text-align:center;
    margin-top:10px;
    margin-bottom:10px
`;