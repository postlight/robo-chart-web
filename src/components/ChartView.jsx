import React from 'react';
import { connect } from 'react-redux';
import InfoView from './InfoView';
import Chart from './Chart';

/**
 * Chart View component, displays chart if data is available; Info View otherwise
 */
const ChartView = ({ cdata, appStatus }) => {
  const { data } = cdata;

  if (
    data &&
    data.length > 0 &&
    !appStatus.fetchingData &&
    !appStatus.authError &&
    !appStatus.error
  ) {
    return <Chart />;
  }

  return <InfoView />;
};

const mapStateToProps = state => ({
  cdata: state.chartData,
  appStatus: state.appStatus,
});

export default connect(mapStateToProps)(ChartView);
