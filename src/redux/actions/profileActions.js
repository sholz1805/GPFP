import axios from "axios";

export const CREATE_PROFILE_REQUEST = "CREATE_PROFILE_REQUEST";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_FAILURE = "CREATE_PROFILE_FAILURE";

export const createProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROFILE_REQUEST });

    const { data } = await axios.post(
      "https://greenpower-stage-71fa5ec0b66d.herokuapp.com/auth/developer/profile/create",
      profileData
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
