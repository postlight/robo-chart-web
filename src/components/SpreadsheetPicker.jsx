import React from 'react';
import { connect } from 'react-redux';
import { Form, FormControl } from 'react-bootstrap';
import { setSheetId } from '../actions/sheetData';

function validate(url, dispatch) {
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/gi;
  const matches = url.match(regex);
  if (matches && matches.length > 0) {
    const parts = matches[0].split('/');
    const sheetId = parts[parts.length - 1];
    dispatch(setSheetId(sheetId));
  }
}

const SpreadsheetPicker = ({ sheetData, dispatch }) => (
  <div className="sdcontainer">
    <div className="input-group input-group-lg">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-lg">
          Spreadsheet
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="https://docs.google.com/spreadsheets/d/1c_ImTJ3FJ-D49QMoApeqsNg-Ua84qyqDnUFrkm2gg/edit#gid=0"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        onChange={evt => validate(evt.target.value, dispatch)}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  sheetData: state.sheetData,
});

export default connect(mapStateToProps)(SpreadsheetPicker);
