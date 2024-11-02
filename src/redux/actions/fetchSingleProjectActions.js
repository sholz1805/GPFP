import axios from "axios";

export const FETCH_SINGLE_PROJECT_REQUEST = "FETCH_SINGLE_PROJECT_REQUEST";
export const FETCH_SINGLE_PROJECT_SUCCESS = "FETCH_SINGLE_PROJECT_SUCCESS";
export const FETCH_SINGLE_PROJECT_FAILURE = "FETCH_SINGLE_PROJECT_FAILURE";

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
