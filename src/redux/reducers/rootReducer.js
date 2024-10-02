import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import signInReducer from "./signInReducer";
import { profileReducer } from "./profileReducer";
import { projectReducer } from "./projectReducer";

const rootReducer = combineReducers({
  signup: signUpReducer,
  signin: signInReducer,
  profile: profileReducer,
  project: projectReducer,
});

export default rootReducer;
