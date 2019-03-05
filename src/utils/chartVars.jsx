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
  hover: {
    mode: 'x',
    intersect: false,
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
  tooltips: {
    mode: 'x',
    intersect: false,
    callbacks: {},
  },
  scales: {
    xAxes: [
      {
        stacked: false,
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
        stacked: false,
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          zeroLineColor: '#888',
          zeroLineWidth: 2,
          display: true,
        },
        labels: {
          show: true,
        },
      },
    ],
  },
};

exports.options = options;
