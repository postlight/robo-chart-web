import { combineReducers } from 'redux';
import chartData from './chartData';
import sheetData from './sheetData';

export default combineReducers({
  chartData,
  sheetData,
});
