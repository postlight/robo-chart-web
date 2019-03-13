import React from 'react';
import { connect } from 'react-redux';
import { setSheetId, resetSheetData } from '../actions/sheetData';

/**
 * Spreadsheet Picker, an input field that triggers data fetching from Google sheets once it has valid URL
 */
const SpreadsheetPicker = ({ dispatch }) => {
  /**
   * Google sheets URL validator, if successful, fetch data and plot chart
   *
   * @param {string} url spreadsheet url
   */
  const validateAndExecute = url => {
    const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/gi;
    const matches = url.match(regex);
    if (matches && matches.length > 0) {
      const parts = matches[0].split('/');
      const sheetId = parts[parts.length - 1];

      dispatch(resetSheetData());
      dispatch(setSheetId(sheetId));
    }
  };

  return (
    <div className="sheets-container input-group input-group-lg">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-lg">
          Spreadsheet
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxx/edit#gid=0"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        onChange={evt => validateAndExecute(evt.target.value, dispatch)}
        onKeyPress={evt => validateAndExecute(evt.target.value, dispatch)}
      />
    </div>
  );
};

export default connect(null)(SpreadsheetPicker);
