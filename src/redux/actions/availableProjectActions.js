import axios from 'axios';

export const FETCH_AVAILABLE_PROJECTS_REQUEST = 'FETCH_AVAILABLE_PROJECTS_REQUEST';
export const FETCH_AVAILABLE_PROJECTS_SUCCESS = 'FETCH_AVAILABLE_PROJECTS_SUCCESS';
export const FETCH_AVAILABLE_PROJECTS_FAILURE = 'FETCH_AVAILABLE_PROJECTS_FAILURE';

const API_URL = 'https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/get/investor/available/projects';

export const fetchAvailableProjects = (page, uniqueId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_AVAILABLE_PROJECTS_REQUEST });
        try {
            const response = await axios.get(`${API_URL}?page=${page}&uniqueId=${uniqueId}`);
            const { content, totalPages } = response.data.data; 
            dispatch({ 
                type: FETCH_AVAILABLE_PROJECTS_SUCCESS, 
                payload: { projects: content, totalPages } 
            });
        } catch (error) {
            dispatch({ type: FETCH_AVAILABLE_PROJECTS_FAILURE, payload: error.message });
        }
    };
};