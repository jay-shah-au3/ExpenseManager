import styled from 'styled-components';

export const CategoryContainer = styled.div`
    margin-top:30px;
    margin-bottom:30px;
    text-align:center;
`;

export const FormContainer = styled.form`
    margin-top:30px;
    margin-bottom:30px;
    display:flex;
    flex-wrap : wrap;
    justify-content:center;
`;

export const SelectOptionConatiner = styled.div`
    margin-top:20px;
    select{
        padding-right:30px;
    }
    margin-left  : ${props=>props.children.props.name==='deleteCategory' ? '35px' : '0px'};
    margin-right  : ${props=>props.children.props.name==='deleteCategory' ? '35px' : '0px'};
`;

export const SelectContainer = styled.select`
    padding:10px;
    text-align:center;
    &:hover{
        cursor:pointer;
    }
    border-radius:5%;
    border:2px solid #BF26A8;
`;

export const InputDivContainer = styled.div`
    margin-top:20px;
`;

export const InputContainer = styled.input`
    border:none;
    border-bottom:2px solid #BF26A8;
    padding:10px;
    width:250px;
    margin-right:35px;
    margin-left:35px;
`;

export const Button = styled.button`
    border:none;
    padding:10px;
    border-radius:5%;
    margin-top:20px;
    font-weight:bold;
    letter-spacing:2px;
    font-size:1.2em;
    height:50px;
    background: rgb(99,35,163);
    background: linear-gradient(90deg, rgba(99,35,163,1) 36%, rgba(163,65,182,1) 78%);
    color:white;    
    &:hover{
        background: ${props=> props.btn_type==='Add' ? '#51BCD1' : 'tomato'};
        cursor:pointer;
    }
    &:focus{
        outline:none;
    }
    width:150px;
`;