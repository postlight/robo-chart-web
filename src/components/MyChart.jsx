import React from 'react';
import { connect } from 'react-redux';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';
import { Alert, Button } from 'react-bootstrap';
import { RotateLoader } from 'react-spinners';
import { getLineChartData } from '../charts/line';
import { getLineReverseChartData } from '../charts/lineReverse';
import { getHorizontalBarChartData } from '../charts/horizontalBar';
import { getBarChartData } from '../charts/bar';
import { getBarReverseChartData } from '../charts/barReverse';
import { getPieChartData } from '../charts/pie';
import { getPieReverseChartData } from '../charts/pieReverse';
import { setSheetId } from '../actions/sheetData';

const MyChart = ({ data, type, stacked, fetchingData, dispatch }) => {
  let chartData = {};
  let datasets = {};
  if (data && data.length > 0) {
    const columnCount = data[0].length;
    const rowCount = data.length;

    let chart;
    switch (type) {
      case 'bar':
        if (rowCount > columnCount) {
          chartData = getBarChartData(data, stacked);
        } else {
          chartData = getBarReverseChartData(data, stacked);
        }
        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chart = <Bar data={datasets} options={chartData.options} />;
        break;
      case 'line':
        if (rowCount > columnCount) {
          chartData = getLineChartData(data);
        } else {
          chartData = getLineReverseChartData(data);
        }

        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chart = <Line data={datasets} options={chartData.options} />;
        break;
      case 'horizontalBar':
        chartData = getHorizontalBarChartData(data);
        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chart = <HorizontalBar data={datasets} options={chartData.options} />;
        break;
      case 'pie':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data);
        } else {
          chartData = getPieReverseChartData(data);
        }
        chart = <Pie data={chartData.data} options={chartData.options} />;
        break;
      case 'semi-pie':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data, true);
        } else {
          chartData = getPieReverseChartData(data, true);
        }
        chart = <Pie data={chartData.data} options={chartData.options} />;
        break;
      case 'doughnut':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data);
        } else {
          chartData = getPieReverseChartData(data);
        }
        chart = <Doughnut data={chartData.data} options={chartData.options} />;
        break;
      case 'semi-doughnut':
        if (rowCount > columnCount) {
          chartData = getPieChartData(data, true);
        } else {
          chartData = getPieReverseChartData(data, true);
        }
        chart = <Doughnut data={chartData.data} options={chartData.options} />;
        break;

      default:
        break;
    }

    return <div className="in-container sheets-container shadow">{chart}</div>;
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
            <RotateLoader
              color="#aaeeaa"
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
  type: state.chartData.type,
  stacked: state.chartData.stacked,
  fetchingData: state.appStatus.fetchingData,
});

export default connect(mapStateToProps)(MyChart);
