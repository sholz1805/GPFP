import axios from 'axios';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signupRequest = () => ({ type: SIGNUP_REQUEST });

export const signupSuccess = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: userData,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signup = (userData) => {
  const baseUrl = 'https://greenpower-stage-71fa5ec0b66d.herokuapp.com';
  
  return async (dispatch) => {
    dispatch(signupRequest());
    
    try {   
      const response = await axios.post(baseUrl + '/auth/developer/register', userData);
      console.log(response);
      
      dispatch(signupSuccess(response.data));
      
      return Promise.resolve({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : 'Signup failed!';
      
      dispatch(signupFailure(errorMessage));
      
      return Promise.reject({ type: SIGNUP_FAILURE, payload: errorMessage });
    }
  };
};



// export const signup = (userData) => {
//   const baseUrl = 'https://greenpower-stage-71fa5ec0b66d.herokuapp.com';
  
//   return async (dispatch) => {
//     dispatch(signupRequest());
    
//     try {

//        //   const config = {
//     //     headers: {
//     //       'Content-Type': 'application/json',  // Set content type
//     //       Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with your actual token
//     //     },
//     //   };
//       const response = await axios.post(baseUrl + '/auth/developer/register', userData);
      
//       dispatch(signupSuccess(response.data));
//       // Return the action type to handle it in the component
//       return { type: SIGNUP_SUCCESS, payload: response.data };
//     } catch (error) {
//       const errorMessage = error.response && error.response.data.message
//         ? error.response.data.message
//         : 'Signup failed!';
        
//       dispatch(signupFailure(errorMessage));
//       // Return the action type to handle it in the component
//       return { type: SIGNUP_FAILURE, payload: errorMessage };
//     }
//   };
// };

