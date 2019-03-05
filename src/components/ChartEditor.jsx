import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import SheetPicker from './SheetPicker';
import { setStartAndEnd } from '../actions/sheetData';
import { setChartType } from '../actions/chartData';

let start = '';
let end = '';

function updateStart(val) {
  start = val.toUpperCase();
}

function updateEnd(val) {
  end = val.toUpperCase();
}

function reload(dispatch) {
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
}

const ChartEditor = ({ chartData, dispatch }) => {
  if (chartData.data.length === 0) {
    return '';
  }

  return (
    <React.Fragment>
      <SheetPicker />
      <div className="sheets-container ">
        <Card bg="light">
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
      </div>

      <div className="sheets-container ">
        <Card bg="light">
          <Card.Header>Grid</Card.Header>
          <Card.Body>
            <div>
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

              <Button
                variant="outline-secondary"
                onClick={() => reload(dispatch)}
              >
                Reload
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  chartData: state.chartData,
});

export default connect(mapStateToProps)(ChartEditor);
