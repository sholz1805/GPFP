import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import signInReducer from "./signInReducer";
import { profileReducer } from "./profileReducer";

const rootReducer = combineReducers({
  signup: signUpReducer,
  signin: signInReducer,
  profile: profileReducer,
});

export default rootReducer;
