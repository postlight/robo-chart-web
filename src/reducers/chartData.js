import { SET_CHART_DATA } from '../actions/chartData';

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
    default:
      return state;
  }
};

export default chartData;
