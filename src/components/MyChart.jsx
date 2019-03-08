import React from 'react';
import { connect } from 'react-redux';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';
import { Alert, Button } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import domtoimage from 'dom-to-image';
import { getLineChartData } from '../charts/line';
import { getLineReverseChartData } from '../charts/lineReverse';
import { getHorizontalBarChartData } from '../charts/horizontalBar';
import { getHorizontalBarReverseChartData } from '../charts/horizontalBarReverse';
import { getBarChartData } from '../charts/bar';
import { getBarReverseChartData } from '../charts/barReverse';
import { getPieChartData } from '../charts/pie';
import { getPieReverseChartData } from '../charts/pieReverse';
import { setSheetId } from '../actions/sheetData';
import { DEMO_SHEETID } from '../constants';

const getChartDimensions = value => {
  const width = (100 * value) / 100;
  const height = (95 * width) / 100;
  return [width, height];
};

const MyChart = ({ cdata, activeSheet, appStatus, dispatch }) => {
  const saveImagePng = () => {
    domtoimage
      .toPng(document.getElementsByClassName('chartjs-render-monitor')[0])
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-chart.png';
        link.href = dataUrl;
        link.click();
      });
  };

  const { startFrom, title, flipAxis, type, colors, stacked, data } = cdata;

  let chartData = {};
  let datasets = {};
  if (data && data.length > 0) {
    const columnCount = data[0].length;
    const rowCount = data.length;

    let dimensions = [];
    let maintainAspectRatio = true;
    if (window.innerWidth < 900) {
      maintainAspectRatio = false;
      dimensions = getChartDimensions(window.innerWidth);
    }

    let chartTitle = activeSheet;
    if (title && title.length > 0) {
      chartTitle = title;
    }

    const chartKey = `${type} ${chartTitle} ${startFrom} ${flipAxis} ${stacked}`;
    let chart;
    switch (type) {
      case 'line':
        if (rowCount > columnCount) {
          if (flipAxis) {
            chartData = getLineReverseChartData(data, colors);
          } else {
            chartData = getLineChartData(data, colors);
          }
        } else if (flipAxis) {
          chartData = getLineChartData(data, colors);
        } else {
          chartData = getLineReverseChartData(data, colors);
        }

        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        if (startFrom !== 0) {
          chartData.options.scales.xAxes[0].ticks.beginAtZero = false;
          chartData.options.scales.yAxes[0].ticks.beginAtZero = false;
          chartData.options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
          chartData.options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
        } else {
          chartData.options.scales.xAxes[0].ticks = { beginAtZero: true };
          chartData.options.scales.yAxes[0].ticks = { beginAtZero: true };
        }
        chart = (
          <Line key={chartKey} data={datasets} options={chartData.options} />
        );
        break;
      case 'bar':
        if (rowCount > columnCount) {
          if (flipAxis) {
            chartData = getBarReverseChartData(data, stacked, colors);
          } else {
            chartData = getBarChartData(data, stacked, colors);
          }
        } else if (flipAxis) {
          chartData = getBarChartData(data, stacked, colors);
        } else {
          chartData = getBarReverseChartData(data, stacked, colors);
        }
        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        if (startFrom !== 0) {
          chartData.options.scales.xAxes[0].ticks.beginAtZero = false;
          chartData.options.scales.yAxes[0].ticks.beginAtZero = false;
          chartData.options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
          chartData.options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
        } else {
          chartData.options.scales.xAxes[0].ticks = { beginAtZero: true };
          chartData.options.scales.yAxes[0].ticks = { beginAtZero: true };
        }
        chart = (
          <Bar key={chartKey} data={datasets} options={chartData.options} />
        );
        break;
      case 'horizontalBar':
        if (rowCount > columnCount) {
          if (flipAxis) {
            chartData = getHorizontalBarReverseChartData(data, stacked, colors);
          } else {
            chartData = getHorizontalBarChartData(data, stacked, colors);
          }
        } else if (flipAxis) {
          chartData = getHorizontalBarChartData(data, stacked, colors);
        } else {
          chartData = getHorizontalBarReverseChartData(data, stacked, colors);
        }
        datasets = { datasets: chartData.datasets, labels: chartData.labels };
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        if (startFrom !== 0) {
          chartData.options.scales.xAxes[0].ticks.beginAtZero = false;
          chartData.options.scales.yAxes[0].ticks.beginAtZero = false;
          chartData.options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
          chartData.options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
        } else {
          chartData.options.scales.xAxes[0].ticks = { beginAtZero: true };
          chartData.options.scales.yAxes[0].ticks = { beginAtZero: true };
        }
        chart = (
          <HorizontalBar
            key={chartKey}
            data={datasets}
            options={chartData.options}
          />
        );
        break;
      case 'pie':
        if (rowCount > columnCount) {
          if (!flipAxis) {
            chartData = getPieChartData(data, false, colors);
          } else {
            chartData = getPieReverseChartData(data, false, colors);
          }
        } else if (!flipAxis) {
          chartData = getPieReverseChartData(data, false, colors);
        } else {
          chartData = getPieChartData(data, false, colors);
        }
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        chart = (
          <Pie
            key={chartKey}
            data={chartData.data}
            options={chartData.options}
          />
        );
        break;
      case 'semi-pie':
        if (rowCount > columnCount) {
          if (!flipAxis) {
            chartData = getPieChartData(data, true, colors);
          } else {
            chartData = getPieReverseChartData(data, true, colors);
          }
        } else if (!flipAxis) {
          chartData = getPieReverseChartData(data, true, colors);
        } else {
          chartData = getPieChartData(data, true, colors);
        }
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        chart = (
          <Pie
            key={chartKey}
            data={chartData.data}
            options={chartData.options}
          />
        );
        break;
      case 'doughnut':
        if (rowCount > columnCount) {
          if (!flipAxis) {
            chartData = getPieChartData(data, false, colors);
          } else {
            chartData = getPieReverseChartData(data, false, colors);
          }
        } else if (!flipAxis) {
          chartData = getPieReverseChartData(data, false, colors);
        } else {
          chartData = getPieChartData(data, false, colors);
        }
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        chart = (
          <Doughnut
            key={chartKey}
            data={chartData.data}
            options={chartData.options}
          />
        );
        break;
      case 'semi-doughnut':
        if (rowCount > columnCount) {
          if (!flipAxis) {
            chartData = getPieChartData(data, true, colors);
          } else {
            chartData = getPieReverseChartData(data, true, colors);
          }
        } else if (!flipAxis) {
          chartData = getPieReverseChartData(data, true, colors);
        } else {
          chartData = getPieChartData(data, true, colors);
        }
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = chartTitle;
        chart = (
          <Doughnut
            key={chartKey}
            data={chartData.data}
            options={chartData.options}
          />
        );
        break;

      default:
        break;
    }

    let style = {};
    if (dimensions.length > 0) {
      style = { width: dimensions[0], height: dimensions[1] };
    }

    return (
      <div>
        <div className="in-container sheets-container shadow " style={style}>
          <div className="save-chart">
            <Button
              onClick={() => {
                saveImagePng();
              }}
              variant="outline-secondary"
            >
              save
            </Button>
          </div>
          {chart}
        </div>
      </div>
    );
  }

  return (
    <div className="sheets-container shadow">
      {!appStatus.fetchingData && (
        <Alert variant="success">
          <Alert.Heading>Hey, you wanna create some charts ?</Alert.Heading>
          <p>
            Paste your Google Spreadsheet URL in the field above, and if today
            is a good day, a chart will show up!
          </p>
          <p>
            Once a URL is provided, you will be able to change the grid, colors,
            labels, legends and other cool stuff
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => dispatch(setSheetId(DEMO_SHEETID))}
              variant="outline-success"
            >
              Run Demo!
            </Button>
          </div>
        </Alert>
      )}
      {appStatus.authError && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>
            It looks like your Spreadsheet is private, please change its access
            to <strong>Anyone with the link</strong> and then try again
          </p>
        </Alert>
      )}
      {appStatus.error && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>It looks like there is a connection issue, please try again.</p>
        </Alert>
      )}
      {appStatus.fetchingData && (
        <div className="sheets-container">
          <div className="loader">
            <PulseLoader
              color="#5c646d"
              loading={appStatus.fetchingData}
              className="loader"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  cdata: state.chartData,
  activeSheet: state.sheetData.activeSheet,
  appStatus: state.appStatus,
});

export default connect(mapStateToProps)(MyChart);
