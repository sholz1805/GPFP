import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
  } from '../actions/signInActions'; 
  
  const initialState = {
    loading: false,
    userData: null,
    error: null,
  };
  
  const signInReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNIN_REQUEST:
        return { ...state, loading: true };
      case SIGNIN_SUCCESS:
        return { loading: false, userData: action.payload, error: null };
      case SIGNIN_FAILURE:
        return { loading: false, userData: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default signInReducer;
  