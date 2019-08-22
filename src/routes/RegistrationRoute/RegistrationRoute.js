import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { Link } from 'react-router-dom'
import './RegistrationRoute.scss'

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
      <section className='container'>
        <h2 className='title'>StayInformed is an app that helps you cut the noise and gives you “just the facts” about your local and federal politicians.</h2>

        <div className='form-wrapper'>
          <h3 className='subtitle'>Sign up and stay informed</h3>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
      </section>
      <section className='searchNow'>
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
