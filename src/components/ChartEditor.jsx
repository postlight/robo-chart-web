import React from 'react';
import { connect } from 'react-redux';
import { setActiveSheet } from '../actions/sheetData';
import SheetPicker from './SheetPicker';

const ChartEditor = ({ sheetData, dispatch }) => {
  return <SheetPicker />;
};

const mapStateToProps = state => ({
  sheetData: state.sheetData,
});

export default connect(mapStateToProps)(ChartEditor);
