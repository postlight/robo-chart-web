import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Alert, Button } from 'react-bootstrap';
import { RotateLoader } from 'react-spinners';
import { getLineChartData } from '../utils/line';
import { getLineReverseChartData } from '../utils/lineReverse';
import { setSheetId } from '../actions/sheetData';

const MyChart = ({ data, fetchingData, dispatch }) => {
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
    return (
      <div className="in-container sheets-container shadow">
        <Bar data={datasets} options={chartData.options} />
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
  fetchingData: state.appStatus.fetchingData,
});

export default connect(mapStateToProps)(MyChart);
