import { randomColor } from 'randomcolor';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: {
      left: 25,
      right: 25,
      top: 20,
      bottom: 20,
    },
  },
  title: {
    display: false,
    text: '',
    fontSize: 20,
    padding: 20,
  },
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: { display: false },
        labels: [],
        id: 'x-axis-1',
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    yAxes: [
      {
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const getHorizontalBarChartData = data => {
  const chartData = {
    labels: [],
    datasets: [],
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
          object.borderWidth = 1;
          object.label = value;
          object.hoverBackgroundColor = symbolColor;
          object.hoverBorderColor = symbolColor;
          chartData.datasets.push(object);
        }
      } else {
        chartData.datasets[rowindex - 1].data.push(numericalValue);
      }
    });
  });
  return chartData;
};

export { getHorizontalBarChartData };
