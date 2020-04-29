import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
import transactionReducer from './transaction/transaction.reducers';
const rootReducer = combineReducers({
    auth : authReducer,
    transaction : transactionReducer
});

export default rootReducer;