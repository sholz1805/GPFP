import axios from "axios";

export const CREATE_PROJECT_REQUEST = "CREATE_PROJECT_REQUEST";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export const createProjectRequest = () => ({ type: CREATE_PROJECT_REQUEST });
const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com";

export const createProjectSuccess = (projectData) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: projectData,
});

export const createProjectFailure = (error) => ({
  type: CREATE_PROJECT_FAILURE,
  payload: error,
});

export const createProject = (projectData) => {
  const endpoint = "/api/v1/add/project";

  return async (dispatch) => {
    dispatch(createProjectRequest());

    try {
      const response = await axios.post(baseUrl + endpoint, projectData);

      if (response.status >= 200 && response.status < 300) {
        dispatch(createProjectSuccess(response.data));
        return response.data;
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(createProjectFailure(errorMessage));
      throw error; 
    }
  };
};
