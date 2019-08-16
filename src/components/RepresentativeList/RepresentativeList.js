import React from 'react';
/* TEMP BELOW, REPLACE WITH CONTEXT */
import TempRepState from '../../TempRepState/TempRepState';
import Representative from '../../Representative/Representative';

export default class RepresentativeList extends React.Component {
  
  /* THIS IS A TEMP HOLDER FOR CONTEXT UNTIL REP. CONTEXT IS READY */
  state = TempRepState;
    
  generateRepList() {
    const repElems = this.state.map( (rep, idx) => {
      const title = rep.results[0].roles[0].short_title === 'Sen.' ? 'Senator' : 'Representative' 
      // get district if representative: 
      // correct way to format?? 
      // const district = 
      // TODO: Would like to put headshots in here
      return (
        <li key={idx} class="representative">
          <h3>{`${title} ${rep.results[0].first_name} ${rep.results[0].last_name}`}</h3>
          <p><span class="rep-field">State: </span><span class="field-val">{rep.results[0].roles[0].state}</span></p>
          <p><span class="rep-field">Party: </span><span class="field-val">{rep.results[0].roles[0].party}</span></p>           
          
        </li>
      );
    })
    
    return repElems;
  }


  render() {
    const repElemList = this.generateRepList();

    return (
      <div id="rep-pane">
        <ul id="rep-list">
          {repElemList}
        </ul>
      </div>
    );
  }
}
