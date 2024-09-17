import axios from "axios";

export const CREATE_PROFILE_REQUEST = "CREATE_PROFILE_REQUEST";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_FAILURE = "CREATE_PROFILE_FAILURE";
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com"

export const fetchProfile = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROFILE_REQUEST });

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const { data } = await axios.get(
      baseUrl + `/api/v1/get/developer/profile/${userId}`,
      { headers }
    );

    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProfile = (profileData, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROFILE_REQUEST });

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const { data } = await axios.post(
      baseUrl + "/api/vi/create/profile/developer",
      profileData,
      { headers }
    );

    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
