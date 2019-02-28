import React from 'react';
import { connect } from 'react-redux';
import { setActiveSheet } from '../actions/sheetData';

const SheetPicker = ({ sheetData, activeSheet, dispatch }) => {
  const availableSheets = [];
  if (sheetData && sheetData.sheets) {
    sheetData.sheets.sheets.forEach(sheet => {
      let classname = 'btn btn-secondary';
      if (activeSheet === sheet.properties.title) {
        classname += ' active';
      }
      availableSheets.push(
        <label key={sheet.properties.title} className={classname}>
          <input
            type="radio"
            name="sheets"
            id={sheet.properties.title}
            autoComplete="off"
            onClick={() => dispatch(setActiveSheet(sheet.properties.title))}
          />
          {sheet.properties.title}
        </label>,
      );
    });
  }
  if (availableSheets && availableSheets.length > 0) {
    return (
      <div className="sheets-container">
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          {availableSheets}
        </div>
      </div>
    );
  }
  return '';
};

const mapStateToProps = state => ({
  sheetData: state.sheetData,
  activeSheet: state.sheetData.activeSheet,
});

export default connect(mapStateToProps)(SheetPicker);
