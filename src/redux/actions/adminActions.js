import axios from "axios";

export const FETCH_COUNTS_REQUEST = "FETCH_COUNTS_REQUEST";
export const FETCH_COUNTS_SUCCESS = "FETCH_COUNTS_SUCCESS";
export const FETCH_COUNTS_FAILURE = "FETCH_COUNTS_FAILURE";

export const FETCH_SINGLE_PROJECT_ADMIN_REQUEST =
  "FETCH_SINGLE_PROJECT_ADMIN_REQUEST";
export const FETCH_SINGLE_PROJECT_ADMIN_SUCCESS =
  "FETCH_SINGLE_PROJECT_ADMIN_SUCCESS ";
export const FETCH_SINGLE_PROJECT_ADMIN_FAILURE =
  " FETCH_SINGLE_PROJECT_ADMIN_FAILURE";

export const FETCH_ALL_PROJECTS_REQUEST = "FETCH_ALL_PROJECTS_REQUEST";
export const FETCH_ALL_PROJECTS_SUCCESS = "FETCH_ALL_PROJECTS_SUCCESS";
export const FETCH_ALL_PROJECTS_FAILURE = "FETCH_ALL_PROJECTS_FAILURE";

export const FETCH_ALL_DEVELOPERS_REQUEST = "FETCH_ALL_DEVELOPERS_REQUEST";
export const FETCH_ALL_DEVELOPERS_SUCCESS = "FETCH_ALL_DEVELOPERS_SUCCESS";
export const FETCH_ALL_DEVELOPERS_FAILURE = "FETCH_ALL_DEVELOPERS_FAILURE";

export const FETCH_ALL_INVESTORS_REQUEST = "FETCH_ALL_INVESTORS_REQUEST";
export const FETCH_ALL_INVESTORS_SUCCESS = "FETCH_ALL_INVESTORS_SUCCESS";
export const FETCH_ALL_INVESTORS_FAILURE = "FETCH_ALL_INVESTORS_FAILURE";

export const FETCH_ALL_MESSAGES_REQUEST = "FETCH_ALL_MESSAGES_REQUEST";
export const FETCH_ALL_MESSAGES_SUCCESS = "FETCH_ALL_MESSAGES_SUCCESS";
export const FETCH_ALL_MESSAGES_FAILURE = "FETCH_ALL_MESSAGES_FAILURE";

export const FETCH_SINGLE_MESSAGE_REQUEST = "FETCH_SINGLE_MESSAGE_REQUEST ";
export const FETCH_SINGLE_MESSAGE_SUCCESS = "FETCH_SINGLE_MESSAGE_SUCCESS ";
export const FETCH_SINGLE_MESSAGE_FAILURE = " FETCH_SINGLE_MESSAGE_FAILURE";

export const FETCH_PENDING_INVESTMENT_REQUEST =
  "FETCH_PENDING_INVESTMENT_REQUEST ";
export const FETCH_PENDING_INVESTMENT_SUCCESS =
  "FETCH_PENDING_INVESTMENT_SUCCESS ";
export const FETCH_PENDING_INVESTMENT_FAILURE =
  " FETCH_PENDING_INVESTMENT_FAILURE";

export const FETCH_ALL_INVESTMENT_REQUEST = "FETCH_ALL_INVESTMENT_REQUEST ";
export const FETCH_ALL_INVESTMENT_SUCCESS = "FETCH_ALL_INVESTMENT_SUCCESS ";
export const FETCH_ALL_INVESTMENT_FAILURE = " FETCH_ALL_INVESTMENT_FAILURE";

export const CREATE_INVESTMENT_TRANSACTION_REQUEST =
  "CREATE_INVESTMENT_TRANSACTION_REQUEST";
export const CREATE_INVESTMENT_TRANSACTION_SUCCESS =
  "CREATE_INVESTMENT_TRANSACTION_SUCCESS";
export const CREATE_INVESTMENT_TRANSACTION_FAILURE =
  "CREATE_INVESTMENT_TRANSACTION_FAILURE";

