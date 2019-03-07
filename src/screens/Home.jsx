import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API, TOKEN } from '../constants';
import ChartEditor from '../components/ChartEditor';
import { setSheetData } from '../actions/sheetData';
import { setFetchingData } from '../actions/appStatus';
import { setChartData } from '../actions/chartData';
import SpreadsheetPicker from '../components/SpreadsheetPicker';
import MyChart from '../components/MyChart';
import { processSpreadsheet } from '../utils/processSpreadsheet';

class Home extends Component {
  componentDidMount() {
    this.runQuery();
  }

  componentWillReceiveProps(nextProps) {
    const { sheetId, activeSheet, start, end } = this.props;
    const {
      sheetId: nextSheetId,
      activeSheet: nextActiveSheet,
      start: nextStart,
      end: nextEnd,
    } = nextProps;
    if (
      sheetId !== nextSheetId ||
      activeSheet !== nextActiveSheet ||
      start !== nextStart ||
      end !== nextEnd
    ) {
      this.props = nextProps;
      this.runQuery();
    }
  }

  runQuery() {
    const { sheetId, data, dispatch } = this.props;
    if (sheetId && sheetId.length > 5) {
      let url = `${API}${sheetId}${TOKEN}`;
      if (data.activeSheet.length > 0) {
        url = `${API}${sheetId}/values/${data.activeSheet}${TOKEN}`;
      }
      if (data.start.length > 0 && data.end.length > 0) {
        const grid = `!${data.start}:${data.end}`;
        url = `${API}${sheetId}/values/${data.activeSheet}${grid}${TOKEN}`;
      }
      // eslint-disable-next-line no-console
      console.log(`RQ: Home ${url}`);

      dispatch(setFetchingData(true));
      axios
        .get(url)
        .then(res => {
          dispatch(setFetchingData(false));
          this.process(res);
        })
        .catch(error => {
          dispatch(setFetchingData(false));
        });
    }
  }

  process(res) {
    const { dispatch } = this.props;

    if (res.data && res.data.sheets) {
      dispatch(setSheetData(res.data));
    }

    if (res.data && res.data.values) {
      let processedData = processSpreadsheet(res.data.values);
      let done = false;
      while (processedData && processedData.data.length > 0 && !done) {
        const tempProcessedData = processSpreadsheet(
          res.data.values,
          processedData.startr + 1,
          processedData.startc + 1,
        );
        if (
          tempProcessedData &&
          tempProcessedData.data.length > processedData.data.length
        ) {
          processedData = tempProcessedData;
        } else {
          done = true;
        }
      }

      dispatch(setChartData(processedData));
    }
  }

  render() {
    return (
      <React.Fragment>
        <SpreadsheetPicker />
        <MyChart />
        <ChartEditor />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sheetId: state.sheetData.sheetId,
  data: state.sheetData,
  activeSheet: state.sheetData.activeSheet,
  start: state.sheetData.start,
  end: state.sheetData.end,
});

export default connect(mapStateToProps)(Home);
