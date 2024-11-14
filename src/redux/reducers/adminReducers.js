import {
  FETCH_COUNTS_REQUEST,
  FETCH_COUNTS_SUCCESS,
  FETCH_COUNTS_FAILURE,
  FETCH_ALL_DEVELOPERS_REQUEST,
  FETCH_ALL_DEVELOPERS_SUCCESS,
  FETCH_ALL_DEVELOPERS_FAILURE,
  FETCH_ALL_INVESTORS_REQUEST,
  FETCH_ALL_INVESTORS_SUCCESS,
  FETCH_ALL_INVESTORS_FAILURE,
  FETCH_ALL_PROJECTS_REQUEST,
  FETCH_ALL_PROJECTS_SUCCESS,
  FETCH_ALL_PROJECTS_FAILURE,
  FETCH_ALL_MESSAGES_REQUEST,
  FETCH_ALL_MESSAGES_SUCCESS,
  FETCH_ALL_MESSAGES_FAILURE,
} from "../actions/adminActions";

const initialState = {
  counts: 0,
  allProjects: {
    projects: [],
    totalPages: 0,
  },
  allDevelopers: {
    data: [],
    loading: false,
    error: null,
  },
  allInvestors: {
    data: [],
    loading: false,
    error: null,
  },
  allMessages: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COUNTS_SUCCESS:
      return { ...state, loading: false, counts: action.payload };
    case FETCH_COUNTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ALL_DEVELOPERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_DEVELOPERS_SUCCESS:
      return { ...state, loading: false, allDevelopers: action.payload };
    case FETCH_ALL_DEVELOPERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ALL_INVESTORS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_INVESTORS_SUCCESS:
      return { ...state, loading: false, allInvestors: action.payload };
    case FETCH_ALL_INVESTORS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ALL_PROJECTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_PROJECTS_SUCCESS:
      return { ...state,
        allProjects: {
          projects: action.payload.projects,
          totalPages: action.payload.totalPages,
        }, };
    case FETCH_ALL_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ALL_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_MESSAGES_SUCCESS:
      return { ...state, loading: false, allMessages: action.payload };
    case FETCH_ALL_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
