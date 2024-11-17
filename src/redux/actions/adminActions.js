import axios from "axios";

export const FETCH_COUNTS_REQUEST = "FETCH_COUNTS_REQUEST";
export const FETCH_COUNTS_SUCCESS = "FETCH_COUNTS_SUCCESS";
export const FETCH_COUNTS_FAILURE = "FETCH_COUNTS_FAILURE";

export const FETCH_ALL_PROJECTS_REQUEST = "FETCH_ALL_PROJECTS_REQUEST";
export const FETCH_ALL_PROJECTS_SUCCESS = "FETCH_ALL_PROJECTS_SUCCESS";
export const FETCH_ALL_PROJECTS_FAILURE = "FETCH_ALL_PROJECTS_FAILURE";

export const FETCH_ALL_DEVELOPERS_REQUEST = "FETCH_ALL_DEVELOPERS_REQUEST";
export const FETCH_ALL_DEVELOPERS_SUCCESS = "FETCH_ALL_DEVELOPERS_SUCCESS";
export const FETCH_ALL_DEVELOPERS_FAILURE = "FETCH_ALL_DEVELOPERS_FAILURE";

export const FETCH_ALL_INVESTORS_REQUEST = "FETCH_ALL_INVESTORS_REQUEST";
export const FETCH_ALL_INVESTORS_SUCCESS = "FETCH_ALL_INVESTORS_SUCCESS";
export const FETCH_ALL_INVESTORS_FAILURE = "FETCH_ALL_INVESTORS_FAILURE";

export const FETCH_ALL_MESSAGES_REQUEST = "FETCH_ALL_MESSAGES_REQUEST";
export const FETCH_ALL_MESSAGES_SUCCESS = "FETCH_ALL_MESSAGES_SUCCESS";
export const FETCH_ALL_MESSAGES_FAILURE = "FETCH_ALL_MESSAGES_FAILURE";

const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com";

export const fetchCounts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-counts`);
      dispatch({ type: FETCH_COUNTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_COUNTS_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllProjects = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_PROJECTS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/projects/all`, {
        params: { page },
      });
      const projectsData = response.data.data;
      dispatch({
        type: FETCH_ALL_PROJECTS_SUCCESS,
        payload: {
          projects: projectsData.content,
          totalPages: projectsData.totalPages,
        },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: FETCH_ALL_PROJECTS_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const fetchAllDevelopers = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_DEVELOPERS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get/developer/all`, {
        params: { page },
      });
      dispatch({ type: FETCH_ALL_DEVELOPERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_DEVELOPERS_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllInvestors = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_INVESTORS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get/investor/all`, {
        params: { page },
      });
      dispatch({ type: FETCH_ALL_INVESTORS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_INVESTORS_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllMessages = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_MESSAGES_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-notifications`, {
        params: { page },
      });
      dispatch({ type: FETCH_ALL_MESSAGES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_MESSAGES_FAILURE, payload: error.message });
    }
  };
};



