import React from 'react';
import ContribsChart from './ContribsChart';

function TotalContributions(props){
  let totalDonations = ''
  let totalSpent = ''
  let totalCash = ''
  if (props.contribs) {
    totalDonations = props.contribs.total_donations.toLocaleString()
    totalSpent = props.contribs.spent.toLocaleString()
    totalCash = props.contribs.cash_on_hand.toLocaleString()
  }
  return (
    <div>
      <ContribsChart donations={props.contribs.total_donations} spent={props.contribs.spent}/>
    </div>
  )
}

export default TotalContributions;

