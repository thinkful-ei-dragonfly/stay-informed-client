import React from 'react';
/* TEMP BELOW, REPLACE WITH CONTEXT */
import './RepresentativeList.css'
import Representative from '../../Representative/Representative';
import UserContext from '../../contexts/UserContext'

export default class RepresentativeList extends React.Component {
  
  /* THIS IS A TEMP HOLDER FOR CONTEXT UNTIL REP. CONTEXT IS READY */
  static contextType = UserContext;
  
  generateRepList() {
    console.log(this.context.representatives)
    const repElems = '';
    if (this.context.representatives) {
    const repElems = this.context.representatives.map( (rep, idx) => {
      const title = rep.roles[0].short_title === 'Sen.' ? 'Senator' : 'Representative' 
      // get district if representative: 
      // correct way to format?? 
      // const district = 
      return (
        <li key={idx} className="representative">
          <img className="headshot" src={rep.photoUrl} alt={`professional photographic headshot of ${rep.first_name} ${rep.last_name}`}></img>
          <h3 className="rep-name">{`${title} ${rep.first_name} ${rep.last_name}`}</h3>
          <p><span className="rep-field">State: </span><span className="field-val">{rep.roles[0].state}</span></p>
          <p><span className="rep-field">Party: </span><span className="field-val">{rep.roles[0].party}</span></p> 
          <button class="go-details">Learn More</button>
        </li>
      );
    })
    return repElems;
  }
    
    // return repElems;
  }


  render() {
    const repElemList = this.generateRepList();

    return (
      <div id="rep-pane">
        <h2>Your Congress Representatives</h2>
        <ul id="rep-list">
          {repElemList}
        </ul>
      </div>
    );
  }
}
