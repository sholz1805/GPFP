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
  FETCH_SINGLE_MESSAGE_REQUEST,
  FETCH_SINGLE_MESSAGE_SUCCESS,
  FETCH_SINGLE_MESSAGE_FAILURE,
  FETCH_SINGLE_PROJECT_ADMIN_REQUEST,
  FETCH_SINGLE_PROJECT_ADMIN_SUCCESS,
  FETCH_SINGLE_PROJECT_ADMIN_FAILURE,
  FETCH_PENDING_INVESTMENT_REQUEST,
  FETCH_PENDING_INVESTMENT_SUCCESS,
  FETCH_PENDING_INVESTMENT_FAILURE,
  CREATE_INVESTMENT_TRANSACTION_REQUEST,
  CREATE_INVESTMENT_TRANSACTION_SUCCESS,
  CREATE_INVESTMENT_TRANSACTION_FAILURE,
  FETCH_ALL_INVESTMENT_REQUEST,
  FETCH_ALL_INVESTMENT_SUCCESS,
  FETCH_ALL_INVESTMENT_FAILURE,
  CREATE_DEV_REPORT_FAILURE,
  CREATE_DEV_REPORT_SUCCESS,
  CREATE_DEV_REPORT_REQUEST,
  CREATE_INV_REPORT_FAILURE,
  CREATE_INV_REPORT_SUCCESS,
  CREATE_INV_REPORT_REQUEST,
  REMOVE_PDF_REQUEST,
  REMOVE_PDF_SUCCESS,
  REMOVE_PDF_FAILURE,
} from "../actions/adminActions";

const initialState = {
  counts: 0,
  singleProjectAdmin: null,
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
  singleMessage: [],
  pendingInvestment: [],
  allInvestment: [],
  investmentData: null,
  invReportData: null,
  devReportData: null,
  removePdfSuccess: false,

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

    case FETCH_SINGLE_PROJECT_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SINGLE_PROJECT_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        singleProjectAdmin: action.payload,
      };
    case FETCH_SINGLE_PROJECT_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ALL_PROJECTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        allProjects: {
          projects: action.payload.projects,
          totalPages: action.payload.totalPages,
        },
      };
    case FETCH_ALL_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ALL_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_MESSAGES_SUCCESS:
      return { ...state, loading: false, allMessages: action.payload };
    case FETCH_ALL_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_SINGLE_MESSAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SINGLE_MESSAGE_SUCCESS:
      return { ...state, loading: false, singleMessage: action.payload };
    case FETCH_SINGLE_MESSAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_PENDING_INVESTMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PENDING_INVESTMENT_SUCCESS:
      return { ...state, loading: false, pendingInvestment: action.payload };
    case FETCH_PENDING_INVESTMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ALL_INVESTMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_INVESTMENT_SUCCESS:
      return { ...state, loading: false, allInvestment: action.payload };
    case FETCH_ALL_INVESTMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_INVESTMENT_TRANSACTION_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_INVESTMENT_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        investmentData: action.payload,
        error: null,
      };
    case CREATE_INVESTMENT_TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_INV_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_INV_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        invReportData: action.payload,
        error: null,
      };
    case CREATE_INV_REPORT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_DEV_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_DEV_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        devReportData: action.payload,
        error: null,
      };
    case CREATE_DEV_REPORT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_PDF_REQUEST:
      return { ...state, loading: true, removePdfSuccess: false, error: null };
    case REMOVE_PDF_SUCCESS:
      return { ...state, loading: false, removePdfSuccess: true, error: null };
    case REMOVE_PDF_FAILURE:
      return {
        ...state,
        loading: false,
        removePdfSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
