import {
  RESET_CHART_DATA,
  SET_CHART_DATA,
  SET_CHART_TYPE,
  SET_CHART_COLORS,
  SET_ACTIVE_COLOR,
  SET_CHART_TITLE,
  SET_START_FROM,
  SET_FLIP_AXIS,
} from '../actions/chartData';

import { COLORS } from '../constants';

/**
 * Check chartData actions for docs
 */
const chartData = (state = [], action) => {
  switch (action.type) {
    case RESET_CHART_DATA: {
      return {
        ...state,
        data: [],
        start: '',
        end: '',
        type: 'line',
        stacked: false,
        colors: JSON.parse(localStorage.getItem(COLORS)),
        color: '',
        title: '',
        startFrom: 0,
        flipAxis: false,
      };
    }
    case SET_CHART_DATA: {
      return {
        ...state,
        data: action.data.data,
        start: action.data.start,
        end: action.data.end,
      };
    }
    case SET_CHART_COLORS: {
      localStorage.setItem(COLORS, JSON.stringify(action.data.colors));
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
    case SET_CHART_TITLE: {
      return {
        ...state,
        title: action.title,
      };
    }
    case SET_START_FROM: {
      return {
        ...state,
        startFrom: action.startFrom,
      };
    }
    case SET_FLIP_AXIS: {
      return {
        ...state,
        flipAxis: action.flipAxis,
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
