import {
  SET_SHEET_DATA,
  SET_SHEET_ID,
  SET_ACTIVE_SHEET,
} from '../actions/sheetData';

const chartData = (state = [], action) => {
  switch (action.type) {
    case SET_SHEET_DATA: {
      return {
        ...state,
        sheets: action.data,
      };
    }
    case SET_ACTIVE_SHEET: {
      return {
        ...state,
        activeSheet: action.activeSheet,
      };
    }
    case SET_SHEET_ID: {
      return {
        ...state,
        sheetId: action.sheetId,
      };
    }
    default:
      return state;
  }
};

export default chartData;
