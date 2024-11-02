import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import signInReducer from "./signInReducer";
import { profileReducer } from "./profileReducer";
import { projectReducer } from "./projectReducer";
import { allProjectReducer } from "./fetchAllProjectReducer";
import userReducer from "./userReducer";
import singleProjectReducer from "./fetchSingleProjectReducer";

const rootReducer = combineReducers({
  signup: signUpReducer,
  signin: signInReducer,
  profile: profileReducer,
  project: projectReducer,
  projects: allProjectReducer,
  user: userReducer,
  singleProject : singleProjectReducer,
  
});

export default rootReducer;
