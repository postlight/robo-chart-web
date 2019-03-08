import { options } from '../utils/pieOptions';

const getPieChartData = (data, semi, colors) => {
  const chartData = {
    data: {
      datasets: [],
      labels: [],
    },
    options,
    colors: [],
  };

  if (semi) {
    chartData.options.circumference = Math.PI;
    chartData.options.rotation = -Math.PI;
  }

  let colorIndex = 0;
  data.forEach((element, rowindex) => {
    element.forEach((value, colindex) => {
      const numericalValue = value.replace(/[^\d.-]/g, '');
      if (rowindex === 0) {
        if (value && value.length > 0) {
          const object = { data: [], backgroundColor: [], label: '' };
          object.label = value;
          chartData.data.datasets.push(object);
        }
      } else if (colindex === 0) {
        chartData.data.labels.push(value);
      } else {
        const color = colors[colorIndex];
        colorIndex += 1;
        if (chartData.data.datasets[colindex - 1]) {
          chartData.data.datasets[colindex - 1].backgroundColor.push(color);
          chartData.data.datasets[colindex - 1].data.push(numericalValue);
        }
        chartData.colors.push(color);
      }
    });
  });

  const finalDatasets = [];
  chartData.data.datasets.forEach(dataset => {
    if (dataset.data.length > 0) {
      finalDatasets.push(dataset);
    }
  });

  chartData.data.datasets = finalDatasets;

  return chartData;
};

export { getPieChartData };
