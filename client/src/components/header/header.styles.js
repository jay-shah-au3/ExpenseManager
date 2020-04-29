import styled from 'styled-components';

export const NavbarContainer = styled.nav` 
    background-color: white;
    font-size:1.5em; 
    font-family:  monospace;   
    box-shadow:0px 2px whitesmoke;
    .navbar-brand {
        color:black;
        font-size:1.2em;
        letter-spacing:5px;
    }

    a {
        color:black;        
    }
    .active{
        background:none;
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;        
    }
    a:hover {
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;        
    }

    span.navbar-toggler-icon{
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(0,0,0)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
    }

`

export const ImageContainer = styled.img`
    width:32px;
    height:32px;
    margin-right:10px;
`;

export const ImageWalletContainer = styled.img`
    width:35px;
    height:35px;
`;

export const ProfilePicContainer = styled.img`
    height:32px;
    border-radius:50%;
`;

export const UnOrderedListContainer = styled.ul`
    align-items:center;
    li {
        padding-left:10px;
        padding-right:10px;
        margin-right:60px;
        @media (max-width:768px){
            padding-left:0px;
            padding-right:0px;
            margin-right:0px;    
        }
    }
`

export const DropDownMenuContainer = styled.div`
    a {
        font-weight:bold;
    }
    button {
        background:none;
        cursor:pointer;
        font-weight:bold;
    }
    button:hover {
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;        
    }
`
const income_color = '#42DE90';
const expense_color = '#e72438';
export const WallletSpanContainer = styled.span`
    padding-left:2px;
    font-weight:bold;
    color : ${ props => props.balance >= 0 ? income_color : expense_color}
`;