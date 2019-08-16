import React from "react";
import Chart from "react-google-charts";


class ContribsChart extends React.Component {

  donations = parseFloat(this.props.donations);
  spent = parseFloat(this.props.spent);

  data = [
    ["", "$", { role: "style" }],
    ["Total Donations", this.donations, "color: green"],
    ["Total Spent", this.spent, "color: red"],
  ];

  options={
    title: 'Contributions in the past cycle',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Dollars ($)',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
  }
 
  render() {
    return (
      <div className="chart">
        <Chart chartType="BarChart" width="100%" height="200px" data={this.data} options={this.options}/>
      </div>
    );
  }
}

export default ContribsChart;