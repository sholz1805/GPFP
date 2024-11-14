import axios from 'axios';

export const FETCH_PROJECTS_COUNT_REQUEST = 'FETCH_PROJECTS_COUNT_REQUEST';
export const FETCH_PROJECTS_COUNT_SUCCESS = 'FETCH_PROJECTS_COUNT_SUCCESS';
export const FETCH_PROJECTS_COUNT_FAILURE = 'FETCH_PROJECTS_COUNT_FAILURE';

export const fetchProjectsCountRequest = () => ({
  type: FETCH_PROJECTS_COUNT_REQUEST,
});

export const fetchProjectsCountSuccess = (projectsCount) => ({
  type: FETCH_PROJECTS_COUNT_SUCCESS,
  payload: projectsCount,
});

export const fetchProjectsCountFailure = (error) => ({
  type: FETCH_PROJECTS_COUNT_FAILURE,
  payload: error,
});

export const fetchProjectsCount = (uniqueId) => {
  return async (dispatch) => {
    dispatch(fetchProjectsCountRequest());
    try {
      const response = await axios.get(`https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/projects/${uniqueId}/count`);
      dispatch(fetchProjectsCountSuccess(response.data));
    } catch (error) {
      dispatch(fetchProjectsCountFailure(error.message));
    }
  };
};
