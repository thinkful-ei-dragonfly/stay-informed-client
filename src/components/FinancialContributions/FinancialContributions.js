import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class FinancialContributions extends Component {
  
  topContributors = [ {
    org_name: 'Elliot Management',
    total: 108300,
    pacs: 0,
    indivs: 108300
  }, 
  {
    org_name: 'XPO Logistics',
    total: 59300,
    pacs: 0,
    indivs: 59300
  }, 
  {
    org_name: 'Live Oak Bank',
    total: 56750,
    pacs: 0,
    indivs: 56750
  }, 
  {
    org_name: 'Susan B Anthony List',
    total: 54794,
    pacs: 8694,
    indivs: 46100
  }, 
  {
    org_name: 'Kleinberg, Kaplan et al',
    total: 53049,
    pacs: 0,
    indivs: 53049
  }, 
  {
    org_name: 'Dont render',
    total: 108300,
    pacs: 0,
    indivs: 108300
  }, 
  {
    org_name: 'Dont render',
    total: 108300,
    pacs: 0,
    indivs: 108300
  }, 
  ]

  getDataArr() {
    const dataArr = [];
    for (let i = 0; i < Math.min(5, this.props.contributions.length); i++) {
      dataArr.push(this.props.contributions[i].total);
    }
    return dataArr;
  }

  getLabelArr() {
    const labelArr = [];
    for (let i = 0; i < Math.min(5, this.props.contributions.length); i++) {
      labelArr.push(this.props.contributions[i].org_name);
    }
    return labelArr;
  }

  render() {
    const dataArr = this.getDataArr();
    const labelArr = this.getLabelArr();
    // format chart.js react data
    let isDataPresent = this.props.contributions ? true : false;
    let data = null;
    if (isDataPresent) {
      data = {
        labels: labelArr,
        datasets: [
          {
            label: 'Dollars given',
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
        text: '_type_ contributions ($)',
        fontSize: 25,
        fontColor: '#000000',
        padding: 20,
        fontFamily: "'Open Sans', 'Source Sans Pro', 'Lato', sans-serif",
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
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
