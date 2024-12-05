import axios from 'axios';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const LOGOUT = 'LOGOUT';



export const signinRequest = () => ({ type: SIGNIN_REQUEST });

export const signinSuccess = (userData) => ({
  type: SIGNIN_SUCCESS,
  payload: userData,
});

export const signinFailure = (error) => ({
  type: SIGNIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const signin = (userData) => {
  const baseUrl = 'https://greenpower-stage-71fa5ec0b66d.herokuapp.com';
  
 
  const config = {
    // headers: {
    //   'Content-Type': 'application/json', 
    //   'Authorization': `Bearer ${authToken}`, 
    // },
  };
  
  return async (dispatch) => {
    dispatch(signinRequest());
    
    try {
      
      const response = await axios.post(baseUrl + '/auth/login', userData, config);
      // console.log(response);
      
      dispatch(signinSuccess(response.data));
      
      return Promise.resolve({ type: SIGNIN_SUCCESS, payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : 'Sign in failed!';
      
      dispatch(signinFailure(errorMessage));
      
      return Promise.reject({ type: SIGNIN_FAILURE, payload: errorMessage });
    }
  };
};
