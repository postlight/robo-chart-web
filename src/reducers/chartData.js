import { SET_CHART_DATA, SET_CHART_TYPE } from '../actions/chartData';

const chartData = (state = [], action) => {
  switch (action.type) {
    case SET_CHART_DATA: {
      return {
        ...state,
        data: action.data.data,
        start: action.data.start,
        end: action.data.end,
      };
    }
    case SET_CHART_TYPE: {
      return {
        ...state,
        type: action.chartType,
      };
    }
    default:
      return state;
  }
};

export default chartData;
