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

const getHorizontalBarChartData = (data, colors) => {
  const chartData = {
    labels: [],
    datasets: [],
    options,
    colors: [],
  };

  let columnCount = 0;
  let colorIndex = 0;
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
          let color;
          if (colorIndex < colors.length) {
            color = colors[colorIndex];
          } else {
            color = randomColor();
          }
          colorIndex += 1;
          object.borderColor = color;
          object.backgroundColor = color;
          object.borderWidth = 1;
          object.label = value;
          object.hoverBackgroundColor = color;
          object.hoverBorderColor = color;
          chartData.datasets.push(object);

          chartData.colors.push(color);
        }
      } else {
        chartData.datasets[rowindex - 1].data.push(numericalValue);
      }
    });
  });
  return chartData;
};

export { getHorizontalBarChartData };
