import React from 'react';
import UserContext from '../../contexts/UserContext';


export default class RepresentativeRoute extends React.Component {

  // THIS CONTEXT MAY BE TEMP, info likely to be rendered in other components
  static contextType = UserContext;

  render() {
    let currRepId = this.props.match.params.repId;
    let name = ''
    let party = ''
    let currentRole = ''
    let contribs = ''

    if (this.context.representatives) {
      const currentRep = this.context.representatives.find( rep => rep.member_id === currRepId)
      name = `${currentRep.first_name} ${currentRep.last_name}`
      currentRole = currentRep.roles[0].title
      party = currentRep.current_party
      contribs = currentRep.contributionTotals
      debugger;
    }
    return (
      <div className="representativePage">
        <aside className='reppresentativeInfo'>
          <h1>{name}</h1>
          <h2>{currentRole}</h2>
          <h3>{party}</h3>
          {/* FinanceComponent goes here*/}
          {/* FinanceComponent goes here*/}
          {/* TotalContributions with prop of contribs goes here*/}

        </aside>
        <div className='representativeImage'>
          {/* Image would go here */}
        </div>

      </div>
    );
  }

}
