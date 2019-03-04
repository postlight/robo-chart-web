export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_CHART_TYPE = 'SET_CHART_TYPE';

export function setChartData(data) {
  return { type: SET_CHART_DATA, data };
}

export function setChartType(chartType) {
  return { type: SET_CHART_TYPE, chartType };
}
