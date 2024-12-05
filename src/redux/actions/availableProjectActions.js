import axios from "axios";

export const FETCH_AVAILABLE_PROJECTS_REQUEST =
  "FETCH_AVAILABLE_PROJECTS_REQUEST";
export const FETCH_AVAILABLE_PROJECTS_SUCCESS =
  "FETCH_AVAILABLE_PROJECTS_SUCCESS";
export const FETCH_AVAILABLE_PROJECTS_FAILURE =
  "FETCH_AVAILABLE_PROJECTS_FAILURE";
export const REQUEST_MEETING = "REQUEST_MEETING";
export const REQUEST_MEETING_SUCCESS = "REQUEST_MEETING_SUCCESS";
export const REQUEST_MEETING_FAILURE = "REQUEST_MEETING_FAILURE";
export const REQUEST_INFORMATION = "REQUEST_INFORMATION";
export const REQUEST_INFORMATION_SUCCESS = "REQUEST_INFORMATION_SUCCESS";
export const REQUEST_INFORMATION_FAILURE = "REQUEST_INFORMATION_FAILURE";
export const REQUEST_INVESTMENT = "REQUEST_INVESTMENT";
export const REQUEST_INVESTMENT_SUCCESS = "REQUEST_INVESTMENT_SUCCESS";
export const REQUEST_INVESTMENT_FAILURE = "REQUEST_INVESTMENT_FAILURE";



const getApiUrl = (investorUniqueId) =>
  `https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/projects/${investorUniqueId}/available`;

const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1";

export const fetchAvailableProjects = (page, investorUniqueId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_AVAILABLE_PROJECTS_REQUEST });
    try {
      const response = await axios.get(getApiUrl(investorUniqueId), {
        params: { page },
      });
      const { content, totalPages } = response.data.data;
      dispatch({
        type: FETCH_AVAILABLE_PROJECTS_SUCCESS,
        payload: { projects: content, totalPages },
      });
    } catch (error) {
    //   console.error("Error fetching available projects:", error);
      dispatch({
        type: FETCH_AVAILABLE_PROJECTS_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const requestMeeting = (meetingData) => {
    return async (dispatch) => {
      dispatch({ type: REQUEST_MEETING });
      try {
        const response = await axios.post(`${baseUrl}/meeting/request`, meetingData);
        dispatch({
            type: REQUEST_MEETING_SUCCESS,
            payload: response.data,
          });
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: REQUEST_MEETING_FAILURE,
            payload: errorMessage,
          });
          throw new Error(errorMessage); 
      }
    };
  };

  export const requestInformation = (infoData) => {
    return async (dispatch) => {
      dispatch({ type: REQUEST_INFORMATION });
      try {
        const response = await axios.post(`${baseUrl}/information/request`, infoData);
        dispatch({
            type: REQUEST_INFORMATION_SUCCESS,
            payload: response.data,
          });
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: REQUEST_INFORMATION_FAILURE,
            payload: errorMessage,
          });
          throw new Error(errorMessage); 
      }
    };
  };



  export const requestInvestment = (infoData) => {
    return async (dispatch) => {
      dispatch({ type: REQUEST_INVESTMENT });
      try {
        const response = await axios.post(`${baseUrl}/investment/request`, infoData);
        dispatch({
          type: REQUEST_INVESTMENT_SUCCESS,
          payload: response.data,
        });
        return response.data; 
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
          type: REQUEST_INVESTMENT_FAILURE,
          payload: errorMessage,
        });
        throw new Error(errorMessage); 
      }
    };
  };


