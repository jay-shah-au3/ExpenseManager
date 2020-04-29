import styled from 'styled-components';

const color_green = '#13AA52'; 

export const ModalContainer = styled.div`
`;

export const ModalInput = styled.input`
    padding-top:10px;
    padding-bottom:10px;
    padding-left:0px;
    padding-right:0px;
    border:none;
    margin-left:10px;
`;

export const ModalDialog = styled.div`
`;

export const ModalContent = styled.div`
`;

export const ModalHeader = styled.div`
`;

export const ModalTitle = styled.h5`
`;

export const ModalClose = styled.button`
    background-color:red !important;
    padding: 1.2rem !important;
    color:white;
`;

export const ModalBody = styled.div`
`;

export const ModalNavTab = styled.nav`
    margin-bottom:10px;
`;

export const ModalNavTabTitle = styled.div`
    border:none !important;
`;

export const ModalNavTabLink = styled.a`
    border:none !important;
    color : black !important;
    font-weight:bold;
    font-weight:monospace;
    letter-spacing:2px;
    &.active {
        color:grey !important;
        border-bottom:2px solid ${color_green} !important;
    }
`;

export const ModalNavTabList = styled.div`
    overflow-y:auto;
    height:400px;
`;

export const ModalNavTabContent = styled.div`
`;

export const ModalFooter = styled.div`
`;


export const CategoryButton = styled.button`
    display:block;
    background:none;
    border:none;
    padding:10px;
    cursor:pointer;
    width:100%;
    border-bottom: 1px solid grey;
    font-weight:bold;
    letter-spacing:2px;
    font-size:0.9em;
    &:hover {
        background-color: ${color_green};
        color:white;
    }
`;