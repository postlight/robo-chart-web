import { SET_FETCHING_DATA } from '../actions/appStatus';

const appStatus = (state = [], action) => {
  switch (action.type) {
    case SET_FETCHING_DATA: {
      return {
        ...state,
        fetchingData: action.fetchingData,
      };
    }
    default:
      return state;
  }
};

export default appStatus;
