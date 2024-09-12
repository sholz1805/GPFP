import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';


const rootReducer = combineReducers({
  signup: signUpReducer,
  signin : signInReducer
});

export default rootReducer;
