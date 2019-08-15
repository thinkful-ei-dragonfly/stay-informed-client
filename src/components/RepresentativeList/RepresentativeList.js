import React from 'react';
/* TEMP BELOW, REPLACE WITH CONTEXT */
import TempRepState from '../../TempRepState/TempRepState';
import Representative from './Representative/Representative';

export default class RepresentativeList extends React.Component {
  state = TempRepState;
    
  generateRepList() {
    const repElems = this.state.map( (rep, idx) =>
       <li key={idx}><Representative ></Representative></li>
    )
  }

  render() {
    const repElemList = this.generateRepList();

    return (
      <div id="rep-pane">
        <ul id="rep-list">
          <Representative />
        </ul>
      </div>
    
    );
  }
}
