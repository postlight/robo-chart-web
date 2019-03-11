import React, { Component } from 'react';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';
import { Button, Alert } from 'react-bootstrap';
import domtoimage from 'dom-to-image';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import getLineChartData from '../charts/line';
import getLineReverseChartData from '../charts/lineReverse';
import getHorizontalBarChartData from '../charts/horizontalBar';
import getHorizontalBarReverseChartData from '../charts/horizontalBarReverse';
import getBarChartData from '../charts/bar';
import getBarReverseChartData from '../charts/barReverse';
import getPieChartData from '../charts/pie';
import getPieReverseChartData from '../charts/pieReverse';
import processSpreadsheet from '../utils/processSpreadsheet';

/**
 * SmartChart component
 */
class SmartChart extends Component {
  state = {
    cdata: {},
    fetchingData: false,
    authError: false,
    error: false,
  };

  /**
   * Query Google sheets once the component mounts
   */
  componentDidMount() {
    this.runQuery();
  }

  /**
   * Compose and run query using app state
   */
  runQuery() {
    const { id, sheet, start, end } = this.props;
    const { REACT_APP_TOKEN, REACT_APP_API } = process.env;
    if (id && id.length > 5 && sheet && sheet.length > 0) {
      let url = `${REACT_APP_API}${id}/values/${sheet}?key=${REACT_APP_TOKEN}`;
      if (start && start.length > 0 && end && end.length > 0) {
        const grid = `!${start}:${end}`;
        url = `${REACT_APP_API}${id}/values/${sheet}${grid}?key=${REACT_APP_TOKEN}`;
      }

      this.setState({ fetchingData: true, authError: false, error: false });
      axios
        .get(url)
        .then(res => {
          this.setState({ fetchingData: false });
          this.process(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            this.setState({ authError: true });
          } else {
            this.setState({ error: true });
          }
          this.setState({ error: true });
        });
    }
  }

  /**
   * Process fetched data, try to find best data to plot
   * @param {object} res query result
   */
  process(res) {
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

      this.setState({ cdata: processedData });
    }
  }

  render() {
    const { cdata, fetchingData, authError, error } = this.state;
    if (fetchingData) {
      return (
        <div className="sheets-container">
          <div className="loader">
            <PulseLoader
              color="#5c646d"
              loading={fetchingData}
              className="loader"
            />
          </div>
        </div>
      );
    }

    if (authError) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>
            It looks like your Spreadsheet is private, please change its access
            to <strong>Anyone with the link</strong> and then try again
          </p>
        </Alert>
      );
    }

    if (error) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>It looks like there is a connection issue, please try again.</p>
        </Alert>
      );
    }

    const { sheet, colors } = this.props;
    let { startFrom, flipAxis, stacked, type, title } = this.props;

    if (!flipAxis) {
      flipAxis = false;
    }
    if (!stacked) {
      stacked = false;
    }
    if (!startFrom) {
      startFrom = 0;
    }
    if (!type) {
      type = 'line';
    }
    if (!title) {
      title = sheet;
    }

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

    const { data } = cdata;
    if (!data || data.length === 0) {
      return '';
    }

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

    const chartKey = `${type} ${title} ${startFrom} ${flipAxis} ${stacked}`;
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
        chartData.options.title.text = title;
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
        chartData.options.title.text = title;
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
        chartData.options.maintainAspectRatio = maintainAspectRatio;
        chartData.options.title.text = title;
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
        chartData.options.title.text = title;
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
        chartData.options.title.text = title;
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
        chartData.options.title.text = title;
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
        chartData.options.title.text = title;
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
        <div className="in-container sheets-container shadow" style={style}>
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
      </div>
    );
  }
}

export default SmartChart;
