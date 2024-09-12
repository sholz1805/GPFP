import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from '../actions/signUpActions';
  
  const initialState = {
    loading: false,
    userData: null,
    error: null,
  };
  
  const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return { ...state, loading: true };
      case SIGNUP_SUCCESS:
        return { loading: false, userData: action.payload, error: null };
      case SIGNUP_FAILURE:
        return { loading: false, userData: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default signUpReducer;
  