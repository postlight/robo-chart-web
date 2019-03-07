const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
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
          const color = colors[colorIndex];
          console.log(color);
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
      } else if (chartData.datasets[rowindex - 1]) {
        chartData.datasets[rowindex - 1].data.push(numericalValue);
      }
    });
  });
  return chartData;
};

export { getHorizontalBarChartData };
