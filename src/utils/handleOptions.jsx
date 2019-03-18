/* eslint-disable no-param-reassign */
/**
 * Update chartjs options object with the following arguments
 *
 * @param {object} options
 * @param {boolean} maintainAspectRatio
 * @param {string} chartTitle
 * @param {number} startFrom
 * @param {string} prefix
 * @param {string} suffix
 */
const handleOptions = (
  options,
  maintainAspectRatio,
  chartTitle,
  startFrom,
  prefix,
  suffix,
) => {
  options.maintainAspectRatio = maintainAspectRatio;
  options.title.text = chartTitle;
  if (startFrom !== 0) {
    options.scales.xAxes[0].ticks.beginAtZero = false;
    options.scales.yAxes[0].ticks.beginAtZero = false;
    options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
    options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
  } else {
    options.scales.xAxes[0].ticks = { beginAtZero: true };
    options.scales.yAxes[0].ticks = { beginAtZero: true };
  }

  options.scales.yAxes[0].ticks.callback = value => {
    return `${prefix}${value}${suffix}`;
  };
  options.tooltips.callbacks = {
    label(tooltipItem, vdata) {
      let { label } = vdata.datasets[tooltipItem.datasetIndex];
      label += `: ${prefix}${tooltipItem.yLabel}${suffix}`;
      return label;
    },
  };
};

export default handleOptions;
