import axios from "axios";

export const FETCH_INVESTED_PROJECTS_REQUEST =
  "FETCH_INVESTED_PROJECTS_REQUEST";
export const FETCH_INVESTED_PROJECTS_SUCCESS =
  "FETCH_INVESTED_PROJECTS_SUCCESS";
export const FETCH_INVESTED_PROJECTS_FAILURE =
  "FETCH_INVESTED_PROJECTS_FAILURE";

export const FETCH_TRANSACTION_COUNT_REQUEST =
  "FETCH_TRANSACTION_COUNT_REQUEST";
export const FETCH_TRANSACTION_COUNT_SUCCESS =
  "FETCH_TRANSACTION_COUNT_SUCCESS";
export const FETCH_TRANSACTION_COUNT_FAILURE =
  "FETCH_TRANSACTION_COUNT_FAILURE";

export const FETCH_REPORTS_REQUEST = "FETCH_REPORTS_REQUEST";
export const FETCH_REPORTS_SUCCESS = "FETCH_REPORTS_SUCCESS";
export const FETCH_REPORTS_FAILURE = "FETCH_REPORTS_FAILURE";

export const fetchInvestedProjects = (uniqueId, page) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INVESTED_PROJECTS_REQUEST });
    try {
      const response = await axios.get(
        `https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/transaction/get/investments/investor`,
        {
          params: { uniqueId, page },
        }
      );
      dispatch({
        type: FETCH_INVESTED_PROJECTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_INVESTED_PROJECTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchTransactionCount = (uniqueId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTION_COUNT_REQUEST });
    try {
      const response = await axios.get(
        `https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/transaction/get/count/investor`,
        {
          params: { uniqueId },
        }
      );
      dispatch({
        type: FETCH_TRANSACTION_COUNT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TRANSACTION_COUNT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchReports = (pageNumber, userUniqueId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_REPORTS_REQUEST });

    try {
      const response = await axios.get(
        `https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/report/get/report/user`,
        {
          params: {
            pageNumber,
            userUniqueId,
          },
        }
      );

      dispatch({
        type: FETCH_REPORTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_REPORTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
