import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { cloneDeep } from 'lodash';
import SheetPicker from './SheetPicker';
import { setStartAndEnd } from '../actions/sheetData';
import {
  setChartType,
  setActiveColor,
  setChartColors,
  setStartFrom,
  setChartTitle,
  setFlipAxis,
} from '../actions/chartData';

let start = '';
let end = '';
let activeInputIndex = -1;
let gtitle = '';
let gstartFrom;

/**
 * Chart editor component
 */
const ChartEditor = ({ chartData, activeSheet, dispatch }) => {
  if (chartData.data.length === 0 || activeSheet === '') {
    return '';
  }

  /**
   * Check if string is a hexadecimal color
   * example of accepted values: #f0f #f1f1f1
   *
   * @param {string} hex
   */
  const isHex = hex => {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  };

  /**
   * Set start from for the values axis.
   * example: if minimum value is 10000, user might choose to start the Y Axis from 9000 instead of 0
   * Handles both dispatch and updating the attribute
   *
   * @param {number} val
   */
  const updateAxisStartFrom = val => {
    if (!val) {
      if (!Number.isNaN(gstartFrom)) {
        dispatch(setStartFrom(gstartFrom));
      }
    } else {
      gstartFrom = val;
    }
  };

  /**
   * Update chart title
   * Handles both dispatch and updating the attribute
   *
   * @param {string} val
   */
  const updateTitle = val => {
    if (!val) {
      dispatch(setChartTitle(gtitle));
    } else {
      gtitle = val;
    }
  };

  /**
   * Flip axis, rows and cols
   */
  const flipAxis = () => {
    dispatch(setFlipAxis(!chartData.flipAxis));
  };

  /**
   * Change active color
   *
   * @param {string} color
   * @param {number} index
   */
  const handleColorFocus = (color, index) => {
    activeInputIndex = index;
    if (isHex(color)) {
      dispatch(setActiveColor(color));
    }
  };

  /**
   * Update sheet start cell, e.g.: A5
   *
   * @param {string} val
   */
  const updateStart = val => {
    start = val.toUpperCase();
  };

  /**
   * Update sheet end cell, e.g.: E15
   *
   * @param {string} val
   */
  const updateEnd = val => {
    end = val.toUpperCase();
  };

  /**
   * Handle color change
   * Used for both manual input field and color picker
   *
   * @param {string} color
   */
  const handleColorChange = color => {
    let hex = color;
    if (color && color.hex) {
      ({ hex } = color);
    }
    if (isHex(hex) && activeInputIndex > -1) {
      const colors = cloneDeep(chartData.colors);
      colors[activeInputIndex] = hex;
      const data = {
        color: hex,
        colors,
      };
      dispatch(setChartColors(data));
    }
  };

  /**
   * Change start and end cells
   */
  const reload = () => {
    const regex = /([a-zA-Z0-9]+)/gi;
    const startmatches = start.match(regex);
    const endmatches = end.match(regex);
    if (startmatches && endmatches) {
      const data = {
        start,
        end,
      };
      dispatch(setStartAndEnd(data));
    }
  };

  // Generate enough color fields for available datasets
  const colorPickers = [];
  let max = chartData.data.length;
  chartData.data.forEach(dataset => {
    if (dataset.length > max) {
      max = dataset.length;
    }
  });
  for (let i = 0; i < max; i += 1) {
    const color = chartData.colors[i];
    const style = { background: color };
    colorPickers.push(
      <div key={color} className="input-group grid-coord color-input">
        <div className="input-group-prepend">
          <span className="input-group-text" style={style} />
        </div>
        <input
          type="text"
          className="form-control"
          defaultValue={color}
          onFocus={evt => handleColorFocus(evt.target.value, i, dispatch)}
          onChange={evt => handleColorChange(evt.target.value, dispatch)}
        />
      </div>,
    );
  }

  // set chart title to sheet title, unless user provided a title
  let title = activeSheet;
  if (chartData.title && chartData.title.length > 0) {
    ({ title } = chartData);
  }

  return (
    <React.Fragment>
      <SheetPicker />
      <Card bg="light" className="sheets-container">
        <Card.Header>Chart Type</Card.Header>
        <Card.Body>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('line'))}
          >
            Line
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('bar'))}
          >
            Bar
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('horizontalBar'))}
          >
            Horizontal Bar
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('stacked'))}
          >
            Stacked
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('pie'))}
          >
            Pie
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('semi-pie'))}
          >
            Semi Pie
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('doughnut'))}
          >
            Doughnut
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(setChartType('semi-doughnut'))}
          >
            Semi Doughnot
          </Button>
        </Card.Body>
      </Card>

      <Card bg="light" className="sheets-container">
        <Card.Header>Options</Card.Header>
        <Card.Body className="chart-editor">
          <div className="input-group start-from">
            <div className="input-group-prepend">
              <span className="input-group-text">Start From</span>
            </div>
            <input
              type="text"
              key={chartData.startFrom}
              className="form-control"
              placeholder=""
              defaultValue={chartData.startFrom}
              onChange={evt => updateAxisStartFrom(evt.target.value)}
            />
            <Button
              variant="outline-secondary"
              className="apply-button"
              onClick={() => updateAxisStartFrom()}
            >
              Apply
            </Button>
          </div>

          <Card.Subtitle className="mb-2 text-muted apply-subtitle">
            Start from {chartData.startFrom} while displaying values{' '}
            {chartData.startFrom !== 0 && ', default: 0'}
          </Card.Subtitle>

          <hr />

          <Button variant="outline-secondary" onClick={() => flipAxis()}>
            Flip Rows & Cols
          </Button>
          <Card.Subtitle className="mb-2 text-muted">
            Rows become Cols and Cols become Rows, all is one.
          </Card.Subtitle>

          <hr />

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Chart Title</span>
            </div>
            <input
              type="text"
              key={title}
              className="form-control"
              placeholder=""
              defaultValue={title}
              onChange={evt => updateTitle(evt.target.value)}
            />
            <Button
              variant="outline-secondary"
              className="apply-button"
              onClick={() => updateTitle()}
            >
              Apply
            </Button>
          </div>
          <Card.Subtitle className="mb-2 text-muted apply-subtitle">
            Change the title above the chart
          </Card.Subtitle>
        </Card.Body>
      </Card>

      <Card bg="light" className="sheets-container">
        <Card.Header>Grid</Card.Header>
        <Card.Body>
          <div className="input-group grid-coord">
            <div className="input-group-prepend">
              <span className="input-group-text">From</span>
            </div>
            <input
              type="text"
              key={chartData.start}
              className="form-control"
              placeholder=""
              defaultValue={chartData.start}
              onChange={evt => updateStart(evt.target.value)}
            />
          </div>

          <div className="input-group grid-coord">
            <div className="input-group-prepend">
              <span className="input-group-text">To</span>
            </div>
            <input
              type="text"
              key={chartData.end}
              className="form-control"
              placeholder=""
              defaultValue={chartData.end}
              onChange={evt => updateEnd(evt.target.value)}
            />
          </div>

          <Button variant="outline-secondary" onClick={() => reload(dispatch)}>
            Apply
          </Button>
        </Card.Body>
      </Card>

      <Card bg="light" className="sheets-container">
        <Card.Header>Colors</Card.Header>
        <Card.Body>
          <SketchPicker color={chartData.color} onChange={handleColorChange} />
          {colorPickers}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  chartData: state.chartData,
  activeSheet: state.sheetData.activeSheet,
});

export default connect(mapStateToProps)(ChartEditor);
