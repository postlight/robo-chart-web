import {
  SET_CHART_DATA,
  SET_CHART_TYPE,
  SET_CHART_COLORS,
  SET_ACTIVE_COLOR,
} from '../actions/chartData';

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
    case SET_CHART_COLORS: {
      return {
        ...state,
        colors: action.data.colors,
        color: action.data.color,
      };
    }
    case SET_ACTIVE_COLOR: {
      return {
        ...state,
        color: action.color,
      };
    }
    case SET_CHART_TYPE: {
      let type = action.chartType;
      let stacked = false;
      if (action.chartType === 'stacked') {
        type = 'bar';
        stacked = true;
      }
      return {
        ...state,
        type,
        stacked,
      };
    }
    default:
      return state;
  }
};

export default chartData;
