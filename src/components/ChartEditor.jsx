import React from 'react';
import { connect } from 'react-redux';
import { Tab, Row, Col, Nav, Sonnet } from 'react-bootstrap';
import SheetPicker from './SheetPicker';

const ChartEditor = ({ chartData, dispatch }) => {
  console.log(chartData);
  return (
    <React.Fragment>
      <SheetPicker />
      <div className="sheets-container in-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Cols & Rows</Nav.Link>
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
                    {chartData.start} {chartData.end}
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
