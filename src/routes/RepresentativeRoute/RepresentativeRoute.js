import React from 'react';
import UserContext from '../../contexts/UserContext';
import TotalContributions from '../../components/TotalContributions/TotalContributions'
import FinancialContributions from '../../components/FinancialContributions/FinancialContributions'

export default class RepresentativeRoute extends React.Component {

  static contextType = UserContext;

  render() {
    let currRepId = this.props.match.params.repId;
    let name = ''
    let party = ''
    let currentRole = ''
    let contribs = ''
    let topContribs
    let topIndustries
    let currentRepImg = ''
    let phone = ''
    let url = ''

    if (this.context.representatives) {
      const currentRep = this.context.representatives.find( rep => rep.member_id === currRepId)
      name = `${currentRep.first_name} ${currentRep.last_name}`
      currentRole = currentRep.roles[0].title
      phone = currentRep.roles[0].phone;
      url = currentRep.url;
      party = currentRep.current_party
      contribs = currentRep.contributionTotals
      topContribs = currentRep.topContributors
      topIndustries = currentRep.topIndustries
      if (currentRep.photoUrl) {
        currentRepImg = (
          <img src={currentRep.photoUrl} alt={name} />
        )
      }
    }
    return (
      <div className="representativePage">
        <aside className='representativeInfo'>
          <h1>{name}</h1>
          <h2>{currentRole}</h2>
          <h3>{party}</h3>
          <p>Phone: {phone}</p>
          <p>Website: <a href={url}>{url}</a></p>
          <FinancialContributions contributions={topContribs}/>
          <FinancialContributions contributions={topIndustries}/>
          <TotalContributions contribs={contribs}/>

        </aside>
        <div className='representativeImage'>
          {currentRepImg}
        </div>

      </div>
    );
  }

}
