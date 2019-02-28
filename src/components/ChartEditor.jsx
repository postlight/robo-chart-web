import React from 'react';
import { connect } from 'react-redux';
import SheetPicker from './SheetPicker';

const ChartEditor = ({ sheetData, dispatch }) => {
  return (
    <React.Fragment>
      <SheetPicker />
      <div className="card sheets-container">
        <h5 className="card-header">Chart Editor</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  sheetData: state.sheetData,
});

export default connect(mapStateToProps)(ChartEditor);
