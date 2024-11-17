import axios from "axios";

export const FETCH_SINGLE_PROJECT_REQUEST = "FETCH_SINGLE_PROJECT_REQUEST";
export const FETCH_SINGLE_PROJECT_SUCCESS = "FETCH_SINGLE_PROJECT_SUCCESS";
export const FETCH_SINGLE_PROJECT_FAILURE = "FETCH_SINGLE_PROJECT_FAILURE";
export const APPROVE_PROJECT_SUCCESS = "APPROVE_PROJECT_SUCCESS";
export const APPROVE_PROJECT_FAIL = "APPROVE_PROJECT_FAIL";
export const REJECT_PROJECT_SUCCESS = "REJECT_PROJECT_SUCCESS";
export const REJECT_PROJECT_FAIL = "REJECT_PROJECT_FAIL";

const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com";

export const fetchSingleProject = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_PROJECT_REQUEST });
  try {
    const response = await axios.get(
      `https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/projects/${projectId}`
    );
    const projectData = response.data.data;
    dispatch({
      type: FETCH_SINGLE_PROJECT_SUCCESS,
      payload: projectData,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_PROJECT_FAILURE,
      payload: error.message || "Failed to fetch project",
    });
  }
};

export const approveProject = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/approve/project`,
      data
    );
    dispatch({ type: "APPROVE_PROJECT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "APPROVE_PROJECT_FAIL",
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const rejectProject = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/reject/project`, data);
    dispatch({
      type: "REJECT_PROJECT_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REJECT_PROJECT_FAIL",
      payload: error.response ? error.response.data : error.message,
    });
  }
};
