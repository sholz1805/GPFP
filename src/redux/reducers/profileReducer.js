import {
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from "../actions/profileActions";

const initialState = {
  loading: false,
  profile: null,
  error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return { ...state, loading: true };
    case FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case CREATE_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case CREATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};