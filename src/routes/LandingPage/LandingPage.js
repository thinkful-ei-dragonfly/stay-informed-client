import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { Link } from 'react-router-dom'
import { HashLink } from "react-router-hash-link";
import './LandingPage.scss'
import Ballot from './ballot.png'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = (user) => {
    const { history } = this.props
    history.push(`/dashboard`)
  }

  render() {
    return (
      <>
      <section className='heroAbout'>
        <aside className='heroAboutImg'>
          <img src={Ballot} alt='Voter placing ballot' />
        </aside>
        <div className='heroAboutText'>
          <h2 className='title'>
            StayInformed is an app that helps you cut through the noise and gives you “just the facts” about your local and federal politicians.
          </h2>
          <HashLink smooth to='/#createForm'>
            <button className='submit registerButton'>Create a Voter Profile</button>
          </HashLink>
          <Link to='/search'>
            <button className='submit searchButton'>Quick Search</button>
          </Link>

        </div>
      </section>
      <section className='createFormDiv' id='createForm'>
        <h2 className='title'>Create a user profile, allowing you to check in on your elected officials. Contact them, see who contributes to their campaigns, and stay up-to-date on local goings-on.</h2>

        <div className='form-wrapper'>
          <h3 className='subtitle'>Sign up and stay informed</h3>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
      </section>
      <section className='searchNow'>
        {/* Just import the search component here too */}
        <h2 className='title'>Search now instead</h2>
        <h3 className='subtitle'>Use our search tool to find out who your representatives are. See their latest news, top financial backers and more.</h3>
        <Link
          className='searchNow-button'
          to='/search'>Search now</Link>
      </section>
      </>
    );
  }
}

export default RegistrationRoute
