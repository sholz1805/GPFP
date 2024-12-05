import {
    FETCH_AVAILABLE_PROJECTS_REQUEST,
    FETCH_AVAILABLE_PROJECTS_SUCCESS,
    FETCH_AVAILABLE_PROJECTS_FAILURE,
    REQUEST_MEETING,
    REQUEST_MEETING_SUCCESS,
    REQUEST_MEETING_FAILURE,
    REQUEST_INFORMATION,
    REQUEST_INFORMATION_SUCCESS,
    REQUEST_INFORMATION_FAILURE,
    REQUEST_INVESTMENT,
    REQUEST_INVESTMENT_SUCCESS,
    REQUEST_INVESTMENT_FAILURE,
} from '../actions/availableProjectActions';

const initialState = {
    loading: false,
    projects: [],
    totalPages: 0,
    error: '',
    meetingLoading: false,
    meetingError: '',
    meetingResponse: null, 
    informationLoading: false,
    informationError: '',
    informationResponse: null, 
    investmentLoading: false,
    investmentError: '',
    investmentResponse: null, 
};

const availableProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AVAILABLE_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '' 
            };
        case FETCH_AVAILABLE_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload.projects,
                totalPages: action.payload.totalPages,
                error: ''
            };
        case FETCH_AVAILABLE_PROJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                projects: [],
                totalPages: 0,
                error: action.payload
            };
        case REQUEST_MEETING:
            return {
                ...state,
                meetingLoading: true,
                meetingError: '',
                meetingResponse: null 
            };
        case REQUEST_MEETING_SUCCESS:
            return {
                ...state,
                meetingLoading: false,
                meetingResponse: action.payload.data, 
                meetingError: ''
            };
        case REQUEST_MEETING_FAILURE:
            return {
                ...state,
                meetingLoading: false,
                meetingError: action.payload
            };
        case REQUEST_INFORMATION:
            return {
                ...state,
                informationLoading: true,
                informationError: '',
                informationResponse: null 
            };
        case REQUEST_INFORMATION_SUCCESS:
            return {
                ...state,
                informationLoading: false,
                informationResponse: action.payload.data, 
                informationError: ''
            };
        case REQUEST_INFORMATION_FAILURE:
            return {
                ...state,
                informationLoading: false,
                informationError: action.payload
            };
        case REQUEST_INVESTMENT:
            return {
                ...state,
                investmentLoading: true,
                investmentError: '',
                investmentResponse: null 
            };
        case REQUEST_INVESTMENT_SUCCESS:
            return {
                ...state,
                investmentLoading: false,
                investmentResponse: action.payload.data,
                investmentError: ''
            };
        case REQUEST_INVESTMENT_FAILURE:
            return {
                ...state,
                investmentLoading: false,
                investmentError: action.payload
            };
        default:
            return state;
    }
};

export default availableProjectReducer;