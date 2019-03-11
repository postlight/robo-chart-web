import React from 'react';
import { connect } from 'react-redux';
import { setActiveSheet } from '../actions/sheetData';
import { resetChartData } from '../actions/chartData';

/**
 * A radio button Sheet Picker having all available sheets
 */
const SheetPicker = ({ sheetData, activeSheet, dispatch }) => {
  const activateSheet = val => {
    dispatch(resetChartData());
    dispatch(setActiveSheet(val));
  };

  const availableSheets = [];
  if (sheetData && sheetData.sheets) {
    sheetData.sheets.sheets.forEach(sheet => {
      let classname = 'btn btn-secondary';
      if (activeSheet === sheet.properties.title) {
        classname += ' active';
      }
      availableSheets.push(
        <label
          htmlFor={sheet.properties.title}
          key={sheet.properties.title}
          className={classname}
        >
          <input
            type="radio"
            name="sheets"
            id={sheet.properties.title}
            autoComplete="off"
            onClick={() => activateSheet(sheet.properties.title)}
          />
          {sheet.properties.title}
        </label>,
      );
    });
  }
  if (availableSheets && availableSheets.length > 0) {
    return (
      <div className="sheets-container sheet-picker">
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
