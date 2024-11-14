import {
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from "../actions/fetchAllProjectActions";

const initialState = {
    projects: [], 
    totalPages: 0,
    loading: false,
    error: null,
};

export const allProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return { ...state, loading: true, error:null };
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload.projects, 
                totalPages: action.payload.totalPages, 
            };
        case FETCH_PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};