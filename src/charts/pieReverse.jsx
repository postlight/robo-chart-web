import { randomColor } from 'randomcolor';

const getPieReverseChartData = (data, semi) => {
  let circumference = 2 * Math.PI;
  let rotation = -Math.PI / 2;
  if (semi) {
    circumference = Math.PI;
    rotation = -Math.PI;
  }

  const chartData = {
    data: {
      datasets: [],
      labels: [],
    },
    options: {
      responsive: true,
      circumference,
      rotation,
    },
  };

  data.forEach((element, rowindex) => {
    element.forEach((value, colindex) => {
      const numericalValue = value.replace(/[^\d.-]/g, '');
      if (colindex === 0) {
        if (value && value.length > 0) {
          const object = { data: [], backgroundColor: [], label: '' };
          object.label = value;
          chartData.data.datasets.push(object);
        }
      } else if (rowindex === 0) {
        chartData.data.labels.push(value);
      } else {
        chartData.data.datasets[rowindex - 1].backgroundColor.push(
          randomColor(),
        );
        chartData.data.datasets[rowindex - 1].data.push(numericalValue);
      }
    });
  });

  return chartData;
};

export { getPieReverseChartData };
