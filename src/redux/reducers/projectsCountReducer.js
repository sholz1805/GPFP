import {
    FETCH_PROJECTS_COUNT_REQUEST,
    FETCH_PROJECTS_COUNT_SUCCESS,
    FETCH_PROJECTS_COUNT_FAILURE,
  } from '../actions/projectsCountAction';
  
  const initialState = {
    loading: false,
    projectsCount: null,
    error: null,
  };
  
  const projectsCountReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROJECTS_COUNT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PROJECTS_COUNT_SUCCESS:
        return {
          ...state,
          loading: false,
          projectsCount: action.payload,
        };
      case FETCH_PROJECTS_COUNT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default projectsCountReducer;