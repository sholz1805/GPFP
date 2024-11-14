import {
    FETCH_AVAILABLE_PROJECTS_REQUEST,
    FETCH_AVAILABLE_PROJECTS_SUCCESS,
    FETCH_AVAILABLE_PROJECTS_FAILURE
} from '../actions/availableProjectActions';

const initialState = {
    loading: false,
    projects: [],
    totalPages: 0, 
    error: ''
};

const availableProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AVAILABLE_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_AVAILABLE_PROJECTS_SUCCESS:
            return {
                loading: false,
                projects: action.payload.projects, 
                totalPages: action.payload.totalPages, 
                error: ''
            };
        case FETCH_AVAILABLE_PROJECTS_FAILURE:
            return {
                loading: false,
                projects: [],
                totalPages: 0, 
                error: action.payload
            };
        default:
            return state;
    }
};

export default availableProjectReducer;