import {
  SET_SHEET_DATA,
  RESET_SHEET_DATA,
  SET_SHEET_ID,
  SET_ACTIVE_SHEET,
  SET_START_AND_END,
} from '../actions/sheetData';

const chartData = (state = [], action) => {
  switch (action.type) {
    case SET_SHEET_DATA: {
      const sheetTitle = action.data.sheets[0].properties.title;
      return {
        ...state,
        sheets: action.data,
        activeSheet: sheetTitle,
        start: '',
        end: '',
      };
    }
    case RESET_SHEET_DATA: {
      return {
        ...state,
        sheetId: '',
        data: {},
        activeSheet: '',
        start: '',
        end: '',
      };
    }
    case SET_ACTIVE_SHEET: {
      return {
        ...state,
        activeSheet: action.activeSheet,
        start: '',
        end: '',
      };
    }
    case SET_START_AND_END: {
      return {
        ...state,
        start: action.data.start,
        end: action.data.end,
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
