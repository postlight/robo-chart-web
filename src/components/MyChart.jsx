import React from 'react';
import { connect } from 'react-redux';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';
import { Alert, Button } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import { getLineChartData } from '../charts/line';
import { getLineReverseChartData } from '../charts/lineReverse';
import { getHorizontalBarChartData } from '../charts/horizontalBar';
import { getBarChartData } from '../charts/bar';
import { getBarReverseChartData } from '../charts/barReverse';
import { getPieChartData } from '../charts/pie';
import { getPieReverseChartData } from '../charts/pieReverse';
import { setSheetId } from '../actions/sheetData';
import { setChartColors } from '../actions/chartData';

const getChartDimensions = value => {
  const width = (100 * value) / 100;
  const height = (95 * width) / 100;
  return [width, height];
};

const MyChart = ({ data, type, stacked, colors, fetchingData, dispatch }) => {
  let chartData = {};
  let datasets = {};
  if (data && data.length > 0) {
    const columnCount = data[0].length;
    const rowCount = data.length;

    let dimensions = [];
    if (window.innerWidth < 900) {
      dimensions = getChartDimensions(window.innerWidth);
    }

    let chart;
    switch (type) {
      case 'bar':
        if (rowCount > columnCount) {
          chartData = getBarChartData(data, stacked, colors);
        } else {
          chartData = getBarReverseChartData(data, stacked, colors);
        }
        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chart = <Bar data={datasets} options={chartData.options} />;
        break;
      case 'line':
        if (rowCount > columnCount) {
          chartData = getLineChartData(data, colors);
        } else {
          chartData = getLineReverseChartData(data, colors);
        }

        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chart = <Line data={datasets} options={chartData.options} />;
        break;
      case 'horizontalBar':
        chartData = getHorizontalBarChartData(data, colors);
        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chart = <HorizontalBar data={datasets} options={chartData.options} />;
        break;
      case 'pie':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data, false, colors);
        } else {
          chartData = getPieReverseChartData(data, false, colors);
        }
        chart = <Pie data={chartData.data} options={chartData.options} />;
        break;
      case 'semi-pie':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data, true, colors);
        } else {
          chartData = getPieReverseChartData(data, true, colors);
        }
        chart = <Pie data={chartData.data} options={chartData.options} />;
        break;
      case 'doughnut':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data, false, colors);
        } else {
          chartData = getPieReverseChartData(data, false, colors);
        }
        chart = <Doughnut data={chartData.data} options={chartData.options} />;
        break;
      case 'semi-doughnut':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data, true, colors);
        } else {
          chartData = getPieReverseChartData(data, true, colors);
        }
        chart = <Doughnut data={chartData.data} options={chartData.options} />;
        break;

      default:
        break;
    }

    if (colors.length !== chartData.colors.length) {
      const colorsData = {
        colors: chartData.colors,
      };
      dispatch(setChartColors(colorsData));
    }

    let style = {};
    if (dimensions.length > 0) {
      style = { width: dimensions[0], height: dimensions[1] };
    }

    return (
      <div className="in-container sheets-container shadow" style={style}>
        {chart}
      </div>
    );
  }

  return (
    <div className="sheets-container shadow">
      <Alert variant="success">
        <Alert.Heading>Hey, you wanna create some charts ?</Alert.Heading>
        <p>
          Paste your Google Spreadsheet URL in the field above, and if today is
          a good day, a chart will show up!
        </p>
        <p>
          Once a URL is provided, you will be able to change the grid, colors,
          labels, legends and other cool stuff
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() =>
              dispatch(
                setSheetId('1M-c_ImTJ3FJ-D49QMoApeusNg-Ua84qyqDnUFrkm2gg'),
              )
            }
            variant="outline-success"
          >
            Run Demo!
          </Button>
        </div>
      </Alert>
      {fetchingData ? (
        <div className="sheets-container">
          <div className="loader">
            <PulseLoader
              color="#5c646d"
              loading={fetchingData}
              className="loader"
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.chartData.data,
  colors: state.chartData.colors,
  type: state.chartData.type,
  stacked: state.chartData.stacked,
  fetchingData: state.appStatus.fetchingData,
});

export default connect(mapStateToProps)(MyChart);
