const getPieReverseChartData = (data, semi, colors) => {
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
      maintainAspectRatio: false,
      circumference,
      rotation,
      title: {
        display: true,
        text: '',
        fontSize: 20,
        padding: 20,
      },
    },
    colors: [],
  };

  let colorIndex = 0;
  data.forEach((element, rowindex) => {
    element.forEach((value, colindex) => {
      const numericalValue = value.replace(/[^\d.-]/g, '');
      if (colindex === 0) {
        if (value && value.length > 0) {
          const object = { data: [], backgroundColor: [], label: '' };
          object.label = value;
          chartData.data.datasets.push(object);
          if (chartData.data.labels.length === 0) {
            chartData.data.labels.push(value);
          }
        }
      } else if (rowindex === 0) {
        chartData.data.labels.push(value);
      } else {
        const color = colors[colorIndex];
        colorIndex += 1;
        if (chartData.data.datasets[rowindex - 1]) {
          chartData.data.datasets[rowindex - 1].backgroundColor.push(color);
          chartData.data.datasets[rowindex - 1].data.push(numericalValue);
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

export { getPieReverseChartData };
