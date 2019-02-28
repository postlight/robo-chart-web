import React from 'react';
import { connect } from 'react-redux';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import SheetPicker from './SheetPicker';
import { setStartAndEnd } from '../actions/sheetData';

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
      <div className="sheets-container in-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Grid</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="type">Type</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="colors">Colors</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
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
                </Tab.Pane>
                <Tab.Pane eventKey="type">
                  <div>Hello world</div>
                </Tab.Pane>
                <Tab.Pane eventKey="colors">
                  <div>Hello world</div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  chartData: state.chartData,
});

export default connect(mapStateToProps)(ChartEditor);
