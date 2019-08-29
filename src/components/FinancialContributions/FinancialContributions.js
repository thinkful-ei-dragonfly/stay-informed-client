import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './FinancialContributions.scss'

export default class FinancialContributions extends Component {
  getDataArr() {
    const dataArr = [];

    for (let i = 0; i < Math.min(5, this.props.contributions.length); i++) {
      dataArr.push(this.props.contributions[i].total);
    }
    return dataArr;
  }

  getLabelArr() {
    const labelArr = [];
    // determine whether we are charting topContributors vs topIndustries
    let isIndustryType = this.props.contributions[0].industry_name;
    for (let i = 0; i < Math.min(5, this.props.contributions.length); i++) {
      if (isIndustryType) {
        labelArr.push(this.props.contributions[i].industry_name);
      } else {
        labelArr.push(this.props.contributions[i].org_name);
      }
    }
    return labelArr;
  }

  render() {

    // format chart.js react data
    let data = null;
    let chartTitle = '';
    if (this.props.contributions) {
      // get title for industry vs org contribution chart type
      chartTitle = this.props.contributions[0].industry_name
        ? 'Highest Sector Contributors'
        : 'Highest Organizational Contributors';
      const dataArr = this.getDataArr();
      const labelArr = this.getLabelArr();
      data = {
        labels: labelArr,
        datasets: [
          {
            label: 'Dollars ($)',
            data: dataArr,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)', // blue
              'rgba(255, 206, 86, 0.2)', // yellow
              'rgba(153, 102, 255, 0.2)', // purple
              'rgba(75, 192, 192, 0.2)', // green
              'rgba(255, 99, 132, 0.2)', // red
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)', // blue
              'rgba(255, 206, 86, 1)', // yellow
              'rgba(153, 102, 255, 1)', // purple
              'rgba(75, 192, 192, 1)', // green
              'rgba(255, 99, 132, 1)', // red
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    const options = {
      title: {
        display: true,
        text: chartTitle,
        fontSize: 25,
        fontColor: '#000000',
        padding: 20,
        fontFamily: "'JostRegular', 'Source Sans Pro', 'Lato', sans-serif",
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
              return (
                '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              );
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
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              userCallback: function(value, index, values) {
                if (parseInt(value) >= 1000) {
                  return (
                    '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  );
                } else {
                  return '$' + value;
                }
              },
              fontSize: 14,
            },
          },
        ],
      },
    };

    return (
      <section id="contributionChart">
        <Bar className="chart" data={data} options={options} />
      </section>
    );
  }
}
