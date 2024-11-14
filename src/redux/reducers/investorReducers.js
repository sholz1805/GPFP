import {
    FETCH_INVESTED_PROJECTS_REQUEST,
    FETCH_INVESTED_PROJECTS_SUCCESS,
    FETCH_INVESTED_PROJECTS_FAILURE,
    FETCH_TRANSACTION_COUNT_REQUEST,
    FETCH_TRANSACTION_COUNT_SUCCESS,
    FETCH_TRANSACTION_COUNT_FAILURE
} from '../actions/investorActions';

const initialState = {
    investedProjects: [],
    transactionCount: 0,
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVESTED_PROJECTS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVESTED_PROJECTS_SUCCESS:
            return { ...state, loading: false, investedProjects: action.payload };
        case FETCH_INVESTED_PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_TRANSACTION_COUNT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TRANSACTION_COUNT_SUCCESS:
            return { ...state, loading: false, transactionCount: action.payload };
        case FETCH_TRANSACTION_COUNT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default reducer;