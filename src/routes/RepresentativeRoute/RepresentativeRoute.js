import React from 'react';
import UserContext from '../../contexts/UserContext';
import TotalContributions from '../../components/TotalContributions/TotalContributions'
import FinancialContributions from '../../components/FinancialContributions/FinancialContributions'
import './RepresentativeRoute.scss'

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
        <section className='repPage-section' id='contact-info'>
          <div className='repPage-section-text'>
            <h1><span className='repPage-span'>Name</span>{name}</h1>
            <h2><span className='repPage-span'>Title</span>{currentRole}</h2>
            <h3><span className='repPage-span'>Party</span>{party}</h3>
            <p><span className='repPage-span'>Phone</span> {phone}</p>
            <p><span className='repPage-span'>Website</span> <a href={url}>{url}</a></p>
          </div>
          <div className='repPage-section-other repPage-section-image'>
            <div className='representativeImage'>
              {currentRepImg}
            </div>
          </div>
        </section>

        <section className='repPage-section'>
          <FinancialContributions contributions={topContribs}/>
        </section>
        <section className='repPage-section'>
          <FinancialContributions contributions={topIndustries}/>
        </section>
        <section className='repPage-section'>
          <TotalContributions contribs={contribs}/>
        </section>


      </div>
    );
  }

}
