import React from 'react';
import UserContext from '../../contexts/UserContext';
import FinancialContributions from '../../components/FinancialContributions/FinancialContributions';


export default class RepresentativeRoute extends React.Component {

  // THIS CONTEXT MAY BE TEMP, info likely to be rendered in other components
  static contextType = UserContext;

  render() {
    // let currRepId = this.props.match.params.repId;
    // TEMP - capture currently rendered rep
    // let currentRep;
    if (this.context.representatives) {
      // currentRep = this.context.representatives.find( rep => rep.member_id === currRepId)
      // console.log(`my current rep is ${currentRep.first_name}`)
    }
    return (
      <div className="rep">
        This is the Representative Route for my currently clicked representative
      </div>
    );
  }

}