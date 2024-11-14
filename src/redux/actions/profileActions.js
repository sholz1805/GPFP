import axios from "axios";

export const CREATE_PROFILE_REQUEST = "CREATE_PROFILE_REQUEST";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_FAILURE = "CREATE_PROFILE_FAILURE";
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const createProfileRequest = () => ({ type: CREATE_PROFILE_REQUEST });
const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com";

export const createProfileSuccess = (profileData) => ({
  type: CREATE_PROFILE_SUCCESS,
  payload: profileData,
});

export const createProfileFailure = (error) => ({
  type: CREATE_PROFILE_FAILURE,
  payload: error,
});

//create profile for developer
export const createDeveloperProfile = (profileData) => {
  const endpoint = "/api/v1/create/profile/developer";

  return async (dispatch) => {
    dispatch(createProfileRequest());

    try {
      // if (!profileData.uniqueId || !profileData.companyAddress || !profileData.representativeName || !profileData.representativeEmail) {
      //   throw new Error('Please fill in all required fields');
      // }

      // const operationYears = parseInt(profileData.operationYears, 10);
      // const projectsCount = parseInt(profileData.projectsCount, 10);

      // if (isNaN(operationYears) || isNaN(projectsCount)) {
      //   throw new Error('Invalid operation years or projects count');
      // }

      // profileData.operationYears = operationYears;
      // profileData.projectsCount = projectsCount;

      const response = await axios.post(baseUrl + endpoint, profileData);

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      dispatch(createProfileSuccess(response.data));

      return Promise.resolve({
        type: CREATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(createProfileFailure(errorMessage));

      return Promise.reject({
        type: CREATE_PROFILE_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// create profile for Investor
export const createInvestorProfile = (profileData) => {
  const endpoint = "/api/v1/create/profile/investor";

  return async (dispatch) => {
    dispatch(createProfileRequest());

    try {
      const response = await axios.post(baseUrl + endpoint, profileData);

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      dispatch(createProfileSuccess(response.data));

      return Promise.resolve({
        type: CREATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(createProfileFailure(errorMessage));

      return Promise.reject({
        type: CREATE_PROFILE_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const fetchProfileRequest = () => ({ type: FETCH_PROFILE_REQUEST });

export const fetchProfileSuccess = (uniqueId) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: uniqueId,
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const fetchDeveloperProfile = (uniqueId) => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());

    try {
      const response = await axios.get(
        baseUrl + `/api/v1/get/developer/profile/${uniqueId}`
      );

      dispatch(fetchProfileSuccess(response.data));
      // console.log(response.data);

      return Promise.resolve({
        type: FETCH_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Profile fetch failed!";

      dispatch(fetchProfileFailure(errorMessage));

      return Promise.reject({
        type: FETCH_PROFILE_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// fetch investor profile
export const fetchInvestorProfile = (uniqueId) => {
  const endpoint = "/api/v1/get/investor/profile/";
  return async (dispatch) => {
    dispatch(fetchProfileRequest());

    try {
      const response = await axios.get(baseUrl + endpoint + `${uniqueId}`);

      dispatch(fetchProfileSuccess(response.data));
      // console.log(response.data);

      return Promise.resolve({
        type: FETCH_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Profile fetch failed!";

      dispatch(fetchProfileFailure(errorMessage));

      return Promise.reject({
        type: FETCH_PROFILE_FAILURE,
        payload: errorMessage,
      });
    }
  };
};
