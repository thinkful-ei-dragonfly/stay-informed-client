import React from 'react';
import ContribsChart from './ContribsChart';

function TotalContributions(props){
  return (
    <div>
      <ContribsChart donations={props.contribs.total_donations} spent={props.contribs.spent}/>
    </div>
  )
}

export default TotalContributions;
