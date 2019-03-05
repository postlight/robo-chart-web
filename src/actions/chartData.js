export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_CHART_TYPE = 'SET_CHART_TYPE';
export const SET_CHART_COLORS = 'SET_CHART_COLORS';
export const SET_ACTIVE_COLOR = ' SET_ACTIVE_COLOR';

export function setChartData(data) {
  return { type: SET_CHART_DATA, data };
}

export function setChartColors(data) {
  return { type: SET_CHART_COLORS, data };
}

export function setActiveColor(color) {
  return { type: SET_ACTIVE_COLOR, color };
}

export function setChartType(chartType) {
  return { type: SET_CHART_TYPE, chartType };
}
