import { randomColor } from 'randomcolor';

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
        }
      } else if (rowindex === 0) {
        chartData.data.labels.push(value);
      } else {
        let color;
        if (colorIndex < colors.length) {
          color = colors[colorIndex];
        } else {
          color = randomColor();
        }
        colorIndex += 1;
        if (chartData.data.datasets[rowindex - 1]) {
          chartData.data.datasets[rowindex - 1].backgroundColor.push(color);
          chartData.data.datasets[rowindex - 1].data.push(numericalValue);
        }
        chartData.colors.push(color);
      }
    });
  });

  return chartData;
};

export { getPieReverseChartData };
