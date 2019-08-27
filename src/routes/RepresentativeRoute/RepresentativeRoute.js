import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TotalContributions from '../../components/TotalContributions/TotalContributions';
import FinancialContributions from '../../components/FinancialContributions/FinancialContributions';
import './RepresentativeRoute.scss';
import Icon from 'react-simple-icons';
import RepresentativeService from '../../services/representatives-service';
import MoneySpinner from '../../components/MoneySpinner/Spinner';
import Elephant from './elephant.png'
import Donkey from './donkey.png'


export default class RepresentativeRoute extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    if (!this.context.representatives) {
      this.props.history.push('/');
    }
    let currRepId = this.props.match.params.repId;
      const currentRep = this.context.representatives.find(
        rep => rep.member_id === currRepId
      );
      const idx = this.context.representatives.findIndex(
        rep => rep.member_id === currRepId
      );
      RepresentativeService.getFinances(currentRep.crp_id).then(response => {
        this.context.setFinancesOnRep(response, idx);
      })
  }

  render() {
    let currRepId = this.props.match.params.repId;
    let name = '';
    let party = '';
    let currentRole = '';
    let contribs = '';
    let topContribs;
    let topIndustries;
    let currentRepImg = '';
    let phone = '';
    let url = '';
    let fbUrl = '';
    let twitterUrl = '';

    if (this.context.representatives) {
      const currentRep = this.context.representatives.find(
        rep => rep.member_id === currRepId
      );
      name = `${currentRep.first_name} ${currentRep.last_name}`;
      currentRole = currentRep.roles[0].title;
      phone = currentRep.roles[0].phone;
      url = currentRep.url;
      fbUrl = `https://www.facebook.com/${currentRep.facebook_account}`;
      twitterUrl = `https://www.twitter.com/${currentRep.twitter_account}`;
      party = (currentRep.current_party === 'R') ? <div>Republican <img className='partyIcon' src={Elephant} alt=''/></div> : <div>Democrat <img className='partyIcon' src={Donkey} alt=''/></div>
      contribs = currentRep.contributionTotals || null;
      topContribs = currentRep.topContributors || null;
      topIndustries = currentRep.topIndustries || null;
      if (currentRep.photoUrl) {
        currentRepImg = (
          <img
            src={currentRep.photoUrl}
            alt={`professional headshot of ${name}`}
          />
        );
      }
    }
    return (
      <div className="representativePage">
        <section className='repPage-section' id='contact-info'>
          <div className='repPage-section-text'>
            <h1><span className='repPage-span'>Name</span>{name}</h1>
            <h2><span className='repPage-span'>Title</span>{currentRole}</h2>
            <h3><span className='repPage-span'>Party</span>{party}</h3>
            {phone && <p><span className='repPage-span'>Phone</span> <a href={`tel:${phone}`}>{phone}</a></p>}
            {url && <p><span className='repPage-span'>Website</span> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
            {twitterUrl && <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><Icon name='twitter'/></a>}
            {fbUrl && <a href={fbUrl} target="_blank" rel="noopener noreferrer"><Icon name='facebook'/></a>}
            <Link
              className="back-nav"
              to='/dashboard'>
              {' \u2b05 Go Back'}
            </Link>
          </div>
          <div className="repPage-section-other repPage-section-image">
            <div className="representativeImage">{currentRepImg}</div>
          </div>
        </section>
        {contribs ? (<>
          <section className="repPage-section">
            <h3 className="chartDesc">
              This chart shows the top 5 contributors to your representative and
              how much money your representative accepted from each one.
            </h3>
            <FinancialContributions contributions={topContribs} />
          </section>
          <section className="repPage-section">
            <h3 className="chartDesc">
              This chart shows the top 5 business sectors that your representative
              takes donations from and how much comes from each one.
            </h3>
            <FinancialContributions contributions={topIndustries} />
          </section>
          <section className="repPage-section">
            <h3 className="chartDesc">
              This chart shows the total amount of money your representative took
              in donations and how much they spent in the last cycle.
            </h3>
            <TotalContributions contribs={contribs} />
          </section>
        </>)
        : <MoneySpinner />
      }
      </div>
    );
  }
}
