import {
    FETCH_SINGLE_PROJECT_REQUEST,
    FETCH_SINGLE_PROJECT_SUCCESS,
    FETCH_SINGLE_PROJECT_FAILURE,
  } from "../actions/fetchSingleProjectActions";
  
  const initialState = {
    singleProject: null,
    loading: false,
    error: null,
  };
  
  const singleProjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_PROJECT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SINGLE_PROJECT_SUCCESS:
        return {
          ...state,
          loading: false,
          singleProject: action.payload,
        };
      case FETCH_SINGLE_PROJECT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default singleProjectReducer;
  