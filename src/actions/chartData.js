/**
 * Chart data redux actions
 */

export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_CHART_TYPE = 'SET_CHART_TYPE';
export const SET_CHART_COLORS = 'SET_CHART_COLORS';
export const SET_ACTIVE_COLOR = ' SET_ACTIVE_COLOR';
export const SET_CHART_TITLE = 'SET_CHART_TITLE';
export const SET_SUFFIX = 'SET_SUFFIX';
export const SET_PREFIX = 'SET_PREFIX';
export const SET_START_FROM = 'SET_START_FROM';
export const SET_FLIP_AXIS = 'SET_FLIP_AXIS';
export const RESET_CHART_DATA = 'RESET_CHART_DATA';

/**
 * Set processed chart data
 * @param {object} data
 */
export function setChartData(data) {
  return { type: SET_CHART_DATA, data };
}

/**
 * Reset chart data, example: while changing active sheet
 * @param {object} data
 */
export function resetChartData() {
  return { type: RESET_CHART_DATA };
}

/**
 * Set chart colors, includes an array of colors
 * @param {object} data
 */
export function setChartColors(data) {
  return { type: SET_CHART_COLORS, data };
}

/**
 * Set active color (color currently being edited)
 * @param {string} color
 */
export function setActiveColor(color) {
  return { type: SET_ACTIVE_COLOR, color };
}

/**
 * Set chart type, one of:
 * line
 * bar
 * horizontalBar
 * stacked
 * pie
 * semi-pie
 * doughnut
 * semi-doughnut
 * @param {string} chartType
 */
export function setChartType(chartType) {
  return { type: SET_CHART_TYPE, chartType };
}

/**
 * Set chart title
 * @param {string} title
 */
export function setChartTitle(title) {
  return { type: SET_CHART_TITLE, title };
}

/**
 * Set values labels suffix
 * @param {string} suffix
 */
export function setSuffix(suffix) {
  return { type: SET_SUFFIX, suffix };
}

/**
 * Set values labels prefix
 * @param {string} prefix
 */
export function setPrefix(prefix) {
  return { type: SET_PREFIX, prefix };
}

/**
 * Set start from for the values axis.
 * example: if minimum value is 10000, user might choose to start the Y Axis from 9000 instead of 0
 * @param {number} startFrom
 */
export function setStartFrom(startFrom) {
  return { type: SET_START_FROM, startFrom };
}

/**
 * Flip axis, process the sheet's columns as rows and vice versa
 * @param {string} flipAxis
 */
export function setFlipAxis(flipAxis) {
  return { type: SET_FLIP_AXIS, flipAxis };
}
