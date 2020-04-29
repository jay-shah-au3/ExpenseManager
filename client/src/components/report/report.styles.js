import styled from 'styled-components';

export const ReportContainer = styled.div`
    margin-top:30px;
    margin-bottom:30px;
`;

export const ReportRowContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-around;
`;

export const ReportColumnContainer = styled.div`
    position:relative;
    border:2px solid black;
    border-radius:2%;
    margin-top:20px;
`;

export const ReportCardContainer = styled.div`
    height:200px;
    width:265px;
`;

export const ImageContainer = styled.div`
    position:absolute;
    width:265px;
    margin-top:25%;
    margin-bottom:25%;
    text-align:center;
`;

export const Image = styled.img.attrs(props=>({
    src : props.image
}))`
    width: 50px;
    height: 50px;
`

export const CardFooter = styled.div`
    position:absolute;
    bottom:0;
    width:265px;
    height:50px;
    background-color:white;
    border-top:2px solid black;
    span {
        float:left;
        padding:10px;
        font-weight:bold;
    }
`;

export const Button = styled.button`
    border:none;
    background:none;
    float:right;
    padding:10px;
    cursor:pointer;
    &>i{
        color:grey;
        font-size:2em;
    }
    &:focus{
       outline:none;
    }
    &:hover{
        i{
            color:#43D8A8;
        }
    }
`;