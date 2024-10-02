import {
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
  } from "../actions/projectActions";
  
  const initialState = {
    loading: false,
    project: null,
    error: null,
  };
  
  export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PROJECT_REQUEST:
        return { ...state, loading: true };
      case CREATE_PROJECT_SUCCESS:
        return { ...state, loading: false, project: action.payload };
      case CREATE_PROJECT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };