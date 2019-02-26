import { SET_CHART_DATA } from '../actions/chartData';

const chartData = (state = [], action) => {
  switch (action.type) {
    case SET_CHART_DATA: {
      return {
        ...state,
        chartData: action.chartData,
      };
    }
    default:
      return state;
  }
};

export default chartData;
