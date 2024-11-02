import axios from "axios";

export const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

export const fetchProjectsRequest = () => ({ type: FETCH_PROJECTS_REQUEST });

export const fetchProjectsSuccess = (projects) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects, 
});

export const fetchProjectsFailure = (error) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});


const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com";

export const fetchProjects = (uniqueId, page = 0) => {
  return async (dispatch) => {
    dispatch(fetchProjectsRequest());
    try {
      const response = await axios.get(`${baseUrl}/api/v1/projects/${uniqueId}/all`, {
        params: { page },
      });
      const projectsData = response.data.data; 
      dispatch(fetchProjectsSuccess({
        projects: projectsData.content,
        totalPages: projectsData.totalPages, 
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(fetchProjectsFailure(errorMessage));
    }
  };
};