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
          StayInformed is an app that helps you cut through the noise and gives you “just the facts” about your representatives in congress.  We'll let you know who their biggest donors are, how to contact them, and their latest mentions in the news.
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
        <h2 className='title'>Want us to keep track of who represents you? Create a user profile, and we'll deliver all the latest information as soon as you login.</h2>

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
        <h3 className='subtitle'>Just want to check us out first? We get that. Use our search tool to find all the information you need.</h3>
        <Link
          className='searchNow-button'
          to='/search'>Search now</Link>
      </section>
      </>
    );
  }
}

export default RegistrationRoute
