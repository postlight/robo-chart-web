import { getRandomColor } from './color';
import { options } from './chartVars';

const getLineChartData = (data, type) => {
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
          const object = { data: [] };
          const symbolColor = getRandomColor(element.length, colindex);
          object.borderColor = symbolColor;
          object.backgroundColor = symbolColor;
          object.pointBorderColor = symbolColor;
          object.pointBackgroundColor = symbolColor;
          object.pointHoverBackgroundColor = symbolColor;
          object.pointHoverBorderColor = symbolColor;
          object.fill = false;
          object.type = type;
          object.yAxisID = 'y-axis-1';
          object.label = value;
          chartData.datasets.push(object);
        }
      } else if (colindex === 0) {
        chartData.labels.push(value);
      } else {
        chartData.datasets[colindex - 1].data.push(numericalValue);
      }
    });
    let i = element.length;
    for (; i < columnCount; ) {
      chartData.datasets[i - 1].data.push(0);
      i += 1;
    }
  });

  return chartData;
};

export { getLineChartData };
