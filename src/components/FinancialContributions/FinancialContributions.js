import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

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
        labelArr.push(this.props.contributions[i].industry_name)
      } else {
        labelArr.push(this.props.contributions[i].org_name);
      }
    }
    return labelArr;
  }

  render() {
    // get title for industry vs org contribution chart type
    let chartTitle = this.props.contributions[0].industry_name ? 'Sector Contributions' : 'Organization Contributions';
    const dataArr = this.getDataArr();
    const labelArr = this.getLabelArr();
    console.log(dataArr);
    console.log(labelArr);
    let contribsList = []
    function currencyFormat(num) {

      return '$' + parseInt(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    for (var i = 0; i < dataArr.length; i++) {
      contribsList.push((
        <li className='conributionItem' key={labelArr[i]}>
          <span className='contributionFrom'>{labelArr[i]}</span>
          <span className='contributionAmount'>{currencyFormat(dataArr[i])}</span>
        </li>
      ))
    }

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
        text: chartTitle,
        fontSize: 25,
        fontColor: '#000000',
        padding: 20,
        // fontFamily: "'Open Sans', 'Source Sans Pro', 'Lato', sans-serif",
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
        <div className='contributionChart-text-div'>
          <h1>{chartTitle}</h1>
          <ul className='contributionsList'>
            {contribsList}
          </ul>
        </div>
        <Bar className="chart" data={data} options={options} />
      </section>
    );
  }
}
