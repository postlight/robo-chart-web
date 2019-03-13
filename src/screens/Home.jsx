import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      let url = `${REACT_APP_API}${sheetId}?key=${REACT_APP_TOKEN}`;
      if (data.activeSheet.length > 0) {
        url = `${REACT_APP_API}${sheetId}/values/${
          data.activeSheet
        }?key=${REACT_APP_TOKEN}`;
      }
      if (data.start.length > 0 && data.end.length > 0) {
        const grid = `!${data.start}:${data.end}`;
        url = `${REACT_APP_API}${sheetId}/values/${
          data.activeSheet
        }${grid}?key=${REACT_APP_TOKEN}`;
      }

      dispatch(setFetchingData(true));

      fetch(url)
        .then(res => {
          dispatch(setFetchingData(false));
          if (res.status !== 200) {
            dispatch(setSheetId(''));
            if (res.status === 403) {
              dispatch(setAuthError(true));
            } else {
              dispatch(setError(true));
            }
          } else {
            res.json().then(response => {
              this.process(response);
            });
          }
        })
        .catch(() => {
          dispatch(setSheetId(''));
          dispatch(setError(true));
          dispatch(setFetchingData(false));
        });
    }
  }

  /**
   * Process fetched data, try to find best data to plot
   * @param {object} res query result
   */
  process(res) {
    const { dispatch } = this.props;

    if (res && res.sheets) {
      dispatch(setSheetData(res));
    }

    if (res && res.values) {
      let processedData = processSpreadsheet(res.values);
      let done = false;
      while (processedData && processedData.data.length > 0 && !done) {
        const tempProcessedData = processSpreadsheet(
          res.values,
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
