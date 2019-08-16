import React from 'react';

function TotalContributions(props){

  return (
    <div>
      <h3>total donations in most recent cycle: ${props.contribs.total_donations.toLocaleString()}</h3>
      <h3>spent in most recent cycle: ${props.contribs.spent.toLocaleString()}</h3>
      <h3>Cash that the campaign has on hand: ${props.contribs.cash_on_hand.toLocaleString()}</h3>
    </div>
  )
}

export default TotalContributions;

