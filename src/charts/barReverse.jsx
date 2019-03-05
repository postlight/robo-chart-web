import { randomColor } from 'randomcolor';
import { options } from '../utils/chartVars';

const getBarReverseChartData = (data, stacked) => {
  const chartData = {
    labels: [],
    datasets: [],
    info: [],
    annotations: [],
    options,
  };

  let columnCount = 0;
  data.forEach((element, rowindex) => {
    if (columnCount === 0) {
      columnCount = element.length;
    }
    element.forEach((value, colindex) => {
      const numericalValue = value.replace(/[^\d.-]/g, '');

      if (rowindex === 0) {
        if (value && value.length > 0) {
          chartData.labels.push(value);
        }
      } else if (colindex === 0) {
        if (value && value.length > 0) {
          const object = { data: [] };
          const symbolColor = randomColor();
          object.borderColor = symbolColor;
          object.backgroundColor = symbolColor;
          object.pointBorderColor = symbolColor;
          object.pointBackgroundColor = symbolColor;
          object.pointHoverBackgroundColor = symbolColor;
          object.pointHoverBorderColor = symbolColor;
          object.fill = false;
          object.yAxisID = 'y-axis-1';
          object.label = value;
          chartData.datasets.push(object);
        }
      } else {
        chartData.datasets[rowindex - 1].data.push(numericalValue);
      }
    });
  });

  chartData.options.scales.xAxes[0].labels = chartData.labels;
  chartData.options.scales.xAxes[0].stacked = stacked;
  chartData.options.scales.yAxes[0].ticks = {
    beginAtZero: true,
  };
  chartData.options.scales.xAxes[0].ticks = {
    beginAtZero: true,
  };
  return chartData;
};

export { getBarReverseChartData };
