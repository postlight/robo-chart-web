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
} from '../actions/chartData';

let start = '';
let end = '';
let activeInputIndex = -1;

const ChartEditor = ({ chartData, dispatch }) => {
  if (chartData.data.length === 0) {
    return '';
  }

  const isHex = hex => {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  };

  const handleColorFocus = (color, index) => {
    activeInputIndex = index;
    if (isHex(color)) {
      dispatch(setActiveColor(color));
    }
  };

  const updateStart = val => {
    start = val.toUpperCase();
  };

  const updateEnd = val => {
    end = val.toUpperCase();
  };

  const handleColorChange = color => {
    let hex = color;
    if (color && color.hex) {
      hex = color.hex;
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

  const colorPickers = [];
  chartData.colors.forEach((color, index) => {
    colorPickers.push(
      <div key={color} className="input-group grid-coord color-input">
        <div className="input-group-prepend">
          <span className="input-group-text">Color {index + 1}</span>
        </div>
        <input
          type="text"
          className="form-control"
          defaultValue={color}
          onFocus={evt => handleColorFocus(evt.target.value, index, dispatch)}
          onChange={evt => handleColorChange(evt.target.value, dispatch)}
        />
      </div>,
    );
  });

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
            Reload
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

      <Card bg="light" className="sheets-container">
        <Card.Header>Options</Card.Header>
        <Card.Body>
          <Button variant="outline-secondary" onClick={() => reload(dispatch)}>
            Reload
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  chartData: state.chartData,
});

export default connect(mapStateToProps)(ChartEditor);
