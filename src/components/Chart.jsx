import React from 'react';
import { connect } from 'react-redux';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';
import { Button, Alert } from 'react-bootstrap';
import domtoimage from 'dom-to-image';
import getLineChartData from '../charts/line';
import getLineReverseChartData from '../charts/lineReverse';
import getHorizontalBarChartData from '../charts/horizontalBar';
import getHorizontalBarReverseChartData from '../charts/horizontalBarReverse';
import getBarChartData from '../charts/bar';
import getBarReverseChartData from '../charts/barReverse';
import getPieChartData from '../charts/pie';
import getPieReverseChartData from '../charts/pieReverse';
import { DEMO_SHEETID } from '../constants';
import handleOptions from '../utils/handleOptions';

/**
 * Chart component
 */
const Chart = ({ cdata, activeSheet, sheetId }) => {
  /**
   * Export image to PNG with transparency
   */
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

  /**
   * Support small screens
   *
   * @param {number} screenWidth screen width
   */
  const getSmallScreenChartDimensions = screenWidth => {
    const width = (100 * screenWidth) / 100;
    const height = (95 * width) / 100;
    return [width, height];
  };

  const {
    suffix,
    prefix,
    startFrom,
    title,
    flipAxis,
    type,
    colors,
    stacked,
    data,
  } = cdata;

  let chartData = {};
  let datasets = {};
  const columnCount = data[0].length;
  const rowCount = data.length;

  let dimensions = [];
  let maintainAspectRatio = true;
  if (window.innerWidth < 900) {
    maintainAspectRatio = false;
    dimensions = getSmallScreenChartDimensions(window.innerWidth);
  }

  let chartTitle = activeSheet;
  if (title && title.length > 0) {
    chartTitle = title;
  }

  const chartKey = `${type} ${chartTitle} ${startFrom} ${flipAxis} ${stacked} ${suffix} ${prefix}`;
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
      handleOptions(
        chartData.options,
        maintainAspectRatio,
        chartTitle,
        startFrom,
        prefix,
        suffix,
      );

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

      handleOptions(
        chartData.options,
        maintainAspectRatio,
        chartTitle,
        startFrom,
        prefix,
        suffix,
      );

      chart = (
        <Bar key={chartKey} data={datasets} options={chartData.options} />
      );
      break;
    case 'horizontalBar':
      if (rowCount > columnCount) {
        if (flipAxis) {
          chartData = getHorizontalBarReverseChartData(data, colors);
        } else {
          chartData = getHorizontalBarChartData(data, colors);
        }
      } else if (flipAxis) {
        chartData = getHorizontalBarChartData(data, colors);
      } else {
        chartData = getHorizontalBarReverseChartData(data, colors);
      }
      datasets = { datasets: chartData.datasets, labels: chartData.labels };

      handleOptions(
        chartData.options,
        maintainAspectRatio,
        chartTitle,
        startFrom,
        prefix,
        suffix,
      );

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
        <Pie key={chartKey} data={chartData.data} options={chartData.options} />
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
        <Pie key={chartKey} data={chartData.data} options={chartData.options} />
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
    style = {
      width: dimensions[0],
      height: dimensions[1],
      marginBottom: '30px',
    };
  }

  let sheeturl;
  if (sheetId === DEMO_SHEETID) {
    sheeturl = `https://docs.google.com/spreadsheets/d/${DEMO_SHEETID}/edit`;
  }

  return (
    <React.Fragment>
      {sheeturl && (
        <Alert
          className="in-container sheets-container"
          dismissible
          variant="info"
        >
          <Alert.Heading>Voila!</Alert.Heading>
          <p>
            This chart was generated using this{' '}
            <a href={sheeturl} target="_blank" rel="noopener noreferrer">
              Google Spreadsheet
            </a>
          </p>
          <p>Click the green Save button or scroll down and edit this chart!</p>
        </Alert>
      )}
      <div className="sheets-container" style={style}>
        <div className="save-chart">
          <Button
            onClick={() => {
              saveImagePng();
            }}
            variant="outline-secondary"
          >
            SAVE
          </Button>
        </div>
        {chart}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  cdata: state.chartData,
  activeSheet: state.sheetData.activeSheet,
  sheetId: state.sheetData.sheetId,
});

export default connect(mapStateToProps)(Chart);
