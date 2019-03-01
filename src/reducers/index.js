import { combineReducers } from 'redux';
import chartData from './chartData';
import sheetData from './sheetData';
import appStatus from './appStatus';

export default combineReducers({
  chartData,
  sheetData,
  appStatus,
});
