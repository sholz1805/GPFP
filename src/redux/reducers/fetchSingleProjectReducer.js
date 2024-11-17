import {
  FETCH_SINGLE_PROJECT_REQUEST,
  FETCH_SINGLE_PROJECT_SUCCESS,
  FETCH_SINGLE_PROJECT_FAILURE,
  APPROVE_PROJECT_SUCCESS,
  APPROVE_PROJECT_FAIL,
  REJECT_PROJECT_SUCCESS,
  REJECT_PROJECT_FAIL,
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
    case APPROVE_PROJECT_SUCCESS:
    case REJECT_PROJECT_SUCCESS:
      return { ...state, loading: false };
    case APPROVE_PROJECT_FAIL:
    case REJECT_PROJECT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default singleProjectReducer;
