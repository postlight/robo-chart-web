export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_CHART_TYPE = 'SET_CHART_TYPE';
export const SET_CHART_COLORS = 'SET_CHART_COLORS';
export const SET_ACTIVE_COLOR = ' SET_ACTIVE_COLOR';
export const SET_CHART_TITLE = 'SET_CHART_TITLE';
export const SET_START_FROM = 'SET_START_FROM';
export const SET_FLIP_AXIS = 'SET_FLIP_AXIS';

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

export function setChartTitle(title) {
  return { type: SET_CHART_TITLE, title };
}

export function setStartFrom(startFrom) {
  return { type: SET_START_FROM, startFrom };
}

export function setFlipAxis(flipAxis) {
  return { type: SET_FLIP_AXIS, flipAxis };
}
