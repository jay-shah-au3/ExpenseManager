const INITIAL_STATE = {
    isLoading:false,
    isAuthenticated:false,
    ...JSON.parse(localStorage.getItem("user-auth"))
}

const authReducer = (state = INITIAL_STATE, action) => {
    if(action.type === 'AUTH_SIGN_IN_START')
        return { 
            ...state,
            isLoading : action.isLoading
        }

    if(action.type === 'AUTH_SIGN_IN_SUCCESS')
        return {
            ...state,
            isAuthenticated:action.isAuthenticated,
            isLoading : action.isLoading,
            ...action.payload,
            error:''
        }
    if(action.type === 'AUTH_SIGN_IN_FAILURE')
        return {
            ...state,
            isLoading : action.isLoading,
            error : action.error
        }
    if(action.type === 'AUTH_SIGN_OUT')
        return {
            isLoading : false,
            isAuthenticated : action.isAuthenticated,
        }
    return state;
}

export default authReducer;