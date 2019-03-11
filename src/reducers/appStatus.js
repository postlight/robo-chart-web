import {
  SET_FETCHING_DATA,
  SET_AUTH_ERROR,
  SET_ERROR,
} from '../actions/appStatus';

/**
 * Check appStatus actions for docs
 */
const appStatus = (state = [], action) => {
  switch (action.type) {
    case SET_FETCHING_DATA: {
      return {
        ...state,
        authError: false,
        error: false,
        fetchingData: action.fetchingData,
      };
    }
    case SET_AUTH_ERROR: {
      return {
        ...state,
        fetchingData: false,
        authError: action.authError,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        fetchingData: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default appStatus;
