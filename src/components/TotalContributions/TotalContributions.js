import React from 'react';

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
      <h3>total donations in most recent cycle: ${totalDonations}</h3>
      <h3>spent in most recent cycle: ${totalSpent}</h3>
      <h3>Cash that the campaign has on hand: ${totalCash}</h3>
    </div>
  )
}

export default TotalContributions;
