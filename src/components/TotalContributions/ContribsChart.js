import React from 'react';
import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import '../../index.scss'

class ContribsChart extends React.Component {
  donations = parseFloat(this.props.donations);
  spent = parseFloat(this.props.spent);

  /* Formatting react chart-js2 data */
  data = {
    labels: ['Total Donations', ' Total Spent'],
    datasets: [
      {
        label: 'Dollars ($)',
        data: [this.donations, this.spent],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // green
          'rgba(255, 99, 132, 0.2)', // red
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // green
          'rgba(255, 99, 132, 1)', // red
        ],
        borderWidth: 1,
      },
    ],
  };

  options = {
    title: {
      display: true,
      text: 'Total Contributions in the Last Cycle',
      fontSize: 25,
      fontColor: '#000000',
      padding: 20,
      responsive: true,
      fontFamily: "'JostRegular', 'Source Sans Pro', 'Lato', sans-serif",
      maintainAspectRation: false,
    },
    legend: {
      display: false,
    },
    // Add commas and dollar signs
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var value = data.datasets[0].data[tooltipItem.index];
          if (parseInt(value) >= 1000) {
            return ('$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          } else {
            return '$' + value;
          }
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 14,
            beginAtZero: true,
            userCallback: function(value, index, values) {
              if (parseInt(value) >= 1000) {
                return ('$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              } else {
                return '$' + value;
              }
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontSize: 14,
          },
        },
      ],
    },
  };

  render() {
    return (
      <section id="contributionChart">
        <HorizontalBar data={this.data} options={this.options} />
      </section>
    );
  }
}

export default ContribsChart;
