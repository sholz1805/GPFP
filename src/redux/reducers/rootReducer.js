import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';


const rootReducer = combineReducers({
  signup: signUpReducer
});

export default rootReducer;
