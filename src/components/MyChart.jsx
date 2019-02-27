import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getLineChartData } from '../utils/line';
import { getLineReverseChartData } from '../utils/lineReverse';

const MyChart = ({ data, dispatch }) => {
  let chartData = { options: {} };
  let datasets = {};
  if (data && data.length > 0) {
    const columnCount = data[0].length;
    const rowCount = data.length;
    if (rowCount > columnCount) {
      chartData = getLineChartData(data);
    } else {
      chartData = getLineReverseChartData(data);
    }

    datasets = { datasets: chartData.datasets };
    chartData.options.scales.xAxes[0].labels = chartData.labels;
    console.log(datasets);
    console.log(chartData.labels);
  }
  return (
    <div className="chart-container">
      <Bar data={datasets} options={chartData.options} />
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.chartData.data,
});

export default connect(mapStateToProps)(MyChart);
