const authSignInStart = () => ({
    type:'AUTH_SIGN_IN_START',
    isLoading : true
});

const authSignInSuccess = (user) => ({
    type:'AUTH_SIGN_IN_SUCCESS',
    payload: user,
    isAuthenticated : true,
    isLoading : false
});

const authSignInFailure = () => ({
    type: 'AUTH_SIGN_IN_FAILURE',
    isAuthenticated : false,
    isLoading : false,
    error : 'COULD NOT SIGN IN'
});

const authSignOut = () => ({
    type:'AUTH_SIGN_OUT',
    isAuthenticated : false,
})

export const googleAuthSignIn = (url, tokenId) => {

    return async dispatch => {
        try{
            dispatch(authSignInStart());
            let response = await fetch(url, {
                method: "POST",
                headers : {
                    Authorization : `Bearer ${tokenId}`
                }				
            });
            let jwt_decode = require('jwt-decode');
            let result = await response.json();     
            let token = result.token
            let decodedJWT = jwt_decode(token);
            decodedJWT["token"] = token;
            decodedJWT["isAuthenticated"] = true;
            localStorage.setItem('user-auth', JSON.stringify(decodedJWT));
            dispatch(authSignInSuccess(decodedJWT));
        }
        catch(error){
            dispatch(authSignInFailure());
        }        
    }
}

export const googleAuthSignOut = () => {
    return dispatch => {
        localStorage.clear();
        dispatch(authSignOut());
    }
}