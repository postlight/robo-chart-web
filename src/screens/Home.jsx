import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChartEditor from '../components/ChartEditor';
import { setSheetData, setSheetId } from '../actions/sheetData';
import { setFetchingData, setAuthError, setError } from '../actions/appStatus';
import { setChartData } from '../actions/chartData';
import SpreadsheetPicker from '../components/SpreadsheetPicker';
import ChartView from '../components/ChartView';
import processSpreadsheet from '../utils/processSpreadsheet';

/**
 * Main screen
 */
class Home extends Component {
  /**
   * Query Google sheets once the component mounts
   */
  componentDidMount() {
    this.runQuery();
  }

  /**
   * Check if app should run a new query on componentWillReceiveProps
   */
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

  /**
   * Compose and run query using app state
   */
  runQuery() {
    const { sheetId, data, dispatch } = this.props;
    const { REACT_APP_TOKEN, REACT_APP_API } = process.env;
    if (sheetId && sheetId.length > 5) {
      let url = `${REACT_APP_API}${sheetId}${REACT_APP_TOKEN}`;
      if (data.activeSheet.length > 0) {
        url = `${REACT_APP_API}${sheetId}/values/${
          data.activeSheet
        }${REACT_APP_TOKEN}`;
      }
      if (data.start.length > 0 && data.end.length > 0) {
        const grid = `!${data.start}:${data.end}`;
        url = `${REACT_APP_API}${sheetId}/values/${
          data.activeSheet
        }${grid}${REACT_APP_TOKEN}`;
      }

      dispatch(setFetchingData(true));
      axios
        .get(url)
        .then(res => {
          dispatch(setFetchingData(false));
          this.process(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            dispatch(setAuthError(true));
          } else {
            dispatch(setError(true));
          }
          dispatch(setSheetId(''));
        });
    }
  }

  /**
   * Process fetched data, try to find best data to plot
   * @param {object} res query result
   */
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
        <ChartView />
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
