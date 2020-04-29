const INITIAL_STATE = {
    balance : null
}

const transactionReducer = (state=INITIAL_STATE, action) => {
    if(action.type === 'UPDATE_WALLET_BALANCE')
        return{
            ...state,
            balance : action.payload
        }
    if(action.type === 'AUTH_SIGN_OUT')
        return {
            ...INITIAL_STATE
        }
    return state;
}

export default transactionReducer;