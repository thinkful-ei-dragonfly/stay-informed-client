import React from 'react';
import ContribsChart from './ContribsChart';

function TotalContributions(props){
  return (
      <ContribsChart donations={props.contribs.total_donations} spent={props.contribs.spent}/>
  )
}

export default TotalContributions;
