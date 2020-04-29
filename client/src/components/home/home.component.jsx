import React from 'react';
import GoogleSignIn from '../login/google-sign-in.component';
import {HomePageContainer} from './home.styles';
// import {HomePageContainer, ImageContainer } from './home.styles';
// import imageUrl from '../../assets/background_expense_pic.png'; 

const Home = () => {
    return(
        <HomePageContainer>
            {/* <ImageContainer src={imageUrl}/> */}
            <GoogleSignIn/>
        </HomePageContainer>

    );    
}

export default Home;