export const CREATE_DEV_REPORT_REQUEST = " CREATE_DEV_REPORT_REQUEST";
export const CREATE_DEV_REPORT_SUCCESS = "CREATE_DEV_REPORT_SUCCESS ";
export const CREATE_DEV_REPORT_FAILURE = "CREATE_DEV_REPORT_FAILURE ";
export const CREATE_INV_REPORT_REQUEST = " CREATE_INV_REPORT_REQUEST";
export const CREATE_INV_REPORT_SUCCESS = " CREATE_INV_REPORT_SUCCESS";
export const CREATE_INV_REPORT_FAILURE = " CREATE_INV_REPORT_FAILURE";

export const REMOVE_PDF_REQUEST = 'REMOVE_PDF_REQUEST';
export const REMOVE_PDF_SUCCESS = 'REMOVE_PDF_SUCCESS';
export const REMOVE_PDF_FAILURE = 'REMOVE_PDF_FAILURE';



const baseUrl = "https://greenpower-stage-71fa5ec0b66d.herokuapp.com";

export const fetchCounts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-counts`);
      dispatch({ type: FETCH_COUNTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_COUNTS_FAILURE, payload: error.message });
    }
  };
};

export const fetchSingleProjectAdmin = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_PROJECT_ADMIN_REQUEST });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/projects/admin/${projectId}`
    );
    const projectData = response.data.data;
    dispatch({
      type: FETCH_SINGLE_PROJECT_ADMIN_SUCCESS,
      payload: projectData,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_PROJECT_ADMIN_FAILURE,
      payload: error.message || "Failed to fetch project",
    });
  }
};

export const fetchAllProjects = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_PROJECTS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/projects/all`, {
        params: { page },
      });
      const projectsData = response.data.data;
      dispatch({
        type: FETCH_ALL_PROJECTS_SUCCESS,
        payload: {
          projects: projectsData.content,
          totalPages: projectsData.totalPages,
        },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: FETCH_ALL_PROJECTS_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const fetchAllDevelopers = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_DEVELOPERS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get/developer/all`, {
        params: { page },
      });
      dispatch({ type: FETCH_ALL_DEVELOPERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_DEVELOPERS_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllInvestors = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_INVESTORS_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get/investor/all`, {
        params: { page },
      });
      dispatch({ type: FETCH_ALL_INVESTORS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_INVESTORS_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllMessages = (page = 0) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_MESSAGES_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-notifications`, {
        params: { page },
      });
      dispatch({ type: FETCH_ALL_MESSAGES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_MESSAGES_FAILURE, payload: error.message });
    }
  };
};

export const fetchSingleMessage = (uniqueId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SINGLE_MESSAGE_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-notification`, {
        params: { uniqueId },
      });
      dispatch({ type: FETCH_SINGLE_MESSAGE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_MESSAGE_FAILURE, payload: error.message });
    }
  };
};

export const fetchPendingInvestment = (page) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PENDING_INVESTMENT_REQUEST });
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/get-pending-investments`,
        { params: { page } }
      );
      dispatch({
        type: FETCH_PENDING_INVESTMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PENDING_INVESTMENT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createInvestmentTransaction = (investmentData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INVESTMENT_TRANSACTION_REQUEST });

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/transaction/create`,
        investmentData
      );

      dispatch({
        type: CREATE_INVESTMENT_TRANSACTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_INVESTMENT_TRANSACTION_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchAllInvestment = (page) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_INVESTMENT_REQUEST });
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/transaction/get/investments/all`,
        { params: { page } }
      );
      dispatch({
        type: FETCH_ALL_INVESTMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_INVESTMENT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createInvestorReport = (reportData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INV_REPORT_REQUEST });

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/report/add/investor/report`,
        reportData
      );

      dispatch({
        type: CREATE_INV_REPORT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_INV_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createDeveloperReport = (reportData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_DEV_REPORT_REQUEST });

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/report/add/developer/report`,
        reportData
      );

      dispatch({
        type: CREATE_DEV_REPORT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_DEV_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const removePdf = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_PDF_REQUEST });

    try {
      const response = await axios.patch(`https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/projects/admin/remove-pdf/${projectId}`);
      dispatch({ type: REMOVE_PDF_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: REMOVE_PDF_FAILURE, payload: error.message });
    }
  };
};


