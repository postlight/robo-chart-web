import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API, TOKEN } from '../constants';
import ChartEditor from '../components/ChartEditor';
import { setSheetData, setActiveSheet } from '../actions/sheetData';
import { setChartData } from '../actions/chartData';
import SpreadsheetPicker from '../components/SpreadsheetPicker';
import MyChart from '../components/MyChart';

class Home extends Component {
  componentDidMount() {
    this.runQuery();
  }

  componentWillReceiveProps(nextProps) {
    const { sheetId, activeSheet } = this.props;
    const { sheetId: nextSheetId, activeSheet: nextActiveSheet } = nextProps;
    if (sheetId !== nextSheetId || activeSheet !== nextActiveSheet) {
      this.props = nextProps;
      this.runQuery();
    }
  }

  runQuery() {
    const { sheetId, data } = this.props;
    if (sheetId && sheetId.length > 5) {
      let url = `${API}${sheetId}${TOKEN}`;
      if (data.activeSheet.length > 0) {
        url = `${API}${sheetId}/values/${data.activeSheet}${TOKEN}`;
      }
      // eslint-disable-next-line no-console
      console.log(`RQ: Home ${url}`);

      axios.get(url).then(res => {
        this.process(res);
      });
    }
  }

  process(res) {
    const { dispatch } = this.props;

    if (res.data && res.data.sheets) {
      dispatch(setSheetData(res.data));
      if (res.data.sheets.length > 0) {
        const sheetTitle = res.data.sheets[0].properties.title;
        dispatch(setActiveSheet(sheetTitle));
      }
    }

    if (res.data && res.data.values) {
      dispatch(setChartData(res.data.values));
    }
  }

  render() {
    const { data } = this.props;
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
});

export default connect(mapStateToProps)(Home);
